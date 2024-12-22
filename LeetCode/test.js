var combinationSum3 = function (k, n) {
  const res = [];
  const curr = [];
  const backTracking = (startIndex, currSum) => {
    if (curr.length === k) {
      if (currSum === n) {
        res.push(curr.slice());
      }
      return;
    }
    for (let i = startIndex; i <= 9 - (k - curr.length) + 1; i++) {
      curr.push(i);
      currSum += i;
      backTracking(i + 1, currSum);
      currSum -= i;
      curr.pop();
    }
  };
  backTracking(1, 0);
  return res;
};
