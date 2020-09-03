<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";
export default {
  data() {
    return {
      price: "",
      payInfo: {},
    };
  },
  methods: {
    // 检查付款状态
    async isPay(data) {
      const { id } = this.$route.query;
      const {
        api,
        user: { userInfo },
      } = this.$store.state;
      return this.$axios({
        url: `airorders/checkpay`,
        method: "POST",
        data: {
          id,
          nonce_str: data.nonce_str,
          out_trade_no: data.order_no,
        },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }).then((res) => {
        const { statusTxt } = res.data;
        console.log(statusTxt);
        if (statusTxt === "支付完成") {
          this.$confirm("订单支付成功", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "success",
          });

          return Promise.resolve(true);
        }

        return Promise.resolve(false);
      });
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    /* 
      不管token有没有变化，都会先触发一次
      handler:"someMethod",
      immediate:true
    */
    "$store.state.user.userInfo.token": {
      handler: function (val) {
        // this.$store.state.user.userInfo.token
        if (this.$store.state.user.userInfo.token) {
          console.log("触发监听器");
          console.log(val);

          // 获取route传递回来的id
          const { id } = this.$route.query;
          //   获取用户信息
          const {
            user: { userInfo },
          } = this.$store.state;

          // 请求二维码
          this.$axios({
            url: `airorders/${id}`,
            headers: {
              Authorization: `Bearer ${val}`,
            },
          }).then((res) => {
            // price 用于展示
            const { payInfo, price } = res.data;
            this.price = price;
            this.payInfo = payInfo;
            console.log(payInfo,price);
            // 生成二维码到canvas
            const stage = document.querySelector("#qrcode-stage");
            QRCode.toCanvas(stage, payInfo.code_url, {
              width: 200,
            });

            this.timer = setInterval(async () => {
              const isResolve = await this.isPay(payInfo);
              console.log(isResolve);
              if (isResolve) {
                clearInterval(this.timer);
                return;
              }
            }, 3000);
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // 这个处理方法是有缺陷的，不100%准确
    // userInfo在页面加载完才赋值
    // setTimeout((v) => {
    // }, 200);
  },
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>