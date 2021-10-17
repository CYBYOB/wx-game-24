import {Function, evaluate} from './eval5.js';

const getAllCaseByDfs = (curExprArr, allCaseArr) => {
  const l = curExprArr.length;
  // 1）递归出口
  if (l <= 1) {
    allCaseArr.push(curExprArr.join(''));
    return;
  }

  // 2）递归主体
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      if (i !== j) {
        const exprStr = `(${curExprArr[i]}?${curExprArr[j]})`;
        let curExprArrNew = [exprStr];
        
        for (let k = 0; k < l; k++) {
          if (![i, j].includes(k)) {
            curExprArrNew.push(curExprArr[k]);
          }
        }
        
        getAllCaseByDfs(curExprArrNew, allCaseArr);
      }
    }
  }
}

const getAllValidCaseByDfs = (exprStr, resArr) => {
  const reg = /\?/;
  // 1）递归出口
  if (!reg.test(exprStr)) {
    if (Math.abs(evaluate(exprStr) - 24) < Math.pow(10, -2)) {
      resArr.push(exprStr);
    }
    return;
  }
  
  // 2）递归主体
  getAllValidCaseByDfs(exprStr.replace(reg, '+'), resArr);
  getAllValidCaseByDfs(exprStr.replace(reg, '-'), resArr);
  getAllValidCaseByDfs(exprStr.replace(reg, '*'), resArr);
  getAllValidCaseByDfs(exprStr.replace(reg, '/'), resArr);
}

const getAllCase = (arr) => {
  // 1）转换。将“数值”数组 转换成 “数值计算表达式字符串”数组
  let curExprArr = arr.map(item => {
      // 边界：若 item为复数，则 需要用() 将其包裹
      return item < 0 ? `(${item})` : item;
    }),
    allCaseList = [];

  // 2）生成。所有的组合情况
  getAllCaseByDfs(curExprArr, allCaseList);

  // 3）返回 allCaseList 。
  return allCaseList;
}

const getAllValidCase = (arr) => {
  // 1）生成。所有的组合情况
  const allCaseList = getAllCase(arr);

  const l = allCaseList.length;
  let index = 0,
      allValidCaseList = [];
  // 2）过滤。遍历所有组合，不断将当前组合中的各个 ? 字符换成4则运算，并筛选出符合条件的组合
  while (index < l) {
      const exprStr = allCaseList[index];
      getAllValidCaseByDfs(exprStr, allValidCaseList);
      index++;
  }

  // 3）去重。
  allValidCaseList = [...new Set(allValidCaseList)];

  // 4）返回结果数组 allValidCaseList 。
  return allValidCaseList;
}

let main = (arr) => {
  // 1）转换。将“数值”数组 转换成 “数值计算表达式字符串”数组
  let curExprArr = arr.map(item => {
      // 边界：若 item为复数，则 需要用() 将其包裹
      return item < 0 ? `(${item})` : item;
  }),
      allCaseArr = [];
  // 2）生成。所有的组合情况
  getAllCaseByDfs(curExprArr, allCaseArr);

  const l = allCaseArr.length;
  let index = 0,
      resArr = [];
  // 3）过滤。遍历所有组合，不断将当前组合中的各个 ? 字符换成4则运算，并筛选出符合条件的组合
  while (index < l) {
      const exprStr = allCaseArr[index];
      getAllValidCaseByDfs(exprStr, resArr);
      index++;
  }

  

  // 4）去重。
  resArr = [...new Set(resArr)];

  // 5）返回结果数组 resArr 。
  return resArr;
}

module.exports = {
  getAllCase,
  getAllValidCase,
}