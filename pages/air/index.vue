<template>
  <section class="container">
    <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>

    <!-- 搜索广告栏 -->
    <el-row type="flex" justify="space-between">
      <!-- 搜索表单 -->
      <!-- <div>搜索</div> -->
      <searchForm></searchForm>
      <!-- banner广告 -->
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div>
    </el-row>

    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>

    <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>

    <!-- 特价机票 -->
    <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <!-- v-for="(item, index) in sales" :key="index" -->
        <el-col :span="6" >
          <nuxt-link
            :to="`/air/flights?departCity=广州&departCode=CAN&destCity=上海&destCode=SHA&departDate=2020-08-27`"
          >
            <img src="@/assets/images/cansha.jpg" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>广州-上海</span>
              <span>￥698</span>
            </el-row>
          </nuxt-link>
        </el-col>
         <el-col :span="6" >
          <nuxt-link
            :to="`/air/flights?departCity=北京&departCode=BJS&destCity=上海&destCode=SHA&departDate=2020-08-27`"
          >
            <img src="@/assets/images/bjs.jpg" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>北京-上海</span>
              <span>￥640</span>
            </el-row>
          </nuxt-link>
        </el-col>
         <el-col :span="6" >
          <nuxt-link
            :to="`/air/flights?departCity=上海&departCode=SHA&destCity=成都&destCode=CTU&departDate=2020-08-27`"
          >
            <img src="@/assets/images/gys.jpg" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>上海-成都</span>
              <span>￥768</span>
            </el-row>
          </nuxt-link>
        </el-col>
         <el-col :span="6" >
          <nuxt-link
            :to="`/air/flights?departCity=天津&departCode=TSN&destCity=广元&destCode=GYS&departDate=2020-08-27`"
          >
            <img src="@/assets/images/tj.jpg" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>天津-广元</span>
              <span>￥740</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import searchForm from "@/components/air/searchForm";
export default {
  data() {
    return {
      sales: [
        {
          cover:
            "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=9154c841bcfd5266a32b3b169b199799/3812b31bb051f8199687c7e0d0b44aed2f73e7fe.jpg",
          departCity: "广州",
          departCode: "CAN",
          departDate: "2019-06-17",
          destCity: "上海",
          destCode: "SHA",
          price: 760,
        },
      ],
    };
  },
  components: {
    searchForm,
  },
  mounted() {
    // 发送请求请求特价机票
    this.$store.dispatch("air/getCheapTicket").then((res) => {
      console.log(res);
      // this.sales = res;
    });
  },
};
</script>

<style scoped lang="less">
.air-sale {
  border: 1px #ddd solid;
  padding: 20px;
  margin-bottom: 50px;

  .air-sale-pic {
    > div {
      width: 225px;
      height: 140px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
      }

      .layer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 15px;
        font-size: 14px;

        span:last-child {
          font-size: 18px;
        }
      }
    }
  }
}

.air-sale-group {
  margin-top: 20px;
  padding-top: 8px;
  border-right: 1px #eee solid;

  &:last-child {
    border-right: none;
  }

  .air-sale-row {
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;

    .air-sale-price {
      color: orange;
      font-size: 20px;
    }
  }
}

.container {
  width: 1000px;
  margin: 0 auto;
}

.air-title {
  margin: 15px 0;
  font-size: 20px;
  font-weight: normal;
  color: orange;

  span {
    font-size: 20px;
  }
}

.statement {
  margin: 15px 0;
  border: 1px #ddd solid;
  background: #f5f5f5;
  height: 58px;
  padding: 10px 0;
  box-sizing: border-box;

  > div {
    text-align: center;
    line-height: 38px;
    border-right: 1px #ddd solid;

    &:last-child {
      border-right: none;
    }

    * {
      vertical-align: middle;
    }

    i {
      font-size: 30px;
    }
  }
}

.air-sale-title {
  margin: 15px 0;
  font-size: 20px;
  font-weight: normal;
  color: #409eff;

  span {
    font-size: 20px;
  }
}
</style>