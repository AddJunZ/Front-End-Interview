/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 1. 用翻转代替旋转，题目要求旋转90度，可以先上下翻转后再按照左上到右下的对角线翻转
var rotate = function(matrix) {
  let N = matrix.length;
  matrix = matrix.reverse();
  for(let i = 0; i < N; i++){
    for(let j = 0; j < i; j++){
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
};
