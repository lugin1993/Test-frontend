<template>
  <div class="common-layout">
    <el-container>
      <main-form></main-form>
    </el-container>
  </div>
</template>
<script>
import MainForm from "./view/MainForm.vue";

export default {
  name: "App",
  components: {
    MainForm
  }
};
</script>
