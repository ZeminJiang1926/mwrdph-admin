<template>
  <el-dialog
    title="路段信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    @opened="dialogOpen"
  >
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item
        prop="name"
        label="路段名"
        style="width: 265px;"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="radar_count" label="雷达数" :rules="[{ required: false, message: '不能为空'}]">
        <el-input-number v-model="form.radar_count" :min="1" :max="1000" label="雷达数"></el-input-number>
      </el-form-item>
      <el-form-item prop="camera_count" label="摄像头数" :rules="[{ required: true, message: '不能为空'}]">
        <el-input-number v-model="form.camera_count" :min="1" :max="1000" label="摄像头数"></el-input-number>
      </el-form-item>
      <el-form-item prop="lnglat" label="经纬度" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.lnglat" style="width: 180px;padding-right:10px;"></el-input>
        <el-button type="primary" :loading="loading" @click="mapVisible=true">坐标拾取</el-button>
        <el-dialog title="坐标拾取" :visible.sync="mapVisible" append-to-body>
          <el-form-item>
            <div style="text-align:center;">
              <i class="el-icon-location"></i>
              position: [{{ lng }}, {{ lat }}]
            </div>
          </el-form-item>
          <el-form-item>
            <div class="amap-wrapper">
              <el-amap vid="amapDemo" class="amap-demo" :events="events"></el-amap>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="toolbar" style="text-align:center;">
              <el-button-group>
                <el-button type="primary" :loading="loading" @click="saveLngLat">保存</el-button>
                <el-button @click="close">取消</el-button>
              </el-button-group>
            </div>
          </el-form-item>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveInterface">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import * as interfaceService from "@/api/manager/section";
export default {
  name: "interfaceEditForm",
  props: {
    entity: Object,
    value: Boolean,
    isEdit: Boolean
  },

  data() {
    let self = this;
    this.chartSettings = {
      key: "4b5f2cf2cba25200cc6b68c398468899",
      v: "1.4.3",
      amap: {
        resizeEnable: true,
        center: [120.14322240845, 30.236064370321],
        zoom: 10
      }
    };
    this.chartTooltip = { show: true };
    return {
      events: {
        click(e) {
          console.log(e.lnglat);
          let { lng, lat } = e.lnglat;
          self.lat = lat;
          self.lng = lng;
          //document.getElementById("lnglat").value = lng + "," + lat;
          //self.form.lnglat = lng + "," + lat;
        }
      },
      loading: false,
      dialogVisible: false,
      form: {
        name: "",
        method: "",
        description: ""
      },
      mapVisible: false,
      chartSeries: [
        {
          type: "scatter",
          coordinateSystem: "bmap",
          data: [
            [120, 30, 1] // 经度，维度，value，...
          ]
        }
      ],
      lng: 0,
      lat: 0,
      lnglat: ""
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
        console.log(this.entity);
        let form = {};
        form.name = this.entity.name;
        form.radar_count = this.entity.radar_count;
        form.camera_count = this.entity.camera_count;
        form.lnglat = this.entity.lng + "," + this.entity.lat;
        this.form = form;
      } else {
        this.form = {};
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
            .updateSection({ ...this.form, lng, lat, id: this.entity.id })
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
            .addSection({ ...this.form, lng, lat, id: this.entity.id })
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
    saveLngLat() {
      this.$message({
        message: "坐标拾取成功",
        type: "success"
      });
      this.form.lnglat = this.lng + "," + this.lat;
      this.mapVisible = false;
    },
    close() {
      this.$refs["form"].resetFields();
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
    },
    function() {
      let amapManager = new VueAMap.AMapManager();
      let o = amapManager.getMap();
      o.on("click", function(e) {
        console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
        //document.getElementById("lnglat").value =
        // e.lnglat.getLng() + "," + e.lnglat.getLat();
      });
    }
  }
};
</script>
<style>
.amap-wrapper {
  width: 100%;
  height: 400px;
}
</style>
