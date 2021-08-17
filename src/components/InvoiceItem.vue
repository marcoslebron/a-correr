<template lang="pug">
.d-flex.justify-content-between.invoice-item
  .name
    b Nombre
    .label {{item.name}}
  .quantity
    b Quantity
    .label {{item.quantity}}
  .price
    b Price
    .label {{item.price}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ProductInterface } from "@/types";

@Component
export default class InvoiceItem extends Vue {
  @Prop() item: ProductInterface;
}
</script>
