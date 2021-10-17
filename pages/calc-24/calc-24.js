// pages/calc-24/calc-24.js
import {
  getAllCase,
  getAllValidCase,
} from '../../utils/calc-24.js';
import {
  myShowToast,
} from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 4个数字
    numberList: ['2', '5', '3', '4'],
    // numberList: ['', '', '', ''],

    // 结果展示 —— 组合、题解
    caseList: ['组合', '题解'],
    caseCurIndex: 0,
    // 组合、题解的2个列表数据
    // allCaseList: ['(((1+2)+3)*4)', '(2*(3/(1/4)))', '((4*(2/1))*3)', '(((1+2)+3)*4)', '(2*(3/(1/4)))', '((4*(2/1))*3)'],
    // allValidCaseList: ['(((1+2)+3)*4)']
    allCaseList: [],
    allValidCaseList: [],
  },

  // 输入 4个数字 
  onInputNumber(e) {
    const {target: {id}} = e,
      {detail: {value}} = e,
      {numberList} = this.data;
    
    // debugger
    numberList[id] = value;
    this.setData({
      numberList
    });
  },

  // 计算 24点 
  onClickCalculate24() {
    const {numberList} = this.data,
      l = numberList.length;

    // 校验
    const msg = this.checkNumberList(numberList);
    if (msg) {
      myShowToast(msg, {icon: 'none'});
    }
    else {
      const allCaseList = getAllCase(numberList),
        allValidCaseList = getAllValidCase(numberList);

      this.setData({
        allCaseList,
        allValidCaseList
      });
    }
  },

  // 校验 4个数字 的合法性(msg为 '', 则 说明校验通过)
  checkNumberList(numberList = []) {
    const l = numberList.length;
    let msg = '';
    // debugger

    if (l !== 4) {
      msg = '输入有误，长度不为4~';
    }
    else {
      let tempList = [];
      for (let i = 0; i < l; i++) {
        const tempVal = numberList[i];
        // TODO：目前仅支持整数（含正、负、0），后续看看要不要支持更多？
        if (parseInt(tempVal) + '' !== tempVal) {
          tempList.push(i);
        }
      }

      if (tempList.length > 0) {
        msg = `第${tempList.map((item, index) => index + 1).join('、')}个数值不合法（仅支持整数）`;
      }
    }

    return msg;
  },

  // 结果展示的切换（组合、题解）。
  onChangeCaseView(e) {
    const {target: {id}} = e;
    
    this.setData({
      caseCurIndex: parseInt(id)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})