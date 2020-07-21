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
      <el-select v-model="filterForm.key"   placeholder="请选择" name='idselect' size='small'>
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

  <div id='body' class="role-container-body">
    <el-table
    ref="multipleTable"
    border
    :data="tableData" 
    >
    <el-table-column  type="selection" width="40"></el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for="(item,index) in tablecolumns" :key='index' :label="item.label">
            <span>{{ props.row[item.prop] }}</span>
          </el-form-item>      
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-for='(column,index) in tablecolumn' :key='index' :width="screenWidth+column.width" :label="column.label">
      <template slot-scope="scope">{{ scope.row[column.prop] }}</template>
    </el-table-column>
   
  </el-table>
  </div>
  <div class="role-container-bottom">
页码{{screenWidth}}--{{screenHeight}}
  </div>
</div>
</template>

<script>
import { findComponents } from '@/api/components.js';
import elementResizeDetectorMaker from 'element-resize-detector';
import { queryCharacter } from '@/api/character.js';
export default {

  name: 'rolequery',
  data() {
    return {
      multipleTable: '',
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
        label: '服务器名称',
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
        }]
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
        }, {
          value: '',
          label: '关键字'
        }]
      }
      ],
      idoptions: [{
        label: '角色ID',
        value: 'serverid'

      }, {
        label: '账户ID',
        value: '2'
      }, {
        label: 'IP',
        value: '3'
      }, {
        value: '',
        label: '关键字'
      }

      ],
      tableData: [{
        roleid: '123', //角色ID
        account_id: '456', //用户id
        role_name: '789', //角色昵称
        channel: '123', //渠道客户端
        distinct_id: '123', //设备iD
        machine: '123', //设备类型
        palform: '123', //平台                     新增 Android  IOS
        serverid: '123', //区服ID                   新增
        update_time: '123', //最后登录时间           新增 
        level: '123', //等级
        vip_level: '123', //vip等级
        sum_recharge: '123', //付费总额
        ip: '123', //用户Ip地址
        regtime: '123', //注册时间
        banned_type: '123', //封禁类型   pgsql
        banned_area: '123', //封禁范围    pgsql
        banned_reason: '123', //封禁原因   pgsql
        banned_time: '123', //封禁时长
        stime_etime: '123'

      }],
      tablecolumn: [
        { label: '角色ID', prop: 'roleid', width: 50 },
        { label: '账户ID', prop: 'account_id', width: 50 },
        { label: '昵称', prop: 'role_name', width: 25 },
        { label: '平台', prop: 'palform', width: -50 },
        { label: '客户端', prop: 'channel', width: -50 },
        { label: '设备ID', prop: 'distinct_id', width: 53 },
        { label: '设备类型', prop: 'machine', width: -20 },
        { label: '区服名称', prop: 'vip_level', width: 15 },
        { label: '区服ID', prop: 'serverid', width: 30 },
        { label: '等级', prop: 'level', width: -50 },
        { label: 'VIP等级', prop: 'vip_level', width: -50 }

      ],
      tablecolumns: [
        { label: '付费总额', prop: 'sum_recharge' },
        { label: 'IP', prop: 'ip' },
        { label: '注册时间', prop: 'regtime' },
        { label: '最后登录时间', prop: 'update_time' },
        { label: '封禁类型', prop: 'banned_type' },
        { label: '封禁范围', prop: 'banned_area' },
        { label: '封禁原因', prop: 'banned_reason' },
        { label: '封禁时长', prop: 'banned_time' },
        { label: '封禁时间-解封时间', prop: 'stime_etime' }
      ],
      screenWidth: 160,
      screenHeight: ''
    };
  },
  async mounted() {
    findComponents({ code: 'areaclothing', gameid: this.gameid }).then(res => {
      let components = res.data.values.map(item=>({
        label: item,
        value: item
      }));

   
      this.selectForm[1].options = this.selectForm[1].options.concat(components);
      this.clientOptions = components;
    });
    let res = await queryCharacter();
    this.tableData = res.data;
    // this.screenWidth = document.body.clientWidth;
    // this.screenHeight = document.body.clientHeight;
    // window.onresize = () =>{
    //   return (()=>{
    //     this.screenWidth = document.body.clientWidth;
    //     this.screenHeight = document.body.clientHeight;
    //   })();
    // };
    const _this = this;
    const erd = elementResizeDetectorMaker();
    erd.listenTo(document.getElementById('body'), element =>{
      console.log(element.offsetWidth);
      switch (element.offsetWidth) {
        case 1840: this.screenWidth = 158; break;
        // case 1830: this.screenWidth = 173; break;
        // case 1820: this.screenWidth = 172; break;
        // case 1810: this.screenWidth = 171; break;
        // case 1800: this.screenWidth = 170; break;
        case 1700: this.screenWidth = 145; break;
        // case 1710: this.screenWidth = 161; break;
        // case 1720: this.screenWidth = 162; break;
        // case 1730: this.screenWidth = 163; break;
        // case 1740: this.screenWidth = 164; break;
        // case 1750: this.screenWidth = 165; break;
        // case 1760: this.screenWidth = 166; break;
        // case 1770: this.screenWidth = 167; break;
        // case 1780: this.screenWidth = 168; break;
        // case 1790: this.screenWidth = 169; break;

      }
      // if (element.offsetWidth === 1840) {
      //   this.screenWidth = 174;
      // } else if (element.offsetWidth === 1700) {
      //   this.screenWidth = 160;
      // }
      // _this.$nextTick(()=>{
      //   this.screenHeight = '11123123';
      // });
    });

  },
  created() {
  
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.role-container{
  .el-table td, .el-table th.is-leaf{
    text-align: color: ;;
  }
    .demo-table-expand{display: grid;
    grid-template-columns: repeat(3,1fr);
    width: 100%;
    margin-left: 3%;
    font-size: 18px;
    label{
      width: 140px;
    color: #99a9bf;
    }
    .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
    /* text-align: center; */
  }
    }
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
