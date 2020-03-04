// 大数 一般用字符串表示
function add(a,b){
  var aLen = a.length;
  var bLen = b.length;
  a = a.split('').reverse();
  b = b.split('').reverse();
  var jinWei = 0;
  var aim = '';
  var maxLen = Math.max(aLen, bLen);
  for(let i = 0; i < maxLen; i++){
    let sum = +(a[i]) + +(b[i]) + jinWei;
    if(sum >= 10){
      aim += sum % 10;
      jinWei = 1;
    }else{
      aim += sum;
      jinWei = 0;
    }
  }
  if(jinWei == 1){
    aim += '1';
  }
  return aim.split('').reverse().join('');
}
console.log(add('143','857'));