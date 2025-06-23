// 卦象绘制工具
// 导入基础数据
const { getGuaLines, getGuaComponents } = require('../data/gua-data.js');

/**
 * 绘制卦象到Canvas
 * @param {Canvas} canvas - Canvas对象
 * @param {number} guaIndex - 卦象索引 (0-63)
 * @param {Object} options - 绘制选项
 * @param {number} options.width - 画布宽度
 * @param {number} options.height - 画布高度
 * @param {number} options.lineWidth - 线条宽度
 * @param {string} options.lineColor - 线条颜色
 * @param {string} options.backgroundColor - 背景颜色
 * @param {number} options.padding - 内边距
 */
function drawGuaSymbol(canvas, guaIndex, options = {}) {
  const ctx = canvas.getContext('2d');
  const lines = getGuaLines(guaIndex);
  
  if (!lines) {
    console.error('未找到卦象数据:', guaIndex);
    return;
  }
  
  const {
    width = 120,
    height = 200,
    lineWidth = 8,
    lineColor = '#333',
    backgroundColor = 'transparent',
    padding = 10
  } = options;
  
  // 清空画布
  ctx.clearRect(0, 0, width, height);
  
  // 设置背景
  if (backgroundColor !== 'transparent') {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  // 计算爻线间距
  const lineHeight = (height - padding * 2) / 6;
  const lineSpacing = lineHeight * 0.3;
  
  // 设置线条样式
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  
  // 绘制六爻
  for (let i = 0; i < 6; i++) {
    const y = padding + i * lineHeight + lineHeight / 2;
    const isYang = lines[i] === 1;
    
    if (isYang) {
      // 阳爻：实线
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    } else {
      // 阴爻：两条短线
      const shortLineWidth = (width - padding * 2) / 2 - lineSpacing / 2;
      
      // 左短线
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + shortLineWidth, y);
      ctx.stroke();
      
      // 右短线
      ctx.beginPath();
      ctx.moveTo(width - padding - shortLineWidth, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
  }
}

/**
 * 创建卦象SVG
 * @param {number} guaIndex - 卦象索引 (0-63)
 * @param {Object} options - 绘制选项
 * @param {number} options.width - SVG宽度
 * @param {number} options.height - SVG高度
 * @param {number} options.lineWidth - 线条宽度
 * @param {string} options.lineColor - 线条颜色
 * @param {string} options.backgroundColor - 背景颜色
 * @returns {string} SVG字符串
 */
function createGuaSVG(guaIndex, options = {}) {
  const lines = getGuaLines(guaIndex);
  
  if (!lines) {
    console.error('未找到卦象数据:', guaIndex);
    return '';
  }
  
  const {
    width = 120,
    height = 200,
    lineWidth = 8,
    lineColor = '#333',
    backgroundColor = 'transparent'
  } = options;
  
  const padding = 10;
  const lineHeight = (height - padding * 2) / 6;
  const lineSpacing = lineHeight * 0.3;
  
  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // 背景
  if (backgroundColor !== 'transparent') {
    svgContent += `<rect width="${width}" height="${height}" fill="${backgroundColor}"/>`;
  }
  
  // 绘制六爻
  for (let i = 0; i < 6; i++) {
    const y = padding + i * lineHeight + lineHeight / 2;
    const isYang = lines[i] === 1;
    
    if (isYang) {
      // 阳爻：实线
      svgContent += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="round"/>`;
    } else {
      // 阴爻：两条短线
      const shortLineWidth = (width - padding * 2) / 2 - lineSpacing / 2;
      
      // 左短线
      svgContent += `<line x1="${padding}" y1="${y}" x2="${padding + shortLineWidth}" y2="${y}" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="round"/>`;
      
      // 右短线
      svgContent += `<line x1="${width - padding - shortLineWidth}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="${lineColor}" stroke-width="${lineWidth}" stroke-linecap="round"/>`;
    }
  }
  
  svgContent += '</svg>';
  return svgContent;
}

/**
 * 创建卦象的Base64图片
 * @param {number} guaIndex - 卦象索引 (0-63)
 * @param {Object} options - 绘制选项
 * @returns {Promise<string>} Base64图片字符串
 */
function createGuaBase64(guaIndex, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      // 创建离屏Canvas
      const canvas = tt.createCanvas();
      const { width = 120, height = 200 } = options;
      
      canvas.width = width;
      canvas.height = height;
      
      // 绘制卦象
      drawGuaSymbol(canvas, guaIndex, options);
      
      // 转换为Base64
      tt.canvasToTempFilePath({
        canvas: canvas,
        success: (res) => {
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          reject(err);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 获取卦象的默认样式配置
 * @param {string} theme - 主题 ('light' | 'dark' | 'classic')
 * @returns {Object} 样式配置对象
 */
function getDefaultStyle(theme = 'classic') {
  const styles = {
    light: {
      lineColor: '#333333',
      backgroundColor: '#ffffff',
      lineWidth: 6
    },
    dark: {
      lineColor: '#ffffff',
      backgroundColor: '#333333',
      lineWidth: 6
    },
    classic: {
      lineColor: '#8B4513',
      backgroundColor: '#F5F5DC',
      lineWidth: 8
    }
  };
  
  return styles[theme] || styles.classic;
}

/**
 * 验证卦象索引是否有效
 * @param {number} guaIndex - 卦象索引
 * @returns {boolean} 是否有效
 */
function isValidGuaIndex(guaIndex) {
  return typeof guaIndex === 'number' && guaIndex >= 0 && guaIndex <= 63;
}

/**
 * 获取卦象的绘制信息
 * @param {number} guaIndex - 卦象索引
 * @returns {Object|null} 绘制信息
 */
function getGuaDrawInfo(guaIndex) {
  if (!isValidGuaIndex(guaIndex)) {
    return null;
  }
  
  const lines = getGuaLines(guaIndex);
  if (!lines) {
    return null;
  }
  
  return {
    guaIndex,
    lines,
    yangCount: lines.filter(line => line === 1).length,
    yinCount: lines.filter(line => line === 0).length,
    isAllYang: lines.every(line => line === 1),
    isAllYin: lines.every(line => line === 0)
  };
}

/**
 * 获取卦象的组件信息（上卦和下卦）
 * @param {number} guaIndex - 卦象索引 (0-63)
 * @returns {Object|null} 组件信息
 */
function getGuaComponents(guaIndex) {
  if (!isValidGuaIndex(guaIndex)) {
    return null;
  }

  const lines = getGuaLines(guaIndex);
  if (!lines) {
    return null;
  }

  // 上卦（上三爻）
  const upperLines = lines.slice(0, 3);
  const upperGua = getGuaNameByLines(upperLines);

  // 下卦（下三爻）
  const lowerLines = lines.slice(3, 6);
  const lowerGua = getGuaNameByLines(lowerLines);

  return {
    upper: upperGua,
    lower: lowerGua
  };
}

/**
 * 根据爻线获取卦名
 * @param {Array<number>} lines - 爻线数组
 * @returns {string} 卦名
 */
function getGuaNameByLines(lines) {
  const guaMap = {
    '111': '乾',
    '000': '坤',
    '100': '震',
    '010': '坎',
    '001': '艮',
    '110': '巽',
    '101': '离',
    '011': '兑'
  };

  const key = lines.join('');
  return guaMap[key] || '未知';
}

// 使用CommonJS导出
module.exports = {
  drawGuaSymbol,
  createGuaSVG,
  createGuaBase64,
  getDefaultStyle,
  isValidGuaIndex,
  getGuaDrawInfo,
  getGuaLines,
  getGuaComponents
};
