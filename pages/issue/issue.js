// pages/issue/issue.js

import {
  myShowDeveloping,
  myShowModal,
  myShowToast,
} from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 传入的题目
    issueItem: [],
    numberIndexListSelect: [],

    // 题目的状态流转。用途：“返回上一步”功能。
    issueItemStatusList: [],

    // 加、减、乘、除 4则运算列表
    signList: ['+', '-', '*', '/'],
    // 当前所选中的 运算符（范围为 加、减、乘、除 ）
    signSelect: '',
  },

  // 点击某个“数值按钮”
  onClickOneNumber(e) {
    const {target: {id}} = e,
      index = parseInt(id),
      {numberIndexListSelect} = this.data,
      l = numberIndexListSelect.length;

    // 1）点中之前“已选的”，则将其移除
    if (numberIndexListSelect.includes(index)) {
      for (let i = 0; i < l; i++) {
        if (numberIndexListSelect[i] === index) {
          numberIndexListSelect.splice(i, 1);
          break;
        }
      }
    }
    // 2）点中之前“未选的”，
    else if (l < 2) {
      numberIndexListSelect.push(index);
    }
    else {
      numberIndexListSelect.shift();
      numberIndexListSelect.push(index);
    }

    this.setData({
      numberIndexListSelect
    });

    this.updateStatusByCalculate();
  },

  // 点击某个 运算符 。
  onClickOneSign(e) {
    const {target: {id}} = e,
      index = parseInt(id),
      {signList} = this.data;

    // 注意：这里的 “选中”处理逻辑 跟上面的“数值按钮” 不一样。
    // 直接无脑的设置为 当前所点击的运算符 即可。
    this.setData({
      signSelect: signList[index]
    });

    this.updateStatusByCalculate();
  },

  // 若 当前选择了2个数值、1个运算符，则 需要进行状态的更新。
  updateStatusByCalculate() {
    const {numberIndexListSelect, signSelect} = this.data,
      l = numberIndexListSelect.length;
    let {issueItem} = this.data;

    if (l === 2 && signSelect) {
      const [index_1, index_2] = numberIndexListSelect,
        num_1 = issueItem[index_1],
        num_2 = issueItem[index_2];
      let tempVal = '';
        
        if (signSelect === '+') {
          tempVal = num_1 + num_2;
        }
        else if (signSelect === '-') {
          tempVal = num_1 - num_2;
        }
        else if (signSelect === '*') {
          tempVal = num_1 * num_2;
        }
        // 除法，有特殊处理
        else if (signSelect === '/') {
          if (num_2 === 0) {
            myShowToast('除数不能为0~', {icon: 'error'});
            return;
          }
          
          // 优化：除法的结果值应该可以用 类似 `${num_1} / ${num_2}` 表示 。
          // 注意：如 parseFloat('4/5') * 5 的结果是 20 ！！
          tempVal = num_1 / num_2;
        }
        
        // 核心处理
        issueItem.splice(index_2, 1, tempVal);
        issueItem = issueItem.map((item, index) => index === index_1 ? '' : item);
        this.setData({
          issueItem,
          // 重置所有之前选中的 数值 和 运算符。
          numberIndexListSelect: [],
          signSelect: ''
        });
        
        // 判断是否做到最后1步了
        const issueItemTemp = (this.data.issueItem || []).filter(item => 
          item !== '' && item !== undefined
        );
        if (issueItemTemp.length === 1) {
          // 解题成功
          if (Math.abs(issueItemTemp[0] - 24) <= Math.pow(10, -6)) {
            myShowToast('恭喜，解题成功~');
            // myShowModal({title: '解题成功~', content: '是否进入下一题？'}).then(() => {
            //   // TODO：需完善逻辑。
            //   console.log('进入下一题');
            // }).catch(() => {
            //   // TODO：
            //   console.log('留在该页面');
            // });
          }
          // 解题失败
          else {
            myShowToast('很遗憾，解题失败~', {icon: 'error'});
          }
        }
    };
  },

  // “返回上一步”
  onClickReturnPreviousBtn() {
    myShowDeveloping();
  },

  // “重置”
  onClickResetBtn() {
    myShowDeveloping();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // return;

    const issueItem = JSON.parse(options.issueItem || '[]');
    // 边界：issueItem 可能 未传 或 非法。
    // TODO：可以优化下 报错信息（不过一般程序写得好的话不会报这个错） 。
    if (!issueItem || !Array.isArray(issueItem) || issueItem.length !== 4) {
      myShowToast('抱歉，题目有误~', {icon:'error'});
      return;
    }

    // TODO：对传入的 issueItem（长度为4的数组） 进行顺序的打乱？
    // TODO：需打开
    this.setData({
      issueItem,
      issueItemStatusList: [issueItem]
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})