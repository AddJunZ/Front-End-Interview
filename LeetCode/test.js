var combinationSum2 = function (candidates, target) {
  const res = [];
  const curr = [];
  candidates.sort((a, b) => a - b);
  const backTracking = (sum, startIndex) => {
    if (sum > target) return;
    if (sum === target) {
      res.push(curr.slice());
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      if (i > startIndex && candidates[i - 1] == candidates[i]) continue;
      curr.push(candidates[i]);
      backTracking(sum + candidates[i], i + 1);
      curr.pop();
    }
  };
  backTracking(0, 0);
  return res;
};
console.log(JSON.stringify(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)));
