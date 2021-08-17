<template lang="pug">
  .container
    .row.justify-content-center
      .col-md-7
        .back
          router-link(to="/") Atras
        .invoice
          Loading(v-if="loading")
          .row 
            .col-md-6
              .client 
                h4 Cliente
                .content.d-flex(v-if="invoice.client")
                  span Nombre:&nbsp;
                  span {{invoice.client.name}}

            .col-md-6
              .seller
                h4 Vendedor: 
                .content.d-flex(v-if="invoice.seller")
                  span Nombre:&nbsp;
                  span {{invoice.seller.name}}
            .col-md-12
              InvoiceItem(v-for="item in invoice.items" :key="id" :item="item")
                
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { axiosAlegra } from "@/vue-http";
import { InvoiceShowInterface } from "@/types";
import Loading from "@/components/Loading.vue";
import InvoiceItem from "@/components/InvoiceItem.vue";

@Component({
  components: {
    Loading,
    InvoiceItem,
  },
})
export default class InvoiceShow extends Vue {
  @Prop() id: string;
  loading = true;
  invoice: InvoiceShowInterface = { id: "" };

  mounted(): void {
    this.fetchInvoice();
  }

  fetchInvoice(): void {
    const url = `/invoices/${this.id}`;
    axiosAlegra
      .get(url)
      .then(({ data }) => {
        this.invoice = data;
      })
      .finally(() => (this.loading = false));
  }
}
</script>
<style lang="scss">
.invoice {
  border: 1px solid #dcdfea;
  border-radius: 4px;
  .invoice-item {
    background: #dcdfea;
    padding: 12px 10px;
  }
  %entity-column {
    padding: 10px;
  }
  .client {
    @extend %entity-column;
  }
  .seller {
    @extend %entity-column;
    border-right: 1px solid #dcdfea;
  }
}
</style>
