<template>
  <main>
    <h1>Please scroll down ↓↓↓↓↓↓↓↓</h1>
    <div class="x-components-images" style="width: 100px">
      <BaseResultImage data-test="result-with-images" :result="resultWithImages">
        <template #placeholder>
          <div data-test="result-picture__placeholder">placeholder0</div>
        </template>
        <template #fallback>
          <div data-test="result-picture__fallback">fallback0</div>
        </template>
      </BaseResultImage>
      <BaseResultImage data-test="result-with-fail-images" :result="resultWithFailImages">
        <template #placeholder>
          <div data-test="result-picture__placeholder">placeholder1</div>
        </template>
        <template #fallback>
          <div data-test="result-picture__fallback">fallback1</div>
        </template>
      </BaseResultImage>
      <BaseResultImage
        data-test="result-with-fail-images-and-ok-images"
        :result="resultWithFailImagesAndOkImages"
      >
        <template #placeholder>
          <div data-test="result-picture__placeholder">placeholder2</div>
        </template>
        <template #fallback>
          <div data-test="result-picture__fallback">fallback2</div>
        </template>
      </BaseResultImage>
    </div>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { createResultStub } from '../__stubs__/results-stubs.factory';
  import { BaseResultImage } from '../components';
  import { XInstaller } from '../x-installer/x-installer';
  import { baseInstallXOptions, baseSnippetConfig } from './base-config';

  @Component({
    beforeRouteEnter(_to, _from, next: () => void): void {
      new XInstaller(baseInstallXOptions).init(baseSnippetConfig);
      next();
    },
    components: {
      BaseResultImage
    }
  })
  export default class BaseResultImageView extends Vue {
    private resultsStub = [
      createResultStub('Product 001', {
        images: ['https://picsum.photos/seed/1/200/300', 'https://picsum.photos/seed/2/200/300']
      }),
      createResultStub('Product 002', { images: ['product-002-01.jpg', 'product-002-02.jpg'] }),
      createResultStub('Product 003', {
        images: [
          'https://notexistsimage1.com',
          'https://notexistsimage2.com',
          'https://notexistsimage3.com',
          'https://picsum.photos/seed/3/200/300'
        ]
      })
    ];
    protected resultWithImages = this.resultsStub[0];
    protected resultWithFailImages = this.resultsStub[1];
    protected resultWithFailImagesAndOkImages = this.resultsStub[2];
  }
</script>

<style lang="scss">
  .x-components-images {
    position: absolute;
    top: 1500px;
    display: flex;
    flex-direction: column;
  }
</style>
