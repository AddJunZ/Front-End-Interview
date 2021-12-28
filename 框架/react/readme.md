## react小知识

1. 直接将svg引入，[React中使用svg](https://blog.logrocket.com/how-to-use-svgs-in-react/)
```tsx
// 这种方式只能在 create-react-app 中使用
import { ReactComponent as SvgIcon } from '@/assets/icon.svg';
const List = () => (
  // 直接以组件的形式使用，且首字母要大写
  <SvgIcon/>
)
```
