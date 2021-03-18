class Graph{
  constructor(v){
    this.vertices = v;
    this.edges = 0;
    this.adj = [];//图的邻接矩阵（二维数组）
    this.mark = [];//顶点是否被访问过（一维数组）
    this.edgeTo = [];
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

  // //将所有顶点重置为未访问
  clear(){
    for (let i = 0; i < this.vertices; i++) {
      //所有顶点初始化为没有被访问过
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
    console.log('Painting the graph...')
    for(let i = 0; i < this.vertices; i++){
      let item = i + ' -> ';
      for (let j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] != undefined) {
          item += this.adj[i][j] + '  ';
        }
      }
      console.log(item);
    }
  }

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
  bfs(v){
    //已访问v顶点
    this.mark[v] = true;
    var queue = [];
    //将v添加到队尾
    queue.push(v);
    while(queue.length > 0){
      //取队列首元素
      var t = queue.shift();
      if(t!=undefined){
        console.log('visiting ' + t);
      }
      this.adj[t].forEach(x=>{
        //对队列首元素的邻接数组进行遍历
        if(!this.mark[x]){
          this.edgeTo[x] = t;
          this.mark[x] = true;
          queue.push(x);
        }
      })
    }
  }
  path(v,w){
    this.bfs(v);
    let line = [];
    //从目的顶点反推
    for(let i = w; i != v; i = this.edgeTo[i]){
      line.push(i);
    }
    line.push(v);
    //逆转数组并输出
    console.log('The path is ' + line.reverse().join(' -> '));
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


console.log('dfs Searching...')
graph.dfs(0);
// visiting 0
// visiting 1
// visiting 4
// visiting 2
// visiting 3
// visiting 5
// visiting 6


graph.clear();
console.log('bfs Searching...')
graph.bfs(0);
// visiting 0
// visiting 1
// visiting 4
// visiting 2
// visiting 3
// visiting 5
// visiting 6


graph.clear();
console.log('the shortest line Searching...')
graph.path(4,6);
// The path is 4 -> 1 -> 0 -> 3 -> 6
