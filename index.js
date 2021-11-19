const obj = {
    a: 1,
    b: {
        c: 56,
        d: { f: 89 },
        h: function fun() {
            return 2
        },
        g: [0, 2]
    },
    e:'788'
}

exports.deepClone = (obj) => {
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
            }
            else tempObj[lastKey] = value
        } else if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
            for (const k in value) {
                if (Object.hasOwnProperty.call(value, k)) {
                    tempMap.set(`${key}.${k}`,value[k])
                }
            }
            final[key] = {}
        } else if (typeof value === 'function') {
            final[key] = new Function('return ' + value.toString()).call(final)
            final[key].name = value.name
        }
        else final[key] = value
    })
    return final
}