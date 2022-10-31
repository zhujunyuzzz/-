<template>
    <div>
        <ItemMusicTop :playlist="state.playList"/>
        <ItemMusicList :itemlist="state.itemList" :playlist="state.playList"/>
    </div>
</template>
<script>
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import {getMusicItemList} from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemMusicList from '@/components/item/ItemMusicList'
export default {
    setup(){
        const state = reactive({
            playList:{},
            itemList:[]
        })
        onMounted(async ()=>{
             //console.log(useRoute());
            let id = useRoute().query.id
            console.log(id);
             let res = await getMusicItemList(id)
            state.playList = res.data.playlist
            //console.log('res.data.playlist=>',res.data.playlist);
            state.itemList = res.data.playlist.tracks
            //console.log('@tracks',state.playList);
            //防止页面刷新，数据丢失，存储在sessionStorage
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return {state}
    },
    components:{
        ItemMusicTop,ItemMusicList
    }
}
</script>