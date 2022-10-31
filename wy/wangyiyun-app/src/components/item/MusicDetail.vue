<template>
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <svg class="icon" aria-hidden="true" @click="detailleave">
           <use xlink:href="#icon-zuojiantou"></use>
         </svg>
         <div class="leftMarquee">
            <Vue3Marquee style="color:#fff">{{musicList.name}}</Vue3Marquee>           
            <div>
            <span v-for="(item,index) in musicList.ar" :key="index">           
                {{item.name}}
            </span>
            <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
            </div>
 
         </div>
        </div>
        <div class="detailTopRight">
            <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-lianjie"></use>
            </svg>
        </div>
    </div>
    <div class="detailContent" v-show="isLyricShow">
        <img src="@/assets/guangdie.png" alt="" class="img_guangdie">
        <img src="@/assets/gunzi.png" alt="" class="img_gunzi" :class="{img_gunzi_active:!isbtnShow}">
        <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!isbtnShow,img_ar_pauesd:isbtnShow}" @click="lyricListshow">
    </div>
     <div class="musicLyric" ref="Lyric" v-show="!isLyricShow" @click="lyricListshow" style="transition: all 0.5s ease-out;">
         <p v-for="(item,i) in lyric" :key="i" :class="{active:(currentTime*1000>=item.time && currentTime*1000<=item.pre)}">
            {{item.lrc}}
         </p>
        </div>      
    <div class="detailFooter">
        <div class="footerTop">
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-aixin"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-changpian"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-xinxi"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-icon-"></use>
         </svg>
        </div>

        <div class="footerContent">
            <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
        </div>

        <div class="footer">
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-xunhuanbofang"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="goplay(-1)">
           <use xlink:href="#icon-shangyishoushangyige"></use>
         </svg>
         <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play">
           <use xlink:href="#icon-zanting"></use>
         </svg>
          <svg class="icon" aria-hidden="true" v-else  @click="play">
           <use xlink:href="#icon-bofang1"></use>
         </svg>
         <svg class="icon" aria-hidden="true"  @click="goplay(1)">
           <use xlink:href="#icon-xiayigexiayishou"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
           <use xlink:href="#icon-zu"></use>
         </svg>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations,mapState } from 'vuex';
export default {
    data(){
        return{
            isLyricShow:true
        }
    },
    mounted(){
        this.updateTime()
    },
    computed:{
        ...mapState(["lyricList","currentTime","playListindex","playList","duration"]),
        lyric:function(){
            let arr;
            if(this.lyricList.lyric){//分割歌词与歌词时间的参数
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{                   
                    let min = item.slice(1,3)
                    let sec = item.slice(4,6)
                    let msec = item.slice(7,10);
                    let lrc = item.slice(11,item.length);
                    let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(msec)
                    if(isNaN(Number(msec))){
                        msec=item.slice(7,9)
                        lrc = item.slice(10,item.length)
                        time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(msec)
                    }
                    return {min,sec,msec,lrc,time}
                })
                arr.forEach((item,i) => {//获取下一秒的时间
                    if(i===arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre=100000
                    }else{
                        //console.log('@',item);
                       item.pre = arr[i+1].time
                    }
                });
            }
            return arr
        }
    },
    watch:{
         currentTime:function(newvalue){
           let p = document.querySelector("p.active")
           //console.log([p]);
           //console.log('!!',[this.$refs.Lyric]);
           if(p){
               if(p.offsetTop>=160){
            this.$refs.Lyric.scrollTop = p.offsetTop-160
            }
           }
           if(newvalue===this.duration){
            if(this.playListindex===this.playList.length-1){
               this.updatePlayListIndex(0)
               this.play()
            }else{
               this.updatePlayListIndex(this.playListindex+1)
            }
            
           }
         }
    },
    components:{
        Vue3Marquee
    },
    props:['musicList','isbtnShow','play','addDuration','updateTime'],
    mounted() {
        //console.log('111',this.musicList);
         //console.log(this.lyricList.lyric);
         this.addDuration()
    },
    methods:{
        detailleave(){
              this.updatedetailShow(false)
              this.isLyricShow = true
        },
        lyricListshow(){
              this.isLyricShow = !this.isLyricShow
        },
        goplay(num){
            let index = this.playListindex+num
            if(index<0){
               index=this.playList.length-1 
            }else if(index==this.playList.length){
               index = 0
            }
            this.updatePlayListIndex(index)
        },
        ...mapMutations(['updatedetailShow','updateCurrentTime','updatePlayListIndex','updateDuration']),
    }
}
</script>
<style lang="less" scoped>
    .bgimg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(60px);
    }
    .detailTop{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem;
        fill: #fff;
        .detailTopLeft{
            display: flex;
            align-items: center;
            .icon{
                width: .5rem;
                height: .5rem;
            }
            .leftMarquee{
             margin-left: .2rem;
             width: 4rem;
             height: 100%;
             fill: #999;
             span{
                color: #999;
             }
             .icon{
                width: 0.3rem;
                height: 0.3rem;
                fill: #999;
             }
        }
        }     
        .detailTopRight{
            .icon{
                width: .5rem;
                height: .5rem;
            }
        }  
    }
    .detailContent{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        fill: #fff;
        .img_gunzi{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-20deg);
            transition: all 2s;
        }
        .img_gunzi_active{
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }
        .img_guangdie{
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }
        .img_ar{
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }
        .img_ar_active{
            animation-play-state: running;
        }
        .img_ar_pauesd{
            animation-play-state: paused;
        }
        @keyframes rotate_ar {
            0%{
                transform: rotateZ(0deg);
            }
            100%{
                transform: rotateZ(360deg);
            }
        }
    }
    .musicLyric{
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        fill: #fff;
        margin-top: 10px;
        overflow: scroll;
        p{
           color: rgb(104, 92, 92);
           margin-bottom: .4rem;
           font-size: .4rem;
        }
        .active{
            color: #fff;
            font-size: .5rem;
        }
    }
    .detailFooter{
        width: 100%;
        fill: #fff;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .footerTop{
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon{
                fill: #fff;
                width: .5rem;
                height: .5rem;
            }
        }
        .footerContent{
            .range{
                width: 100%;
                height: 0.06rem;
            }
        }
    }
    .footer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon{
                width: .5rem;
                height: .5rem;
                fill: #fff;
            }
        .icon:nth-child(3){
                width: .9rem;
                height: .9rem;
        }
    }
</style>