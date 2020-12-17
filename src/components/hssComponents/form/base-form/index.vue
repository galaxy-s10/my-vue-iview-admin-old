<template>
  <div>
    <Form :model="fromCol" :rules="rules" :label-width="100" ref="hssForm">
      <FormItem
        :label="item.name"
        :prop="item.prop"
        v-for="(item, index) in fromData.list"
        :key="index"
      >
        <template>
          <div v-if="item.render">
            <hss-render :render="item.render" :row="item" :index="index"></hss-render>
          </div>
          <Input
            v-if="item.type == 'Input'"
            clearable
            :disabled="item.disabled"
            :type="item.prop == 'password' ? 'password' : 'text'"
            v-model="fromCol[item.prop]"
            :placeholder="item.placeholder"
          ></Input>
          <!-- 下拉框 -->
          <Select
            v-if="item.type == 'Select'"
            v-model="fromCol[item.prop]"
            :placeholder="item.placeholder"
            :multiple="item.isArray"
            clearable
            :disabled="item.disabled"
          >
            <Option v-for="(el, i) in item.data" :value="el.value" :key="i">{{
              el.label
            }}</Option>
          </Select>
          <!-- 单选框 -->
          <RadioGroup v-if="item.type == 'Radio'" v-model="fromCol[item.prop]">
            <Radio :label="el.value" v-for="el in item.data" :key="el.value">{{
              el.label
            }}</Radio>
          </RadioGroup>
          <!-- 多选框 -->
          <CheckboxGroup v-if="item.type == 'Check'" v-model="fromCol[item.prop]">
            <Checkbox :label="el.value" v-for="el in item.data" :key="el.value">{{
              el.label
            }}</Checkbox>
          </CheckboxGroup>
          <!-- 树结构 -->
          <hss-tree
            v-if="item.type == 'Tree'"
            :treeData="item"
            :renderContent="item.renderContent"
            v-model="fromCol[item.prop]"
            @on-check-change="handleChoice"
          ></hss-tree>
        </template>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import hssRender from "./render.js";
import fromRules from "./rules";
import hssTree from "../../tree/index";
export default {
  components: { hssTree, hssRender },
  props: {
    fromData: {
      type: Object,
      default: () => {},
    },
    initData: {
      type: Object,
      default: () => {},
    },
    // 是否初始化数据(即显示默认数据，如果不初始化就是全空)
    init: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {}, //验证器
      fromCol: {}, //所有输入字段
      fromDataNew: {},
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 提交表单
    submit(cb) {
      let that = this;
      // 返回表单数据，如果验证不通过返回false
      let res = false;
      this.$refs["hssForm"].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          console.log("表单验证成功");
          res = that.fromCol;
          cb(res);
        } else {
          console.log("表单验证失败");
          let that = this;
          function digui(j) {
            that.$refs["hssForm"].validateField(that.fromData.list[j].prop, (valid) => {
              if (valid) {
                that.$Message.error(valid);
                console.log("cb");
                // console.log(cb)
                cb(false);
              } else {
                console.log(that.fromData.list[j].prop);
                digui(j + 1);
              }
            });
          }

          digui(0);
        }
      });
    },
    handleChoice() {},
    handleRule() {
      for (let i in this.fromData.list) {
        let item = this.fromData.list[i];
        this.rules[item.prop] = [];
        // 是否必须
        if (item.required) {
          console.log(item.type);
          console.log(item.isArray);
          console.log(item.isObject);
          if (
            item.type === "Select" ||
            item.type === "Radio" ||
            item.type === "Check" ||
            item.type === "Tree" ||
            item.isObject
          ) {
            // Select,Radio,Check,Tree组件，验证类型为array或object或number
            this.rules[item.prop] = [
              {
                required: true,
                message: item.name + "不能为空",
                trigger: "change",
                // trigger: "blur",
                type: item.isArray ? "array" : item.isObject ? "object" : "number",
              },
            ];
          } else {
            // 其他组件(如input)，验证类型为string
            this.rules[item.prop] = [
              {
                required: true,
                message: item.name + "不能为空",
                trigger: "change",
                // trigger: "blur",
              },
            ];
          }
        }
        // 验证规则
        if (item.rule) {
          if (typeof item.rule === "string") {
            for (let key in fromRules) {
              if (item.rule == key) {
                this.rules[item.prop] = this.rules[item.prop].concat(
                  fromRules[item.rule]
                );
              }
            }
          } else if (item.rule instanceof Object) {
            this.rules[item.prop].push(item.rule);
          }
        }
      }
    },
    handleVal(data) {
      this.fromDataNew = { ...this.fromData };
      if (data) {
        if (this.init) {
          // 编辑时候格式化数据
          for (let i = 0; i < this.fromDataNew.list.length; i++) {
            let item = this.fromDataNew.list[i];
            this.fromDataNew.list[i].val = data[item.prop];
          }
        } else {
          // 添加置空表单
          for (let i = 0; i < this.fromDataNew.list.length; i++) {
            let item = this.fromDataNew.list[i];
            if (item.default) {
              this.fromDataNew.list[i].val = item.default;
            } else {
              this.fromDataNew.list[i].val = "";
            }
          }
        }
      }
    },
    // 处理表单数据集
    handleFromCol() {
      for (let i in this.fromData.list) {
        let item = this.fromData.list[i];
        this.$set(this.fromCol, item.prop, item.val);
      }
    },
  },
  watch: {
    // 处理表单选项发生改变的时候初始化
    "fromData.list": {
      handler() {
        this.fromCol = {};
        console.log(this.initData);
        this.handleVal(this.initData);
        this.handleFromCol();
        this.handleRule();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
