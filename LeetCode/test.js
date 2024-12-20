/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const len = nums.length;
  const sortedNums = nums.sort((a, b) => a - b);
  const res = [];
  const curr = [];
  const used = new Array(len).fill(false);
  const dfs = () => {
    if (curr.length === len) {
      res.push(curr.slice());
      return;
    }
    for (let i = 0; i < len; i++) {
      if (
        i > 0 &&
        sortedNums[i] === sortedNums[i - 1] &&
        used[i - 1] === false
      ) {
        continue;
      }
      if (used[i] === false) {
        used[i] = true;
        curr.push(sortedNums[i]);
        dfs();
        curr.pop();
        used[i] = false;
      }
    }
  };
  dfs(0);
  return res;
};

console.log(JSON.stringify(permuteUnique([1, 1, 2])));
