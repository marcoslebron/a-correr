<template lang="pug">
  .col-md-3
    .image-card
      img(src="imageURL")
      button.btn.btn-primary(@click="addPoint()") Me gusta
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class SellerImage extends Vue {
    @Prop() imageURL: string;
    @Prop() seller: Record<string, unknown>
  }
</script>
