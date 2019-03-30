<template>
  <div>
    <el-form :inline="true" size="mini">
      <el-form-item :label="`已选数据下载 [ ${multipleSelection.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadXlsx(multipleSelection)"
          >xlsx</el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadCsv(multipleSelection)"
          >csv</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!--
      <el-table-column label="事件id" >
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      -->
      <el-table-column label="路段" width="200">
        <template slot-scope="scope">
          <el-tag size="mini" type="success">{{scope.row.section_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="scope">
          <el-tag size="mini" type="warning" v-if="scope.row.incident_type=='0'">低速</el-tag>
          <el-tag size="mini" type="warning" v-if="scope.row.incident_type=='1'">超速</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.incident_type=='2'">占用紧急车道</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.incident_type=='3'">逆行</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.incident_type=='4'">变道</el-tag>
          <el-tag size="mini" type="danger" v-if="scope.row.incident_type=='5'">违停</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="检验状态">
        <template slot-scope="scope">
          <boolean-control
            :value="scope.row.checking"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }"
          >
            <d2-icon
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"
            />
            <d2-icon
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
              slot="inactive"
            />
          </boolean-control>
        </template>
      </el-table-column>
      <el-table-column label="车型">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" v-if="scope.row.car_type=='1'">小型车</el-tag>
          <el-tag size="mini" type="success" v-if="scope.row.car_type=='2'">中型车</el-tag>
          <el-tag size="mini" type="success" v-if="scope.row.car_type=='3'">大型车</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="车牌" width="120">
        <template slot-scope="scope">
          <el-tag size="mini">{{scope.row.license_plate}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="距离" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag size="mini" type="info">{{scope.row.distance+"m"}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="最后一次审查员" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag size="mini" type="info">{{scope.row.user_name}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.create_time}}</template>
      </el-table-column>

      <el-table-column label="审查状态">
        <template slot-scope="scope">
          <el-tag size="mini" :type="scope.row.end ? 'info' : ''">{{scope.row.used ? '已完成' : '审查中'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="150" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.update_time}}</template>
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
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="事件修改" :visible.sync="dialogVisible">
      <el-form :model="form"  ref="form"  label-width="80px" size="small">
        <el-form-item
          prop="incident_type"
          label="事件类型"
          :rules="[{ required: true, message: '不能为空'}]"
        >
          <el-select v-model="form.incident_type" placeholder="请选择">
            <el-option
              v-for="item in optionsIncident"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="car_type" label="车型" :rules="[{ required: true, message: '不能为空'}]">
          <el-select v-model="form.car_type" placeholder="请选择">
            <el-option
              v-for="item in optionsCarType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="license_plate" label="车牌" :rules="[{ required: true, message: '不能为空'}]">
          <el-input
            v-model="form.license_plate"
            style="width: 220px;padding-right:10px;"
            label="车牌"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lane" label="车道" :rules="[{ required: true, message: '不能为空'}]">
          <el-input-number v-model="form.lane" :min="0" :max="6" label="车道"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="saveIncident">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import BooleanControl from "../BooleanControl";
import BooleanControlMini from "../BooleanControlMini";
import * as api from "@api/event/query";
export default {
  components: {
    BooleanControl,
    BooleanControlMini
  },
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      form: {
        incident_type: "",
        car_type: "",
        license_plate: "",
        lane: "",
        id: ""
      },
      optionsIncident: [
        {
          value: "0",
          label: "低速"
        },
        {
          value: "1",
          label: "超速"
        },
        {
          value: "2",
          label: "占用紧急车道"
        },
        {
          value: "3",
          label: "逆行"
        },
        {
          value: "4",
          label: "变道"
        },
        {
          value: "5",
          label: "违停"
        }
      ],
      optionsCarType: [
        {
          value: "1",
          label: "小型车"
        },
        {
          value: "2",
          label: "中型车"
        },
        {
          value: "3",
          label: "大型车"
        }
      ],
      dialogVisible: false,
      currentTableData: [],
      multipleSelection: [],
      downloadColumns: [
        { label: "路段", prop: "section_name" },
        { label: "类型", prop: "incident_type" },
        { label: "车型", prop: "car_type" },
        { label: "车牌", prop: "license_plate" },
        { label: "距离", prop: "distance" },
        { label: "检验状态", prop: "checking" },
        { label: "最后一次管理员", prop: "user_name" },
        { label: "创建时间", prop: "create_time" },
        { label: "审查状态", prop: "end" },
        { label: "更新时间", prop: "update_time" }
      ]
    };
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val;
      },
      immediate: true
    }
  },
  methods: {
    handleSwitchChange(val, index) {
      const oldValue = this.currentTableData[index];
      this.$set(this.currentTableData, index, {
        ...oldValue,
        type: val
      });
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    downloadDataTranslate(data) {
      return data.map(row => ({
        ...row,
        type: row.is_checked ? "未检验" : "未检验",
        used: row.used ? "已完成" : "审查中"
      }));
    },
    handleDownloadXlsx(data) {
      var myDate=new Date();
      var m=myDate.getMonth()+1;
      var d=myDate.getFullYear()+'-'+m+'-'+myDate.getDate();
      this.$export
        .excel({
          title: "高速公路事件导出-"+d,
          columns: this.downloadColumns,
          data: this.downloadDataTranslate(data)
        })
        .then(() => {
          this.$message("导出表格成功");
        });
    },
    saveIncident() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            message: "事件修改成功",
            type: "success"
          });
          api
            .updateIncident(this.form)
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            message: "请重新检查输入",
            type: "false"
          });
        }
      });
    },
    close() {
      this.dialogVisible = false;
    },
    openEditForm(entity) {
      console.log("打开编辑窗口");
      this.form = {};
      this.form.id = entity.id;
      this.dialogVisible = true;
    },
    handleDownloadCsv(data) {
      var myDate=new Date();
      var m=myDate.getMonth()+1;
      var d=myDate.getFullYear()+'-'+m+'-'+myDate.getDate();
      this.$export
        .csv({
          title: "高速公路事件导出-"+d,
          columns: this.downloadColumns,
          data: this.downloadDataTranslate(data)
        })
        .then(() => {
          this.$message("导出CSV成功");
        });
    }
  }
};
</script>
