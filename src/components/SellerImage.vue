<template lang="pug">
  .col-md-3
    .image-card
      img(src="imageURL")
      button.btn.btn-primary(@click="addPoint()") Me gusta
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import {Action} from "vuex-class";

  @Component
  export default class SellerImage extends Vue {
    @Action("populateSellerPoint") populateSellerPointAction;
    @Prop() imageURL: string;
    @Prop() seller: Record<string, unknown>

    addPoints(): void {
      this.populateSellerPointAction({seller: this.seller})
    }
  }
</script>
