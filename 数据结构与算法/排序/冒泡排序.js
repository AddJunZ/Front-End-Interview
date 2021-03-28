// 时间复杂度O(n^2)
// 空间复杂度O(1)

// 一、常规做法
const bubbleSort = arr => {
  console.time('bubble');
  const len = arr.length;
  let temp;
  // 1. 外循环为排序的趟数, 最后一趟只剩一个元素不需要走了
  for (let i = 0; i < len - 1; i++) {
    // 2. 内循环为每趟要比对的次数
    // 3. 每排序一次 就有一个元素固定在末尾，比对的次数相对少一
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  console.timeEnd('bubble');// bubble: 0.065ms
  return arr;
}
console.log(bubbleSort([3, 6, 1, 2, 7, 5]))


// 二、优化：某趟中没有换位，则代表已经有序
const bubbleSort2 = arr => {
  console.time('bubble2');
  // 1. 代表是否有交换
  let flag = true;
  // 2. 未排序的数组长度，每次要减1
  let len = arr.length;
  // 3. 作为交换的临时变量
  let temp;
  while (flag) {
    // 4. 每一趟都初始化为没有交换
    flag = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        // 5. 有做交换，得继续遍历
        flag = true;
      }
    }
  }
  console.timeEnd('bubble2');// bubble2: 0.008ms
  return arr;
}
console.log(bubbleSort2([3, 6, 1, 2, 7, 5]))
