<template>
  <div class="container">
    <!-- 幻灯片 -->
    <div class="carousel">
      <!-- 轮播图 -->
      <el-carousel trigger="click" :interval="5000" arrow="hover">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div
            class="banner-image"
            :style="`
                background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
          ></div>
        </el-carousel-item>
      </el-carousel>

      <div class="search_tab">
        <search-tab></search-tab>
      </div>
    </div>
  </div>
</template>

<script>
import SearchTab from "@/components/searchTab";
export default {
  components: {
    SearchTab
  },
  data() {
    return {
      // 轮播图数据
      banners: [
        
      ],
    };
  },
  mounted() {
    // 请求banner轮播图数据
    this.$axios({
      url:"http://127.0.0.1:1337/scenics/banners",
      method:"get"
    }).then(res=>{
      console.log(res);
      this.banners= res.data.data
    })
  },
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
.carousel {
  position: relative;
  .search_tab {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
}
/deep/ .el-carousel__arrow {
  background: rgba(38, 44, 51, 0.29);
}
/deep/ .el-carousel__arrow:hover {
  background: rgba(58 ,63 ,69 , .62);
}
</style>