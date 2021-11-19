const obj = {
    a: 1,
    b: {
        c: 56,
        d: { f: 89 },
        h: function fun() {
            return 2
        },
        g: [{ i: 5 }, 2]
    },
    e:'788'
}
/**
 * 
 * @param {需拷贝对象} obj 
 * @returns 新对象
 */
const deepClone = (obj) => {
    let final = {}
    let tempMap = new Map()
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            tempMap.set(key,obj[key])
        }
    }
    tempMap.forEach((value, key) => {
        if (key.includes('.')) {
            let arr = key.split('.')
            let lastKey = arr.pop()
            let tempObj = final[arr[0]]
            arr.shift()
            arr.length && arr.forEach(i => {
                tempObj=tempObj[i]
            }) 
            if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                for (const k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        tempMap.set(`${key}.${k}`,value[k])
                    }
                }
                tempObj[lastKey] = {}
            } else if (typeof value === 'function') {
                tempObj[lastKey] = new Function('return ' + value.toString()).call(tempObj)
                tempObj[lastKey].name = value.name
            } else if (value instanceof Array) {
                tempObj[lastKey] = value.map(item => {
                    if (typeof item === 'object' && item !== null)return deepClone(item)
                    else if (typeof item === 'function') {
                       return  new Function('return ' + item.toString()).call()
                    }else return item
                })
            }
            else tempObj[lastKey] = value
        } else if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
            for (const k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                    tempMap.set(`${key}.${k}`,value[k])
                }
            }
            final[key] = {}
        } else if (value instanceof Array) {
            final[key] = deepClone(value)
        }
        else if (typeof value === 'function') {
            final[key] = new Function('return ' + value.toString()).call(final)
            final[key].name = value.name
        }
        else if (value instanceof Array) {
            final[key] = value.map(item => {
                if (typeof item === 'object' && item !== null)return deepClone(item)
                else if (typeof item === 'function') {
                   return  new Function('return ' + item.toString()).call()
                }else return item
            })
        }
        else final[key] = value
    })
    return final
}
// const newObj = deepClone(obj)
// obj.b.g[0] = 2
// console.log(obj.b.g[0] , newObj.b.g)

const utils = {
    deepClone
}
module.exports = utils