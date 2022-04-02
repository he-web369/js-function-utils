<!--
 * @Author: hsl
 * @Descripttion: js工具函数库
 * @Date: 2021-11-19 15:28:04
 * @LastEditTime: 2022-04-02 11:19:35
-->
# Javascript 函数库(test edition)
## 导出方式：commonJS
## 使用方式(usage)：
    const utils = require('he-utils')
    utils.deepClone(args)
## 方法列表
### 1.deepClone(对象深拷贝)：
    params: obj:object
    return: new obj
### 2.fillSudoku(填充残缺数独)：
    params: board:Array<Array<string>>
    return: wholeBoard:Array<Array<string>>
### 3.solveNQueens(解决n皇后问题)：
    params: n:number
    return: distributionBoards:Array<Array<string>>
### 4.permuteUnique(找出数组所有的不重复的排列)：
    params: nums:Array<any>  
    return: wholeArrays:Array<Array<any>>