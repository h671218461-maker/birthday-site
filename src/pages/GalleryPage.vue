<template>
  <div class="gallery-container">
    <div class="gallery-content">
      <h1 class="title">爱豆show</h1>
      <div class="gallery-grid">
        <div v-for="(photo, index) in photos" 
             :key="index" 
             class="photo-card"
             @click="showPhoto(index)">
          <div class="photo-frame">
            <img :src="photo.url" :alt="photo.description">
            <div class="photo-description">{{ photo.description }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 照片查看器 -->
    <div v-if="selectedPhoto !== null" class="photo-viewer" @click="closeViewer">
      <div class="viewer-content" @click.stop>
        <img :src="photos[selectedPhoto].url" :alt="photos[selectedPhoto].description">
        <p class="viewer-description">{{ photos[selectedPhoto].description }}</p>
        <button class="close-button" @click="closeViewer">&times;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'

const selectedPhoto = ref(null)

// 仅保留两张本地图片（把附件放到 src/assets/gallery/photo1.jpg 和 photo2.jpg）
const photos = ref([
  {
    // Vite-friendly URL for static assets
    url: new URL('./assets/gallery/photo1.jpg', import.meta.url).href,
    description: '乘车静息，爱你不息'
  },
  {
    url: new URL('./assets/gallery/photo2.jpg', import.meta.url).href,
    description: '迷死我了，哈哈哈哈'
  }
  ,{
    url: new URL('./assets/gallery/photo3.jpg', import.meta.url).href,
    description: '生日快乐，乐乐融洽'
  }
])

const showPhoto = async (index) => {
  selectedPhoto.value = index
  await nextTick()
  // animate viewer content in
  gsap.from('.viewer-content', { scale: 0.9, opacity: 0, duration: 0.45, ease: 'back.out(1.2)' })
}

const closeViewer = () => {
  // animate and then clear
  gsap.to('.viewer-content', { scale: 0.9, opacity: 0, duration: 0.28, ease: 'power1.in', onComplete: () => { selectedPhoto.value = null } })
}
</script>

<style scoped>
.gallery-container {
  min-height: 100vh;
  padding: 100px 20px 20px;
}

.gallery-content {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: white;
  font-size: 2.5em;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.photo-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-card:hover {
  transform: scale(1.02);
}

.photo-frame {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.photo-frame img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-description {
  padding: 15px;
  text-align: center;
  color: #666;
}

.photo-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.viewer-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.viewer-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.viewer-description {
  color: white;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
}

.close-button {
  position: absolute;
  top: -40px;
  right: -40px;
  background: none;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
}

@media (max-width: 768px) {
  .gallery-container {
    padding-top: 80px;
  }
  
  .title {
    font-size: 2em;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .close-button {
    top: -40px;
    right: 0;
  }
}
</style>
