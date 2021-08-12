<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { axiosUnplash } from "@/vue-http";
@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  query = "";
  images = [];
  mounted(): void {
    this.fetchImages();
  }
  async fetchImages(): Promise<void> {
    const response = await axiosUnplash.get("/search/photos", {
      params: { query: this.query },
    });
    this.images = response.data;
  }
}
</script>
