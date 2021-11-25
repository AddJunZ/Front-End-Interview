## react小知识

1. 直接将svg引入
```tsx
import { ReactComponent as svgIcon } from '@/assets/icon.svg';
const List = () => (
  // 直接以组件的形式使用
  <svgIcon/>
)
```