/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n) {
  const res = [];
  const curr = [];
  // 当前还剩需要几位数 // 当前的总和
  const backTracking = (startItem, num, sum) => {
    if (num < 0 || sum < 0) {
      return;
    }
    if (num === 0 && sum === 0) {
      res.push(curr.slice());
      return;
    }
    for (let i = startItem + 1; i <= Math.min(9, sum); i++) {
      curr.push(i);
      backTracking(i, num - 1, sum - i);
      curr.pop();
    }
  };
  backTracking(0, k, n);
  return res;
};
console.log(JSON.stringify(combinationSum3(3, 7)));
