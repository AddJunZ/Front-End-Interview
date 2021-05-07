/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let maxArea = 0;
  const stack = [];
  heights.unshift(0);
  heights.push(0);
  for (let i = 0; i < heights.length; i++) {
    // 1. 当前柱 比 栈顶柱 矮
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // 2. 栈顶元素（索引）出栈
      const stackTopIndex = stack.pop();
      maxArea = Math.max(maxArea, heights[stackTopIndex] * (i - stack[stack.length - 1] - 1));
    }
    stack.push(i);
  }
  return maxArea;
};