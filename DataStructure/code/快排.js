// const quickSort = (arr, left = 0, right = arr.length - 1) => {
//   if (left >= right) {
//     return
//   }
//   let i = left;
//   let j = right;
//   // 哨兵
//   const temp = arr[left];
//   while (i < j) {
//     while (i < j && arr[j] >= temp) {
//       j--;
//     }
//     while (i < j && arr[i] <= temp) {
//       i++;
//     }
//     // 快排每次确定一个元素的真实位置
//     if (i < j) {
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//   }
//   // 哨兵与下标i的元素交换
//   [arr[left], arr[i]] = [arr[i], arr[left]];
//   // 递归快排元素左右两边的数组
//   quickSort(arr, left, i - 1);
//   quickSort(arr, i + 1, right);
//   return arr
// }
// var arr = [3, 6, 12, 7, 2, 7, 3];
// console.log(quickSort(arr));

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  var stack = [];
  // 把每次的前后所以存进栈里
  stack.push({ left, right });
  while (stack.length) {
    let { left, right } = stack.shift();
    if (left >= right) continue;
    let i = left;
    let j = right;
    let temp = arr[left];
    while (i < j) {
      while (i < j && arr[j] >= temp) {
        j--;
      }
      while (i < j && arr[i] <= temp) {
        i++;
      }
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[i], arr[left]] = [arr[left], arr[i]];
    stack.push({ left: left, right: i - 1 }, { left: i + 1, right: right })
  }
  return arr;
}
var arr = [3, 6, 12, 7, 2, 7, 3];
console.log(quickSort(arr));