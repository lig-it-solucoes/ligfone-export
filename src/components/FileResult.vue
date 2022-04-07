<template>
  <div v-show="fileContent" class="mt-3">
    <strong>Baixe o arquivo:</strong><br>
    <button class="btn btn-success" @click="download">Baixar</button>
  </div>
</template>

<script>
import downloadjs from 'downloadjs'

export default {
  data() {
    return {
      fileContent: null,
    }
  },
  methods: {
    showDownload(content) {
      this.fileContent = content
    },
    download() {
      downloadjs(new Blob([this.fileContent]), "mailing.csv", "text/csv")
    }
  }
}
</script>