<template>
  <form @submit.prevent="sendFile">
    <div class="row gy-3">
      <div class="col-sm-5 col-md-4">
        <h3 class="h6">Escolha o DDD local</h3>
        <select 
          v-model="dddSelected" 
          required
          class="form-select"
        >
          <option disabled value="">Escolha um item</option>
          <option v-for="(state, number) in ddds" :key="number" :value="number">{{ number }} - {{ state }}</option>
        </select>
      </div>
      
      <div class="col-sm">
        <h3 class="h6">Selecione o arquivo .CSV</h3>
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
      </div>
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
import dddList from '@/utils/dddBrazil.json'

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
      ddds: dddList.estadoPorDdd,
      dddSelected: "",
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
      this.loading = true
      this.generated = false
      this.loadingProgress = 0

      const file = this.$refs.fileInput.files[0]
      const ddd = this.dddSelected

      console.log(`Sending ${file.name} file`)
      console.log(`DDD ${ddd} selected`)

      if (!this.checkFile(file, ddd)) {
        this.loading = false
        return;
      }

      this.converter.setFile(file)
      this.converter.setDDD(ddd)
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
    checkFile(file, ddd) {
      this.alert(null)
      
      if (!file) {
        this.alert('Por favor, selecione um arquivo.')
        return false;
      }
   
      if (!ddd) {
        this.alert('Por favor, selecione o DDD local.')
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