<template>
  <div class="message-container">
    <div class="message-content">
      <h1 class="title">给亚敏的一句话</h1>

      <div class="messages-list">
        <div class="message-card single">
          <div class="message-header">
            <span class="message-author">小航</span>
            <span class="message-time">{{ time }}</span>
          </div>
          <div class="message-body">
            小尧，生日快乐，祝你天天开心，好运满满，爱你一万年
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const time = ref('')

onMounted(() => {
  time.value = new Date().toLocaleString()
})
</script>

<style scoped>
.message-container {
  min-height: 100vh;
  padding: 100px 20px 20px;
}

.message-content {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: white;
  font-size: 2.2em;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.messages-list { display: flex; justify-content: center; }

.message-card {
  background: rgba(255,255,255,0.95);
  border-radius: 14px;
  padding: 22px 26px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  max-width: 680px;
}

.message-card.single .message-body {
  font-size: 1.25em;
  color: #333;
  line-height: 1.8;
}

.message-header { display:flex; justify-content:space-between; color:var(--primary-color); margin-bottom:10px }
.message-author { font-weight:700 }
.message-time { font-size:0.9em; color:#666 }

@media (max-width:768px) {
  .message-container { padding-top:80px }
  .message-card.single .message-body { font-size:1.05em }
}
</style>