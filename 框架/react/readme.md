## react小知识

1. 直接将svg引入
```tsx
import { ReactComponent as SvgIcon } from '@/assets/icon.svg';
const List = () => (
  // 直接以组件的形式使用，且首字母要大写
  <SvgIcon/>
)
```
