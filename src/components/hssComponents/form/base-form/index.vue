<template>
  <div>
    <Form :model="fromCol" :rules="rules" :label-width="100">
      <FormItem
        :label="item.name"
        :prop="item.prop"
        v-for="(item, index) in fromData.list"
        :key="index"
      >
        <template>
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
            v-else-if="item.type == 'Select'"
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
          <RadioGroup
            v-else-if="item.type == 'Radio'"
            v-model="fromCol[item.prop]"
          >
            <Radio :label="el.value" v-for="el in item.data" :key="el.value">{{
              el.label
            }}</Radio>
          </RadioGroup>
          <!-- 多选框 -->
          <CheckboxGroup
            v-else-if="item.type == 'Check'"
            v-model="fromCol[item.prop]"
          >
            <Checkbox
              :label="el.value"
              v-for="el in item.data"
              :key="el.value"
              >{{ el.label }}</Checkbox
            >
          </CheckboxGroup>
        </template>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import fromRules from "./rules";
export default {
  components: {},
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
    handleRule() {
      for (let i in this.fromData.list) {
        let item = this.fromData.list[i];
        this.rules[item.prop] = [];
        /*是否必须*/
        if (item.required) {
          if (
            item.type === "Select" ||
            item.type === "Radio" ||
            item.type === "Check" ||
            item.type === "Tree" ||
            item.isObject
          ) {
            this.rules[item.prop] = [
              {
                required: true,
                message: item.name + "不能为空",
                trigger: "change",
                // trigger: "blur",
                type: item.isArray
                  ? "array"
                  : item.isObject
                  ? "object"
                  : "number",
              },
            ];
          } else {
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
        //验证规则
        console.log(item.rule);
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
      console.log(data);
      console.log({ ...this.fromData });
      this.fromDataNew = { ...this.fromData };
      // console.log(fromDataNew);
      if (data) {
        if (this.init) {
          /*编辑时候格式化数据*/
          for (let i = 0; i < this.fromDataNew.list.length; i++) {
            let item = this.fromDataNew.list[i];
            console.log(item);
            // if (item.type === "UploadOne") {
            //   this.fromDataNew.list[i].show = [data[item.prop]];
            //   this.fromDataNew.list[i].val = data[item.prop]["image_id"];
            // } else if (item.type === "UploadMany") {
            //   let ids = [];
            //   this.fromDataNew.list[i].show = data[item.prop];
            //   for (let j = 0; j < data[item.prop].length; j++) {
            //     let item1 = data[item.prop][j];
            //     ids.push(item1.image_id);
            //   }
            //   this.fromDataNew.list[i].val = ids;
            // } else {
            this.fromDataNew.list[i].val = data[item.prop];
            // }
          }
        } else {
          /*添加置空表单*/
          for (let i = 0; i < this.fromDataNew.list.length; i++) {
            let item = this.fromDataNew.list[i];
            if (item.default) {
              this.fromDataNew.list[i].val = item.default;
            } else {
              this.fromDataNew.list[i].val = "";
            }
          }
        }
        // this.hackRest();
      }
    },
    /*处理表单数据集*/
    handleFromCol() {
      for (let i in this.fromData.list) {
        let item = this.fromData.list[i];
        this.$set(this.fromCol, item.prop, item.val);
        // if (!item.primaryKey) {
        // console.log(object)
        // this.$set(this.fromCol, item.prop, item.val ? item.val : "");
        // }
      }
    },
  },
  watch: {
    //处理表单选项发生改变的时候初始化
    "fromData.list": {
      handler() {
        this.fromCol = {};
        // this.init();
        // if (this.api) {
        //   this.handleApiVal();
        // } else {
        console.log(this.initData);
        this.handleVal(this.initData);
        this.handleFromCol();
        // }
        this.handleRule();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>