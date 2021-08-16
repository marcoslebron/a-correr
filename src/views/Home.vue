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
            placeholder="Buscar la mejor imagen")
      .col-md-2
        button.btn.btn-primary(type="submit") Buscar Imagenes
  .row.justify-content-md-center
    .col-md-6
      SellerProgressBar(
        v-for="sellerCompetitor in sellersPoints" 
        :sellerName="sellerCompetitor.name" 
        :sellerPoints="sellerCompetitor.points")
  Loading(v-if="loading")
  .row.mt-5(v-else)
    SellerImage(
      v-for="seller in sellers" 
      :seller="seller" )
  EmptyMessage(v-if="noImages")

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SellerImage from "@/components/SellerImage";
import SellerProgressBar from "@/components/SellerProgressBar";
import { axiosUnplash, axiosAlegra } from "@/vue-http";
import sellersJson from "@/sellers.json";
import imagesJson from "@/images.json";
import { State, Getter } from "vuex-class";
import EmptyMessage from "@/components/EmptyMessage";
import Loading from "@/components/Loading";
import  { AxiosResponse } from "axios";

@Component({
  components: {
    SellerImage,
    SellerProgressBar,
    EmptyMessage,
    Loading
  },
})
export default class Home extends Vue {
  @State sellersPoints;
  @Getter raceHasEnded;

  query = "";

  images = []

  sellers = sellersJson;

  loading = false;

  // mounted(): void {
  //   this.fetchImages();
  // }

  mounted(): void {
    this.fetchSellers()
  }

  fetchImages(): void {
    this.loading = true;
    axiosUnplash.get("/search/photos", {
      params: { query: this.query, per_page: 100 },
    }).then((response: AxiosResponse) =>  {
      this.images = response.data.results.map(item => item.urls);;
      this.fetchSellers().then(() => this.assingImageToSeller())
      
    }).finally(() => this.loading = false);
  }

  async fetchSellers(): Promise<void> {
    const {data} = await axiosAlegra.get("/sellers");
    this.sellers = data;
  }

  get noImages(): boolean {
    return this.images.length === 0;
  }

  assingImageToSeller(): void {
    this.sellers.forEach((seller: Record<string, unknown>, index: number) => {
      let image = this.images[index]
      this.$set(seller, 'image', image)
    })
  }

  dispatchAlegraInvoice(): void {
    console.log("dispaching invoice")
  }

  @Watch("raceHasEnded", {immediate: true})
  onRaceEnded(val: boolean): void{
    if (val) {
      this.dispatchAlegraInvoice()
    }
  }

}
</script>
