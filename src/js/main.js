//返回顶部
window.onload = function(){
    //获取相关
    let mybtn = document.getElementById("btn");
    let isTop = true;

    mybtn.onclick = function(){
        if(!isTop){
            //let osTop = document.body.scrollTop||document.documentElement.scrollTop;
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    };

    //页面滚动自动触发：
    window.onscroll = function(){
        //获取页面可视区高度和滚动高度
        let osTop = document.body.scrollTop||document.documentElement.scrollTop;
        //这两个获取滚动的方法可以兼容多种浏览器
        let clientHeight = document.documentElement.clientHeight;
        //对回到顶部的隐藏和显示，在css中一开始可以设置为隐藏
        if (osTop>clientHeight) {
            mybtn.style.display = "block"
        }
        else{
            mybtn.style.display = "none"
        }
        isTop = false;
    }
};



