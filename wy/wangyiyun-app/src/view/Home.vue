<template>
    <div class="home">
        <TopNav/>
        <SwiperTop/>
        <IconList/>
        <MusicList/>
    </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue';
import SwiperTop from '@/components/home/SwiperTop.vue';
import IconList from '@/components/home/IconList.vue';
import MusicList from '@/components/home/MusicList.vue';
export default {
    name:'Home',
    components:{
        TopNav,
        SwiperTop,
        IconList,
        MusicList
    }
}   
</script>

<style lang="less">
    .iconList{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: .2rem;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>

