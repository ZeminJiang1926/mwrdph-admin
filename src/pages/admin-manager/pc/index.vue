<template>
  <d2-container>
    <template slot="header">
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        size="mini"
        style="margin-bottom: -18px;"
      >
        <el-form-item label="登录名" prop="user_name">
          <el-input v-model="searchForm.user_name" placeholder="登录名" style="width: 120px;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearchFormSubmit">
            <d2-icon name="search"/>查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearchFormReset">
            <d2-icon name="refresh"/>重置
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">新增</el-button>
    <el-button
      v-if="multipleSelection.length>0"
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="batchDel"
    >删除</el-button>
    <el-popover placement="top-start" title="温馨提示" width="400" trigger="hover">
      <li>`路径`与`方法`组合必须唯一</li>
      <el-button slot="reference" size="mini" icon="el-icon-info" style="float:right">操作提示</el-button>
    </el-popover>
    <el-table
      :data="tableData"
      v-loading="loading"
      size="small"
      stripe
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="工控机ID" prop="id" sortable="custom">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="经纬度" prop="lng" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.lng+","+scope.row.lat}}</template>
      </el-table-column>
      <el-table-column label="登录名" prop="user_name" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.user_name}}</template>
      </el-table-column>
      <el-table-column label="用户密码" prop="user_password" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.user_password}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            title="编辑"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openEditForm(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            title="删除"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="[1,100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <edit-form :entity="entity" :isEdit="isEdit" v-model="editFormVisible"  @submit="getTableData"/>
  </d2-container>
</template>
<script>
import * as interfaceService from "@/api/manager/pc";
import editForm from "./editForm";
export default {
  name: "InterfacePage",
  components: { editForm },
  data() {
    return {
      searchForm: {
        id:"",
        user_name:""
        
      },
      loading: false,
      tableData: [],
      multipleSelection: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: "",
        order: ""
      },
      entity: {},
      editFormVisible: false,
      isEdit:true
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let query = {
       ...this.searchForm
      };
      interfaceService.getPC(query).then(data => {
        console.log(data)
        this.tableData = data;
        console.log(data.rows)
        this.page.total = data.totalCount;
      });
    },
    getTableDataByItems() {
      let query = {
       ...this.searchForm
      };
      interfaceService.getPCByItems(query).then(data => {
        console.log(data)
        this.tableData = data;
        console.log(data.rows)
        this.page.total = data.totalCount;
      });
    },
    handleSearchFormSubmit() {
      this.getTableDataByItems();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSortChange(val) {
      this.sort.prop = val.prop;
      this.sort.order = val.order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    openEditForm(entity) {
      this.entity = entity;
      this.editFormVisible = true;
    },
    add() {
      this.entity = {};
      this.editFormVisible = true;
    },
    batchDel() {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        interfaceService
          .delPcs(
            JSON.stringify(this.multipleSelection.map(s => s.id))
          )
          .then(() => {
            this.getTableData();
          });
      });
    },
    del(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        interfaceService.delPC(id).then(() => {
          this.getTableData();
        });
      });
    }
  }
};
</script>
