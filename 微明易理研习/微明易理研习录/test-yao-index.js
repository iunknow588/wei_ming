// 测试修改后的yaoIndex.js
const { getGuaDetail } = require('./data/yaoIndex.js');

console.log('=== 测试修改后的yaoIndex.js ===');

// 测试第1卦（索引0）
console.log('测试第1卦（索引0）:');
const gua1 = getGuaDetail(0);
if (gua1) {
  console.log('✅ 第1卦加载成功:', {
    gua_name: gua1.gua_name,
    gua_ci: gua1.gua_ci,
    yao_count: gua1.yao?.length || 0
  });
} else {
  console.log('❌ 第1卦加载失败');
}

// 测试第2卦（索引1）
console.log('\n测试第2卦（索引1）:');
const gua2 = getGuaDetail(1);
if (gua2) {
  console.log('✅ 第2卦加载成功:', {
    gua_name: gua2.gua_name,
    gua_ci: gua2.gua_ci,
    yao_count: gua2.yao?.length || 0
  });
} else {
  console.log('❌ 第2卦加载失败');
}

// 测试第64卦（索引63）
console.log('\n测试第64卦（索引63）:');
const gua64 = getGuaDetail(63);
if (gua64) {
  console.log('✅ 第64卦加载成功:', {
    gua_name: gua64.gua_name,
    gua_ci: gua64.gua_ci,
    yao_count: gua64.yao?.length || 0
  });
} else {
  console.log('❌ 第64卦加载失败');
}

console.log('\n=== 测试完成 ==='); 