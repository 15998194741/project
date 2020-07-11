<template>
  <div
id='business-index' class="business-index" style="min-height: 869px;"   >
    <div class="welcome">
    欢迎{{username}}登录
  </div>
    
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
  name: 'business-index',
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters([
      'avatar',
      'nickName',
      'username'
    ])
  },
  mounted() {
  },
  methods: {
  },
  created() {
  
  }
};
</script>

<style lang="scss"  rel="stylesheet/scss" >
.business-index{
 background-image: url(../../styles/images/backimage.png);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
    font-family: cursive;
  background-size: cover;
  /* margin: 0 0 5px 0; */
  min-height: 869px;
  height: 869px;
  .welcome{
    font-size: 100px;
  }
}
#business-index{
  min-height: 869px;
}
</style>
