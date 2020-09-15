// 堆盘子
// 实现一个栈数组。每个栈的大小有限制
// 要求对栈数组的操作如同只有一个栈的效果
/**
 * @param {number} cap 每个栈的容量
 */
var StackOfPlates = function(cap) {
  this.cap = cap;
  this.stackList = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
StackOfPlates.prototype.push = function(val) {
  if(this.cap <= 0)return ;
  // 如果还有位置
  if(this.stackList.length > 0 && this.stackList[this.stackList.length - 1].length < this.cap){
    this.stackList[this.stackList.length - 1].push(val);
  }else{
    this.stackList.push([val]);
  }
};

/**
 * @return {number}
 */
StackOfPlates.prototype.pop = function() {
  if(this.stackList.length > 0 && this.stackList[this.stackList.length - 1].length === 1){
    let endArr = this.stackList.pop();
    return endArr.pop();
  }else{
    return this.stackList.length > 0 ? 
      this.stackList[this.stackList.length - 1].pop() :
      -1;
  }
};

/** 
 * @param {number} index
 * @return {number}
 */
StackOfPlates.prototype.popAt = function(index) {
  if(!this.stackList[index])return -1;
  if(this.stackList[index].length === 1){
    return this.stackList.splice(index, 1);
  }else{
    return this.stackList[index].pop();
  }
};

/**
 * Your StackOfPlates object will be instantiated and called as such:
 * var obj = new StackOfPlates(cap)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAt(index)
 */