<!-- Graph.md -->
## 图
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
  bsf(v){
    //code...
  }
}
```
### 三、图的搜索
##### 1. 深度优先搜索（DFS）
> 深度优先搜索包括从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯， 继续追溯下一条路径，直到到达最后的顶点，如此往复，直到没有路径为止。这不是在搜索特定的路径，而是通过搜索来查看在图中**有哪些路径可以选择**
```js
//dfs搜索某个顶点
dfs(v){
  //已访问v顶点
  this.mark[v] = true;
  console.log('visiting ' + v);
  this.adj[v].forEach(x=>{
    if(!this.mark[x]){
      this.dfs(x);
    }
  })
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
graph.dfs(0);
// 0 -> 1  2  3
// 1 -> 0  4
// 2 -> 0  4
// 3 -> 0  5  6
// 4 -> 1  2
// 5 -> 3
// 6 -> 3

// visiting 0
// visiting 1
// visiting 4
// visiting 2
// visiting 3
// visiting 5
// visiting 6
```
![image](https://github.com/AddJunZ/Front-End/blob/master/img/graph1.jpg)

##### 2. 广度优先搜索（BFS）
> 广度优先搜索从第一个顶点开始，尝试访问**尽可能靠近**它的顶点。本质上，这种搜索在图上是**逐层移动**的，首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。广度优先搜索算法使用了抽象的**队列**而不是数组来对已访问过的顶点进行排序，思路步骤如下
1. 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中
2. 从图中取出下一个顶点v，添加到已访问的顶点列表；
3. 将所有与v相邻的未访问顶点添加到队列
```js
bsf(v){
  //已访问v顶点
  this.mark[v] = true;  
  var queue = [];
  queue.push(v);
  this.adj[v].forEach(x=>{
    
  })

}
```