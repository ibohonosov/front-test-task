<template>
  <div class="main-card">
    <div class="content_card">
      <h2>Slider of selected images with url-addresses</h2>
      <p>(Click on an image to remove it from the list)</p>
      <div class="cards" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in selectedItems" :key="index" class="item-card">
          <img :src="image.download_url" :alt="image.alt" class="card-image" @click="handleDeleteItem(image)">
          <p class="url-card">URL: {{image.download_url}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedItems: {
      type: Array,
      required: true,

    },
  },
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
    };
  },
  watch: {
    selectedItems: {
      handler() {
        this.stopAutoplay();
        this.currentIndex = 0;
        this.startAutoplay();
      },
      deep: true,
    },
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
  methods: {
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.scrollSlider(1);
      }, 3000);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
    scrollSlider(direction) {
      this.currentIndex = (this.currentIndex + direction) % this.selectedItems.length;
    },
    handleDeleteItem(image) {
      this.$emit('image-delete', image)
    }

  },
};
</script>

<style src="@/css/userCards.css"></style>
