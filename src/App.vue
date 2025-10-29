<template>
  <div class="page-container">
    <nav class="navigation">
      <router-link to="/" class="nav-link">首页</router-link>
      <router-link to="/wishes" class="nav-link">祝福</router-link>
      <router-link to="/gallery" class="nav-link">相册</router-link>
      <router-link to="/message" class="nav-link">留言</router-link>
    </nav>
    <router-view v-slot="{ Component }">
      <!-- Use JS hooks for smoother GSAP transitions -->
      <transition mode="out-in" @enter="pageEnter" @leave="pageLeave">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { gsap } from 'gsap'

// page enter animation (GSAP)
const pageEnter = (el, done) => {
  // ensure next tick so children are ready
  nextTick(() => {
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', onComplete: done })
  })
}

const pageLeave = (el, done) => {
  gsap.to(el, { opacity: 0, y: -10, duration: 0.45, ease: 'power1.inOut', onComplete: done })
}
</script>

<style scoped>
/* App-level layout + navigation styles */
.page-container {
  min-height: 100vh;
  position: relative;
}

.navigation {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.92);
  padding: 8px 16px;
  border-radius: 28px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  display: flex;
  gap: 14px;
  align-items: center;
}

.nav-link {
  color: #ff69b4;
  text-decoration: none;
  font-weight: 700;
  padding: 10px 22px; /* larger tappable area */
  font-size: 1.05rem;
  min-width: 88px;
  text-align: center;
  border-radius: 14px;
  transition: background 0.18s ease, transform 0.12s ease, color 0.12s ease;
  border: 2px solid rgba(255,105,180,0.12); /* subtle transparent border */
  background: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.nav-link:hover {
  background: rgba(255,105,180,0.08);
  color: #ff2f7a;
  transform: translateY(-2px);
}

.nav-link:active {
  background: #ff4d94; /* darker on click */
  color: white;
  transform: translateY(0);
}

.router-link-active {
  background: #ff69b4;
  color: white;
  box-shadow: 0 6px 18px rgba(255,105,180,0.12);
}

/* Fade transition fallback */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(.2,.8,.2,1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>