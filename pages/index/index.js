//index.js
const constants = require('../../utils/constants.js')

Page({
  data: {
    constants: [],
    toView: null,
    currentLeftSelect: null,
    eachRightItemToTop: []
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
    const RIGHT_BAR_HEIGHT = 20;
    const RIGHT_ITEM_HEIGHT = 60;
    obj[constants[0].id] = totop
    for (let i = 1; i < (constants.length + 1); i++) {
      totop += (RIGHT_BAR_HEIGHT + constants[i-1].category.length * RIGHT_ITEM_HEIGHT)
      obj[constants[i] ? constants[i].id : 'last'] = totop
    }
    return obj
  },
  rightScroll: function (e) {
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.eachRightItemToTop[this.data.constants[i].id]
      let right = this.data.eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i+1].id : 'last']
      if (e.detail.scrollTop <= right && e.detail.scrollTop >= left) {
        this.setData({
          currentLeftSelect: this.data.constants[i].id
        })
      }
    }
  },
  jumpToSick: function (e) {
    this.setData({
      toView: e.target.id || e.target.dataset.id,
      currentLeftSelect: e.target.id || e.target.dataset.id
    })
  },
  lower: function (e) {
    
  }


})
