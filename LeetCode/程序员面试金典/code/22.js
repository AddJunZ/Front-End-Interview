// 栈排序

var SortedStack = function() {
  this.stack = [];
  this.helpStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */

// 1. 
// 通过使用一个辅助栈
// 每次push都把顶部的小于val的数暂存
// 再把辅助栈的数字放回主栈内
SortedStack.prototype.push = function(val) {
  if(this.stack.length === 0){
    this.stack.unshift(val);
    return ;
  }
  while(this.stack.length && this.stack[0] < val){
    this.helpStack.unshift(this.stack.shift())
  }
  this.helpStack.unshift(val);
  while(this.helpStack.length){
    this.stack.unshift(this.helpStack.shift());
  }
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
  this.stack.shift();
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
  if(this.stack.length){
    return this.stack[0];
  }
  return -1;
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
  return this.stack.length === 0;
};

/**
 * Your SortedStack object will be instantiated and called as such:
 * var obj = new SortedStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.isEmpty()
 */


// 2. 不需要倒回来的做法
// 辅助栈直接存储作为从大到小部分值的存储

var SortedStack = function() {
  this.smallToBigStack = []; // 主栈
  this.bigToSmallStack = []; // 辅助栈
};

/** 
 * @param {number} val
 * @return {void}
 */
SortedStack.prototype.push = function(val) {
  while(this.bigToSmallStack.length > 0 && this.bigToSmallStack[0] > val){
    this.smallToBigStack.unshift(this.bigToSmallStack.shift());
  }
  while(this.smallToBigStack.length > 0 && this.smallToBigStack[0] < val){
    this.bigToSmallStack.unshift(this.smallToBigStack.shift());
  }
  this.smallToBigStack.unshift(val);
};

/**
 * @return {void}
 */
SortedStack.prototype.pop = function() {
  // 情况辅助栈
  while(this.bigToSmallStack.length > 0){
    this.smallToBigStack.unshift(this.bigToSmallStack.shift());
  }
  if(this.smallToBigStack.length > 0)this.smallToBigStack.shift();
};

/**
 * @return {number}
 */
SortedStack.prototype.peek = function() {
  // 情况辅助栈
  while(this.bigToSmallStack.length > 0){
    this.smallToBigStack.unshift(this.bigToSmallStack.shift());
  }
  if(this.smallToBigStack.length > 0){
    return this.smallToBigStack[0]
  }else{
    return -1;
  }
};

/**
 * @return {boolean}
 */
SortedStack.prototype.isEmpty = function() {
  return !this.smallToBigStack.length && !this.bigToSmallStack.length;
};