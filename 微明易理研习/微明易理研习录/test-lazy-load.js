/**
 * 测试延时加载功能
 */

// 测试 generateTimeBasedRandom 随机性
function testGenerateTimeBasedRandom() {
  const { generateTimeBasedRandom } = require('./pages/coin-divination/coin-divination.js');
  const count = 100;
  const results = Array(8).fill(0);
  for (let i = 0; i < count; i++) {
    const value = generateTimeBasedRandom();
    if (value >= 0 && value < 8) {
      results[value]++;
    } else {
      console.log('超出范围:', value);
    }
  }
  console.log('100次结果分布:', results);
}

testGenerateTimeBasedRandom(); 