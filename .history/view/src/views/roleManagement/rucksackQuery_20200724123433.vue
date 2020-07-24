<template>
  <div class="role-container">
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
      <el-select v-model="filterForm.key"   placeholder="请选择" name='idselect' size='small'>
        <el-option v-for="(item, index) in idoptions" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="filterForm.value" placeholder="请输入内容" size='small' class="input-with-select" >
      </el-input>
      <el-button slot="append" icon="el-icon-search" size='small' class="button-with-select" name='truesearch' @click="filterFormChange('click')">
      </el-button>
      注册时间：
        <el-date-picker  v-model="filterForm.regtime"  size='small'  type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="filterFormChange('change')" >
        </el-date-picker>
        封禁时间：
        <el-date-picker  v-model="filterForm.stime"  size='small'  type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="filterFormChange('change')"  >
        </el-date-picker>
    </div>
   
    <div class="comprehensive-container">
      <div v-for='(i,index) in selectForm' :key='index'  class="select-item"  > {{i.label}}:
        <el-select v-model="filterForm[i.key]" :multiple="i['multiple']" placeholder="请选择" size='small' style="border-radius: 10px;" @change="filterFormChange('change')" >
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
    :row-class-name="tableRowClassName" 
    @selection-change="handleSelectionChange"
    >
    <el-table-column  type="selection" width="40"></el-table-column>
  
    <el-table-column v-for='(column,index) in tablecolumn' :key='index' :width="screenWidth+column.width" :label="column.label">
      <template slot-scope="scope">{{ scope.row[column.prop] }}</template>
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item v-for="(item,index) in tablecolumns" :key='index' :label="item.label">
            <span>{{ props.row[item.prop] }}</span>
          </el-form-item>      
        </el-form>
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

  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
