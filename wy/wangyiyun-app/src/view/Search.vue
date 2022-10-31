<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input type="text" placeholder="陈奕迅" v-model="searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
        <p class="searchSpan">历史</p>
        <div class="searchHistoryitem">
           <span v-for="item in KeyWorldList" :key="item" class="spanKey" @click="searchHistory(item)">
               {{item}}
           </span>
        </div>
        <svg class="icon" aria-hidden="true" @click="delHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
    </div>
    <div class="itemContent" v-for="(item,index) in searchList" :key="index">          
               <div class="itemContentLeft" @click="updateIndex(item)">
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
</template>
<script>
import { getSearchMusic } from '@/request/api/item'
export default {
    data(){
        return{
            KeyWorldList:[],//历史记录
            searchKey:"",//搜索框的数据
            searchList:[],//搜索出来的数据
        }
    },
    mounted(){
        if(localStorage.getItem('KeyWorldList')){
            this.KeyWorldList = JSON.parse(localStorage.getItem('KeyWorldList'))
        }   
    },
    methods:{
        enterKey:async function(){
            if(this.searchKey.trim()){               
                 this.KeyWorldList.unshift(this.searchKey);
                 //去重
                 this.KeyWorldList=[...new Set(this.KeyWorldList)]
                 //固定长度
                 if(this.KeyWorldList.length>5){
                    this.KeyWorldList.pop()
                 }
                 localStorage.setItem('KeyWorldList',JSON.stringify(this.KeyWorldList))
                 let res = await getSearchMusic(this.searchKey)
                 console.log(res.data.result.songs);
                 this.searchList = res.data.result.songs
                 this.searchKey=""
            }
             
        },
        delHistory:function(){
             localStorage.removeItem('KeyWorldList')
             this.KeyWorldList=[]
        },
        searchHistory:async function(item){
            let res = await getSearchMusic(item)
           this.searchList = res.data.result.songs
        },
        updateIndex:function(item){
            console.log(item);
           this.$store.commit("pushPlayList",item)
           this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
        }
    },
}
</script>
<style lang="less" scoped>
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        input{
            margin-left: .4rem;
            border: none;
            border-bottom: 1px solid #999;
            width: 90%;
            padding: .1rem;
        }
    }
    .searchHistory{
        width: 100%;
        padding: .2rem;
        position: relative;
        .searchSpan{
            font-weight: 700;
        }
        .searchHistoryitem{
               .spanKey{
                padding: 0.1rem .2rem;
                background-color: rgb(185, 169, 169);
                border-radius: .4rem;
                margin: .1rem .2rem;
                display: inline-block;
                   }
              }
        
        .icon{
            width: .4rem;
            height: .4rem;
            position: absolute;
            top: .4rem;
            right: .4rem;
        }
    }
    .itemContent{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding:0.2rem;
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
</style>