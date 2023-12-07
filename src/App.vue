<template>
  <div id="app">
    <h1>Choose an image</h1>
    <Carousel :images="images" @image-clicked="handleAddImage" :selectedItems="selectedItems" />
    <UserCards :selectedItems="selectedItems" @image-delete="handleDeleteItem"/>
  </div>
</template>

<script>
import { getImage } from "@/api/api";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Carousel from "@/components/Carousel";
import UserCards from "@/components/UserCards";

export default {
  name: "App",
  components: { Carousel, UserCards },
  setup() {
    const images = ref([]);
    const selectedItems = ref([]);

    const loadImages = async () => {
      try {
        const result = await getImage();
        images.value = result;
      } catch (error) {
        console.error('Error in mounted hook:', error);
      }
    };

    onMounted(() => {
      loadImages();
    });
    const handleAddImage = (image) => {
      const isImageAlreadySelected = selectedItems.value.some((item) => item.id === image.id);
      if (!isImageAlreadySelected) {
        selectedItems.value.push(image)
      }else {
        alert("This image has already been selected!")
      }
    };
    const handleDeleteItem = (image) => {
      selectedItems.value = selectedItems.value.filter((item) => item !== image);
    };
    return {
      images,
      selectedItems,
      handleAddImage,
      handleDeleteItem,
    };
  },
};
</script>

<style src="@/css/main.css"></style>


