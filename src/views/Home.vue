<template lang="pug">
.container
  form(@submit.prevent="fetchImages")
    .row.justify-content-md-center.mt-5
      .col-md-6
        .form-group
          input.form-control(
            type="text" 
            v-model="query" 
            @key.enter="fetchImages" 
            required
            placeholder="Buscar imagen")
      .col-md-2
        button.btn.btn-primary(type="submit") Buscar Imagenes

  .row.justify-content-md-center.mt-3
    .col-md-6
      SellerProgressBar(
        v-for="sellerCompetitor in sellersPoints" 
        :sellerName="sellerCompetitor.name" 
        :sellerPoints="sellerCompetitor.points"
        :key="sellerCompetitor.id")
      
      .d-flex.justify-content-between(v-if="totalPoints")
        .total-label
          h4 Puntos de la carrera en Total 
        .total
          h4 {{totalPoints}}

  Loading(v-if="loading")

  transition-group(v-else tag="div" class="row" name="list")
    SellerImage(
      v-for="seller in sellers" 
      :seller="seller"
      :key="seller.id")

  EmptyMessage(v-if="noImages")
  
  Modal(v-if="showWinner" @close="showWinner = false")
    .content(slot="content")
      img.trophy-img(src="../assets/images/trophy.png")
      h5(v-if="sellerWinner") {{sellerWinner.name}}
      h6 🎉¡¡Ha Ganado la Carrera!!🎉
      Loading(v-if="loadingCreation")
        p Generando factura...
      router-link(:to="{name: 'Invoice', params: { id: invoiceId }}") Ver Factura
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SellerImage from "@/components/SellerImage.vue";
import SellerProgressBar from "@/components/SellerProgressBar.vue";
import { axiosUnplash, axiosAlegra } from "@/vue-http";
import { State, Getter } from "vuex-class";
import EmptyMessage from "@/components/EmptyMessage.vue";
import Loading from "@/components/Loading.vue";
import Modal from "@/components/Modal.vue";
import {
  InvoiceParamsInterface,
  SellerPointInterface,
  ClientInterface,
  ProductInterface,
} from "@/types";
import { AxiosResponse } from "axios";
import { format } from "date-fns";

@Component({
  components: {
    SellerImage,
    SellerProgressBar,
    EmptyMessage,
    Loading,
    Modal,
  },
})
export default class Home extends Vue {
  @State sellersPoints!: SellerPointInterface[];
  @Getter raceHasEnded!: boolean;
  @Getter totalPoints!: number;
  @Getter sellerWinner!: SellerPointInterface;

  query = "";

  images = [];

  sellers = [];

  client: ClientInterface = { id: "", name: "" };

  product: ProductInterface = {
    id: "",
    name: "",
    quantity: 0,
    price: [{ price: 0 }],
  };

  loading = false;

  loadingCreation = false;

  showWinner = false;

  invoiceId = "1";

  get dateNow(): string {
    return format(new Date(), "yyyy-MM-dd");
  }

  get dueDate(): string {
    return format(new Date(2021, 10, 6), "yyyy-MM-dd");
  }

  get invoiceParams(): InvoiceParamsInterface {
    return {
      date: this.dateNow,
      dueDate: this.dueDate,
      client: this.client?.id,
      seller: this.sellerWinner.id,
      items: [
        {
          id: this.product?.id,
          price: this.product?.price[0].price,
          quantity: this.totalPoints,
        },
      ],
    };
  }

  get noImages(): boolean {
    return this.images.length === 0;
  }

  fetchImages(): void {
    this.images = [];
    this.loading = true;
    axiosUnplash
      .get("/search/photos", {
        params: { query: this.query, per_page: 100 },
      })
      .then((response: AxiosResponse) => {
        this.images = response.data.results.map(
          (item: Record<string, number>) => item.urls
        );
        this.fetchSellers().then(() => this.assingImageToSeller());
      })
      .finally(() => (this.loading = false));
  }

  async fetchSellers(): Promise<void> {
    const { data } = await axiosAlegra.get("/sellers");
    this.sellers = data;
  }

  fetchClient(): void {
    axiosAlegra.get("/contacts").then(({ data }) => {
      this.client = data[0];
    });
  }

  fetchProduct(): void {
    axiosAlegra.get("/items").then(({ data }) => {
      this.product = data[0];
    });
  }

  assingImageToSeller(): void {
    this.sellers.forEach((seller: Record<string, unknown>, index: number) => {
      let image = this.images[index];
      this.$set(seller, "image", image);
    });
  }

  createInvoice(): void {
    this.loadingCreation = true;
    axiosAlegra
      .post("/invoices", this.invoiceParams)
      .then(({ data }: AxiosResponse) => {
        this.invoiceId = data.id;
      })
      .finally(() => {
        this.loadingCreation = false;
      });
  }

  dispatchAlegraInvoice(): void {
    this.fetchClient();
    this.fetchProduct();
    this.showWinner = true;
    this.createInvoice();
  }

  @Watch("raceHasEnded", { immediate: true })
  onRaceEnded(val: boolean): void {
    if (val) {
      this.dispatchAlegraInvoice();
    }
  }
}
</script>
