# Result Analysis 页面优化

## 优化目标

简化 `result-analysis.js` 页面，只接收一个包含六个爻值的数组，通过工具函数自动计算所有其他信息。

## 优化内容

### 1. 核心工具函数

在 `utils/gua-utils.js` 中的 `generateCompleteGuaResult(yaoValues)` 函数：

```js
/**
 * 从爻值数组生成完整的卦象结果数据
 * @param {Array} yaoValues - 爻值数组（6个元素，值为6,7,8,9）
 * @returns {Object} 完整的卦象结果数据
 */
function generateCompleteGuaResult(yaoValues) {
  // 构建标准的yaoResults格式
  const yaoResults = yaoValues.map((value, index) => {
    let type = '';
    let symbol = '';
    let desc = '';
    
    if (value === 9) { type = 'laoyang'; symbol = 'O—'; desc = '老阳（变爻）'; }
    else if (value === 6) { type = 'laoyin'; symbol = 'X--'; desc = '老阴（变爻）'; }
    else if (value === 7) { type = 'shao-yang'; symbol = '—'; desc = '少阳'; }
    else if (value === 8) { type = 'shao-yin'; symbol = '--'; desc = '少阴'; }
    
    return {
      isEmpty: false,
      number: 6 - index,
      result: { value, type, symbol, desc, coinFaces: [], coinStatusText: '' }
    };
  });

  // 构建本卦和变卦
  const originalGua = buildOriginalGua(yaoResults);
  const changedGua = buildChangedGua(yaoResults);
  
  // 构建变爻数组
  const bian = yaoValues.map(value => value === 6 || value === 9);
  
  // 查找卦名
  const originalGuaInfo = findGuaName(originalGua);
  const changedGuaInfo = findGuaName(changedGua);
  
  // 获取卦辞和爻辞
  const originalGuaContent = getGuaData(originalGuaInfo.index);
  const changedGuaContent = getGuaData(changedGuaInfo.index);
  
  // 分析解读方法
  const interpretationMethod = analyzeInterpretationMethod(yaoResults, originalGuaInfo.name, changedGuaInfo.name);
  
  // 构建详情数据
  const originalGuaDetail = yaoResults.map(yao => {
    if (!yao.result) return { type: '', symbol: '', isBian: false };
    let isBian = yao.result.value === 6 || yao.result.value === 9;
    return {
      type: yao.result.type,
      symbol: yao.result.symbol,
      isBian,
      value: yao.result.value
    };
  });
  
  const changedGuaDetail = yaoResults.map(yao => {
    if (!yao.result) return { type: '', symbol: '', isBian: false };
    let isBian = yao.result.value === 6 || yao.result.value === 9;
    let value = yao.result.value;
    let type = '';
    let symbol = '';
    // 变卦变爻只高亮，不用特殊符号
    if (value === 9 || value === 8) { type = 'shao-yin'; symbol = '--'; }
    else if (value === 6 || value === 7) { type = 'shao-yang'; symbol = '—'; }
    return { type, symbol, isBian, value };
  });

  return {
    yaoResults,
    originalGua,
    changedGua,
    bian,
    originalGuaName: originalGuaInfo.name,
    changedGuaName: changedGuaInfo.name,
    originalGuaInfo: originalGuaContent,
    changedGuaInfo: changedGuaContent,
    interpretationMethod,
    originalGuaDetail,
    changedGuaDetail,
    currentRound: 6,
    totalRounds: 6
  };
}
```

### 2. 简化的 onLoad 方法

`result-analysis.js` 的 `onLoad` 方法现在只支持一种方式：

```js
onLoad(options) {
  try {
    // 从爻值数组生成完整结果数据
    if (options.yaoValues) {
      const yaoValues = JSON.parse(decodeURIComponent(options.yaoValues));
      console.log('从爻值数组生成结果:', yaoValues);
      
      if (Array.isArray(yaoValues) && yaoValues.length === 6) {
        const resultData = generateCompleteGuaResult(yaoValues);
        this.processResultData(resultData);
        return;
      }
    }
    
    console.error('无效的爻值数组参数');
  } catch (e) {
    console.error('结果解析页面参数解析失败', e, options);
  }
}
```

### 3. 统一的调用方式

所有页面都使用相同的简化方式：

```js
// 提取爻值数组
const yaoValues = [9, 7, 8, 6, 7, 8]; // 示例爻值数组

// 跳转到结果解析页面
const params = {
  yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
};
const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');

tt.navigateTo({
  url: `/pages/result-analysis/result-analysis?${query}`
});
```

## 使用示例

### 1. 铜钱起卦页面
```js
onResultAnalysis() {
  // 提取爻值数组
  const yaoValues = this.data.yaoResults.map(yao => yao.result ? yao.result.value : 7);
  
  // 跳转到结果解析页面
  const params = {
    yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
  };
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  
  tt.navigateTo({
    url: `/pages/result-analysis/result-analysis?${query}`
  });
}
```

### 2. 时间起卦页面
```js
onResultAnalysis() {
  // 假设从时间计算得到爻值数组
  const yaoValues = [7, 8, 9, 6, 7, 8];
  
  const params = {
    yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
  };
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  
  tt.navigateTo({
    url: `/pages/result-analysis/result-analysis?${query}`
  });
}
```

### 3. 数字起卦页面
```js
onResultAnalysis() {
  // 假设从数字计算得到爻值数组
  const yaoValues = [8, 7, 9, 6, 8, 7];
  
  const params = {
    yaoValues: encodeURIComponent(JSON.stringify(yaoValues))
  };
  const query = Object.keys(params).map(k => `${k}=${params[k]}`).join('&');
  
  tt.navigateTo({
    url: `/pages/result-analysis/result-analysis?${query}`
  });
}
```

## 优势

1. **极简参数传递**：只需要传递一个爻值数组
2. **自动计算所有信息**：通过工具函数自动生成本卦、变卦、卦名、解读方法等
3. **统一调用方式**：所有起卦页面都使用相同的调用方式
4. **代码复用**：工具函数可以在任何地方复用
5. **维护性提升**：逻辑集中在工具函数中，便于维护和扩展
6. **代码简洁**：页面代码大幅简化，从 209 行减少到约 50 行

## 爻值说明

- `6`：老阴（变爻）
- `7`：少阳
- `8`：少阴
- `9`：老阳（变爻）

## 注意事项

1. 爻值数组必须包含6个元素
2. 每个元素的值必须是6、7、8、9中的一个
3. 数组顺序从下往上（初爻到上爻）
4. 工具函数会自动处理所有边界情况和错误情况
5. 后续所有开发都使用这种简化的爻值数组方式 