// 时间复杂度O(n^2)
// 空间复杂度O(1)

// 一、常规做法
const bubbleSort = arr => {
  const len = arr.length;
  let temp;
  // 1. 外循环为排序的趟数
  for (let i = 0; i < len; i++) {
    // 2. 内循环为每趟要比对的次数
    // 3. 每排序一次 就有一个元素固定在末尾，比对的次数相对少一
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort([3,6,1,2,7,5]))