<template>
  <h3 class="h6">Envie o arquivo .CSV</h3>
  
  <form @submit.prevent="sendFile">
    <div class="input-group">
      <input type="file" ref="fileInput" class="form-control" accept="text/csv" required>

      <button type="submit" class="btn btn-warning">
        <span 
          v-show="loading"
          class="spinner-border spinner-border-sm" 
          role="status" 
          aria-hidden="true"
        ></span>
        Gerar
      </button>
    </div>
  </form>

  <div class="mt-3 alert alert-danger alert-dismissible fade show" v-if="alertMessage">
    {{ alertMessage }}
  </div>

  <div class="mt-3" v-show="loading || generated">
    <strong v-if="generated">Geração do arquivo concluido!</strong>
    <strong v-else>Gerando arquivo...</strong>
    
    <div class="progress">
      <div 
        class="progress-bar bg-warning" 
        role="progressbar" 
        :aria-valuenow="loadingProgress" 
        :style="loadingStyle"
        aria-valuemin="0" 
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script>
import FileConverter from '@/services/FileConverter.js'

export default {
  emits: ['fileReady'],
  mounted() {
    this.converter = new FileConverter()
    this.errors = this.converter.errors
  },
  data() {
    return {
      loading: false,
      generated: false,
      loadingProgress: 50,
      alertMessage: '',
    }
  },
  computed: {
    loadingStyle() {
      return `width: ${this.loadingProgress}%`
    },
    errors() {
      if (this.errors && this.errors.length > 0)
        return this.errors
    }
  },
  methods: {
    sendFile() {
      console.log('Sending .csv file')

      this.loading = true
      this.generated = false
      this.loadingProgress = 0

      const file = this.$refs.fileInput.files[0]

      if (!this.checkFile(file)) {
        this.loading = false
        return;
      }

      this.converter.setFile(file)
      this.converter.convert()
        .then(this.fileConveted)
    },
    fileConveted(data) {
      setTimeout(() => {
        this.loading = false
        this.generated = true
        this.loadingProgress = 100
        
        this.$emit('fileReady', this.converter.generateCsv())
      }, 500)
    },
    checkFile(file) {
      this.alert(null)
      
      if (file === undefined) {
        this.alert('Por favor, selecione um arquivo.')
        return false;
      }

      if (!file.type.match('text/csv')) {
        this.alert('O arquivo precisa estar no formato .csv')
        return false;
      }

      return true;
    },
    alert(message) {
      this.alertMessage = message
    }
  }
}
</script>

<style>

</style>