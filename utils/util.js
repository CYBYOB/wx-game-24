
const PRE_URL = 'https://www.520cyb.cn/twenty_four/php/';
const PRE_IMG_URL = 'https://www.520cyb.cn/twenty_four/images/';
// 难度级别 列表
const LEVEL_LIST = [
  {
    id: 'easy',
    name: '简单'
  }, {
    id: 'mid',
    name: '中等'
  }, {
    id: 'hard',
    name: '困难'
  }, {
    id: 'purgatory',
    name: '炼狱'
  },
];

const THROW_ERROR = (code, msg) => {
  throw new Error('错误状态码code: ' + code + ", 错误信息msg: " + msg);
};
const FAIL = (error) => console.log(error);

// 界面能显示“未开发 或 开发中的功能”，但进行 点击 等交互时会提示用户 —— “开发...”。
const myShowDeveloping = ({title = '开发中，敬请期待~', icon = 'none', duration = 1000} = {}) => {
  wx.showToast({
    title,
    icon,
    duration
  });
}

// 弹窗（带有 确认、取消 回调）
const myShowModal = ({title = '', content = ''} = {}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success (res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject();
        }
      }
    });
  });
}

// “重定向”到 某个页面
const myRedirectTo = (url) => {
  wx.navigateTo({
    url
  });
}

// 导航到 某个页面
const myNavigateTo = (url) => {
  wx.navigateTo({
    url
  });
}

// 切换到 某个导航页
const mySwitchTab = (url) => {
  wx.switchTab({
    url
  });
}

// myRequest = (url, data, success, method, fail)
// const fail = (error) => console.log(error);

// 发送请求
const myRequest = (url, data = {}, method = 'GET', fail = FAIL) => {
  return new Promise((resolve, reject = fail) => {
    wx.request({
      url: `${PRE_URL}${url}.php`,
      data,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        fail(error)
      },
      method
    });
  });
}

// 弹出 toast 消息
const myShowToast = (title, {icon = 'success', duration = 1500} = {}) => {
  wx.showToast({
    title,
    icon,
    duration
  });
}

// 时间戳 转 日期格式
const timestampToDate = (timestamp) => {
  // 因为可能传入的是 时间戳 字符串！！
  timestamp = parseInt(timestamp);
  const date = new Date(timestamp),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    mm = date.getMinutes(),
    s = date.getSeconds();
  
  return `${y}-${m}-${d} ${h}:${mm}:${s}`;
}

// 生成 [num1, num2) 范围（左闭右开）的数组
const genNum1ToNum2 = (num1, num2) => {
  let res_arr = [];

  for(let i=num1; i<num2; i++) {
    res_arr.push(i);
  }

  return res_arr;
  // 其实上面的代码完全等价于
  // Array.from(new Array(num1, num2), (value , index) => num1 + index)
}


module.exports = {
  myShowDeveloping,
  myShowModal,
  mySwitchTab,
  myRedirectTo,
  myNavigateTo,
  myRequest,
  myShowToast,

  PRE_IMG_URL,
  LEVEL_LIST,

  THROW_ERROR,
  FAIL,

  timestampToDate,
  genNum1ToNum2
}
