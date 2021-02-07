<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    console.log(context.props);
    if (icon) {
      // if (icon.includes("el-icon")) {
        vnodes.push(<Icon type={icon} />);
      // } else {
        // vnodes.push(<svg-icon icon-class={icon} />);
      // }
    }

    if (title) {
      vnodes.push(<span>{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
