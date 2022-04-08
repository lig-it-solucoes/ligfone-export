<script setup>
import UploadFile from '@/components/UploadFile.vue'
import FileResult from '@/components/FileResult.vue'
import FileTutorial from '@/components/FileTutorial.vue'
</script>

<template>
  <main class="container wrapper">
    <header>
      <h1 class="green logo">LIGFone <small class="logo-contrast">export</small></h1>
    </header>

    <section class="card card-body bg-dark">
      <UploadFile
        @fileReady="$refs.result.showDownload($event)"
      ></UploadFile>

      <FileResult 
        class="mt-3"
        ref="result"
      ></FileResult>
    </section>

    <section class="card card-body bg-dark mt-3">
      <FileTutorial></FileTutorial>
    </section>

    <div class="text-center mt-2">
      <a href="https://www.ligit.com.br" class="text-secondary" target="_blank">LIG-it</a> &copy; 2022
    </div>
  </main>
</template>

<style>
@import './assets/base.css';

.logo {
  color: var(--bs-orange);
  text-align: center;
  font-family: 'Baloo 2', sans-serif;
}

.logo-contrast {
  color: #008fc4;
}

.wrapper {
  padding: 2em;
  margin: 20px auto;
  max-width: 900px;
}
</style>
