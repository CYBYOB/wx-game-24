// pages/stage/stage.js

import {
  myNavigateTo,
} from '../../utils/util.js';
import {
  EASY_ISSUE_LIST,
  MID_ISSUE_LIST,
  HARD_ISSUE_LIST
} from '../../constants/24.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择难度等级
    levelCurIndex: 0,
    levelList: ['容易', '中等', '困难'],

    // 不同难度下的题目列表
    easyIssueList: EASY_ISSUE_LIST || [],
    midIssueList: MID_ISSUE_LIST || [],
    hardIssueList: HARD_ISSUE_LIST || []
  },

  // 改变难度
  onChangeLevel(e) {
    const {target: {id}} = e;
    
    this.setData({
      // 注意：id 此时为 数字字符串 。
      levelCurIndex: parseInt(id)
    });
  },

  // 选择 某种难度下 的 某道题 
  onChooseOneIssue(e) {
    const {target: {id}} = e;
    const {currentTarget: {dataset: {level}}} = e;
    const {easyIssueList, midIssueList, hardIssueList} = this.data;

    // TODO（优化）：点击部分区域可能拿不到 id 值！
    if (!id) {
      return;
    }

    let issueItem = [];
    if (level === 'easy') {
      issueItem = easyIssueList[id];
    } else if (level === 'mid') {
      issueItem = midIssueList[id];
    } else {
      issueItem = hardIssueList[id];
    }

    myNavigateTo(`/pages/issue/issue?issueItem=${JSON.stringify(issueItem)}`);
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