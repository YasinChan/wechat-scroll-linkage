//index.js
const constants = require('../../utils/constants.js')

Page({
  data: {
    constants: [],                // 数据
    toView: null,                 // 左 => 右联动 右scroll-into-view 所需的id
    currentLeftSelect: null,      // 当前左侧选择的
    eachRightItemToTop: [],       // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
    leftToTop: 0
  },
  onLoad: function (options) {
    this.setData({
      constants: constants,
      currentLeftSelect: constants[0].id,
      eachRightItemToTop: this.getEachRightItemToTop()
    })
  },
  getEachRightItemToTop: function () {
    var obj = {};
    var totop = 0;
    const RIGHT_BAR_HEIGHT = 20;      // 右侧每一类的 bar 的高度（固定）
    const RIGHT_ITEM_HEIGHT = 60;     // 右侧每个子类的高度（固定）
    obj[constants[0].id] = totop      // 右侧第一类肯定是到顶部的距离为 0
    for (let i = 1; i < (constants.length + 1); i++) {  // 循环来计算每个子类到顶部的高度
      totop += (RIGHT_BAR_HEIGHT + constants[i-1].category.length * RIGHT_ITEM_HEIGHT)
      obj[constants[i] ? constants[i].id : 'last'] = totop    // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
    }
    return obj
  },
  rightScroll: function (e) {   // 监听右侧的滚动事件与 eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
    const LEFT_ITEM_HEIGHT = 30
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.eachRightItemToTop[this.data.constants[i].id]
      let right = this.data.eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i+1].id : 'last']
      if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
        this.setData({
          currentLeftSelect: this.data.constants[i].id,
          leftToTop: LEFT_ITEM_HEIGHT * i
        })
      }
    }
  },
  jumpToSick: function (e) {    // 左侧类的点击事件
    this.setData({
      toView: e.target.id || e.target.dataset.id,
      currentLeftSelect: e.target.id || e.target.dataset.id
    })
  },
  lower: function (e) {

  }


})
