
/**
 * 深拷贝函数
 * @param {需拷贝对象} obj 
 * @returns 新对象
 */
const deepClone = obj => {
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
//测试
// const obj = {
//     a: 1,
//     b: {
//         c: 56,
//         d: { f: 89 },
//         h: function fun() {
//             return 2
//         },
//         g: [{ i: 5 }, 2]
//     },
//     e:'788'
// }
// const newObj = deepClone(obj)
// obj.b.g[0] = 2
// console.log(obj.b.g[0] , newObj.b.g)

/***********************************/

/**
 * 填充数独板
 * @param {*} board 未填充完整的数独板
 */
const fillSudoku = board => {
    const numbers = []
    for (let a = 0; a < board.length; ++a) {
        for (let b = 0; b < 9; ++b) {
            if (board[a][b] !== '.') continue
            let set = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
            for (let c = 0; c < 9; ++c) {
                if (set.has(board[a][c])) set.delete(board[a][c])
                if (set.has(board[c][b])) set.delete(board[c][b])
            }
            for (let d = Math.floor(a / 3) * 3; d < Math.floor(a / 3) * 3 + 3; ++d) {
                for (let e = Math.floor(b / 3) * 3; e < Math.floor(b / 3) * 3 + 3; ++e) {
                    if (set.has(board[d][e])) set.delete(board[d][e])
                }
            }
            numbers.push({
                idx: 0,
                val: Array.from(set),
                target: a + '' + b,
            })
        }
    }
    const recursion = idx => {
        if (numbers[idx].idx < numbers[idx].val.length - 1) {
            numbers[idx].idx++
            return numbers[idx].target
        } else {
            numbers[idx].idx = 0
            board[numbers[idx].target.split('')[0]][numbers[idx].target.split('')[1]] = '.'
            return recursion(--idx)
        }
    }
    for (let a = 0; a < board.length; ++a) {
        for (let b = 0; b < 9; ++b) {
            let itIdx, item, shouldContinue = false
            for (let f = 0; f < numbers.length; ++f) {
                if (numbers[f].target === (a + '' + b)) {
                    item = numbers[f]
                    itIdx = f
                }
            }
            if (!item) continue
            for (let c = 0; c < 9; ++c) {
                if (board[a][c] == item.val[item.idx] || board[c][b] == item.val[item.idx]) {
                    let tempTar = recursion(itIdx).split('')
                    a = Number(tempTar[0])
                    b = Number(tempTar[1]) - 1
                    shouldContinue = true
                    break
                }
            }
            if (shouldContinue) continue;
            out1: for (let d = Math.floor(a / 3) * 3; d < Math.floor(a / 3) * 3 + 3; ++d) {
                for (let e = Math.floor(b / 3) * 3; e < Math.floor(b / 3) * 3 + 3; ++e) {
                    if (board[d][e] === item.val[item.idx]) {
                        let tempTar = recursion(itIdx).split('')
                        a = Number(tempTar[0])
                        b = Number(tempTar[1]) - 1
                        shouldContinue = true
                        break out1
                    }
                }
            }
            if (shouldContinue) continue
            board[a][b] = item.val[item.idx]
        }
    }
}

//测试
// const board1 = [
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"]
// ]
// fillSudoku(board1)
// console.log(board1)

/***********************************/
/**
 * 解决n皇后问题
 * @param {*} n 棋盘
 * @returns Array<Array<string>> 填充后的棋盘
 */
const solveNQueens = n => {
    if(n===1)return [['Q']]
    if(n<4)return []
    let resA = [], queens = [], indexObj = []
    for (let a = 0; a < n; ++a){
        let temp = []
        for (let b = 0; b < n; ++b){
            temp.push('.')
        }
        queens.push(temp)
        indexObj.push(0)
    }
    const recur = line => {
        if (indexObj[line] < n-1) {
            queens[line][indexObj[line]] = '.'
            return { line, idx: ++indexObj[line] }
        } else {
            indexObj[line] = 0
            for (let h = 0; h < n; ++h){
                queens[line][h]='.'
            }
            return line>0 ? recur(line-1) : null
        }
    }
        for (let c = 0; c < queens.length; ++c){
            for (let d = 0; d < queens[c].length; d++) {
                let canSet = true
                if (queens[c].find(a => a === 'Q')) {
                    break
                }
                for (let e = 0; e < queens.length; ++e){
                    if (queens[e][d] === 'Q') {
                        canSet = false
                        break
                    }
                }
                let f = c+1,g=d+1
                while (f < queens.length && g < queens.length) {
                    if (queens[f][g] === 'Q') {
                        canSet = false
                        break
                    }
                    ++f
                    ++g
                }
                f = c - 1
                g = d - 1
                while (f >=0 && g >=0) {
                    if (queens[f][g] === 'Q') {
                        canSet = false
                        break
                    }
                    --f
                    --g
                }
                f = c -1
                g = d + 1
                while (f >=0 && g <queens.length) {
                    if (queens[f][g] === 'Q') {
                        canSet = false
                        break
                    }
                    --f
                    ++g
                }
                f = c +1
                g = d - 1
                while (f <queens.length && g >=0) {
                    if (queens[f][g] === 'Q') {
                        canSet = false
                        break
                    }
                    ++f
                    --g
                }
                if (canSet) {
                    queens[c][d] = 'Q'
                    indexObj[c] = d
                    if (c === n-1 ) {
                        resA.push(queens.map(item => item.join('')))
                        for (let l = 0; l < n; ++l){
                            if (indexObj[l] < n - 1 - l) {
                                const res = recur(c)
                                if(!res)return resA
                                c = res.line
                                d = res.idx - 1
                                break
                            }
                        }
                    }
                } else {
                    const res = recur(c)
                    if(!res)return resA
                    c = res.line
                    d = res.idx - 1
                }
            }
    }
    return resA
}
//测试
// console.log(solveNQueens(6))
/***********************************/
/**
 * 数组所有的不重复的排列
 * @param {*} nums 数组
 * @returns 数组所有的不重复的排列的集合
 */
const permuteUnique = nums => {
    if (nums.length === 1) return [[nums[0]]]
    if (nums.length === 2 && nums[0] !== nums[1]) return [[nums[0], nums[1]], [nums[1], nums[0]]]
    else if (nums.length === 2) return [[nums[0], nums[1]]]
    let arr = []
    for (let a = 0; a < nums.length; ++a){
        if (a !== 0 && nums.slice(0, a).find(i => i === nums[a]) !== undefined) {
            continue
        }
        if (a !== 0) {
            let temp = nums[a]
            nums[a] = nums[0]
            nums[0] = temp
        }
        let tempArr = permuteUnique(nums.slice(1))
        for (let b = 0; b < tempArr.length; ++b){
            arr.push([nums[0], ...tempArr[b]])
        }
    }
    return arr
}
/***********************************/

const utils = {
    deepClone, fillSudoku, solveNQueens, permuteUnique
}

module.exports = utils
