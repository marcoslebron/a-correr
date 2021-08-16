<template lang="pug">
.seller-progress-bar.mt-4
  .d-flex.justify-content-between
    .seller-progress-name 
      b {{sellerName}}
    .seller-progress-points-win Puntos para Ganar {{pointsToWin}}
  .seller-progress-winner(v-if="isWinner") 🎉¡¡Ganador!!🎉
  .progress
    .progress-bar.progress-bar-striped(
      role="progressbar" :style="stylePercent" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
    ) {{sellerPoints}} Puntos
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class SellerProgress extends Vue {
  @Prop() sellerPoints: number;
  @Prop() sellerName: string;
  @State winnerPoints: number;

  get barPercent(): number {
    return (this.sellerPoints / this.winnerPoints) * 100;
  }

  get stylePercent(): string {
    return `width: ${this.barPercent}%`;
  }

  get isWinner(): boolean {
    return this.barPercent >= 100;
  }

  get pointsToWin(): number {
    return this.winnerPoints - this.sellerPoints;
  }
}
</script>
<style lang="scss">
.seller-progress-bar {
  .seller-progress-winner {
    color: rgb(255, 198, 10);
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
