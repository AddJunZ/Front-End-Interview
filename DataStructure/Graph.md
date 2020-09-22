<!-- Graph.md -->
## 图
> [代码参考](https://github.com/AddJunZ/Front-End/blob/master/DataStructure/code/graph.js)
### 一、图的基本概念

1. 图是一组由边连接的顶点，任何二元关系都可以用图表示。一个图G=(V,E)，V是一组顶点，E是一组边，连接V中的顶点。
2. 由一条边连接在一起的顶点称为**相邻顶点**
3. 一个顶点的**度**取决于其相邻顶点的数量

### 二、图的实现
##### 1. 表示顶点
```js
/*
  Vertex 类有两个数据成员：
  一个用于标识顶点
  另一个是表明这个顶点是否被访问过的布尔值
  它们分别被命名为 label 和 wasVisited
*/
class Vertex{
  constructor(label){
    this.label = label;
  }
}
```
##### 2. 具体实现
```js
class Graph{
  constructor(v){
    this.vertices = v;
    this.edges = 0;
    this.adj = [];//图的邻接矩阵（二维数组）
    this.mark = [];//顶点是否被访问过（一维数组）
  }

  //初始化
  init(){
    for (let i = 0; i < this.vertices; i++) {
      //对所有顶点的邻接数组进行初始化
      this.adj[i] = [];
      //所有顶点都没有被访问过
      this.mark[i] = false;
    }
  }

  //将所有顶点重置为未访问
  clear(){
    for (let i = 0; i < this.vertices; i++) {
      //所有顶点都没有被访问过
      this.mark[i] = false;
    }
  }

  // 两个顶点加边
  addEdge(v,w){
    // 加边后，两个顶点对应的邻接数组的对应位置存有另一端的顶点信息
    this.adj[v].push(w);
    this.adj[w].push(v);
    // 图的总边数增加
    this.edges++;
  }

  //通过打印所有顶点及其相邻顶点列表来展示图
  showGraph(){
    //遍历所有顶点
    for(let i = 0; i < this.vertices; i++){
      let item = i + ' -> ';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] != undefined) {
          item += this.adj[i][j] + '  ';
        }
      }
      console.log(item+'\n');
    }
  }

  //深度优先搜索（DFS）
  dfs(v){
    //code...
  }

  //广度优先搜索（BFS）
  bfs(v){
    //code...
  }
}
var graph = new Graph(7);
graph.init();
graph.addEdge(0,1);
graph.addEdge(0,2);
graph.addEdge(0,3);
graph.addEdge(1,4);
graph.addEdge(4,2);
graph.addEdge(5,3);
graph.addEdge(6,3);
graph.showGraph();
// 0 -> 1  2  3
// 1 -> 0  4
// 2 -> 0  4
// 3 -> 0  5  6
// 4 -> 1  2
// 5 -> 3
// 6 -> 3
```
### 三、图的搜索
##### 1. 深度优先搜索（DFS）
> 深度优先搜索包括从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯， 继续追溯下一条路径，直到到达最后的顶点，如此往复，直到没有路径为止。这不是在搜索特定的路径，而是通过搜索来查看在图中**有哪些路径可以选择**。使用递归
```js
//dfs搜索某个顶点
dfs(v){
  //已访问v顶点
  this.mark[v] = true;
  console.log('visiting ' + v);
  this.adj[v].forEach(x=>{
    // 如果邻接数组中有未访问的顶点，则对他进行深度有限搜索
    if(!this.mark[x]){
      this.dfs(x);
    }
  })
}
graph.dfs(0);
// visiting 0
// visiting 1
// visiting 4
// visiting 2
// visiting 3
// visiting 5
// visiting 6
```
![image](https://github.com/AddJunZ/Front-End/blob/master/img/graph1.png)

##### 2. 广度优先搜索（BFS）
> 广度优先搜索从第一个顶点开始，尝试访问**尽可能靠近**它的顶点。本质上，这种搜索在图上是**逐层移动**的，首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。广度优先搜索算法使用了抽象的**队列**而不是数组来对已访问过的顶点进行排序，不使用递归，思路步骤如下
1. 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中
2. 从图中取出下一个顶点v，添加到已访问的顶点列表；
3. 将所有与v相邻的未访问顶点添加到队列
```js
bfs(v){
  //已访问v顶点
  this.mark[v] = true;
  var queue = [];
  //将v添加到队尾
  queue.push(v);
  while(queue.length > 0){
    //取队列首元素
    var t = queue.shift();
    //不能写成t因为有“0”这个节点:satisfied:
    if(t != undefined){
      console.log('visiting ' + t);
    }
    this.adj[t].forEach(x=>{
      //对队列首元素的邻接数组进行遍历
      if(!this.mark[x]){
        this.mark[x] = true;
        queue.push(x);
      }
    })
  }
}
graph.dfs(0);
// visiting 0
// visiting 1
// visiting 2
// visiting 3
// visiting 4
// visiting 5
// visiting 6
```

### 广度优先搜索最短路径
确定路径，需要有一个数组保存一个顶点到下一个顶点的所有边
```js
//改进后的bfs算法
constructor(){
  //code...
  //保存从一个顶点到下一个顶点的所有边
  this.edgeTo = [];
}
bfs(v){
  //code...
  if(!this.mark[x]){
    this.mark[x] = true;
    this.edgeTo[x] = t;
    queue.push(x);
  }
}

//创建一个栈用来存储与指定顶点有共同边的所有顶点，展示从v节点到w节点的最短路径？最短？
path(v,w){
  this.bfs(v);
  console.log(this.edgeTo);
  let line = [];
  //从目的顶点反推
  for(let i = w; i != v; i = this.edgeTo[i]){
    line.push(i);
  }
  line.push(v);
  //逆转数组并输出
  console.log('The path is ' + line.reverse().join(' -> '));
}
```

### 拓扑算法
```js

```
