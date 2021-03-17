function test(a,b) {
  console.log(b)
  return {
    test:function(c){
      return test(c,a);
    }
  };
}
var retA = test(0); // undefined
retA.test(2);// 0
 retA.test(4);// 0
 retA.test(8);// 0
var retB = test(0).test(2).test(4).test(8);// undefined 0 2 4
var retC = test('good').test('bad'); // undefined good 
retC.test('good');// bad
 retC.test('bad');// bad