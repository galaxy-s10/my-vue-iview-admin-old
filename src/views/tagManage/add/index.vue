<template>
  <div>
    <base-form ref="hssBaseForm" :fromData="columnForm" :init="init" @onSubmit="onSubmit">
    </base-form>
  </div>
</template>

<script>
import baseForm from "../../../components/hssComponents/form/base-form/index";
import { addTag } from "@/api/tag";
export default {
  components: { baseForm },
  data() {
    return {
      // columnForm: {},
      columnForm: {
        submitBtn: true,
        list: [
          {
            // name: "id",
            // type: "Input",
            prop: "id",
            // placeholder: "",
            // display:'none'
          },
          {
            type: "Input",
            name: "名称",
            prop: "name",
            placeholder: "请输入标签名",
            required: true,
          },
          {
            name: "颜色",
            type: "Input",
            prop: "color",
            placeholder: "请输入标签颜色",
            required: true,
          },
          // {
          //   name: "创建时间",
          //   type: "Date",
          //   prop: "createdAt",
          //   isDate: true,
          //   placeholder: "请选择创建时间",
          //   required: true,
          // },
        ],
      },
      init: false,
      // init: true,
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$refs.hssBaseForm.submit((v) => {
        if (v) {
          console.log(v);
          addTag(v)
            .then((res) => {
              console.log(res);
              this.$Message.success({
                content: res.message,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
