function remSize(){
    //获取到设备的宽度
    var deviceWith = document.documentElement.clientWidth || window.innerWidth
    if(deviceWith>=750){
        deviceWith = 750
    }
    if(deviceWith<=320){
        deviceWith=320
    }
    //1rem==100px
    document.documentElement.style.fontSize=(deviceWith/7.5)+'px'
    //设置字体大小
    document.querySelector('body').style.fontSize=0.3+"rem"
}
remSize()
 //当窗口发生变化进行适配
window.onresize = function(){
     remSize()
}