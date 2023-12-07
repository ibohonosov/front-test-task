<template>
  <div class="main">
    <button @click="prevSlide">&#10094;</button>
    <div class="slides-container">
      <div v-for="image in displayImages" :key="image.id" class="slide">
        <img class="img-carousel" :src="image.download_url" alt="" @click="handleAddImage(image)" >
      </div>
    </div>
    <button @click="nextSlide">&#10095;</button>
  </div>
</template>

<script>

export default {
  name: "Carousel",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    selectedItems: {
      type: Array,
    }
  },
  data() {
    return {
      displayImages: [],
      currentIndex: 0,
      numToDisplay: 1,
      localImages: [],
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.localImages.length;
      this.initSlider();
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.localImages.length) % this.localImages.length;
      this.initSlider();
    },
    updateNumToDisplay() {
      if (window.innerWidth <= 768) return 1;
      else if (window.innerWidth <= 1024) return 3;
      else if (window.innerWidth < 1200) return 5;
      else return 7;
    },
    initSlider() {
      this.numToDisplay = this.updateNumToDisplay();
      const endIndex = this.currentIndex + this.numToDisplay;
      if (endIndex <= this.localImages.length) {
        this.displayImages = this.localImages.slice(this.currentIndex, endIndex);
      } else {
        const overflow = endIndex - this.localImages.length;
        this.displayImages = [...this.localImages.slice(this.currentIndex), ...this.localImages.slice(0, overflow)];
      }
    },
    handleAddImage(image) {
      this.$emit('image-clicked', image);
    },
  },
  mounted() {
    window.addEventListener('resize', this.initSlider);
    this.initSlider();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.initSlider);
  },
  watch: {
    images: {
      immediate: true,
      handler(newImages) {
        this.localImages = newImages.slice();
        this.initSlider();
      },
    },
  },
};
</script>

<style src="@/css/carousel.css"></style>
