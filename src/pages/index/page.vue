<template>
  <d2-container :filename="filename">
    <template>
      <div class="app-container">
        <div class="total-layout">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="total-frame">
                <d2-icon name="user-circle-o" class="icon-user"/>
                <div class="total-title">用户</div>
                <div class="total-value">测试用户001</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-frame">
                <d2-icon name="sliders" class="icon-device"/>
                <div class="total-title">设备上线</div>
                <div class="total-value">50 / 台</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-frame">
                <d2-icon name="check-circle-o" class="icon-check"/>
                <div class="total-title">今日已审阅</div>
                <div class="total-value">352 / 条</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="total-frame">
                <d2-icon name="times-circle-o" class="icon-uncheck"/>
                <div class="total-title">待审查</div>
                <div class="total-value">25 / 条</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="overview-layout">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="out-border">
                <div class="layout-title">设备总览</div>
                <div style="padding: 40px">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple intention_investors">
                        <p class="list_number">264</p>
                        <p>雷达 / 台</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple waitpending_investors">
                        <p class="list_number">137</p>
                        <p>摄像头 / 台</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple pending_investors">
                        <p class="list_number">100</p>
                        <p>工控机 / 台</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="out-border">
                <div class="layout-title">用户总览</div>
                <div style="padding: 40px">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple pay">
                        <p class="list_number">208.65</p>
                        <p>使用时长 / h</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple income">
                        <p class="list_number">+ 12.37 %</p>
                        <p>同比正确率</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple hidden_investors">
                        <p class="list_number">4686</p>
                        <p>总处理 / 条</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="statistics-layout">
          <div class="layout-title">事件统计</div>
          <el-row>
            <el-col :span="4">
              <div style="padding: 20px">
                <div>
                  <div style="color: #909399;font-size: 14px">本月事件总数</div>
                  <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
                </div>
              </div>
            </el-col>
            <el-col :span="20">
              <div style="padding: 10px;border-left:1px solid #DCDFE6">
                <div>
                  <ve-line
                    :data="chartData"
                    :legend-visible="true"
                    :loading="loading"
                    :data-empty="dataEmpty"
                    :settings="chartSettings"
                    :data-zoom="dataZoom"
                  ></ve-line>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>
  </d2-container>
</template>
  </d2-container>
</template>

<script>
import list from "@/pages/index/list/_mixin/list.js";
export default {
  mixins: [list],
  data() {
    this.chartSettings = {
      area: true,
      showDataZoom: true,
      metrics: ["低速", "超速", "占用紧急车道", "逆行"],
      dimension: ["日期"]
    };
    return {
      dataZoom: [
        {
          type: "slider",
          show: false,
          yAxisIndex: [0],
          left: "93%",
          start: 0,
          end: 100
        },
        { type: "inside", show: true, yAxisIndex: [0], start: 0, end: 100 },
        { start: 0, end: 100, height: 20 }
      ],
      imgSrc: [
        { url: "image/welcome_1.png", id: "数据分析" },
        { url: "image/welcome_2.png", id: "精美图表" },
        { url: "image/welcome_3.png", id: "简易操作" }
      ],
      filename: __filename,
      chartData: {
        columns: ["日期", "低速", "超速", "占用紧急车道", "逆行"],
        rows: [
          {
            日期: "1/1",
            低速: 1393,
            超速: 1093,
            占用紧急车道: 432,
            逆行: 2111
          },
          { 日期: "1/2", 低速: 3530, 超速: 3230, 占用紧急车道: 523, 逆行: 411 },
          { 日期: "1/3", 低速: 2923, 超速: 2623, 占用紧急车道: 576, 逆行: 511 },
          { 日期: "1/4", 低速: 1723, 超速: 1423, 占用紧急车道: 249, 逆行: 911 },
          {
            日期: "1/5",
            低速: 3792,
            超速: 3492,
            占用紧急车道: 2323,
            逆行: 111
          },
          {
            日期: "1/6",
            低速: 4593,
            超速: 4293,
            占用紧急车道: 578,
            逆行: 311
          },
          {
            日期: "1/7",
            低速: 2923,
            超速: 2623,
            占用紧急车道: 576,
            逆行: 6111
          },
          {
            日期: "1/8",
            低速: 1723,
            超速: 1423,
            占用紧急车道: 549,
            逆行: 1311
          },
          {
            日期: "1/9",
            低速: 3792,
            超速: 3492,
            占用紧急车道: 1323,
            逆行: 411
          },
          {
            日期: "1/10",
            低速: 4593,
            超速: 4293,
            占用紧急车道: 778,
            逆行: 311
          },
          {
            日期: "1/11",
            低速: 1723,
            超速: 1423,
            占用紧急车道: 749,
            逆行: 211
          },
          {
            日期: "1/12",
            低速: 3792,
            超速: 3492,
            占用紧急车道: 323,
            逆行: 711
          },
          {
            日期: "1/13",
            低速: 4593,
            超速: 4293,
            占用紧急车道: 778,
            逆行: 711
          },
          {
            日期: "1/14",
            低速: 2923,
            超速: 2623,
            占用紧急车道: 676,
            逆行: 511
          },
          {
            日期: "1/15",
            低速: 1723,
            超速: 1423,
            占用紧急车道: 649,
            逆行: 611
          },
          {
            日期: "1/16",
            低速: 3792,
            超速: 3492,
            占用紧急车道: 323,
            逆行: 111
          },
          { 日期: "1/17", 低速: 4593, 超速: 4293, 占用紧急车道: 78, 逆行: 611 }
        ]
      }
    };
  },
  methods: {
    open() {
      const h = this.$createElement;
      this.$notify({
        duration: 2000,
        position: 'bottom-left',
        type: 'success',
        title: "登录提醒",
        message: h(
          "p",
          { style: "color: teal" },
          "上次登录: 2019-03-27 18:20:30 "
        )
      });
    }
  },
  mounted: function() {
    this.open();
  }
};
</script>

<style lang="scss" scoped>
.inner {
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
}
el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}
.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}
.total-icon {
  color: #409eff;
  width: 60px;
  height: 60px;
}
.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 120px;
  top: -80px;
}
.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 120px;
  top: -60px;
}
.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}
.un-handle-content {
  padding: 20px 40px;
}
.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}
.overview-layout {
  margin-top: 20px;
}
.overview-item-value {
  font-size: 24px;
  text-align: center;
}
.overview-item-title {
  margin-top: 10px;
  text-align: center;
}
.out-border {
  border: 1px solid #dcdfe6;
}
.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.icon-user {
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  font-size: 100px;
  color: #409eff;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
}
.icon-device {
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  font-size: 100px;
  color: #ffd030;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
}
.icon-check {
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  font-size: 100px;
  color: #56c456;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
}
.icon-uncheck {
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  font-size: 100px;
  color: #f56c6c;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
}
.home-top {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home-wrapper {
  padding: 15px;
}
.grid-content {
  min-height: 36px;
  text-align: center;
  font-size: 14px;
  border-radius: 12px;
  padding: 15px 0;
  color: #fff;
}
.list_number {
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 5px;
  //color:#FFDB64;
}
.pay {
  background: #96c9ff;
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
}
.income {
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
  background-color: #ffb48d;
}
.hidden_investors {
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
  background-color: #3c9;
}
.intention_investors {
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
  background-color: #70b6ff;
}
.waitpending_investors {
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
  background-color: #ffc164;
}
.pending_investors {
  transition: all 0.3s;
  @extend %unable-select;
  &:hover {
    transform: scale(1.2);
  }
  background-color: #56c456;
}
</style>
