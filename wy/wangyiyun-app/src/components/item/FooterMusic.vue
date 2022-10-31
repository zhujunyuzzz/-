<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updatedetailShow(true)">
            <img :src="playList[playListindex].al.picUrl" alt="">
            <div class="footerLeftMid">
                <p>{{playList[playListindex].name}}</p>
                <span>横划切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
         <svg class="icon" aria-hidden="true" v-show="isbtnShow" @click="play">
           <use xlink:href="#icon-weibiaoti--"></use>
         </svg>
         <svg class="icon" aria-hidden="true" v-show="!isbtnShow" @click="play">
           <use xlink:href="#icon-24gl-playCircle"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-zu"></use>
         </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListindex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width: '100%' }">
            <MusicDetail :musicList="playList[playListindex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration" :updateTime="updateTime"/>
        </van-popup>
    </div>
</template>
<script>
import MusicDetail from '@/components/item/MusicDetail'
import {mapMutations, mapState} from 'vuex'
export default {
    data(){
        return{
            interval:0
        }
    },
    components:{
        MusicDetail
    },
     computed:{
        ...mapState(['playList','playListindex','isbtnShow','detailShow'])
     },
     mounted(){
        this.$store.dispatch("getLyric",this.playList[this.playListindex].id)
        this.updateTime()
        this.addDuration()
     },
     updated(){
         this.$store.dispatch("getLyric",this.playList[this.playListindex].id)
         this.addDuration()
     },
     methods: {
        play(){
            //判断音乐是否播放
            if(this.$refs.audio.paused){
                console.log([this.$refs.audio]);
                this.$refs.audio.play()
                //this.$refs.audio.src = require(`https://music.163.com/song/media/outer/url?id=${playList[playListindex].id}.mp3`)
                this.updateIsbtnShow(false)
                this.updateTime()//播放定义函数传值
            }else{
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.interval)//暂停
            }
        },
        addDuration:function(){
        this.updateDuration(this.$refs.audio.duration)
        //console.log('dura',this.$refs.audio.duration);
        },
        updateTime:function(){
           this.interval = setInterval(()=>{
             this.updateCurrentTime(this.$refs.audio.currentTime)
            },50)
        },
        ...mapMutations(['updateIsbtnShow','updatedetailShow','updateCurrentTime','updateDuration'])
     },
     watch:{
        playList:function(){//监听如果歌曲发生变化，将自动播放音乐
            if(this.isbtnShow){
                this.$refs.audio.autoplay=true
                this.updateIsbtnShow(false)
            }
            this.$refs.audio.autoplay=true;
            if(this.$refs.audio.paused){
                this.updateIsbtnShow(false)
            }
        },
        isbtnShow:function(){
            if(!this.isbtnShow){
                this.$refs.audio.play()
            }
        }
     }
}
</script>
<style lang="less" scoped>
    .footerMusic{
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        .footerLeft{
            width: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
            .footerLeftMid{
                margin-left: .2rem;
                width: 70%;
                p{  
                    overflow:hidden;
                    font-weight: 900;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
            }
        }
        .footerRight{
            display: flex;
            width: 15%;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>