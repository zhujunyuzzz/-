<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bofang"></use>
                </svg>
                <span>播放全部<span>(共{{itemlist.length}}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <span>收藏（{{playlist.subscribedCount}}）</span>
            </div>
        </div>
        <div class="itemContent" v-for="(item,index) in itemlist" :key="index">          
               <div class="itemContentLeft" @click="playMusic(index)">
                   <span>{{index+1}}</span>
                   <div class="itemContentLeftItem">
                    <h5>{{item.name}}</h5>
                    <div class="itemContentLeftItemSpan">
                       <span v-for="(itemAR,index) in item.ar" :key="index">{{itemAR.name}}</span>
                    </div>          
                   </div>
               </div>
               <div class="itemContentRight">
                <svg class="icon" aria-hidden="true" v-if="item.mv>0">
                  <use xlink:href="#icon-icon-shipinbofang"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-31liebiao"></use>
                </svg>
               </div>            
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
export default {
    setup(props){
        //console.log('itemmusic'+props);
    },
    props:[
        'playlist','itemlist'
    ],
    computed:{
        ...mapState(['isbtnShow','updateCurrentTime'])
    },
    methods:{
        playMusic(index){
           this.updatePlayList(this.itemlist) 
           this.updatePlayListIndex(index)
           if(this.isbtnShow){
              this.updateIsbtnShow(false)
           }         
        },
        
        ...mapMutations(['updatePlayList','updatePlayListIndex','updateIsbtnShow'])
    }
}
</script>
<style lang="less">
    .itemMusicList{
        width: 100%;
        background-color: #fff;
        padding: 0 0.2rem;
        margin-top: 0.3rem;
        border-top-left-radius:0.4rem ;
        border-top-right-radius:0.4rem ;
        .itemListTop{
            padding-top: .1rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .listLeft{
                display: flex;
                align-items: center;
                padding:.2rem 0;
                .icon{
                    margin-right: .2rem;
                    fill: rgb(0, 0, 0);
                }
                span{
                    color: rgb(0, 0, 0);
                    font-weight: 800;
                    span{
                        font-size: 0.2rem;
                        color: rgb(98, 98, 98);
                    }
                }
            }
            .listRight{
                display: flex;
                align-items: center;
                padding: .2rem .1rem;
                background-color: red;
                border-radius: 2rem;
                .icon{
                    fill: #fff;
                }
                span{
                    color: #fff;
                    
                }
            }
        }
        .itemContent{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding:0.2rem 0;
            .itemContentLeft{
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    color: rgb(98, 98, 98);
                    font-size: 0.3rem;
                }
                .itemContentLeftItem{
                    margin-left: .3rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    h5{
                       color: rgb(0, 0, 0);
                       font-weight: 900;
                       font-size: 0.3rem;
                    }
                    .itemContentLeftItemSpan{
                       span{
                       color: rgb(98, 98, 98);
                       font-size: 0.2rem;
                       margin-right: .1rem;
                    }
                    }              
                }
            }
            .itemContentRight{
                    display: flex;
                    justify-content: space-between;
                    .icon{
                        fill: rgb(98, 98, 98);
                        margin-left: 0.5rem;
                    }
            }
        }
    }

</style>