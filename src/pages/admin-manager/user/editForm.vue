<template>
  <el-dialog title="用户信息" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action=" 123"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="name" label="用户"  :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!--
      <el-form-item prop="id" label="ID"  :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      -->
      <el-form-item prop="password" label="密码"  :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="tel" label="联系方式">
        <el-input  v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item prop="role" label="角色" >
        <el-select v-model="form.role" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="age" label="年龄">
        <el-input-number v-model="form.age"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import * as userService from "@/api/manager/user";
export default {
  name: "userEditForm",
  props: {
    user: Object,
    value: Boolean,
    isEdit: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        name: "",
        id: "",
        tel: "",
        age: "",
        role: ""
      },
      imageUrl: "",
      options: [
        {
          value: "1",
          label: "审查员"
        },
        {
          value: "2",
          label: "管理员"
        }
      ]
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    dialogOpen() {
      this.$refs.form.resetFields();
      if (this.user.id) {
        let form = {};
        form.name = this.user.name;
        //form.id = this.user.id;
        form.tel = this.user.tel;
        form.age = this.user.age;
        form.role = this.user.role;
        form.password = this.user.password;
        this.form = form;
      } else {
        this.form = {};
      }
    },
    saveUser() {
      this.$refs["form"].validate(valid => {
        if (valid && this.isEdit == true) {
          console.log("编辑窗口");
          this.loading = true;
          userService
            .updateUser({ ...this.form, id: this.user.id })
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            });
        } else if (valid && this.isEdit == false) {
          console.log("新增窗口");
          this.loading = true;
          userService.addUser({ ...this.form, id: this.user.id }).then(data => {
            this.loading = false;
            this.dialogVisible = false;
            this.$emit("submit");
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    /** 
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
      **/
    async beforeAvatarUpload(file) {
      const isSubmit = await this.$confirm(
        "此操作将上传文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
      console.log(isSubmit);
      return isSubmit;
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


