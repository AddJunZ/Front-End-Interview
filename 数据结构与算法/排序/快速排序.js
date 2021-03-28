


// 一、递归快排（不好做console.time）
const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left >= right) return;
  // 1. 哨兵
  const pivot = arr[left];
  // 2. 左右往中间遍历索引
  let i = left, j = right;
  // 3. 循环条件：左索引小于右索引
  while (i < j) {
    // == 这里4和5的顺序不能交换
    // https://blog.csdn.net/w282529350/article/details/50982650
    // 4. 从右往左找到第一个小于哨兵的值（索引），同时还要遵循临界条件
    // 如果大于 则持续向前找
    while (i < j && arr[j] >= pivot) {
      j--;
    }
    // 5. 同理从左往右找到第一个大于哨兵的值（索引）
    while (i < j && arr[i] <= pivot) {
      i++;
    }
    // 6. 都找到后，进行交换
    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // 7. 哨兵与下标i的元素互换（找到哨兵的真实位置）
  // 并且哨兵的左边元素都小于哨兵
  // 并且哨兵的右边元素都大于哨兵
  [arr[i], arr[left]] = [arr[left], arr[i]];
  // 8. 递归
  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, right);
  return arr;
}
console.log(quickSort([3, 6, 1, 2, 7, 5]));

// 二、利用队列
const quickSort2 = (arr, left = 0, right = arr.length - 1) => {
  console.time('quick');
  // 1. 将每次的左右索引保存在栈中
  const stack = [{
    left,
    right
  }];
  while (stack.length) {
    const { left, right }= stack.shift();
    if(left >= right)continue;
    let i = left, j = right;
    const pivot = arr[left];
    while(i < j) {
      // == 这里4和5的顺序不能交换
      while(i < j && arr[j] >= pivot){
        j--;
      }
      while(i < j && arr[i] <= pivot) {
        i++;
      }
      if(i < j){
        [arr[i], arr[j]] = [arr[j], arr[i]];

      }
    }
    [arr[left], arr[i]] = [arr[i], arr[left]]
  }
  console.timeEnd('quick');
  return arr;
}
console.log(quickSort2([3, 6, 1, 2, 7, 5]));
