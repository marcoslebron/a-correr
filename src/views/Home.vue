<template lang="pug">
main
  .row.justify-content-md-center
    .col-md-9
      .form-group
        input.form-control(type="text" v-model="query" placeholder="Buscar la mejor imagen")
  .row
    SellerImage(v-for="seller in sellers" :seller="seller" )


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SellerImage from "@/components/SellerImage";
import { axiosUnplash } from "@/vue-http";
import sellersJson from "@/sellers.json";
import imagesJson from "@/images.json";

@Component({
  components: {
    SellerImage
  },
})
export default class Home extends Vue {
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
    this.sellers.forEach(seller => {
      const randomNumber = Math.floor(Math.random() * this.images.length);
      const randomImage = this.images[randomNumber]
      this.images = this.images.splice(randomNumber, 1)
      console.log(randomImage)
      seller.image = randomImage
    })
  }
}
</script>
