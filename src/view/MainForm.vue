<template>
  <div>
    <file-form :limit-files="1"></file-form>
  </div>
</template>

<script>
import FileForm from "../components/FileForm.vue";

export default {
  name: "MainForm",
  components: {
    FileForm
  }
}
</script>