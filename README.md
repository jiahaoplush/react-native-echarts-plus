# react-native-echarts-plus

## 说明
#### 1. 目前仅针对iOS端完成测试，Android端理论可用但有bug
#### 2. 地图功能目前仅可使用geoJson加载矢量地图，百度地图暂未引入
#### 3. 画布默认占据页面剩余所有空间，支持横竖屏自动resize
#### 4. setState即可触发echarts渲染，会根据option是否变化判断是否触发渲染

## 安装
```bash
npm install react-native-echarts-plus react-native-webview
react-native link react-native-webview
```

## 引用
```javascript
import { Echarts, echarts } from 'react-native-echarts-plus';
```

## 使用
```javascript
<Echarts option={{}} />
```

## 属性
| 属性             | 数据类型          | 默认值            | 备注                   |
| --------------- | ---------------- | ---------------- | --------------------- |
| option          | obj              | null             | echarts配置项，必传参数  |
| backgroundColor | string           | 'rgba(0,0,0,0)'  | 画布背景色 |
| width           | number / string  | 'auto'           | 画布宽度  |
| height          | number / string  | '100%'           | 画布高度  |
| onPress         | func             | (e)=>{}          | 点击事件  |
| geo             | array            | null             | 使用geoJson加载矢量地图，数组中两个参数：mapName geoJson  |

## 版本
#### 1.0.2  更新README
#### 1.0.1  上传基础组件和功能代码
#### 1.0.0  初始化npm项目