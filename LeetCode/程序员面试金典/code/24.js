// 节点间通路
/**
 * @param {number} n
 * @param {number[][]} graph
 * @param {number} start
 * @param {number} target
 * @return {boolean}
 */
// emm 不想用图做 太麻烦了 后面再补？
var findWhetherExistsPath = function(n, graph, start, target) {
  if(start === target)return true;
  let count = 1, hash = new Set([start]);
  while(true){
    for(let item of graph){
      if(hash.has(item[0])){
        if(item[1] === target)return true;
        hash.add(item[1]);
      }
    }
    if(hash.size > count){
      count = hash.size
    }else{
      return false
    }
  }
};