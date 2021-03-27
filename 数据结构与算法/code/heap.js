// 最大堆
class MaxHeap {
  constructor(arr = []) {
    // 元素数组
    this.container = [];
    // 调用自身的添加方法
    if (Array.isArray(arr)) {
      arr.forEach(this.insert.bind(this));
    }
  }

  // 添加元素
  insert(data) {
    const { container } = this;
    container.push(data);
    let index = container.length - 1;
    while (index) {
      // 父节点下标
      let parent = Math.floor((index - 1) / 2);
      // 是否需要替换
      if (container[index] <= container[parent]) {
        break;
      }
      // 交换节点
      swap(container, index, parent);
      // 继续往上对比
      index = parent;
    }
  }

  // 取出堆顶
  extract() {
    const { container } = this;
    if(!container.length){
      return null;
    }
    swap(container, 0 , container.length - 1);
    const res = container.pop();
    const length = container.length;
    let index = 0, exchange = index * 2 + 1;
    while(exchange < length){
      // 右边有没有节点，有的话就进行大小比较
      let right = index * 2 + 2;
      if(right < length  && container[right] > container[exchange]){
        exchange = right;
      }
      if(container[exchange] <= container[index]){
        return ;
      }
      swap(container, exchange, index);
      index = exchange;
      exchange = index * 2 + 1;
    }
    return res;
  }

  // 获取最大值
  top(){
    if(this.container.length)return this.container[0];
    return null;
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}