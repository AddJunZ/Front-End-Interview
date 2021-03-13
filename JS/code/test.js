function Person() {
  this.name = 'AddJunZ';
  this.age = 22;
}
Person.prototype.getName = function() {
  console.log(this.name);
}
const p = new Person();
p.getName();