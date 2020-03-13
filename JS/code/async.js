// 1----
// async function a(){
//   console.log('惠惠：等下给你答案');
//   console.log('我：好的');
//   setTimeout(() => {
//     return '我不爱你了';
//   }, 1500)
// }

// async function b(){
//   let result = await a();
//   console.log('惠惠：', result);
//   console.log('好吧我知道了');
// }
// b();


// 惠惠：等下给你答案
// 我：好的
// 惠惠： undefined
// 好吧我知道了


// async修饰的函数，返回值都是Promise
// 如果遇到异步函数
// 而你在回调函数里想调用return来改变Promise的状态是不可能的
// 你只能通过resolve或者reject进行改变

// 2---
async function a() {
  return new Promise((resolve, reject) => {
    console.log('惠惠：等下给你答案');
    console.log('我：好的');
    setTimeout(() => {
      resolve('我们不合适')
    }, 1500)
  })
}

async function b() {
  let result = await a();
  console.log('惠惠：', result);
  console.log('好吧我知道了');
}
b();
