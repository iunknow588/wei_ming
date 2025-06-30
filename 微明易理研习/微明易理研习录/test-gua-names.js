// 测试64卦名称数组的重构
const { GUA_NAMES } = require('./utils/gua-utils.js');

console.log('=== 测试64卦名称数组重构 ===');

// 测试数组长度
console.log('数组长度:', GUA_NAMES.length);
console.log('期望长度: 64');

// 测试前几个卦名
console.log('前8个卦名:', GUA_NAMES.slice(0, 8));
console.log('期望结果: [\'乾\', \'坤\', \'屯\', \'蒙\', \'需\', \'讼\', \'师\', \'比\']');

// 测试后几个卦名
console.log('后8个卦名:', GUA_NAMES.slice(-8));
console.log('期望结果: [\'巽\', \'兑\', \'涣\', \'节\', \'中孚\', \'小过\', \'既济\', \'未济\']');

// 测试特定索引
console.log('第1卦:', GUA_NAMES[0]); // 乾
console.log('第64卦:', GUA_NAMES[63]); // 未济

// 测试边界情况
console.log('索引-1:', GUA_NAMES[-1]); // undefined
console.log('索引64:', GUA_NAMES[64]); // undefined

console.log('=== 测试完成 ==='); 