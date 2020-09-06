<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (!window.AMap) {
      // 第一次加载
      window.onLoad = function () {
        // 如果高德js加载完毕了 那么 全局变量中肯定会一个  AMap 对象
        var map = new AMap.Map("container");

        var marker = new AMap.Marker({
          position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "北京",
          // 自定义图标
          icon:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2990258295,3888000098&fm=26&gp=0.jpg",
        });

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=696fc5bf54b56dbefae3f32bec092a6c&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    } else {
       this.init();
    }
  },
  methods: {
    init() {
      var map = new AMap.Map("container");

      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京",
        // 自定义图标
        // icon:
        //   "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2990258295,3888000098&fm=26&gp=0.jpg",
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);

      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], function () {
        //异步加载插件 放大插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);

        // 驾车插件  起点  终点
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
        });

        var startLngLat = [116.379028, 39.865042];
        var endLngLat = [116.427281, 39.903719];

        driving.search(startLngLat, endLngLat, function (status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
#container {
  width: 500px;
  height: 380px;
}
</style>