<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;"
  >
    <el-form-item prop="section_id">
      <el-select v-model="form.section_id" placeholder="路段选择" style="width: 100px;">
       <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="时间范围" prop="dateRange">
      <el-date-picker
         v-model="form.dateRange"
        size="mini"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <!--
    <el-form-item prop="checkList">
      <el-checkbox-group v-model="form.checkList">
        <el-checkbox
          v-for="item in checkOptions"
            :key="item.label"
            :label="item.value"
            >
            {{item.label}}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
-->
    <el-form-item>
      <el-button type="primary" @click="handleFormSubmit">
        <d2-icon name="search"/>查询
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleFormReset">
        <d2-icon name="refresh"/>重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        section_id: "",
        checkList: [],
        dateRange:[],
        start:"",
        end:""
      },
      rules: {
        type: [
          { required: true, message: "请选择一个状态", trigger: "change" }
        ],
        user: [{ required: true, message: "请输入用户", trigger: "change" }]
      },
      value6: "",
      checkOptions: [
        {
          value: "1",
          label: "低速"
        },
        {
          value: "2",
          label: "超速"
        },
        {
          value: "3",
          label: "占用紧急停车道"
        },
        {
           value:"4",
           label:"逆行"  
        }
      ],
      options:[
        {
          value: "1",
          label: "青银高速-涌泉立交桥-饮马立交"
        },
        {
          value: "2",
          label: "青银高速-饮马立交-高密西立交"
        },
        {
          value: "3",
          label: "青银高速-高密西立交-胶州立交"
        }

      ]
    };
  },
  methods: {
    handleFormSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var sd = new Date(this.form.dateRange[0]).toJSON();
          var ed = new Date(this.form.dateRange[1]).toJSON();
          this.form.dateRange=[];
          var stimes =new Date(+new Date(sd)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') ;
          var etimes =new Date(+new Date(ed)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')   
          console.log(stimes);
          this.form.start=stimes;
          this.form.end=etimes;
          this.$emit("submit", this.form);
        } else {
          this.$notify.error({
            title: "错误",
            message: "表单校验失败"
          });
          return false;
        }
      });
    },
    handleFormReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
