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
        <el-form-item label="姓名" prop="name">
          <el-input v-model="searchForm.name" placeholder="姓名" style="width: 100px;"/>
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
      <el-table-column label="姓名" prop="name" sortable="custom">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="角色" prop="role" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <p v-if="scope.row.role=='1'">审查员</p>
          <p v-else-if="scope.row.role=='2'">管理员</p>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop="email" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.tel}}</template>
      </el-table-column>
      <el-table-column label="上一次登录时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.last_login_time}}</template>
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
    <edit-form :user="user" :isEdit="isEdit" v-model="editFormVisible" @submit="getTableData"/>
  </d2-container>
</template>
<script>
import * as userService from "@/api/manager/user";
import editForm from "./editForm";
export default {
  name: "UserPage",
  components: { editForm },
  data() {
    return {
      searchForm: {
        name: ""
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
      user: {},
      editFormVisible: false,
      isEdit: true
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let query = {
        //descending: this.sort.order === "descending",
        //...this.searchForm
      };
      userService.getUser(query).then(data => {
        console.log(data);
        this.tableData = data;
        this.page.total = data.totalCount;
      });
    },
    getTableDataByname() {
      let query = {
        ...this.searchForm
      };
      userService.queryUser(query).then(data => {
        console.log(data);
        this.tableData = data;
        this.page.total = data.totalCount;
      });
    },
    handleSearchFormSubmit() {
      this.getTableDataByname();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
      this.getTableData();
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
    openEditForm(user) {
      console.log("打开编辑窗口");
      this.user = user;
      this.isEdit = true;
      this.editFormVisible = true;
    },
    add() {
      this.user = {};
      this.isEdit = false;
      this.editFormVisible = true;
    },
    batchDel() {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        console.log(JSON.stringify(this.multipleSelection.map(s => s.id)));
        userService
          .delUsers(JSON.stringify(this.multipleSelection.map(s => s.id)))
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
        userService.delUser(id).then(() => {
          this.getTableData();
        });
      });
    }
  }
};
</script>
