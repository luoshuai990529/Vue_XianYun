<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters v-if="cacheFlightsData" :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

        <!-- 航班头部布局 -->
        <flightsListHead></flightsListHead>

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(item, index) in dataList" :key="index" :data="item"></flightsItem>
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsListHead from "@/components/air/flightsListHead.vue";
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
export default {
  data() {
    return {
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {},
      },
      flightsData: {
        flights: [],
        info: {},
        options: {},
      }, // 航班总数据
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
    };
  },
  methods: {
    //   获取机票信息
    getFlightData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query, // 来自URL的5个参数
      }).then((res) => {
        this.flightsData = res.data;
        // 注意：下面不能直接将res.data赋值给this.cacheFlightsData
        // 否则this.cacheFlightsData和this.flightsData将指向同一个引用地址表示同一个对象
        // 达不到我们预期的效果
        // this.cacheFlightsData = res.data;
        this.cacheFlightsData = { ...res.data };
        this.dataList = this.flightsData.flights;
        // 请求完数据，接着设置dataList展示数据
        this.setDataList();
      });
    },
    // 设置dataList数据
    // arr是展示的新数据，该方法将会传递给过滤组件使用
    setDataList(arr) {
      // 如果有新数据从第一页开始显示

      if (arr) {
        this.pageIndex = 1;
        this.flightsData.flights = arr;
        this.flightsData.total = arr.length;
      }
      // 截取的开始位置为（当前页-1）*每页显示的条数
      const start = (this.pageIndex - 1) * this.pageSize;
      // 截取结束的位置为 开始位置+每页显示的条数
      const end = start + this.pageSize;
      this.dataList = this.flightsData.flights.slice(start, end);
    },

    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },

    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    },
  },
  mounted() {
    //   调用getFlightData()获取机票信息
    this.getFlightData();
  },
  components: {
    flightsListHead,
    flightsItem,
    flightsFilters,
  },
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>