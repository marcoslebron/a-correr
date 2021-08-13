<template lang="pug">
main
  .row.justify-content-md-center
    .col-md-9
      .form-group
        input.form-control(type="text" v-model="query" placeholder="Buscar la mejor imagen")
  .row
    .col-md-2


</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { axiosUnplash } from "@/vue-http";
@Component({
  components: {
  },
})
export default class Home extends Vue {
  query = "";
  images = [];
  // mounted(): void {
  //   this.fetchImages();
  // }
  async fetchImages(): Promise<void> {
    const response = await axiosUnplash.get("/search/photos", {
      params: { query: this.query, per_page: 100 },
    });
    this.images = response.data;
  }

  
}
</script>
