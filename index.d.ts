/*
 * @Author: hsl
 * @Descripttion: 声明文件
 * @Date: 2021-11-19 16:23:44
 * @LastEditTime: 2022-04-02 10:01:01
 */

/**
 * 对象深拷贝
 * @param obj 原始对象
 */
declare function deepClone(obj: object): object
/**
 * 填充残缺数独板
 * @param board 初始残缺数独板
 */
declare function fillSudoku(board: Array<Array<string>>): void
/**
 * 解决n皇后的问题
 * @param n NxN的棋盘
 */
declare function solveNQueens(n: number): Array<Array<string>>

/**
 * 数组所有的不重复的排列
 * @param nums 数组
 */
declare function permuteUnique(nums: Array<any>): Array<Array<any>>

export { deepClone, fillSudoku, solveNQueens, permuteUnique }
