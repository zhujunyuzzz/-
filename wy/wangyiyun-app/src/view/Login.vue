<template>
    <div class="login">
        <h1>欢迎登录</h1>
        <svg class="icon" aria-hidden="true" @click="$router.push('/home')" style="top: .2rem;left: .3rem;">
          <use xlink:href="#icon-zuojiantou"></use>
         </svg>
        <div class="loginInput">
            <input type="text" placeholder="请输入手机号码" v-model="phone">
             <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <button @click="Login">登录</button>
    </div>
</template>
<script>
import {getLoginUser} from '@/request/api/home'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            phone:'',
            password:''
        }
    },
    methods:{
        Login:async function(){
            const res =await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
            //console.log(res);
            if(res.data.code === 200){//如果放回的code等于200，就去到个人中心去
                this.$router.push('/infoUser')
                this.$store.commit('updateIsLogin',true)
                let result = await getLoginUser(res.data.account.id)
                console.log(result);
                this.$store.commit('updateUser',result)
                this.$store.commit('updateToken',res.data.token)
                this.phone='',
                this.password=''
            }else{
                alert("手机或密码错误！")
                this.phone='',
                this.password=''
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        height: 13.34rem;
        background-color: rgb(254, 105, 105);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        position: relative;
        h1{
            color: #fff;
        }
        .icon{
        width: .6rem;
        height: .6rem;
        fill: #fff;
        position: absolute;
        
        }
        .loginInput{
            height: 40%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            input{
                padding:.3rem 1rem;
            }
        }
        button{
            padding: .1rem .2rem;
        }
    }
</style>