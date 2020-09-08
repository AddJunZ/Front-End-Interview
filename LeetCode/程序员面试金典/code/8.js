// 零矩阵
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 1. 首先确定为0的横纵坐标的集合
// 然后每次遇到横坐标或者纵坐标有对应的
// 就重置为0
var setZeroes = function(matrix) {
  let zeroPointX = [];
  let zeroPointY = [];
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[0].length; j++){
      if(!matrix[i][j]){
        zeroPointX.push(i);
        zeroPointY.push(j);
      }
    }
  }
  for(let i = 0; i < matrix.length; i++){
    for(let j = 0; j < matrix[0].length; j++){
      if(zeroPointX.indexOf(i) != -1 || zeroPointY.indexOf(j) != -1){
        matrix[i][j] = 0;
      }
    }
  }
};


// 2. 不开辟新数组解法
// 先用两个变量记录第一行第一列有没有0