<template lang="pug">
.row
  .col-12
    .loading
      slot
      img(src="../assets/images/loading.gif")
</template>
<style lang="scss">
.loading {
  text-align: center;
  img {
    max-width: 200px;
  }
}
</style>
