// 动物收容所
// 1.
// 直接用一个数组存储
// 每次都遍历数组，至于是否要猫和狗就遍历的时候判断一下
var AnimalShelf = function() {
  this.stack = [];
};

/** 
 * @param {number[]} animal
 * @return {void}
 */
AnimalShelf.prototype.enqueue = function(animal) {
  this.stack.push(animal);
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueAny = function() {
  return this.stack.length > 0 ? this.stack.shift() : [-1, -1];
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueDog = function() {
  for(let i = 0; i < this.stack.length; i++){
    if(this.stack[i][1] == 1){
      let t = this.stack.splice(i, 1);
      return t[0]
    }
  }
  return [-1, -1]
};

/**
 * @return {number[]}
 */
AnimalShelf.prototype.dequeueCat = function() {
  for(let i = 0; i < this.stack.length; i++){
    if(this.stack[i][1] == 0){
      let t = this.stack.splice(i, 1);
      return t[0]
    }
  }
  return [-1, -1]
};

/**
 * Your AnimalShelf object will be instantiated and called as such:
 * var obj = new AnimalShelf()
 * obj.enqueue(animal)
 * var param_2 = obj.dequeueAny()
 * var param_3 = obj.dequeueDog()
 * var param_4 = obj.dequeueCat()
 */