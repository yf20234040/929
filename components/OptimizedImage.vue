<template>
  <image 
    :src="imageSrc" 
    :mode="mode" 
    :lazy-load="true"
    :class="imageClass"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<script>
export default {
  name: 'OptimizedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    fallback: {
      type: String,
      default: '/static/2.png'
    },
    imageClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageSrc: this.src,
      hasError: false
    }
  },
  methods: {
    handleError() {
      if (!this.hasError) {
        this.hasError = true;
        this.imageSrc = this.fallback;
        this.$emit('error');
      }
    },
    handleLoad() {
      this.$emit('load');
    }
  },
  watch: {
    src(newSrc) {
      this.imageSrc = newSrc;
      this.hasError = false;
    }
  }
}
</script>

<style scoped>
image {
  transition: opacity 0.3s ease;
}
</style>
