## OJ形式的牛客网怎么做题

### 1. A+B
> [牛客网地址](https://www.nowcoder.com/questionTerminal/dae9959d6df7466d9a1f6d70d6a11417)
```js
// 输入 
// 1 5
// 输出
// 6
while(line=readline()){
  var lines = line.split(' ');
  var a = parseInt(lines[0]);
  var b = parseInt(lines[1]);
  print(a+b);
}
```

### 2. 判断子序列
> [牛客网地址](https://www.nowcoder.com/question/next?pid=27977350&qid=1262838&tid=42500336)
```js
// 输入
// abc
// abcedf
// 输出
// true
const s = readline();
const t = readline();
let sLen = s.length, tLen = t.length;
let i = j = 0;
while(i < sLen && j < tLen){
  if(s[i] == t[j]){
    i++;
  }
  j++;
}
// 最后索引到了s的长度 就是每一个都找到对应的了 就是子序列了
print(i == sLen);
```