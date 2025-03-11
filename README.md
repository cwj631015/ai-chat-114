# Learn React States

# [https://bit.ly/ntu-ai-web-3](https://bit.ly/ntu-ai-web-3)

## 如何啟動專案

1. 安裝必要模組

```shell
npm i
```

2. 啟動開發伺服器

```shell
npm run dev
```

3. 前往 [http://localhost:3000](http://localhost:3000)

## 如何為元件加入狀態

1. 引入 useState hook

```jsx
import { useState } from 'react';
```

2. 在元件中透過 useState 定義狀態

```jsx
export default function 元件名稱() {
    const [狀態名稱, 用於更新狀態的函式] = useState(初始值);
    // ...
}
```