type RequestParams = {
  name: string;
  age: number;
}
type RequestKeys = keyof RequestParams;
type RequestOnlyName = Pick<RequestParams, 'name'>
type Age = Exclude<RequestKeys, 'name'>
type AnimalType = RequestParams & { type: string };
const params1: RequestParams = { name: 'AddJunZ', age: 21 }; // 默认需要带上所有参数
const params2: Partial<RequestParams> = { name: 'AddJunZ' }; // 可以包含任何的参数字段
const params3: Omit<RequestParams, 'name'> = { age: 21 }; // 在原来的类型除去某个字段
const params4: AnimalType = { name: 'hello', age: 10, type: 'world' };