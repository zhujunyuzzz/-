<template>
<div>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
         <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
         </svg>
         <span>歌单</span>
        </div>
        <div class="itemRight">
         <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo-copy"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
         </svg>
        </div>
        
    </div>
    <div class="itemMusicTopcontent">
        <img :src="playlist.coverImgUrl" alt="">
        <div class="itemMusicTopcontentright">
            <h2>{{playlist.name}}</h2>
            
            <div class="itemMusicTopcontentrightmid">
             <img :src="playlist.creator.avatarUrl" alt="">
             <span>{{playlist.creator.nickname}}</span>
             <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-xiangyoujiantou"></use>
             </svg>
            </div>
            
            <span>{{playlist.description}}</span>
        </div>
    </div>

    <div class="itemMusicTopicon">
     <div class="itemMusicTopiconitem">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-xinxi"></use>
       </svg>
       <span>{{playlist.commentCount}}</span>
     </div>
     <div class="itemMusicTopiconitem">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-lianjie"></use>
       </svg>
       <span>{{playlist.shareCount}}</span>
     </div>
     <div class="itemMusicTopiconitem">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
       </svg>
       <span>下载</span>
     </div>
     <div class="itemMusicTopiconitem">
       <svg class="icon" aria-hidden="true">
         <use xlink:href="#icon-show_duoxuan"></use>
       </svg>
       <span>多选</span>
     </div>
    </div>
</div>    
</template>
<script>
export default {
    setup(props){
        //console.log("props"+props);
        //通过props传值，如果数据拿不到就获取sessionStorage的数据
        if(props.playlist.creator=""){
            props.playlist.creator =JSON.parse(sessionStorage.playlist).creator 
        }
    },
    props:[
        'playlist'
    ]
}
</script>
<style lang="less" scoped>
    .itemMusicTop{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        //padding: .2rem;
        position: relative;
        .itemLeft,.itemRight{
            width: 25%;
            align-content: center;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 .2rem;
            span{
                font-size: .4rem;
                color: white;
            }
            .icon{
                fill: white;//填充颜色
            }
        }
        .bgimg{
            width: 100%;
            height: 11rem;
            position: fixed;
            z-index: -1;
            filter: blur(30px);
            
        }
    }
    .itemMusicTopcontent{
        width: 100%;
        display: flex;
        padding: 0 .2rem;
        justify-content: space-between;
        img{
            border-radius: .3rem;
            width: 2.7rem;
            height: 2.7rem;
        }
        .itemMusicTopcontentright{
            height: 2.7rem;
            margin-left: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            h2{
                font-size: 15px;
                color: #fff;
            }
            .itemMusicTopcontentrightmid{
                display: flex;
                padding: 10px 0;
                align-items: center;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                }
                span{
                    margin-left: .2rem;
                    color: rgb(98, 98, 98);
                    font-size: 15px;
                }
                .icon{
                    fill: rgb(98, 98, 98);
                    width: 12px;
                }
            }
            span{
                font-size: 13px;
               color: rgb(98, 98, 98);
               overflow: hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;

            }
        }
        
    }
    .itemMusicTopicon{
            width: 100%;
            margin-top: .4rem;
            display: flex;
            justify-content: space-around;
            .itemMusicTopiconitem{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .icon{
                    fill: #fff;
                    
                }
                span{
                    padding-top: .1rem;
                    color: #fff;
                    font-size: 0.2rem;
                }
            }
        }
</style>