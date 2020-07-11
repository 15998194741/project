<template>
  <div class="role-container">
    <div class="role-container-header" >
    <ul>
      <li><el-button  slot="reference" icon="el-icon-upload2" size='small' class="button-with-header"  >导入</el-button></li>
      <li><el-button  slot="reference" icon="el-icon-download" size='small' class="button-with-header"  >导出</el-button></li>
      <li><el-button slot="reference" icon="el-icon-refresh" size='small' class="button-with-header" >刷新</el-button></li>
      <li> <el-button  slot="append" icon="el-icon-circle-plus-outline" size='small' class="button-with-header">封号禁言</el-button></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" rel="stylesheet/scss">
.role-container{
  .role-container-header ul li{
    float: right;
    margin-left: 2px;
    button{
      border-radius: 30px;
    }
    button:focus{
      box-sizing: content-box;
    }

  }
  .role-container-header ul{
    display: flex;
    justify-content: flex-end;
  }






}
</style>
