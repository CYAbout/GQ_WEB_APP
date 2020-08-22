/**
 * common.js
 */


new function() {
    var client_h = document.documentElement.clientHeight
    var change = function() {
        //  屏幕适应，设置1rem=100px   (750设计图)
        document.documentElement.style.fontSize = 100 * document.documentElement.clientWidth / 750 + 'px';
        // 兼容安卓键盘顶起底部menu
            if (/iphone|ipad/i.test(navigator.userAgent.toLowerCase())) {
                    //ios这块什么都不用做
            } else {
               //安卓触发window.resize
                var body_h =  document.documentElement.clientHeight;
                var _menu = document.querySelector('.footer')
                if(client_h > (body_h*1.2)){
                    _menu ? _menu.style.height = '0' : null
                    _menu ? _menu.style.paddingTop = '0' : null
                }else{
                    _menu ? _menu.style.height = 'auto' : null
                    _menu ? _menu.style.paddingTop = '0.2rem' : null
                }
            }
    };
    change();
    window.addEventListener('resize', change, false);
}