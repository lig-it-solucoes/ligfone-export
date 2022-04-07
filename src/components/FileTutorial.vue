<template>
  <div class="h5 text-center">Como enviar o arquivo?</div>

  <p>O arquivo deve ser enviado no formato .csv com os seguintes campos:</p>

  <ul>
    <li v-for="(field, index) in inputFields" :key="index">
      Campo {{ field.inputPosition+1 }}: {{ field.title }}
    </li>
  </ul>

  <p>Todos os arquivos <strong>DEVEM</strong> conter cabeçalho. Se não houver, a primeira linha será ignorada.</p>
</template>

<script>
import { INPUTFIELDS } from '@/utils/filefields.js'

export default {
  data() {
    return {
      inputFields: INPUTFIELDS,
    }
  }
}
</script>

<style>

</style>