<!-- 奇形怪状的JS题.md -->
```js
var number = 5;
var obj = {
  number: 3,
  fn1:(function() {
    var number;
    this.number *= 2; //10
    number = number * 2; //NaN
    number = 3; //3
    console.log(this);
    return function(){
      var num = this.number;
      this.number *= 2; //20
      console.log(num); //10
      number *= 3;
      console.log(number); //9
    }
  })()
}
var fn1 = obj.fn1;
fn1.call(null)
obj.fn1();
console.log(window.number);
//10
//9
//3
//27
//20
```