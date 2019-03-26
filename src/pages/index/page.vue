<template>
  <d2-container :filename="filename">
    <template slot="header">仪表盘</template>
    <div style="height: 400px; margin: -16px;">
      <SplitPane :min-percent="50" :default-percent="60" split="vertical">
        <template slot="paneL">
          <div style="margin: 10px;">事故统计
            <ve-line :data="chartData" :settings="chartSettings"></ve-line>
          </div>
        </template>
        <template slot="paneR">
          <div style="margin: 10px;">
            <ve-pie :data="chartDataPie"></ve-pie>
          </div>
        </template>
      </SplitPane>
    </div>
  </d2-container>
</template>

<script>
import list from "@/pages/index/list/_mixin/list.js";
export default {
  mixins: [list],
  data() {
    this.chartSettings = {
      stack: { 用户: ["访问用户", "下单用户"] },
      area: true
    };
    return {
      filename: __filename,
      chartData: {
        columns: ["日期", "低速", "超速", "占用紧急车道", "逆行"],
        rows: [
          { 日期: "1/1", 低速: 1393, 超速: 1093, 占用紧急车道: 32, 逆行: 111 },
          { 日期: "1/2", 低速: 3530, 超速: 3230, 占用紧急车道: 23, 逆行: 111 },
          { 日期: "1/3", 低速: 2923, 超速: 2623, 占用紧急车道: 76, 逆行: 111 },
          { 日期: "1/4", 低速: 1723, 超速: 1423, 占用紧急车道: 49, 逆行: 111 },
          { 日期: "1/5", 低速: 3792, 超速: 3492, 占用紧急车道: 323, 逆行: 111 },
          { 日期: "1/6", 低速: 4593, 超速: 4293, 占用紧急车道: 78, 逆行: 111 },
          { 日期: "1/7", 低速: 2923, 超速: 2623, 占用紧急车道: 76, 逆行: 111 },
          { 日期: "1/8", 低速: 1723, 超速: 1423, 占用紧急车道: 49, 逆行: 111 },
          { 日期: "1/9", 低速: 3792, 超速: 3492, 占用紧急车道: 323, 逆行: 111 },
          { 日期: "1/10", 低速: 4593, 超速: 4293, 占用紧急车道: 78, 逆行: 111 }
        ]
      },
      chartDataPie: {
        columns: ["日期", "数量"],
        rows: [{ 日期: "雷达在线", 数量: 1393 }, { 日期: "雷达离线", 数量: 3530 }]
      }
    };
  },
  methods: {
    open() {
      const h = this.$createElement;
      this.$notify({
        title: "欢迎",
        message: h(
          "i",
          { style: "color: teal" },
          "您上一次登录时间为 2019/3/7 18:20:30 "
        )
      });
    },

    open2() {
      this.$notify({
        title: "提示",
        message: "这是一条不会自动关闭的消息",
        duration: 0
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
</style>
