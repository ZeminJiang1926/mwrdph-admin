<template>
  <d2-container>
    <template slot="header">
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        size="mini"
        style="margin-bottom: -18px;"
      ></el-form>
    </template>
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
      <el-table-column label="传感器ID" prop="detector_id" sortable="custom">
        <template slot-scope="scope">{{scope.row.detector_id}}</template>
      </el-table-column>
      <el-table-column
        label="路段ID"
        prop="section_id"
        sortable="custom"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">{{scope.row.section_id}}</template>
      </el-table-column>
      <el-table-column label="距离" prop="distance" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.distance+"m"}}</template>
      </el-table-column>
      <el-table-column label="速度" prop="speed" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.speed+"m/s"}}</template>
      </el-table-column>
      <el-table-column label="类型" prop="type" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
         <el-tag size="mini" type="warning" v-if="scope.row.type=='0'">低速</el-tag>
          <el-tag size="mini" type="warning" v-if="scope.row.type=='1'">超速</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.type=='2'">占用紧急车道</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.type=='3'">逆行</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发生时间" :show-overflow-tooltip="true">
        <template slot-scope="scope">{{scope.row.created_time}}</template>
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
import * as incidentService from "@/api/event/query";
import editForm from "./editForm";
export default {
  name: "dealPage",
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
        pageIndex: this.page.current,
        pageSize: this.page.size,
        //descending: this.sort.order === "descending",
        //...this.searchForm
      };
      incidentService.getIncidentUnChecked(query).then(data => {
        //console.log(data);
        this.tableData = data;
        this.page.total = data.totalCount;
      });
    },
    getTableDataByname() {
      let query = {
        ...this.searchForm
      };
      incidentService.queryUser(query).then(data => {
        //console.log(data);
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
