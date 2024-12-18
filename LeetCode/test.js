var combine = function (n, k) {
  const curr = [];
  const res = [];
  const dfs = (startIndex) => {
    if (curr.length === k) {
      res.push(curr.slice());
      return;
    }
    for (let i = startIndex; i <= n; i++) {
      curr.push(i);
      dfs(i + 1);
      curr.pop();
    }
  };
  dfs(1);
  return res;
};
console.log(JSON.stringify(combine(4, 3)));
