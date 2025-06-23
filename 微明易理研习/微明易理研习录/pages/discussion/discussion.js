// 获取全局 app 实例
const app = getApp();
// 导入讨论数据
const { discussionData } = require('../../data/discussion-data.js');

Page({
  data: {
    discussionList: [], // 讨论内容列表
  },

  onShow() {
    console.log('易学争鸣页面显示');
    this.loadDiscussionData();
  },

  // 加载讨论数据
  loadDiscussionData() {
    console.log('开始加载讨论数据');
    
    // 从数据文件加载数据
    this.setData({ 
      discussionList: discussionData
    });
    
    console.log('讨论数据加载完成，共', discussionData.length, '条记录');
  },

  // 点击讨论项目
  onDiscussionItemTap(e) {
    const index = e.currentTarget.dataset.index;
    const discussionItem = this.data.discussionList[index];
    console.log('点击讨论项目:', discussionItem);
    
    // 显示详细讨论内容
    this.showDiscussionDetail(discussionItem);
  },

  // 显示讨论详情
  showDiscussionDetail(item) {
    let content = `【${item.title}】\n\n`;
    content += `📖 正方观点：${item.pro.view}\n`;
    content += `优势：${item.pro.advantage}\n`;
    content += `不足：${item.pro.disadvantage}\n\n`;
    content += `💡 反方观点：${item.con.view}\n`;
    content += `优势：${item.con.advantage}\n`;
    content += `不足：${item.con.disadvantage}\n\n`;
    content += `⚙️ 机械观点：${item.personalView}`;
    
    tt.showModal({
      title: item.title,
      content: content,
      showCancel: false,
      confirmText: '关闭',
      success: (res) => {
        // 用户点击关闭按钮
      }
    });
  },

}); 