<template>
  <el-pagination
    :current-page="current"
    :page-size="size"
    :total="total"
    :page-sizes="[50, 100, 200, 400]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    current: {
      default:  1
    },
    size: {
      default: 50
    },
    total: {
      
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        current: this.current,
        size: val,
        total: this.total
      });
     
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        current: val,
        size: this.size,
        total: this.total
      });
    }
  }
}
</script>
