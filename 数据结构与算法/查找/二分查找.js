// function binary_search(arr, key){
//   var left = 0;
//   var right = arr.length - 1;
//   while(left <= right){
//     var mid = parseInt((left + right) / 2);
//     if(key == arr[mid]){
//       return mid;
//     }else if(key > arr[mid]){
//       left = mid + 1;
//     }else if(key < arr[mid]){
//       right = mid - 1;
//     }else{
//       return -1;
//     }
//   }
// }
// console.log(binary_search([1,2,3,4,5,6,7,8,9,10],9))


function binary_search(arr, left, right, key){
  if(left > right){
    return -1
  }
  var mid = parseInt((left + right) / 2);
  if(arr[mid] == key){
    return mid;
  }else if(arr[mid] > key){
    right = mid - 1;
    return binary_search(arr, left, right, key);
  }else if(arr[mid] < key){
    left = mid + 1;
    return binary_search(arr, left, right, key);
  }
}
var arr = [1,2,3,4,5,6,7,8,9,10];
console.log(binary_search(arr, 0, arr.length - 1, 9))