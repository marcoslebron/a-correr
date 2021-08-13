<template lang="pug">
.progress
  .seller-progress-name {{sellerName}}
  .progress-bar.progress-bar-striped(
    role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class SellerProgress extends Vue {
  @Prop() sellerPoint: number
  @Prop() sellerName: string;
}
</script>
