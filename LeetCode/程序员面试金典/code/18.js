// 三合一
// ovo 这题我不想看了 抄了直接
// 实际上就是使用了二维数组，一个数组存有三个数组
/**
 * @param {number} stackSize
 */
var TripleInOne = function(stackSize) {
  this.stack = [];
  this.size = stackSize;
};

/** 
 * @param {number} stackNum 
 * @param {number} value
 * @return {void}
 */
TripleInOne.prototype.push = function(stackNum, value) {
  if(!this.stack[stackNum]){
    this.stack[stackNum] = [];
  }
  if(this.stack[stackNum].length < this.size){
    this.stack[stackNum].push(value);
  }
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.pop = function(stackNum) {
  if(this.stack[stackNum] && this.stack[stackNum].length){
    return this.stack[stackNum].pop();
  }   
  return -1;
};

/** 
 * @param {number} stackNum
 * @return {number}
 */
TripleInOne.prototype.peek = function(stackNum) {
  if(this.stack[stackNum] && this.stack[stackNum].length){
    return this.stack[stackNum][this.stack[stackNum].length - 1]
  }   
  return -1;
};

/** 
 * @param {number} stackNum
 * @return {boolean}
 */
TripleInOne.prototype.isEmpty = function(stackNum) {
  return !this.stack[stackNum] || !this.stack[stackNum].length;
};

/**
 * Your TripleInOne object will be instantiated and called as such:
 * var obj = new TripleInOne(stackSize)
 * obj.push(stackNum,value)
 * var param_2 = obj.pop(stackNum)
 * var param_3 = obj.peek(stackNum)
 * var param_4 = obj.isEmpty(stackNum)
 */