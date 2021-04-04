function GodMan(name) {
  Promise.resolve().then(() => {
    console.log(`I am ${name}`);
  })
  const obj = {
    name
  };
  obj.__proto__ = GodMan.prototype;
  return obj;
}

GodMan.prototype.learn = function (subject) {
  setTimeout(() => {
    console.log(`Learning ${subject}`);
  })
  return this;
}

GodMan.prototype.rest = function (second) {
  setTimeout(() => {
    let pre = new Date().getTime();
    while (new Date().getTime() - pre < second * 1000) {
      continue;
    }
    console.log(`Start learning after ${second} seconds`);
  });
  return this;
}

GodMan.prototype.restFirst = function (second) {
  let pre = new Date().getTime();
  while (new Date().getTime() - pre < second * 1000) {
    continue;
  }
  console.log(`Start learning after ${second} seconds`);
  return this;
}

// GodMan("jack")
// GodMan("jack").rest(3).learn("computer")
GodMan("jack").restFirst(3).learn("chinese").rest(5).learn("english")