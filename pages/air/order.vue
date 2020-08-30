<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm :data="infoData" @setAllPrice="setAllPrice"/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="infoData" :allPrice="allPrice" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
  data() {
    return {
      // 机票信息
      infoData: {
        insurances: [], // 初始化保险数据
        seat_infos: {},
      },

      allPrice: 0,
    };
  },
  mounted() {
    const { query } = this.$route;
    // 进到订单页面请求机票信息 传递给infoData
    this.$axios({
      url: `airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid,
      },
    }).then((res) => {
        this.infoData = res.data;
    });
  },
  methods: {
    setAllPrice(price) {
      this.allPrice = price;
    },
  },
  components: {
    OrderForm,
    OrderAside,
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>