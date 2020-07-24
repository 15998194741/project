<template>
  <div class="ruck-container">
    <div class="role-container-header" >
    <ul>
      <li><el-button  slot="reference" icon="el-icon-upload2" size='small' class="button-with-header"  @click="serverCreatedialogFormVisible = true" >导入</el-button></li>
      <li><el-button  slot="reference" icon="el-icon-download" size='small' class="button-with-header" @click='exportFile' >导出</el-button></li>
      <li><el-button slot="reference" icon="el-icon-refresh" size='small' class="button-with-header"  @click='filterFormChange'>刷新</el-button></li>
      <li> <el-button  slot="append" icon="el-icon-circle-plus-outline" size='small' class="button-with-header" :disabled='fenghaocaozuo' @click='dialogFormchange = true'>封号禁言</el-button></li>
    </ul>
  </div>
  <div class="role-container-search">
    <div class="server-container">ID：
      <el-select v-model="filterForm.key" :label="idoptions.label" :value="idoptions.value"  placeholder="请选择" name='idselect' size='small'>
        <el-option v-for="(item, index) in idoptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="filterForm.value" placeholder="请输入内容" size='small' class="input-with-select" >
      </el-input>
      <el-button slot="append" icon="el-icon-search" size='small' class="button-with-select" name='truesearch' @click="filterFormChange('click')">
      </el-button>
    </div>
  </div>

  <div id='body' class="role-container-body">
    <el-table
    ref="multipleTable"
    border
    :data="tableData" 
    :row-class-name="tableRowClassName" 
    @selection-change="handleSelectionChange"
    >
    <el-table-column  type="selection" width="40"></el-table-column>
    <el-table-column v-for='(column,index) in tablecolumn' :key='index' :width="screenWidth+column.width" :label="column.label">
      <template slot-scope="scope">{{ scope.row[column.prop] }}</template>
    </el-table-column>
  </el-table>
  </div>
  <div class="role-container-bottom">
    <el-pagination
    style="text-align: right;"
    :page-size.sync="filterForm['pagesize']"
    :page-sizes="[10, 20, 30, 40]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :pager-count='9'  
    :hide-on-single-page="false"  
    :total="total"
    :current-page.sync='filterForm.page'
    @size-change="filterFormChange('change')"
    @current-change="filterFormChange('change')" ></el-pagination>
  </div>

  </div>
</template>

<script>
export default {

  name: 'rolequery',
  data() {
    return {
      serverCreatedialogFormVisible: false,
      dialogFormchange: false,
      file: '',
      headers: {
        'fancy-guo-login-token': this.$store.getters.user.token,
        gameid: 1
      
      },
      filelist: [],
      multipleTable: '',
      total: 0,
      filterForm: {
        key: 'roleid',
        value: '',
        regtime: '',
        stime: '',
        plaform: '',
        channel: '',
        servername: '',
        banned_type: '',
        banned_area: '',
        page: 1,
        pagesize: 10
      },
      createFormRules: {
        type: [
          { required: true, message: '请输入至少一个字符', trigger: ['blur', 'change'] }
         
        ],
        area: [
          { required: true, message: '请选择一个平台', trigger: ['blur', 'change'] }
        ],
        time: [
          { required: true, trigger: ['blur', 'change'] }
        ],
        beacuse: [
          { required: true, message: '请输入原因', trigger: ['blur', 'change'] }
        ],
        long: [
          { required: true, message: '请输入时长', trigger: ['blur', 'change'] }
        ]
        
      },
      insertForm: {
        type: '1',
        area: '1',
        time: '1',
        beacuse: '',
        long: ''
        
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
        key: 'servername',
        multiple: false,
        value: '',
        options: [{
          label: '不限制',
          value: ''
        }]
      }, {
        label: '封禁类型',
        key: 'banned_type',
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
        key: 'banned_area',
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
      idoptions: [{
        label: '角色ID',
        value: 'roleid'
      }],
      tableData: [{
        roleid: '', //角色ID
        account_id: '', //用户id
        role_name: '', //角色昵称
        channel: '', //渠道客户端
        distinct_id: '', //设备iD
        machine: '', //设备类型
        plaform: '', //平台                     新增 Android  IOS
        serverid: '', //区服ID                   新增
        update_time: '', //最后登录时间           新增 
        level: '', //等级
        vip_level: '', //vip等级
        sum_recharge: '', //付费总额
        ip: '', //用户Ip地址
        regtime: '', //注册时间
        banned_type: '', //封禁类型   pgsql
        banned_area: '', //封禁范围    pgsql
        banned_reason: '', //封禁原因   pgsql
        banned_time: '', //封禁时长
        stime_etime: ''

      }],
      tablecolumn: [
        { label: '物品ID', prop: 'roleid', width: 50 },
        { label: '物品名称', prop: 'account_id', width: 50 },
        { label: '物品类型', prop: 'role_name', width: 25 },
        { label: '数量', prop: 'plaform', width: -50 }
    

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
      screenWidth: 145,
      screenHeight: '',
      tableTrue: []
    };
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
.ruck-container{
 



}


</style>
