// ==UserScript==
// @name        baidu hot list Affix
// @namespace   Violentmonkey Scripts
// @match       *://www.baidu.com/s?*
// @grant       none
// @version     1.0
// @author      sanm-zh
// @icon        https://www.baidu.com/img/baidu_85beaf5496f291521eb75ba38eacbd87.svg
// @description 百度热榜固定
// ==/UserScript==

(function () {
    var hotEle = document.getElementsByClassName('FYB_RD');
    if (hotEle.length) {
        var isHotList = hotEle[0].getElementsByClassName('cr-title')[0].title === '百度热榜';
        if (isHotList) {
            var top = getelementtopagetop(hotEle[0]);
            window.onscroll = function () {
                throttle(changeHotListStyle(hotEle[0], top), 1000);
            }
        }
    } else {
        return false;
    }
})();

// 固定热点列表样式
function changeHotListStyle(hotEle, top) {
    var scrollTop = document.documentElement.scrollTop;
    if (scrollTop > top - 70) {
        hotEle.style.position = 'fixed';
        hotEle.style.top = '80px';
    } else {
        hotEle.style = '';
    }
}

// 获取el到顶部的距离
function getelementtopagetop(el) {
    if (el.parentElement) {
        var h = el.parentElement.offsetTop === el.offsetTop ? 0 : el.offsetTop;
        return getelementtopagetop(el.parentElement) + h;
    }
    return el.offsetTop;
}

// 节流
function throttle(fn, delay) {
    var prevTime = Date.now();
    return function () {
        var curTime = Date.now();
        if (curTime - prevTime > delay) {
            fn.apply(this, arguments);
            prevTime = curTime;
        }
    };
}
