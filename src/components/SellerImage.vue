<template lang="pug">
  .col-md-3
    .image-card
      img(src="imageURL")
      button.btn.btn-primary(@click="addPoint()") Me gusta
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {Action} from "vuex-class";
type imageObjectType = {full: string, raw: string, regular: string, small:  string, thumb: string}
interface SellerShowInterface {
  id: number;
  name: string;
  image: imageObjectType;
  observations: string;
  status: string;
}

@Component
export default class SellerImage extends Vue {
  @Action("populateSellerPoint") populateSellerPointAction;
  @Prop() seller: SellerShowInterface

  get imageURL(): string {
    return this.seller.image.regular;
  }
  addPoints(): void {
    this.populateSellerPointAction({seller: this.seller})
  }
}
</script>
