// 栈的最小值
// 使用一个辅助栈来存储每次添加元素进来后的栈最小值
// 当推出栈的时候，最小值辅助栈同样推出一个元素
// 即可达到同步更新
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.helpMinStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  if(this.helpMinStack.length === 0){
    this.helpMinStack.push(x);
  }else{
    this.helpMinStack.push(Math.min(x, this.helpMinStack[this.helpMinStack.length - 1]));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop();
  this.helpMinStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length -1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.helpMinStack[this.helpMinStack.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */