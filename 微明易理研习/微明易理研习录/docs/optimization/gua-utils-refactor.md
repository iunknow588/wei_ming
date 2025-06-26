# 卦象工具模块重构文档

## 问题描述

在代码审查中发现，`getGuaContent` 方法在多个页面中重复出现，功能完全相同：

- `pages/result-analysis/result-analysis.js`
- `pages/coin-divination/coin-divination.js` 
- `pages/practice/practice.js`

同时，还有其他相关的卦象处理方法也存在重复：
- `findGuaName` - 根据爻象数组查找卦名
- `analyzeInterpretationMethod` - 分析解读方法
- `findGuaInfoByName` - 根据卦名查找卦信息
- `baguaNameToNumber` - 八卦名转数字
- `baguaToYao` - 八卦数转爻数组
- `calculateHighlightInfo` - 计算高亮信息

## 解决方案

### 1. 创建统一工具模块

创建了 `utils/gua-utils.js` 文件，封装所有卦象相关的工具方法：

```javascript
// 卦象数据工具模块
const { sixtyFourGuaData, getGuaData } = require('../data/sixtyFourGua.js');

// 导出的方法：
- getGuaContent(guaIndex) - 获取卦辞和爻辞
- findGuaName(yaoArray) - 根据爻象数组查找卦名
- findGuaInfoByName(guaName) - 根据卦名查找卦信息
- baguaNameToNumber(baguaName) - 八卦名转数字
- baguaToYao(baguaNumber) - 八卦数转爻数组
- calculateHighlightInfo(bian) - 计算高亮信息
- analyzeInterpretationMethod(yaoResults, originalGuaName, changedGuaName) - 分析解读方法
```

### 2. 重构现有页面

更新了以下页面，使用新的工具模块：

#### result-analysis.js
- 移除了重复的方法定义
- 引入工具模块中的方法
- 简化了代码结构

#### coin-divination.js
- 移除了重复的方法定义
- 使用工具模块中的方法
- 保持了原有的功能逻辑

#### practice.js
- 移除了重复的方法定义
- 使用工具模块中的方法
- 简化了代码结构

## 重构效果

### 代码重复消除
- 消除了约 200 行重复代码
- 统一了方法实现，确保功能一致性

### 维护性提升
- 集中管理卦象相关逻辑
- 修改时只需在一个地方更新
- 降低了代码维护成本

### 功能增强
- 统一了方法命名和参数
- 添加了完整的 JSDoc 注释
- 提供了更好的类型提示

## 使用方式

### 引入工具模块
```javascript
const { 
  getGuaContent, 
  findGuaName, 
  analyzeInterpretationMethod 
} = require('../../utils/gua-utils.js');
```

### 使用工具方法
```javascript
// 获取卦象内容
const guaContent = getGuaContent(guaIndex);

// 查找卦名
const guaInfo = findGuaName(yaoArray);

// 分析解读方法
const method = analyzeInterpretationMethod(yaoResults, originalGuaName, changedGuaName);
```

## 注意事项

1. **向后兼容性**：工具模块的方法签名与原方法保持一致，确保现有代码无需修改调用方式

2. **性能考虑**：工具方法都是纯函数，没有副作用，可以安全地重复调用

3. **扩展性**：未来如果需要添加新的卦象相关功能，可以直接在工具模块中添加

## 后续优化建议

1. **类型定义**：可以考虑添加 TypeScript 类型定义，提供更好的开发体验

2. **单元测试**：为工具模块添加单元测试，确保功能正确性

3. **缓存机制**：对于频繁调用的方法，可以考虑添加缓存机制

4. **错误处理**：增强错误处理机制，提供更友好的错误信息 