## npm

### 1. package.json中的script
是作为命令行的alias，针对```&```和```&&```的区别
```js
// package.json
{
  "scripts" : {
    // & 代表指令并行执行
    "[指令1] & [指令二]",
    // && 代表指令串行执行 前一个执行完才会执行后一个
    "[指令1] && [指令二]",
  }
  "sc"
}
```