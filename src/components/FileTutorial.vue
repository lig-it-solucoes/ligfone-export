<template>
  <div class="h5 text-center">Como processar o arquivo?</div>

  <ul>
    <li>Escolha o seu DDD local</li>
    <li>O arquivo deve ser enviado no formato .csv com os seguintes campos:</li>

    <ol>
      <li v-for="(field, index) in inputFields" :key="index">
        {{ field.title }}
      </li>
    </ol>

    <p>O arquivo <strong>DEVE</strong> conter cabeçalho. Se não houver, a primeira linha será ignorada.</p>

    <li>Clique em "Gerar" para que seu arquivo seja processado</li>
    <li>Após a conclusão, baixe o arquivo gerado</li>
  </ul>
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