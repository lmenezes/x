<template>
  <main>
    <div class="x-components-images">
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
    <BaseRating :value="2.5">
      <template #filledIcon>◼</template>
      <template #emptyIcon>◻</template>
    </BaseRating>
    <BaseColumnPickerList #default="{ column }" :columns="[2, 4, 6]">
      <span>{{ column }}⇋</span>
    </BaseColumnPickerList>
    <BaseVariableColumnGrid :items="searchResponseStub">
      <template #Banner="{ item }">
        <span :class="`x-banner__${item.id}`">Banner: {{ item.modelName }}</span>
      </template>
      <template #Promoted="{ item }">
        <span>Promoted: {{ item.modelName }}</span>
      </template>
      <template #Result="{ item }">
        <span>Result: {{ item.modelName }}</span>
      </template>
      <template #NextQueries="{ item }">
        <span>Nextqueries: {{ item.modelName }}</span>
      </template>
      <template #default="{ item }">
        <span>Default: {{ item }}</span>
      </template>
    </BaseVariableColumnGrid>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { getResultsStub } from '../__stubs__/results-stubs.factory';
  import { getSearchResponseStub } from '../__stubs__/search-response-stubs.factory';
  import { BaseResultImage } from '../components';
  import StaggeredFadeAndSlide from '../components/animations/staggered-fade-and-slide.vue';
  import BaseRating from '../components/base-rating.vue';
  import BaseVariableColumnGrid from '../components/base-variable-column-grid.vue';
  import BaseColumnPickerList from '../components/column-picker/base-column-picker-list.vue';
  import { XInstaller } from '../x-installer/x-installer';
  import { baseInstallXOptions, baseSnippetConfig } from './base-config';

  @Component({
    beforeRouteEnter(_to, _from, next: () => void): void {
      new XInstaller(baseInstallXOptions).init(baseSnippetConfig);
      next();
    },
    components: {
      BaseColumnPickerList,
      BaseRating,
      BaseResultImage,
      BaseVariableColumnGrid
    }
  })
  export default class App extends Vue {
    private resultsStub = getResultsStub();
    private searchResponse = getSearchResponseStub();
    protected searchResponseStub = [
      ...this.searchResponse.banners,
      ...this.searchResponse.promoteds,
      ...this.searchResponse.results
    ];
    protected resultWithImages = this.resultsStub[0];
    protected resultWithFailImages = this.resultsStub[1];
    protected resultWithFailImagesAndOkImages = this.resultsStub[2];
    protected fade = StaggeredFadeAndSlide;
  }
</script>

<style lang="scss">
  .x-components-images {
    position: absolute;
    top: 1500px;
    display: flex;
    flex-direction: column;
  }

  .x-base-grid {
    column-gap: 10px;
    row-gap: 10px;

    &__item {
      border: 1px solid black;
      padding: 20px;
      text-align: center;
    }

    &__next-queries {
      border-color: red;
      border-radius: 50px;
    }

    &__x-result {
      border-color: deepskyblue;
    }

    &__banner {
      border-color: blueviolet;
      grid-column: -1/1;
    }

    &__promoted {
      border-color: orange;
    }
  }
</style>
