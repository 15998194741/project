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
  <div class="role-container-search">
    <div class="server-container">ID：
      <el-select v-model="filterForm.key" value='serverid'  placeholder="请选择" name='idselect' size='small'>
        <el-option v-for="(item, index) in idoptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="filterForm.value" placeholder="请输入内容" size='small' class="input-with-select" >
      </el-input>
      <el-button slot="append" icon="el-icon-search" size='small' class="button-with-select" name='truesearch'>
      </el-button>
      注册时间：
        <el-date-picker   v-model="filterForm['srttime']"  size='small' type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
        封禁时间：
        <el-date-picker   v-model="filterForm['srttime']"  size='small' type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  >
        </el-date-picker>
    </div>
   
    <div class="comprehensive-container">
      <div v-for='(i,index) in selectForm' :key='index'  class="select-item"  > {{i.label}}:
        <el-select v-model="filterForm[i.key]" :multiple="i['multiple']" placeholder="请选择" size='small' >
          <el-option v-for="(item,index) in i.options" :key="index"  :label='item.label' :value="item.value" >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>

  <div class="role-container-body">
    <el-table
    ref="multipleTable"

    element-loading-text="拼命加载中" 
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" 
    
    :data="tableData" 
    >
    <el-table-column  type="selection" width="55"></el-table-column>
 
    <el-table-column v-for='column in tablecolumn' :label="column.label"  >
      <template slot-scope="scope">{{ scope.row[column.prop] }}</template>
    </el-table-column>
   
  </el-table>
  </div>
  <div class="role-container-bottom">
页码
  </div>
</div>
</template>

<script>
  import { findComponents } from '@/api/components.js';

export default {

  name: 'rolequery',
  data() {
    return {
      multipleTable:'',
  filterForm: {
        plaform: '',
        display: '',
        load: '',
        channel: '',
        srttime: '',
        key: 'serverid',
        value: '',
        test: '',
        mergeserver: '',
        page: 1,
        pagesize: 10
      },
  selectForm: [{
        label: '平台',
        multiple: false,
        key: 'plaform',
        value: '',
        options: [
          {
            label: '不限制',
            value: ''
          }, {
            label: 'Android',
            value: '1'

          }, {
            label: 'IOS',
            value: '2'
          }]
      }, {
        label: '客户端',
        key: 'channel',
        multiple: true,
        value: '',
        options: []
      },
      {
        label: '服务器',
        key: 'display',
        multiple: false,
        value: '',
        options: [{
          label: '不限制',
          value: ''
        }, {
          label: '空闲',
          value: '1'

        }, {
          label: '繁忙',
          value: '2'
        }, {
          label: '维护',
          value: '3'
        }, {
          label: '爆满',
          value: '4'
        }, {
          label: '停用',
          value: '5'
        }]
      }, {
        label: '封禁类型',
        key: 'load',
        multiple: false,
        value: '',
        options: [{
          label: '不限制',
          value: ''
        }, {
          label: '封号',
          value: '1'

        }, {
          label: '禁言',
          value: '2'
        },]
      }, {
        label: '封禁范围',
        key: 'mergeserver',
        multiple: false,
        value: '',
        options: [{
          label: '不限制',
          value: ''
        }, {
          label: '角色',
          value: '1'

        }, {
          label: '账户',
          value: '2'
        }, {
          label: 'IP',
          value: '3'
        }]
      }
      ], 
      tableData: [{
        plaform: '123',
        display: '456',
        load: '789',
        channel: '123',
        srttime: '123',
        key: '123',
        value: '',
        test: '',
        mergeserver: '',
        page: '',
        pagesize: '',
        gameid: ''
      }],
      tablecolumn:[
          {label:'角色ID',prop:'plaform'},
          {label:'账户ID',prop:'display'},
          {label:'昵称',prop:'display'},
          {label:'平台',prop:'display'},
          {label:'客户端',prop:'display'},
          {label:'设备ID',prop:'display'},
          {label:'设备类型',prop:'display'},
          {label:'区服ID',prop:'display'},
          {label:'等级',prop:'display'},
          {label:'VIP等级',prop:'display'},
          {label:'付费总额',prop:'display'},
          {label:'IP',prop:'display'},
          {label:'注册时间',prop:'display'},
          {label:'最后登录时间',prop:'display'},
          {label:'封禁类型',prop:'display'},
          {label:'封禁原因',prop:'display'},
          {label:'封禁范围',prop:'display'},
          {label:'封禁范围',prop:'display'},
          {label:'封禁时长',prop:'display'},
          {label:'封禁时间-解封时间',prop:'display'},
        ]
    }},
    mounted() {
      findComponents({ code: 'areaclothing', gameid: this.gameid }).then(res => {
      let components = res.data.values.map(item=>({
        label: item,
        value: item
      }));
      this.selectForm[1].options = this.selectForm[1].options.concat(components);
      this.clientOptions = components;
    });


    },
    created(){
  
    }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.role-container{

  .role-container-body{
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    min-height:670px;
    /* -webkit-box-shadow: 1px 1px 4px 0px #828282; */
    box-shadow: 1px 1px 4px 0px #828282;
  }
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
  .server-container {
        border-bottom: 1px #bdbdbd dashed;
        padding: 10px;
      }
      .input-with-select {
      width: 250px;
      margin-left: -4px;
      border-radius: 0;

      input {
        border-radius: 0;
      }
    }
    .comprehensive-container .select-item {
      margin-left: 10px;
      width: 20%;
    }

    .comprehensive-container {
      .select-item:first-child {
        margin-left: -5px;
        width: 19%;
      }}
      .comprehensive-container {
        display: flex;
        padding: 10px;
        align-items: baseline;

      }
      .role-container-search {
      margin: 10px;
      background-color: white;
      border-radius: 5px;
      padding: 5px;
      box-shadow: 1px 1px 4px 0px #828282;
      button[name='truesearch']{
            border-radius: 0 30px 30px 0;
            margin-left: -5px;
            height: 32px
      }
      input[name='idselect'] {
      border-radius: 30px 0 0 30px;
      width: 100px;
      /* height: 30px; */
    }
      .server-container {
        border-bottom: 1px #bdbdbd dashed;
      }

      .comprehensive-container {
        display: flex;
        padding: 10px;
        align-items: baseline;

      }
    }




}
</style>
