import { getPhoneLogin } from '@/request/api/home';
import { getMusicLyric } from '@/request/api/item';
import {createStore} from 'vuex'  
export default createStore({
  state: {
    playList:[{//播放列表
        name: "if we were together ...",
        al:{
            id:135770820,
            pic:109951166592719520,
            picUrl:"http://p4.music.126.net/d1-tEJVOrJFX4bIeirkQ7g==/109951166592719514.jpg",
            pic_str:"109951166592719514"
        },
        id:1892782546,
        ar:[{
          name:"Seto / bbbluelee"
        }]
    }],
    playListindex:0,
    isbtnShow:true,//默认歌曲暂停
    detailShow:false,//歌曲详情页的显示
    lyricList:{},//歌词
    currentTime:0,//当前播放的时间
    duration:0,//歌曲的最大时间
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    User:{}
  },
  getters: {},
  mutations: {
    updateIsbtnShow:function(state,value){
        state.isbtnShow = value
        //console.log(state.isbtnShow);
    },
    updatePlayList:function(state,value){
        state.playList = value
    },
    updatePlayListIndex:function(state,value){
        state.playListindex = value
    },
    updatedetailShow:function(state,value){
      state.detailShow = value
    },
    updateLyricList:function(state,value){
      state.lyricList = value
    },
    updateCurrentTime:function(state,value){
      state.currentTime = value
      //console.log(state.currentTime);
    },
    updateDuration:function(state,value){
      state.duration = value
    },
    pushPlayList: function(state,value){
      state.playList.push(value)
    },
    updateIsLogin:function(state,value){
      state.isLogin = value
    },
    updateToken:function(state,value){
        state.token = value
        sessionStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
        state.User = value
        console.log(state.User);
        sessionStorage.setItem('User',JSON.stringify(value))
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      //console.log(res.data.lrc);
      context.commit('updateLyricList',res.data.lrc)
    },
    getLogin: async function(context,value){
      let res = await getPhoneLogin(value)
      return res
    }
  },

  modules: {}
})
