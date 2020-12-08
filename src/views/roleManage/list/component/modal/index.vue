<template>
  <div>
    <Form :model="roleInfo">
      <FormItem
        :label="item.name"
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
export default {
  components: {},
  props: {
    fromData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fromCol: {}, //所有输入字段
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
</style>