# wechat-scroll-linkage

### 微信小程序左右联动效果

左边栏点击 button 右侧会跟随滚动到对应的区域； 右测滚动，左侧也会滚动到对应的 button ；

#### 演示

![GIF演示](https://github.com/YasinChan/wechat-scroll-linkage/blob/master/images/scroll.gif)

#### 预览

```bash
git clone https://github.com/YasinChan/wechat-scroll-linkage.git
# 用微信开发者这工具打开此案例查看效果
```

#### 实现原理

1. 数据渲染

   目前我将需要渲染的数据以 json 的形式保存在`./utils/constants.js`中可参考

2. 首先需要设置常量，如下图

   ![image](https://github.com/YasinChan/wechat-scroll-linkage/blob/master/images/image.png)

3. 在 onload 阶段，我们需要获取每个右侧的 bar 到顶部的距离，用来做后面的计算。

   ```
   getEachRightItemToTop: function () {  // 获取每个右侧的 bar 到顶部的距离，用来做后面的计算。
       var obj = {};
       var totop = 0;
       obj[constants[0].id] = totop      // 右侧第一类肯定是到顶部的距离为 0
       for (let i = 1; i < (constants.length + 1); i++) {  // 循环来计算每个子类到顶部的高度
           totop += (RIGHT_BAR_HEIGHT + constants[i-1].category.length * RIGHT_ITEM_HEIGHT)
           obj[constants[i] ? constants[i].id : 'last'] = totop    
           // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
       }
       return obj
   },
   ```

4. 现在，我们为左右两侧添加相应的事件

   1. 为左侧列表添加`bindtap`事件，使右侧滚动到相应的位置

      ```
      jumpTo: function (e) {    // 左侧类的点击事件，点击时，右侧会滚动到对应分类
          this.setData({
              toView: e.target.id || e.target.dataset.id,
              currentLeftSelect: e.target.id || e.target.dataset.id
          })
      }
      ```

   2. 为右侧添加`bindscroll`事件，用来监听右侧滚动事件，来使左侧列表响应，滚动到相应位置

      ```
      rightScroll: function (e) {   // 监听右侧的滚动事件与 eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
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
      ```

      

   





