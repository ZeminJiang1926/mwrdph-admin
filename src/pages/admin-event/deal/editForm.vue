<template>
  <el-dialog
    title="审查窗口"
    :visible.sync="dialogVisible"
    width="45%"
    @opened="dialogOpen"
    @closed="dialogClose"
  >
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="role" label="类型">
        <el-select v-model="form.role" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="item">
          <div class="player">
            <video-player
              class="vjs-custom-skin vjs-big-play-centered"
              ref="videoPlayer"
              :options="playerOptions"
              :playsinline="true"
            ></video-player>
          </div>
        </div>
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
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  },
  name: "userEditForm",
  props: {
    user: Object,
    value: Boolean,
    isEdit: Boolean
  },
  data() {
    return {
      playerOptions: {
        height: "260",
        autoplay: false,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            // mp4
            src: "http://132.232.23.142/1-1.mp4"
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ],
        //techOrder: ['flash'],
        poster: "http://132.232.23.142/1-1-5.jpg"
      },
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
        }
      ]
    };
  },
  mounted() {},
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
        form.id = this.user.id;
        form.tel = this.user.tel;
        form.age = this.user.age;
        form.role = this.user.role;
        form.password = this.user.password;
        this.form = form;
      } else {
        this.form = {};
      }
    },
    dialogClose() {
     this.$refs.videoPlayer.player.pause();
     this.$refs.videoPlayer.player.currentTime(0);
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


