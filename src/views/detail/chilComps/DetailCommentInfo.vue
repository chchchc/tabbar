<template>

<div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">

  <div class="info-header">
    <div class="header-title">用户评价</div>
    <div class="header-more">更多
      <i class="arrow-right"></i>
    </div>
  </div>

  <div class="info-user">
    <img :src="commentInfo.user.avatar" class="user-img">
    <span class="user-name">{{commentInfo.user.uname}}</span>
  </div>

  <div class="info-detail">
    <p>{{commentInfo.content}}</p>
    <div class="info-other">
      <span class="date">{{commentInfo.created | showDate}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="info-imgs">
      <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
    </div>
  </div>
</div>

</template>

<script>
import {formateDate} from "@/common/utils.js"

export default {
  name:"DetailCommentInfo",
  props:{
    commentInfo:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  filters:{
    showDate(value){
      //将时间戳转成Date对象
      const date = new Date(value * 1000)
      //将date格式化
      return formateDate(date,'yyyy-MM-dd')
    }
  }

}
</script>

<style scoped>
.info-header{
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}
.header-more{
  font-size: 14px;
}
.info-user{
  padding-top:20px ;
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
}
.info-user .user-img{
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.info-user.user-name{
  font-size: 16px;
  margin-left: 10px;
}
.info-detail{
  padding:0 20px;
  font-size: 14px;
  color: #524e4e;
}
.info-detail .date{
  padding-right: 10px;
}
.info-imgs img{
  width: 65px;
  height: 65px;
  padding:10px 10px 10px 0;
}
</style>
