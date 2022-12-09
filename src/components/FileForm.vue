<template>
  <div>
    <el-form>
      <el-upload :auto-upload="false" v-on:change="uploadFile" :show-file-list="false">
        <el-button type="primary" size="large">Загрузить
          <el-icon class="el-icon--right">
            <paperclip/>
          </el-icon>
        </el-button>
      </el-upload>
    </el-form>
    <div>
      <ul style="display: inline-block">
        <li v-for="(file, index) in fileList" style="display: inline-block">
          <el-icon class="el-icon--right cursorPointer" v-on:click="deleteFile(index, file)">
            <closeBold/>
          </el-icon>
          <a :href="file.href" class="cursorPointer text-success" style="display: inline-block; vertical-align: top;">
            {{ file.original_name }}{{ semicolon(index) }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {ElNotification} from 'element-plus'

export default {
  name: "FileForm",
  data() {
    return {
      fileList: []
    }
  },
  components: {
    ElNotification
  },
  props: {
    limitFiles: {
      type: Number,
      default: 1
    }
  },
  methods: {
    async uploadFile(file) {
      try {
        if (this.limitFiles === 1 && this.fileList.length === 1) {
          this.deleteFile(0, this.fileList[0]);
        }
        let savedFile = await this.$store.dispatch('file/upload', file.raw)
        savedFile.href = `http://127.0.0.1:8000/api/file/download/${savedFile.id}`
        this.fileList.push(savedFile)
      } catch (error) {
        this.notification(error)
      }
    },
    semicolon(index) {
      return index === this.fileList.length - 1 ? '' : ';'
    },
    deleteFile(index, file) {
      try {
        this.$store.dispatch('file/delete', file.id)
        this.fileList.splice(index)
      } catch (error) {
        this.notification(error)
      }
    },
    notification({message}) {
      ElNotification({
        title: 'Error',
        message: message ? message : 'неизвестная ошибка',
        type: 'error',
      })
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul > li, ul > li > a {
  color: #409eff;
  text-decoration: none;
}

.cursorPointer {
  cursor: pointer;
}
</style>