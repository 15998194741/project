<template>
  <div class="mail-container">
    <div class="role-container-header" >
    <ul style="margin-top: 5px;margin-bottom: -5px;">
      <li><el-button slot="reference" icon="el-icon-refresh" size='small' class="button-with-header"  @click='filterFormChange'>刷新</el-button></li>
      <li> <el-button  slot="append" icon="el-icon-circle-plus-outline" size='small' class="button-with-header" :disabled='fenghaocaozuo' @click='dialogFormchange = true'>新建邮件</el-button></li>
    </ul>
  </div>
  <div class="role-container-search">
    <div class="server-container">ID：
      <el-input v-model="filterForm.value" placeholder="请输入邮件ID" size='small' class="input-with-select" > </el-input>
      <el-button slot="append" icon="el-icon-search" size='small' class="button-with-select" name='truesearch' @click="filterFormChange('click')"> </el-button>
    </div>
    <div class="comprehensive-container">
      <div v-for='(i,index) in selectForm' :key='index'  class="select-item"  > {{i.label}}:
        <el-select v-model="filterForm[i.key]" :multiple="i['multiple']" placeholder="请选择"  :filterable='i.filterable' size='small' style="border-radius: 10px;" @change="filterFormChange('change')" >
          <el-option v-for="(item,index) in i.options" :key="index"  :label='item.label' :value="item.value" >
          </el-option>
        </el-select>
      </div>
      <span style="width: 3vw;">时间：</span>
      <el-date-picker   v-model="filterForm['setime']"  size='small' type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"   @change="filterFormChange('change')">
      </el-date-picker>
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
    <el-table-column v-for='(column,index) in tablecolumn' :key='index'  :label="column.label">
      <template slot-scope="scope">{{ scope.row[column.prop] }}</template>
    </el-table-column>
    <el-table-column  prop='status' label="操作">
      <template slot-scope="scope">
        <el-button  v-show='scope.row["changeshow"]' @click="placardmodify(scope.$index,scope.row)">修改</el-button>
        <el-button  v-show='scope.row["changeshow"]' @click="placardmodify(scope.$index,scope.row)">发布</el-button>
      </template>
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
  <el-dialog title="新建邮件" :visible.sync="dialogFormchange" class="announceddialog"  :close-on-click-modal="false">
    <div class="container">
        <div >  
          <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item  label="邮件标题" prop="pass">
              <el-input v-model='createFormMail.title'  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮件正文" prop="checkPass">
              <el-input v-model='createFormMail.text' type="textarea"  :rows='6' autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  label="全服邮件" prop="pass">
              <el-switch
              v-model='createFormMail.allServerTrue'
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
              </el-form-item>
            <el-form-item v-show='!createFormMail.allServerTrue' label="玩家ID" prop="age">
              <el-input  v-model='createFormMail.roleId' ></el-input>
            </el-form-item>
          </el-form>
        </div>
              <div>
                <el-form ref="ruleForm" :model="createFormMail" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item v-show='!createFormMail.allServerTrue' label="邮件链接" prop="pass">
                  <el-input v-model='createFormMail.mailLink'  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-show='!createFormMail.allServerTrue' label="平台:">
                  <el-select  v-model='createFormMail.plaform'  placeholder="请选择" size='small' style="border-radius: 10px;" >
                    <el-option   label='不限制' value="" ></el-option>
                    <el-option   label='安卓' value="1" ></el-option>
                      <el-option   label='苹果' value="2" ></el-option>
                  </el-select>
                 
                </el-form-item>
                <el-form-item v-show='!createFormMail.allServerTrue' label="客户端:">
                  <el-select v-model='createFormMail.channel'  multiple placeholder="请选择" size='small' style="border-radius: 10px;" >
                    <el-option v-for="(item,index) in selectForm[1].options"   :key="index"  :label='item.label' :value="item.value" >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="服务器:">
                  <el-select v-model='createFormMail.serverName' multiple placeholder="请选择" size='small' style="border-radius: 10px;" @change='queryMarqueeweights' >
                    <el-option v-for="(item,index) in servernamesselect"   :key="index"  :label='item.label' :value="item.value" >
                    </el-option></el-select>
                </el-form-item>
                <el-form-item label="携带附件" prop="pass">
                  <el-switch
                  v-model='createFormMail.carryAnnex'
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                  </el-form-item>
              </el-form>
              </div>
   </div>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormchange = false">取 消</el-button>
       <el-button type="primary" @click='postannounced'>确 定</el-button>
     </div>
   </el-dialog>
  </div>
</template>

<script>
// import elementResizeDetectorMaker from 'element-resize-detector';
import { findComponents } from '@/api/components.js';
import { findServername } from '@/api/character.js';

export default {
  name: 'rolequery',
  data() {
    return {
      serverCreatedialogFormVisible: false,
      dialogFormchange: false,
      file: '',
      servernamesselect: [],
      filelist: [],
      multipleTable: '',
      total: 0,
      createFormMail: {
        title: '',
        text: '',
        allServerTrue: false,
        roleId: '',
        mailLink: '',
        plaform: '',
        channel: '',
        serverName: '',
        carryAnnex: false
      },
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
        filterable: false,
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
        filterable: false,
        key: 'channel',
        multiple: true,
        value: '',
        options: []
      },
      {
        label: '服务器',
        key: 'servername',
        filterable: true,
        multiple: false,
        value: '',
        options: [{
          label: '不限制',
          value: ''
        }]
      }, {
        label: '附件',
        key: 'banned_area',
        filterable: true,
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
      }
      ],
      tableData: [],
      tablecolumn: [
        { label: '邮件ID', prop: 'roleid', width: 50 },
        { label: '邮件标题', prop: 'account_id', width: 50 },
        { label: '平台', prop: 'role_name', width: 25 },
        { label: '客户端', prop: 'plaform', width: -50 },
        { label: '区服名', prop: 'plaform', width: -50 },
        { label: '玩家ID', prop: 'plaform', width: -50 },
        { label: '邮件内容', prop: 'plaform', width: -50 },
        { label: '附件', prop: 'plaform', width: -50 },
        { label: '发送时间', prop: 'plaform', width: -50 }
        

      ],

      screenWidth: 145,
      screenHeight: '',
      tableTrue: []
    };
    
  },
  async mounted() {
    let res = await findComponents({ code: 'areaclothing', gameid: this.gameid });
    let components = res.data.values.map(item=>({
      label: item,
      value: item
    }));
    this.selectForm[1].options = this.selectForm[1].options.concat(components);
    this.clientOptions = components;
    let { data } = await findServername();
    data.map(item =>{
      this.selectForm[2].options.find(ele => ele.label === item.label) || !item.label
        ? item : this.selectForm[2].options.push(item);
    });
    // const _this = this;
    // const erd = elementResizeDetectorMaker();
    // erd.listenTo(document.getElementById('body'), element =>{
    //   this.screenWidth = element.offsetWidth / (this.tablecolumn.length + 1);
    // //   switch (element.offsetWidth) {
    // //     case 1840: break;
    // //     case 1700: this.screenWidth = '30%'; break;
    // //   }
    // });





  }


  
};
</script>

<style lang="scss" rel="stylesheet/scss">
.mail-container{

  .container{
        display: grid;
        grid-template-columns: 2fr 2fr;
        margin-top: 2%;
      }


  .selectID {
    span:first-child{
      display: none;
    }
  }


  .success-feng{
    background-color: rgba(255,0,0,0.4);
  }
  .success-jiny{
    background-color: rgba(255,155,0,0.3);

  }
  .el-table td, .el-table th.is-leaf{
    text-align: center;
  }
    .demo-table-expand{
      display: grid;
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
    width: 100%;
    display: flex;
    label{
      float: left;
    }
    /* text-align: center; */
  }
    }
  .role-container-body{
    margin: 10px;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    min-height:645px;
    /* -webkit-box-shadow: 1px 1px 4px 0px #828282; */
    box-shadow: 1px 1px 4px 0px #828282;
    .el-table .cell{
      word-break: keep-all;
    } 
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
        border-radius: 30px 0 0 30px;
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

    .createFormAlertBodys div{
      display: flex;
    }

    .createFormAlert{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
      .el-select{
        display: block;
      }
  }






}


</style>

