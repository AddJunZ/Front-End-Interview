// 化栈为队
/**
 * Initialize your data structure here.
 */
// 使用一个栈作为输入栈
// 一个栈作为输出栈
// 输入栈转换到输出栈的时候 元素的顺序就会调换
// 从而实现队列的效果
// 每次只有输出栈没有内容时候 才会将输入栈的内容转换到输出栈中
// 从而减少转换次数
var MyQueue = function() {
  this.inputStack = [];
  this.outputStack = [];
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.inputStack.unshift(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if(this.outputStack.length > 0){
    return this.outputStack.shift();
  }else{
    while(this.inputStack.length > 0){
      this.outputStack.unshift(this.inputStack.shift());
    }
    return this.outputStack.shift();
  }
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if(this.outputStack.length > 0){
    return this.outputStack[0];
  }else{
    return this.inputStack[this.inputStack.length - 1]
  }
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return !this.inputStack.length && !this.outputStack.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */