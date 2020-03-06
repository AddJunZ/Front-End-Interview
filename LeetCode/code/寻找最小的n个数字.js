// 1.直接排序
// 2.最大堆
// 3.快排思想

// 2.最大堆


// 3.快排思想
function patition(arr, start, end){
  var temp = arr[start];
  var i = start;
  var j = end;
  while(i < j){
    while(i < j && arr[j] > temp){
      j--
    }
    while(i < j && arr[i] <= temp){
      i++;
    }
    if(i < j){
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[start], arr[i]] = [arr[i], arr[start]];
  return i;
}

function kMin(arr, k){
  const len = arr.length;
  if(k >= len)return arr;
  let left = 0;
  let right = len - 1;
  let index = patition(arr, left, right);
  while(index !== k){
    if(index < k){
      left = index + 1;
      index = patition(arr, left, right);
    }else if(index > k){
      right = index - 1;
      index = patition(arr, left, right);
    }
  }
  return arr.slice(0, k);
}
console.log(kMin([1,6,2,6,12,3,8,2],3));

