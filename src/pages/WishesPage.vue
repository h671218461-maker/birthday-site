<template>
  <div class="wishes-container">
    <div class="wishes-content">
      <h1 class="title">祝福墙</h1>
      <div class="wishes-grid">
        <div v-for="(wish, index) in wishes" 
             :key="index" 
             class="wish-card"
             :style="{ animationDelay: `${index * 0.12}s` }">
          <div class="wish-content">
            <p class="wish-text">{{ wish.text }}</p>
            <p class="wish-author"> {{ wish.author }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const wishes = ref([
  {
    text: `"你就像大观园中最独特的那株绛珠仙草，为我的生命带来灵气与诗意。"

在这个生日，愿我能如神瑛侍者般，用一生的呵护回报你的美好。
祝我的"颦颦"生日快乐，永远不要"葬花"，永远笑靥如花。`,
    author: "《红楼梦》"
  },
  {
    text: `"月色溶溶夜，花阴寂寂春"
    
在这美好的夜晚，我想对你说：愿我们的爱情如崔莺莺与张生般坚定，却比他们更幸运
不需要长亭送别的悲伤，只有朝夕相处的甜蜜。生日快乐，我的佳人。

`,
    author: "《西厢记》"
  },
  {
    text: `"今夕何夕，见此良人。
如月之恒，如日之升。"

生日快乐，我的良人。愿你的生命如新月渐盈，如朝阳初升，永远向着光明生长。
我们的爱情，当如《诗经》所言"死生契阔，与子成说"。`,
    author: "《诗经》"
  },
  {
    text: `"云想衣裳花想容"，在你生日这天，连天上的云彩都羡慕你的衣裳，盛开的鲜花都嫉妒你的容颜。
愿你新岁如李白笔下的春风，"春风拂槛露华浓"，永远被美好与温柔环绕。

`,
    author: "《清平调》"
  },
  {
    text: `"情不知所起，一往而深"

就像杜丽娘为情而死、为情而生，我愿为你倾尽所有深情。
生日快乐，愿我们的爱情超越生死，永恒不变。

`,
    author: "《牡丹亭》"
  },
  {
    text: `"金风玉露一相逢，便胜却人间无数"

我们的相遇就是这般美好。生日快乐，愿我们不需要像牛郎织女那样等待七夕，
而是"两情若是久长时，又岂在朝朝暮暮"的踏实相守。`,
    author: "《鹊桥仙》"
  }
])

onMounted(() => {
  // 使用 GSAP 增强入场动画，stagger 与新的较小延迟配合
  gsap.fromTo('.wish-card', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power2.out' })
})
</script>

<style scoped>
.wishes-container {
  min-height: 100vh;
  padding: 100px 20px 20px;
}

.wishes-content {
  max-width: 1100px;
  margin: 0 auto;
}

.title {
  text-align: center;
  color: white;
  font-size: 2.5em;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
  padding: 20px;
}

.wish-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 26px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(50px);
  opacity: 0;
  animation: slideIn 0.5s ease forwards;
}

.wish-content {
  text-align: left;
}

.wish-text {
  font-size: 1.12em;
  color: #444;
  margin-bottom: 18px;
  line-height: 1.9;
  white-space: pre-wrap;
}

.wish-author {
  color: var(--primary-color);
  font-style: italic;
  text-align: right;
}

@keyframes slideIn {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .wishes-container {
    padding-top: 80px;
  }
  
  .title {
    font-size: 2em;
  }
  
  .wishes-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
