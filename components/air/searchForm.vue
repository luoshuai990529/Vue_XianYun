<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <!-- :trigger-on-focus="false" 获取焦点的时候不自动加载建议列表 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          :trigger-on-focus="false"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <!-- picker-options日期选择框的配置对象 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" },
      ],
      currentTab: 0,
      form: {
        // 目的地
        destCity: "",
        destCode: "",
        // 出发地
        departCode: "",
        departCity: "",
        // 时间
        departDate: "",
      },
      // 日期选择框的配置对象
      pickerOptions: {
        disabledDate(date) {
          // console.log(date);
          // 判断日期小于当前日期的都返回true
          const caTime = date.getTime(); //获取时间戳
          return Date.now() > caTime + 24 * 60 * 60 * 1000;
        },
      },
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      console.log(item, index);
      if (index == 1) {
        this.$confirm("当前业务暂时不提供往返", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    // cb是回调函数是必须要执行的，接受数组，数组内部必须是由对象组件，对象必须要value属性
    queryDepartSearch(value, cb) {
      // console.log("当前输入的出发城市：" + value);
      // cb([{ value: "长沙" }, { value: "北京" }, { value: "上海" }]);
      const { departCity } = this.form;
      this.$store
        .dispatch("air/getFromCity", departCity.trim())
        .then((res) => {
          // res就是返回回来的cityList
          // console.log(res);
          // 默认选中列表的第一个元素
          if (res.length > 0) {
            this.form.departCity = res[0].value;
            this.form.departCode = res[0].sort;
          }
          if (res) {
            cb(res);
          }
        })
        .catch((err) => {
          if (err) {
            cb([]);
          }
        });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      const { destCity } = this.form;
      this.$store
        .dispatch("air/getFromCity", destCity.trim())
        .then((res) => {
          // res就是返回回来的cityList
          // res.forEach(v=>{
          //   console.log(v.sort);
          // })
          if (res.length > 0) {
            this.form.destCity = res[0].value;
            this.form.destCode = res[0].sort;
          }
          if (res) {
            cb(res);
          }
        })
        .catch((err) => {
          if (err) {
            cb([]);
          }
        });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
      console.log("出发城市：" + this.form.departCity);
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
      console.log("到达城市：" + this.form.destCity);
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // const { departCity, departCode, destCity, destCode } = this.form;
      // // 把出发城市传给到大城市
      // this.form.departCity = destCity;
      // this.form.departCode = destCode;
      // // 把到达城市传给出发城市
      // this.form.destCity = departCity;
      // this.form.destCode = departCode;
      [
        this.form.departCity,
        this.form.departCode,
        this.form.destCity,
        this.form.destCode,
      ] = [
        this.form.destCity,
        this.form.destCode,
        this.form.departCity,
        this.form.departCode,
      ];
    },

    // 提交表单是触发
    handleSubmit() {
      console.log(this.form);
      // 表单验证数据
      const rules = {
        depart: {
          value: this.form.departCity,
          message: "请选择出发城市",
        },
        dest: {
          value: this.form.destCity,
          message: "请选择到达城市",
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发时间",
        },
      };
      let valid = true; // 表单验证结果

      // console.log(Object.keys(rules));//["depart", "dest", "departDate"]
      Object.keys(rules).forEach((v) => {
        // 只要有一个结果不通过，就停止循环
        if (!valid) return;
        const item = rules[v];

        // 数据字段为空
        if (!item.value) {
          valid = false;

          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning",
          });
        }
      });

      // 不通过验证，不需要往下执行
      if (!valid) return;

      this.$router.push({
        path: "/air/flights",
        query: this.form,
      });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
