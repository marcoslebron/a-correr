<template lang="pug">
  .col-md-3
    .image-card
      .img-holder
        img(:src="seller.image.regular")
      .image-card-foorter.mb-2
        .image-card-seller.mt-2 {{seller.name}}
        button.btn.btn-sm.btn-primary(v-if="allowLike" @click="addPoints()") Me gusta 😍
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";
import { SellerPointInterface, SellerShowInterface } from "@/types";

@Component
export default class SellerImage extends Vue {
  @State pointsReward: number;
  @Action("addSellerPoints") addSellerPointAction: (data: {
    seller: SellerPointInterface;
  }) => void;
  @Getter raceHasEnded: boolean;
  @Prop() seller: SellerShowInterface;

  liked = false;

  get imageURL(): string {
    if (this.seller.image) {
      return this.seller.image.regular;
    }
    return "";
  }

  get allowLike(): boolean {
    return this.liked || this.raceHasEnded ? false : true;
  }

  addPoints(): void {
    this.liked = true;
    this.addSellerPointAction({
      seller: {
        points: this.pointsReward,
        name: this.seller.name,
        id: this.seller.id,
      },
    });
  }
}
</script>
<style lang="scss">
.image-card {
  margin-bottom: 10px;
  img {
    border-radius: 5px;
    width: 100%;
  }
  .img-holder {
    background-size: contain;
    height: 200px;
    overflow: hidden;
  }
}
</style>
