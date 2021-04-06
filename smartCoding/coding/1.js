// 1、实现
var a = [1, 3, 5, 6, 7], b = [2, 3, 9]
console.log(combine(a, b)) // [1, 2, 3, 3, 5, 6, 7, 9]
function combine(arr1, arr2) {
  const res = [];
  let len1 = arr1.length, len2 = arr2.length;
  let i = 0, j = 0;
  while (i < len1 || j < len2) {
    if (i < len1 && j < len2) {
      if (arr1[i] < arr2[j]) {
        res.push(arr1[i++])
      } else {
        res.push(arr2[j++])
      }
      continue;
    }

    while (i < len1) {
      res.push(a[i++])
    }

    while (j < len2) {
      res.push(arr2[j++])
    }
  }
  return res;
}