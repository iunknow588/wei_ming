/**
 * 延时加载管理器
 * 在系统空闲时间预加载卦详情数据
 */

class LazyLoadManager {
  constructor() {
    this.loadedData = new Map(); // 已加载的数据缓存
    this.loadingPromises = new Map(); // 正在加载的Promise
    this.preloadQueue = []; // 预加载队列
    this.isIdle = false; // 是否处于空闲状态
    this.maxConcurrent = 3; // 最大并发加载数
    this.currentLoading = 0; // 当前正在加载的数量
    this.idleTimer = null; // 定时器ID
    
    // 初始化空闲检测
    this.initIdleDetection();
  }

  /**
   * 初始化空闲检测
   */
  initIdleDetection() {
    // 监听页面可见性变化
    tt.onAppShow(() => {
      this.onAppActive();
    });

    tt.onAppHide(() => {
      this.onAppInactive();
    });

    // 定期检查空闲状态
    this.idleTimer = setInterval(() => {
      this.checkIdleStatus();
    }, 5000); // 每5秒检查一次
  }

  /**
   * 应用激活时
   */
  onAppActive() {
    console.log('[LazyLoadManager] 应用激活，开始空闲检测');
    this.isIdle = true;
    this.processPreloadQueue();
  }

  /**
   * 应用非激活时
   */
  onAppInactive() {
    console.log('[LazyLoadManager] 应用非激活，暂停预加载');
    this.isIdle = false;
  }

  /**
   * 检查空闲状态
   */
  checkIdleStatus() {
    // 这里可以根据实际情况判断是否空闲
    // 比如检查是否有用户交互、网络状态等
    if (this.isIdle && this.preloadQueue.length > 0) {
      this.processPreloadQueue();
    }
  }

  /**
   * 添加预加载任务
   * @param {number} guaIndex - 卦的索引（1-64）
   * @param {number} priority - 优先级（1-10，数字越大优先级越高）
   */
  addPreloadTask(guaIndex, priority = 5) {
    if (this.loadedData.has(guaIndex)) {
      return; // 已经加载过了
    }

    if (this.loadingPromises.has(guaIndex)) {
      return; // 正在加载中
    }

    // 添加到预加载队列
    this.preloadQueue.push({
      guaIndex,
      priority,
      timestamp: Date.now()
    });

    // 按优先级排序
    this.preloadQueue.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority; // 优先级高的在前
      }
      return a.timestamp - b.timestamp; // 时间早的在前
    });

    console.log(`[LazyLoadManager] 添加预加载任务: 第${guaIndex}卦，优先级${priority}`);
    
    // 如果当前空闲，立即处理
    if (this.isIdle) {
      this.processPreloadQueue();
    }
  }

  /**
   * 批量添加预加载任务
   * @param {Array<number>} guaIndexes - 卦的索引数组
   * @param {number} priority - 优先级
   */
  addBatchPreloadTasks(guaIndexes, priority = 5) {
    guaIndexes.forEach(guaIndex => {
      this.addPreloadTask(guaIndex, priority);
    });
  }

  /**
   * 处理预加载队列
   */
  async processPreloadQueue() {
    if (!this.isIdle || this.currentLoading >= this.maxConcurrent) {
      return;
    }

    while (this.preloadQueue.length > 0 && this.currentLoading < this.maxConcurrent) {
      const task = this.preloadQueue.shift();
      if (task) {
        this.currentLoading++;
        this.loadGuaData(task.guaIndex).finally(() => {
          this.currentLoading--;
          // 继续处理队列
          setTimeout(() => {
            this.processPreloadQueue();
          }, 100);
        });
      }
    }
  }

  /**
   * 加载卦数据
   * @param {number} guaIndex - 卦的索引
   * @returns {Promise} - 加载Promise
   */
  async loadGuaData(guaIndex) {
    if (this.loadedData.has(guaIndex)) {
      return this.loadedData.get(guaIndex);
    }

    if (this.loadingPromises.has(guaIndex)) {
      return this.loadingPromises.get(guaIndex);
    }

    const loadPromise = new Promise(async (resolve, reject) => {
      try {
        console.log(`[LazyLoadManager] 开始加载第${guaIndex}卦数据`);
        
        // 动态加载数据文件
        const guaData = require(`../data/${guaIndex}.js`);
        
        // 缓存数据
        this.loadedData.set(guaIndex, guaData);
        
        console.log(`[LazyLoadManager] 第${guaIndex}卦数据加载成功`);
        resolve(guaData);
        
      } catch (error) {
        console.error(`[LazyLoadManager] 第${guaIndex}卦数据加载失败:`, error);
        reject(error);
      } finally {
        this.loadingPromises.delete(guaIndex);
        // 检查是否全部加载完成，若是则关闭定时器
        if (this.loadedData.size >= 64) {
          this.clearIdleTimer();
        }
      }
    });

    this.loadingPromises.set(guaIndex, loadPromise);
    return loadPromise;
  }

  /**
   * 获取卦数据（同步，如果已加载）
   * @param {number} guaIndex - 卦的索引
   * @returns {object|null} - 卦数据或null
   */
  getGuaData(guaIndex) {
    return this.loadedData.get(guaIndex) || null;
  }

  /**
   * 检查数据是否已加载
   * @param {number} guaIndex - 卦的索引
   * @returns {boolean} - 是否已加载
   */
  isDataLoaded(guaIndex) {
    return this.loadedData.has(guaIndex);
  }

  /**
   * 检查数据是否正在加载
   * @param {number} guaIndex - 卦的索引
   * @returns {boolean} - 是否正在加载
   */
  isDataLoading(guaIndex) {
    return this.loadingPromises.has(guaIndex);
  }

  /**
   * 获取加载状态
   * @param {number} guaIndex - 卦的索引
   * @returns {string} - 状态：'loaded', 'loading', 'not_loaded'
   */
  getLoadStatus(guaIndex) {
    if (this.loadedData.has(guaIndex)) {
      return 'loaded';
    }
    if (this.loadingPromises.has(guaIndex)) {
      return 'loading';
    }
    return 'not_loaded';
  }

  /**
   * 获取统计信息
   * @returns {object} - 统计信息
   */
  getStats() {
    return {
      loadedCount: this.loadedData.size,
      loadingCount: this.loadingPromises.size,
      queueLength: this.preloadQueue.length,
      isIdle: this.isIdle,
      currentLoading: this.currentLoading,
      maxConcurrent: this.maxConcurrent
    };
  }

  /**
   * 清除缓存
   * @param {number} guaIndex - 卦的索引，不传则清除所有
   */
  clearCache(guaIndex = null) {
    if (guaIndex) {
      this.loadedData.delete(guaIndex);
      console.log(`[LazyLoadManager] 清除第${guaIndex}卦缓存`);
    } else {
      this.loadedData.clear();
      console.log('[LazyLoadManager] 清除所有缓存');
    }
  }

  /**
   * 预加载前N个卦
   * @param {number} count - 预加载数量
   * @param {number} priority - 优先级
   */
  preloadFirstN(count = 10, priority = 8) {
    const indexes = Array.from({length: count}, (_, i) => i + 1);
    this.addBatchPreloadTasks(indexes, priority);
  }

  /**
   * 预加载用户可能查看的卦（基于用户行为预测）
   * @param {Array<number>} likelyIndexes - 可能查看的卦索引
   * @param {number} priority - 优先级
   */
  preloadLikelyGua(likelyIndexes, priority = 7) {
    this.addBatchPreloadTasks(likelyIndexes, priority);
  }

  /**
   * 清除空闲检测定时器
   */
  clearIdleTimer() {
    if (this.idleTimer) {
      clearInterval(this.idleTimer);
      this.idleTimer = null;
      console.log('[LazyLoadManager] 已关闭空闲检测定时器');
    }
  }
}

// 创建全局延时加载管理器实例
const lazyLoadManager = new LazyLoadManager();

// 导出模块
module.exports = {
  LazyLoadManager,
  lazyLoadManager
}; 