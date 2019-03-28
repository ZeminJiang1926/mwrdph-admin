<template>
  <d2-container :filename="filename">
    <demo-page-header slot="header" @submit="handleSubmit" ref="header"/>
    <demo-page-main :table-data="table" :loading="loading"/>
    <demo-page-footer
      slot="footer"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="handlePaginationChange"
    />
  </d2-container>
</template>

<script>
import * as api from "@api/event/query";
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: "admin-event-query",
  components: {
    DemoPageHeader: () => import("./componnets/PageHeader"),
    DemoPageMain: () => import("./componnets/PageMain"),
    DemoPageFooter: () => import("./componnets/PageFooter")
  },
  data() {
    return {
      filename: __filename,
      table: [],
      loading: false,
      page: {
        current: 1,
        size: 50,
        total: 0
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let query = {
        pageIndex: this.page.current,
        pageSize: this.page.size
      };
      api.getIncident(query).then(data => {
        console.log(data);
        this.table = data;
        this.page.total = data.totalCount;
      });
    },
    handlePaginationChange(val) {
      this.page = val;
      console.log(val);
      // nextTick 只是为了优化示例中 notify 的显示
      this.getTableData();
    },
    handleSubmit(form) {
      this.loading = true;
      api
        .getIncidentByitems({
          ...form,
          pageIndex: this.page.current,
          pageSize: this.page.size
        })
        .then(res => {
          this.loading = false;
          this.table = res;
          this.page.total = res.page.total;
        })
        .catch(err => {
          this.loading = false;
          console.log("err", err);
        });
    }
  }
};
</script>

