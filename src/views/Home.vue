<template lang="pug">
main
  .row.justify-content-md-center.mt-5
    .col-md-9
      .form-group
        input.form-control(type="text" v-model="query" placeholder="Buscar la mejor imagen")
    .col-md-2
      button(@click="searchImages") Search
  .row.justify-content-md-center
    .col-md-6
      SellerProgressBar(v-for="sellerCompetitor in sellersPoints" 
        :sellerName="sellerCompetitor.name" 
        :sellerPoints="sellerCompetitor.points")
  .row.mt-5
    SellerImage(v-for="seller in sellers" :seller="seller" )
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import SellerImage from "@/components/SellerImage";
import SellerProgressBar from "@/components/SellerProgressBar";
import { axiosUnplash } from "@/vue-http";
import sellersJson from "@/sellers.json";
import imagesJson from "@/images.json";
import { State, Getter } from "vuex-class";

@Component({
  components: {
    SellerImage,
    SellerProgressBar
  },
})
export default class Home extends Vue {
  @State sellersPoints;
  @Getter raceHasEnded;

  query = "";

  images = imagesJson.results.map(item => item.urls);

  sellers = sellersJson;

  // mounted(): void {
  //   this.fetchImages();
  // }

  mounted(): void {
    this.assingImageToSeller()
  }
  async fetchImages(): Promise<void> {
    const {data} = await axiosUnplash.get("/search/photos", {
      params: { query: this.query, per_page: 100 },
    });
    this.images = data.results;
  }

  assingImageToSeller(): void {
    this.sellers.forEach((seller, index) => {
      let randomImage = this.images[index]
      this.$set(seller,'image',randomImage)
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
