<template>
    <div class="infoUserTop">
        <img :src="User.data.profile.backgroundUrl" alt="" class="bgimg">
        <svg class="icon" aria-hidden="true" @click="$router.push('/home')" style="top: .2rem;left: .3rem;">
          <use xlink:href="#icon-zuojiantou"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="popshow = !popshow" style="top: .2rem;right: .3rem;">
          <use xlink:href="#icon-xuanxiang"></use>
         </svg>
        <img :src="User.data.profile.avatarUrl" alt="" class="profileimg">
        <div  class="name">{{User.data.profile.nickname}}</div>
        <div class="gx">个性签名：{{User.data.profile.signature}}</div>
    </div>
    <div class="infoUserContent">
        <span>基本信息</span>
        <div class="infoUserContentItem">
         <div>关注:{{User.data.profile.followeds}}</div>
         <div>粉丝:{{User.data.profile.follows}}</div>
         <div>粉丝:{{User.data.profile.follows}}</div>
         <div>等级{{User.data.level}}</div>
        </div>      
    </div>
    <van-popup
     v-model:show="popshow"
     closeable
     close-icon-position="bottom-left"
     position="bottom"
     :style="{ height: '30%' }"
     >
     <div class="pop" @click="userLeave">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuichudenglu"></use>
         </svg>
        <span class="popSpan">退出登录</span>
     </div>
     
     </van-popup>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
           popshow:false
        }
    },
    computed:{
        ...mapState(['User'])
    },
    methods:{
        userLeave(){
            this.$router.push('/login')
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("User");
            this.$store.commit('updateIsLogin',false)
            this.$store.commit('updateToken','')
        }
    }
}
</script>
<style lang="less" scoped>
.infoUserTop{
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .bgimg{
        position: absolute;
        z-index: -1;
        width: 100%;
        height:300px;
        border-bottom-left-radius: .6rem;
        border-bottom-right-radius: .6rem;
    }
    .icon{
        width: .6rem;
        height: .6rem;
        fill: #fff;
        position: absolute;
        
    }
     .profileimg{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        left: .4rem;
        bottom: 2rem;
    }
    .gx{
        color: white;
        position: absolute;
        left: .4rem;
        bottom: 0.5rem;
    }
    .name{   
        font-size: .6rem;
        position: absolute;
        left: .4rem;
        bottom: 1rem;
        color: white;
    }
}
 .infoUserContent{
    width: 100%;
    height: 367px;
    padding: .6rem .4rem;
    span{
        font-weight: 800;
    }
    .infoUserContentItem{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        color: #999;
    }

 }
 .pop{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .icon{
        width: 2rem;
        height: 2rem;
    }
 }   
 
</style>