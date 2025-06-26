// 延迟导入64卦数据，避免启动时阻塞
let sixtyFourGuaData = null;
// 延迟导入授权管理器，避免启动时阻塞
let authManager = null;

// 全局64卦编码映射表
const GUA_CODE_MAP = {
  '111111': { name: '乾', index: 0 }, // 1. 乾为天 - 六阳爻
  '000000': { name: '坤', index: 1 }, // 2. 坤为地 - 六阴爻
  '100010': { name: '屯', index: 2 }, // 3. 水雷屯
  '010001': { name: '蒙', index: 3 }, // 4. 山水蒙
  '010111': { name: '需', index: 4 }, // 5. 水天需
  '111010': { name: '讼', index: 5 }, // 6. 天水讼
  '010000': { name: '师', index: 6 }, // 7. 地水师
  '000010': { name: '比', index: 7 }, // 8. 水地比
  '110111': { name: '小畜', index: 8 }, // 9. 风天小畜
  '111011': { name: '履', index: 9 }, // 10. 天泽履
  '111000': { name: '泰', index: 10 }, // 11. 地天泰
  '000111': { name: '否', index: 11 }, // 12. 天地否
  '101111': { name: '同人', index: 12 }, // 13. 天火同人
  '111101': { name: '大有', index: 13 }, // 14. 火天大有
  '001000': { name: '谦', index: 14 }, // 15. 地山谦
  '000100': { name: '豫', index: 15 }, // 16. 雷地豫
  '100110': { name: '随', index: 16 }, // 17. 泽雷随
  '011001': { name: '蛊', index: 17 }, // 18. 山风蛊
  '110000': { name: '临', index: 18 }, // 19. 地泽临
  '000011': { name: '观', index: 19 }, // 20. 风地观
  '101001': { name: '噬嗑', index: 20 }, // 21. 火雷噬嗑
  '100101': { name: '贲', index: 21 }, // 22. 山火贲
  '100000': { name: '剥', index: 22 }, // 23. 山地剥
  '000001': { name: '复', index: 23 }, // 24. 地雷复
  '100111': { name: '无妄', index: 24 }, // 25. 天雷无妄
  '111001': { name: '大畜', index: 25 }, // 26. 山天大畜
  '100001': { name: '颐', index: 26 }, // 27. 山雷颐
  '011110': { name: '大过', index: 27 }, // 28. 泽风大过
  '010010': { name: '坎', index: 28 }, // 29. 坎为水
  '101101': { name: '离', index: 29 }, // 30. 离为火
  '001110': { name: '咸', index: 30 }, // 31. 泽山咸
  '011100': { name: '恒', index: 31 }, // 32. 雷风恒
  '111100': { name: '遁', index: 32 }, // 33. 天山遁
  '001111': { name: '大壮', index: 33 }, // 34. 雷天大壮
  '101000': { name: '晋', index: 34 }, // 35. 火地晋
  '000101': { name: '明夷', index: 35 }, // 36. 地火明夷
  '110101': { name: '家人', index: 36 }, // 37. 风火家人
  '101011': { name: '睽', index: 37 }, // 38. 火泽睽
  '001010': { name: '蹇', index: 38 }, // 39. 水山蹇
  '010100': { name: '解', index: 39 }, // 40. 雷水解
  '100011': { name: '损', index: 40 }, // 41. 山泽损
  '110001': { name: '益', index: 41 }, // 42. 风雷益
  '011111': { name: '夬', index: 42 }, // 43. 泽天夬
  '111110': { name: '姤', index: 43 }, // 44. 天风姤
  '011000': { name: '萃', index: 44 }, // 45. 泽地萃
  '000110': { name: '升', index: 45 }, // 46. 地风升
  '011010': { name: '困', index: 46 }, // 47. 泽水困
  '010110': { name: '井', index: 47 }, // 48. 水风井
  '011101': { name: '革', index: 48 }, // 49. 泽火革
  '101110': { name: '鼎', index: 49 }, // 50. 火风鼎
  '001001': { name: '震', index: 50 }, // 51. 震为雷
  '100100': { name: '艮', index: 51 }, // 52. 艮为山
  '110100': { name: '渐', index: 52 }, // 53. 风山渐
  '001011': { name: '归妹', index: 53 }, // 54. 雷泽归妹
  '001101': { name: '丰', index: 54 }, // 55. 雷火丰
  '101100': { name: '旅', index: 55 }, // 56. 火山旅
  '011011': { name: '巽', index: 56 }, // 57. 巽为风
  '110110': { name: '兑', index: 57 }, // 58. 兑为泽
  '110010': { name: '涣', index: 58 }, // 59. 风水涣
  '010011': { name: '节', index: 59 }, // 60. 水泽节
  '110011': { name: '中孚', index: 60 }, // 61. 风泽中孚
  '001100': { name: '小过', index: 61 }, // 62. 雷山小过
  '101010': { name: '既济', index: 62 }, // 63. 水火既济
  '010101': { name: '未济', index: 63 } // 64. 火水未济
};

App({
  globalData: {
    sixtyFourGua: [], // 初始为空，延迟加载
    user: null, // 全局用户信息
    divinationResult: null, // 起卦结果数据
    guaCodeMap: GUA_CODE_MAP, // 将64卦编码映射表添加到全局数据
    // 全局免责声明文字
    disclaimerText: "本程序中记载及分析的文字内容,仅根据部分易经传世著作予以实现,未经科学证实,结果仅供娱乐参考,无现实指导意义",
    // 初始化状态
    isInitialized: false
  },
  
  onLaunch() {
    // 立即设置基础数据，不阻塞启动
    this.globalData.guaCodeMap = GUA_CODE_MAP;
    
    // 异步初始化，不阻塞启动流程
    setTimeout(() => {
      this.asyncInit();
    }, 0);
  },
  
  onShow() {
    // 处理APP logo点击事件 - 但不自动跳转
  },
  
  // 异步初始化方法
  async asyncInit() {
    try {
      // 清除旧的 gua-ci-list 缓存
      tt.removeStorage({ key: "gua-ci-list" });
      
      // 并行执行初始化任务
      await Promise.all([
        this.initSixtyFourGua(),
        this.initAuth()
      ]);
      
      // 展示本地存储能力
      const logs = tt.getStorageSync('logs') || []
      logs.unshift(Date.now())
      tt.setStorageSync('logs', logs)

      // 登录
      tt.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      });
      
      this.globalData.isInitialized = true;
    } catch (error) {
      // 静默处理初始化错误，不影响用户体验
    }
  },
  
  // 处理APP logo点击事件
  handleAppLogoClick() {
    // 跳转到用户信息页面
    tt.navigateTo({
      url: '/pages/user-profile/user-profile',
    });
  },
  
  // 初始化64卦数据
  async initSixtyFourGua() {
    try {
      // 延迟加载64卦数据
      if (!sixtyFourGuaData) {
        const { sixtyFourGuaData: data } = require('./data/sixtyFourGua.js');
        sixtyFourGuaData = data;
      }
      
      // 尝试从缓存读取数据
      const res = await new Promise((resolve, reject) => {
        tt.getStorage({
          key: 'sixtyFourGua',
          success: resolve,
          fail: reject
        });
      });
      
      this.globalData.sixtyFourGua = res.data;
    } catch (err) {
      // 如果缓存中没有数据，使用默认数据
      this.globalData.sixtyFourGua = sixtyFourGuaData || [];
      
      // 异步保存到缓存
      if (sixtyFourGuaData) {
        tt.setStorage({
          key: 'sixtyFourGua',
          data: this.globalData.sixtyFourGua
        });
      }
    }
  },

  // 初始化授权管理器
  async initAuth() {
    try {
      // 延迟加载授权管理器
      if (!authManager) {
        authManager = require('./utils/auth.js');
      }
      
      const user = await authManager.init();
      if (user) {
        this.globalData.user = user;
      }
    } catch (err) {
      // 静默处理授权初始化错误
    }
  },
  
  // 获取用户信息（兼容旧接口）- 注意：此方法只能在用户点击按钮时调用
  getUserInfo() {
    console.warn('getUserInfo方法只能在用户点击按钮时调用，否则会违反抖音小程序API规则');
    return authManager.getUserProfile('获取用户信息用于登录');
  },

  // 清除用户信息（兼容旧接口）
  clearUserInfo() {
    this.globalData.user = null;
    return authManager.logout();
  },

  // 获取授权管理器实例
  getAuthManager() {
    if (!authManager) {
      authManager = require('./utils/auth.js');
    }
    return authManager;
  }
});
