<template>
  <el-dialog title="传感器信息" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="name" label="监测点" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="lane_ip" label="网段IP" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.lane_ip"></el-input>
      </el-form-item>

      <el-form-item prop="section_id" label="路段id" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.section_id"></el-input>
      </el-form-item>

      <el-form-item prop="lnglat" label="经纬度" :rules="[{ required: true, message: '不能为空'}]">
        <el-form-item inline:true>
          <el-input v-model="form.lnglat" style="width: 180px;padding-right:10px;"></el-input>
          <el-button type="primary" :loading="loading" @click="mapVisible=true">坐标拾取</el-button>
        </el-form-item>

        <el-dialog title="坐标拾取" :visible.sync="mapVisible" :modal-append-to-body="false">
          <el-form-item>
            <el-input id="lnglat" style="width: 180px; padding-right:10px;" v-model="form.lnglat"></el-input>
            <el-button type="primary" :loading="loading" @click="saveLngLat">保存</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
          <ve-amap
            :settings="chartSettings"
            :series="chartSeries"
            :tooltip="chartTooltip"
            :after-set-option-once="afterSet"
            
          ></ve-amap>
        </el-dialog>

      </el-form-item>
      <el-form-item prop="direction" label="方向">
        <el-switch
          v-model="form.direction "
          active-text="正向"
          active-value="0"
          inactive-text="反向"
          inactive-value="1"
        ></el-switch>
      </el-form-item>
      <el-form-item prop="pc_id" label="工控机ID">
        <el-input v-model="form.pc_id"></el-input>
      </el-form-item>
      <el-form-item prop="radar_alive" label="雷达状态">
        <el-switch
          v-model="form.radar_alive"
          active-text="在线"
          active-value="1"
          inactive-text="离线"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item prop="has_camera" label="摄像头">
        <el-switch
          v-model="form.has_camera"
          active-text="有"
          active-value="1"
          inactive-text="无"
          inactive-value="0"
        >></el-switch>
      </el-form-item>
      <el-form-item prop="camera_alive" label="视频状态">
        <el-switch
          v-model="form.camera_alive"
          active-text="在线"
          active-value="1"
          inactive-text="离线"
          inactive-value="0"
        >></el-switch>
      </el-form-item>
      <!--
      <el-form-item prop="is_deleted" label="删除" :rules="[{ required: true, message: '不能为空'}]">
        <el-switch v-model="form.is_deleted"
          active-text="是"
          inactive-text="否">
        >
        </el-switch >
      </el-form-item>
      -->
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveInterface">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import * as interfaceService from "@/api/manager/sensor";
export default {
  name: "interfaceEditForm",
  props: {
    entity: Object,
    value: Boolean,
    isEdit: Boolean
  },
  data() {
    this.chartSettings = {
      key: "4b5f2cf2cba25200cc6b68c398468899",
      v: "1.4.3",
      amap: {
        resizeEnable: true,
        center: [120.118889, 36.002131],
        zoom: 10
      }
    };
    this.chartTooltip = { show: true };
    return {
      loading: false,
      dialogVisible: false,
      form: {
        name: '',
        lane_ip: '',
        direction: '',
        has_camera: '',
        camera_alive: '',
        radar_alive: '',
        section_id:'',
        lnglat:'',
        pc_id:''
      },
      mapVisible: false,
      chartSeries: [
        {
          type: "scatter",
          coordinateSystem: "bmap",
          data: [
            [120.118889, 36.002131, 1] // 经度，维度，value，...
          ]
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
      if (this.entity.id) {
        let form = {};
        console.log(this.entity);
        form.name = this.entity.name;
        form.lane_ip = this.entity.lane_ip;
        form.direction = this.entity.direction;
        form.pc_id = this.entity.pc_id;
        form.lnglat = this.entity.lng + "," + this.entity.lat;
        form.camera_alive = this.entity.camera_alive;
        form.radar_alive = this.entity.radar_alive;
        form.section_id = this.entity.section_id;
        form.has_camera = this.entity.has_camera;
        this.form = form;
      } else {
        //this.form = {};
      }
    },
    saveInterface() {
      this.$refs["form"].validate(valid => {
        if (valid && this.isEdit == true) {
          let str = this.form.lnglat.split(",");
          let lng = str[0];
          let lat = str[1];
          this.loading = true;
          interfaceService
            .updateDetector({ ...this.form, lng, lat, id: this.entity.id })
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            })
            .catch(() => {
              this.loading = false;
            });
        } else if (valid && this.isEdit == false) {
          let str = this.form.lnglat.split(",");
          let lng = str[0];
          let lat = str[1];
          this.loading = true;
          interfaceService
            .addDetector({ ...this.form, lng, lat, id: this.entity.id })
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            })
            .catch(() => {
              this.loading = false;
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
    saveLngLat() {
      this.$message({
        message: "坐标拾取成功",
        type: "success"
      });
      this.form.lnglat = document.getElementById("lnglat").value;
      this.mapVisible = false;
    },
    afterSet: function(echarts) {
      var amap = echarts
        .getModel()
        .getComponent("amap")
        .getAMap();
      amap.on("click", function(e) {
        console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
        document.getElementById("lnglat").value =
          e.lnglat.getLng() + "," + e.lnglat.getLat();
      });
    }
  }
};
</script>

