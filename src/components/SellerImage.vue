<template lang="pug">
  .col-md-3
    .image-card
      img(:src="imageURL" loading=lazy)
      .image-card-foorter
        .image-card-seller {{seller.name}}
        button.btn.btn-sm.btn-primary(v-if="allowLike" @click="addPoints()") Me gusta 😍
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, State } from "vuex-class";

type imageObjectType = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
};

interface SellerShowInterface {
  id: number;
  name: string;
  image: imageObjectType;
  observations: string;
  status: string;
}

@Component
export default class SellerImage extends Vue {
  @State pointsReward: number;
  @Action("addSellerPoints") addSellerPointAction;
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
  img {
    border-radius: 5px;
    width: 100%;
  }
}
</style>
