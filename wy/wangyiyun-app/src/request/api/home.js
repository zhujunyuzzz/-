import service from '..';
//首页获取轮播图的数据
export function getBanner(){
   return service({
    method:"GET",
    url:'/banner?type=2'
   })
}

//获取发现好歌单
export function getMusicList(){
   return service({
      method:"GET",
      url:'/personalized?limit=10'
     })
}
//登录/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin(data){
   return service({
      method:"GET",
      url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
     })
}
//获取用户详情
export function getLoginUser(data){
   return service({
      method:"GET",
      url:`/user/detail?uid=${data}`
     })
}