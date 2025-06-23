// 获取全局 app 实例
const app = getApp();

Page({
  data: {
    interpretationContent: ''
  },

  onLoad(options) {
    console.log('解读方法页面加载');
    this.loadInterpretationContent();
  },

  onShow() {
    console.log('解读方法页面显示');
  },

  // 加载解读方法内容
  loadInterpretationContent() {
    const content = this.formatInterpretationContent();
    this.setData({
      interpretationContent: content
    });
  },

  // 格式化解读方法内容
  formatInterpretationContent() {
    let content = [];
    
    // 变卦说明部分
    content.push({
      type: 'title',
      text: '变卦说明'
    });
    
    content.push({
      type: 'divider',
      text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    });
    
    content.push({
      type: 'paragraph',
      text: '在《易经》中出现变爻（即老阴"⚋"或老阳"⚊"）时，意味着该爻处于动态变化中，需要结合本卦（原始卦）和之卦（变化后的卦）综合解读。'
    });
    
    // 解读方法部分
    content.push({
      type: 'title',
      text: '解读方法如下'
    });
    
    content.push({
      type: 'divider',
      text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
    });
    
    // 方法列表
    const methods = [
      {
        number: '1',
        title: '无变爻',
        content: '直接看本卦卦辞'
      },
      {
        number: '2',
        title: '1个变爻',
        content: '以本卦变爻爻辞为主，参考之卦整体含义'
      },
      {
        number: '3',
        title: '2个变爻',
        content: '以本卦两个变爻爻辞为主，以下爻（从下往上数）为重点'
      },
      {
        number: '4',
        title: '3个变爻',
        content: '看本卦与之卦的卦辞',
        subItems: [
          '根据初爻是否变动有侧重点：',
          '• 初爻未变重本卦',
          '• 初爻变则重之卦'
        ]
      },
      {
        number: '5',
        title: '4个变爻',
        content: '以之卦两个不变爻爻辞为主（以下爻为重）'
      },
      {
        number: '6',
        title: '5个变爻',
        content: '以之卦唯一不变爻的爻辞为主'
      },
      {
        number: '7',
        title: '6个变爻',
        content: '',
        subItems: [
          '乾卦变坤卦：用乾卦"用九"（见群龙无首）',
          '坤卦变乾卦：用坤卦"用六"（利永贞）',
          '其余卦看之卦卦辞'
        ]
      }
    ];
    
    methods.forEach(method => {
      content.push({
        type: 'method',
        number: method.number,
        title: method.title,
        content: method.content,
        subItems: method.subItems
      });
    });
    
    return content;
  },

  // 返回上一页
  onBack() {
    tt.navigateBack({
      success: () => {
        console.log('返回上一页成功');
      },
      fail: (err) => {
        console.error('返回上一页失败:', err);
      }
    });
  }
}); 