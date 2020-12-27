<template>
  <div>
    <base-form
      ref="hssBaseForm"
      v-if="initData.id"
      :fromData="columnForm"
      :initData="initData"
      :init="init"
      @onSubmit="onSubmit"
    >
    </base-form>
    <!-- <i-button @click="confirm">修改</i-button> -->
    <!-- <markdown ref="md" v-if="this.form.content != null" /> -->
  </div>
</template>

<script>
// import markdown from "../../../components/markdown/index";
import hssUpload from "../../../components/upload/index";
import baseForm from "../../../components/hssComponents/form/base-form/index";
import { findArticle, editArticle } from "@/api/article";
import { taglist } from "@/api/tag";
// import { editarticle } from '../../../../../vueblog-client/src/api/article';
export default {
  components: { baseForm, hssUpload },
  data() {
    return {
      tagList: [],
      form: {
        id: "",
        title: "",
        tags: "",
        type: "",
        content: "",
        img: "",
        createdAt: "",
        updatedAt: "",
      },
      columnForm: {},
      initData: {},
      // init: false,
      init: true,
      headerImg: [],
      oldImgList: [],
      newimg: null,
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$refs.hssBaseForm.submit((v) => {
        if (v) {
          console.log(v);
          editArticle(v).then(res=>{
            console.log(res)
            this.$Message.success({
            content: res.message,
          });
          }).catch(err=>{
            console.log(err)
          })
        } else {
        }
      });
    },
    confirm() {},
  },
  async created() {
    console.log(this.$route);
    await taglist().then((res) => {
      this.tagList = res.rows;
    });
    await findArticle(this.$route.params.id)
      .then((res) => {
        this.columnForm = {
          submitBtn:true,
          list: [
            {
              // name: "id",
              // type: "Input",
              prop: "id",
              isNumber: true,
              // placeholder: "",
              // display:'none'
            },
            {
              name: "标题",
              type: "Input",
              prop: "title",
              placeholder: "请输入标题",
              required: true,
            },
            {
              name: "类型",
              type: "Input",
              prop: "type",
              placeholder: "请输入类型",
              required: true,
            },
            {
              name: "浏览量",
              type: "Input",
              prop: "click",
              placeholder: "请输入角色浏览量",
              isNumber: true,
              required: true,
            },
            {
              name: "标签",
              type: "Check",
              data: [],
              prop: "tags",
              isArray: true,
              // required: true,
            },
            {
              name: "发布状态",
              type: "Radio",
              data: [
                { label: "已发布", value: 1 },
                { label: "待审核", value: 0 },
              ],
              prop: "status",
              required: true,
            },

            {
              name: "评论状态",
              type: "Radio",
              // type: "Select",
              data: [
                { label: "开启", value: 1 },
                { label: "关闭", value: 2 },
              ],
              prop: "is_comment",
              // isString:true,
              required: true,
            },
            
            {
              name: "内容",
              type: "editor",
              prop: "content",
              content: "",
              placeholder: "请输入内容",
              required: true,
            },
            {
              name: "发布时间",
              type: "Date",
              prop: "createdAt",
              placeholder: "请选择发布时间",
              isDate: true,
              required: true,
            },
            {
              name: "最后更新",
              type: "Date",
              prop: "updatedAt",
              placeholder: "请选择最后更新时间",
              isDate: true,
              required: true,
            },
          ],
        };
        let tagTemp1 = [];
        res.list.rows[0].tags.forEach((item) => {
          tagTemp1.push(item.id);
        });
        // let deepTags = JSON.parse(JSON.stringify(res.list.rows[0].tags));
        res.list.rows[0].tags = tagTemp1;
        this.initData = res.list.rows[0];
        // console.log(this.initData);
        this.form.id = res.list.rows[0].id;
        this.form.title = res.list.rows[0].title;
        this.form.type = res.list.rows[0].type;
        this.form.tags = res.list.rows[0].tags;
        this.form.content = res.list.rows[0].content;
        this.columnForm.list[this.columnForm.list.length - 3].content =
          res.list.rows[0].content;
        let tagTemp = [];
        this.tagList.forEach((item) => {
          // console.log(item);
          let temp = {};
          temp.label = item.name;
          temp.value = item.id;
          tagTemp.push(temp);
          // tagTemp.push(item.id);
        });
        // console.log(tagTemp);
        this.columnForm.list[4].data = tagTemp;

        // 保存文章所有图片
        // this.oldImgList = this.regMd(res.list.rows[0].content);
        // 保存封面图
        if (res.list.rows[0].img) {
          this.headerImg.push({ name: "", url: res.list.rows[0].img });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {},
};
</script>

<style scoped></style>
