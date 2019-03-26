<template>
  <div>
    <el-form
      :inline="true"
      size="mini">
      <el-form-item :label="`已选数据下载 [ ${multipleSelection.length} ]`">
        <el-button-group>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadXlsx(multipleSelection)">
            xlsx
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="multipleSelection.length === 0"
            @click="handleDownloadCsv(multipleSelection)">
            csv
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table
      :data="currentTableData"
      v-loading="loading"
      size="mini"
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="事件id" >
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="路段" >
        <template slot-scope="scope">
          <el-tag
            size="mini"
            type="success">
            {{scope.row.section_id}}
          </el-tag>
        </template>
      </el-table-column>
     <el-table-column label="类型">
       <template slot-scope="scope">
          <p v-if="scope.row.type=='0'">低速</p>
          <p v-else-if="scope.row.type=='1'">超速</p>
          <p v-else-if="scope.row.type=='2'">占用紧急车道</p>
          <p v-else-if="scope.row.type=='3'">逆行</p>
        </template>
     </el-table-column>
      <el-table-column label="检验状态" >
        <template slot-scope="scope">
          <boolean-control
            :value="scope.row.is_checked"
            @change="(val) => {
              handleSwitchChange(val, scope.$index)
            }">
            <d2-icon
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"/>
            <d2-icon
              name="times-circle"
              style="font-size: 20px; line-height: 32px; color: #F56C6C;"
              slot="inactive"/>
          </boolean-control>
        </template>
      </el-table-column>


      <el-table-column label="审查员" >
        <template slot-scope="scope">
          {{scope.row.admin}}
        </template>
      </el-table-column>

      <el-table-column label="管理员批注" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.info}}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.created_time}}
        </template>
      </el-table-column>

      <el-table-column label="审查状态" >
        <template slot-scope="scope">
          <el-tag
            size="mini"
            :type="scope.row.used ? 'info' : ''">
            {{scope.row.used ? '已完成' : '审查中'}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.update_time}}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import BooleanControl from '../BooleanControl'
import BooleanControlMini from '../BooleanControlMini'
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
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      downloadColumns: [
        { label: '事件ID', prop: 'id' },
        { label: '路段ID', prop: 'section_id' },
         { label: '类型', prop: 'type' },
        { label: '检验状态', prop: 'is_checked' },
        { label: '管理员', prop: 'admin' },
        { label: '管理员批注', prop: 'info' },
        { label: '创建时间', prop: 'created_time' },
        { label: '审查状态', prop: 'used' },
        { label: '更新时间', prop: 'update_time' }
      ]
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleSwitchChange (val, index) {
      const oldValue = this.currentTableData[index]
      this.$set(this.currentTableData, index, {
        ...oldValue,
        type: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    downloadDataTranslate (data) {
      return data.map(row => ({
        ...row,
        type: row.is_checked ? '未检验' : '未检验',
        used: row.used ? '已完成' : '审查中'
      }))
    },
    handleDownloadXlsx (data) {
      this.$export.excel({
        title: '高速公路事件导出',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    },
    handleDownloadCsv (data) {
      this.$export.csv({
        title: '高速公路事件导出',
        columns: this.downloadColumns,
        data: this.downloadDataTranslate(data)
      })
        .then(() => {
          this.$message('导出CSV成功')
        })
    }
  }
}
</script>
