/*
 * @Author: hsl
 * @Descripttion: 声明文件
 * @Date: 2021-11-19 16:23:44
 * @LastEditTime: 2022-02-22 11:10:56
 */
export interface utils {
    /*深拷贝 */
    deepClone(obj: object): object;
    /*填充残缺数独 */
    fillSudoku(board: Array<Array<string>>): void;
    /*解决n皇后问题*/ 
    solveNQueens(n: number): Array<Array<string>>;
}
