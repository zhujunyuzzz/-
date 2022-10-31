<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContents">
            <van-swipe :loop="false" :width="150" :show-indicators="false" class="mySwiper">
            <van-swipe-item v-for="item in state.musicList" :key="item" class="mySwiperItem">
                <router-link :to="{
                    path:'/itemMusic',
                    query:{
                        id:item.id
                    }
                }">
                <img :src="item.picUrl" alt="">
                  <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                       <use xlink:href="#icon-jiantou"></use>
                    </svg>
                   {{changeCount(item.playCount)}}
                  </span>
                  <span class="name">{{item.name}}</span>
                </router-link>         
            </van-swipe-item>          
            </van-swipe>
        </div>
    </div>
</template>

<script>
import {getMusicList} from "@/request/api/home.js"
import { reactive,onMounted } from 'vue'
export default {
    //vue2写法
    // name:'MusicList',
    // data(){
    //     return{
    //         musicList:[]
    //     }
    // },
    // methods: {
    //   async getGedan(){
    //     let res = await getMusicList();
    //     // console.log('歌单',res);
    //     this.musicList = res.data.result
    //   },
    //   changeCount(num){
    //        if(num>=100000000){
    //         return (num/100000000).toFixed(1)+'亿'
    //        }else if(num>=10000){
    //         return (num/10000).toFixed(1)+'万'
    //        }else{
    //         return num
    //        }
           
    //   }
    // },
    // mounted(){
    //     this.getGedan()
    // }

    //vue3写法
    setup(){
       const state = reactive({
           musicList:[],
           
       });
       function changeCount(num){
           if(num>=100000000){
            return (num/100000000).toFixed(1)+'亿'
           }else if(num>=10000){
            return (num/10000).toFixed(1)+'万'
           }else{
            return num
           }         
      };
      onMounted(async ()=>{
          let res = await getMusicList();
          state.musicList = res.data.result
          //console.log('歌单',state.musicList);
      });
      return { state,changeCount }
    }
}
</script>

<style lang="less" scoped>
    .musicList{
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
        .musicTop{
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title{
                font-size: 0.4rem;
                font-weight: 900;
            }
            .more{
                border: 1px solid #ccc;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
        .musicContents{
            width: 100%;
            height: 4rem;
            .mySwiper{
               height: 100%;
               .mySwiperItem{
                height: 100%;
                padding-left:10px;
                  img{
                   width: 100%;
                   height: 3rem;
                   border-radius: .2rem;
                   position: relative;
                   }
                   .playCount{
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    color: #fff;
                    text-align: center;
                    padding-right: 0.1rem;
                    padding-top: .08rem;
                    .icon{
                        padding-top: .1rem;
                    }
                   }
               }
               .mySwiperItem:first-child{
                padding-left: 0;
               }
               
            }
        }
        
    }
</style>