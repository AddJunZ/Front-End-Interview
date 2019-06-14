<!-- 奇形怪状的JS题.md -->
```js
var number = 5;
var obj = {
	number: 3,
	fn1:(function() {
		var number;
		this.number *= 2;//6
		number = number * 2;//undefine
		number = 3;//3
		return function(){
			var num = this.number;
			this.number *= 2;
			console.log(num);
			number *= 3;
			console.log(number);
		}
	})()
}
var fn1 = obj.fn1;
fn1.call(null)
obj.fn1();
console.log(global.number);
```