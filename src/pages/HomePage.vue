<template>
  <div class="home-container">
    <!-- confetti canvas for celebration -->
    <canvas class="confetti-canvas" ref="confettiCanvas"></canvas>
    <div class="birthday-card" ref="card">
      <h1 class="title" v-show="showTitle">尧亚敏，生日快乐！</h1>
      <div class="cake" ref="cake">
        <div class="candles">
          <div class="candle" v-for="n in 3" :key="n"></div>
        </div>
        <div class="cake-layers"></div>
      </div>
      <div class="message" v-show="showMessage">
        <p class="dear">心爱的哈基尧：</p>
        <p>在这特别的日子里</p>
        <p>愿你的生日充满欢乐和温馨</p>
        <p>愿你所求皆如愿，所行化坦途</p>
        <p>所爱皆可得，所期皆可待</p>
        <div class="age-counter" v-show="showMessage">
          <p>距离生日还有：</p>
          <div class="countdown">
            <span>{{ days }}天</span>
            <span>{{ hours }}时</span>
            <span>{{ minutes }}分</span>
            <span>{{ seconds }}秒</span>
          </div>
        </div>
      </div>
      <div class="balloons">
        <div class="balloon" v-for="n in 5" :key="n"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const card = ref(null)
const cake = ref(null)
const showTitle = ref(false)
const showMessage = ref(false)
const confettiCanvas = ref(null)

// 倒计时数据
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer = null

// confetti particles state
let confettiCtx = null
let confettiParticles = []
let confettiRAF = null

class ConfettiPiece {
  constructor(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * -h
    this.size = 6 + Math.random() * 10
    this.color = Math.random() > 0.5 ? getComputedStyle(document.documentElement).getPropertyValue('--primary-color') : getComputedStyle(document.documentElement).getPropertyValue('--secondary-color')
    this.rotation = Math.random() * Math.PI
    this.speedY = 1 + Math.random() * 3
    this.speedX = -1 + Math.random() * 2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += 0.02
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}

const setupConfetti = (canvas) => {
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  confettiCtx = canvas.getContext('2d')
  confettiCtx.scale(dpr, dpr)
  confettiParticles = []
  for (let i = 0; i < 80; i++) confettiParticles.push(new ConfettiPiece(w, h))

  const loop = () => {
    confettiCtx.clearRect(0, 0, w, h)
    confettiParticles.forEach((p) => {
      p.update()
      p.draw(confettiCtx)
      if (p.y > h + 20) {
        // recycle
        p.x = Math.random() * w
        p.y = -10 - Math.random() * 100
      }
    })
    confettiRAF = requestAnimationFrame(loop)
  }
  loop()
}

const destroyConfetti = () => {
  if (confettiRAF) cancelAnimationFrame(confettiRAF)
  confettiParticles = []
  confettiCtx = null
}

const calculateTimeLeft = () => {
  const birthday = new Date('2025-10-30')
  const now = new Date()
  const difference = birthday - now

  if (difference > 0) {
    days.value = Math.floor(difference / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((difference % (1000 * 60)) / 1000)
  }
}

onMounted(() => {
  // 开始倒计时
  timer = setInterval(calculateTimeLeft, 1000)
  calculateTimeLeft()
  // 卡片入场动画
  gsap.from(card.value, {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)",
    onComplete: () => {
      showTitle.value = true
      animateCake()
    }
  })

  // 启动 confetti
  setupConfetti(confettiCanvas.value)
  // 花束喷射动画（延迟到页面 enter 动画完成后播放）
  // 延迟约与 App.vue pageEnter 动画一致（0.6s），加一点缓冲
  setTimeout(() => {
    playFlowerBurst()
  }, 700)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  destroyConfetti()
})

const animateCake = () => {
  gsap.from(cake.value, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
    onComplete: () => {
      showMessage.value = true
      animateBalloons()
    }
  })
}

const animateBalloons = () => {
  gsap.utils.toArray('.balloon').forEach((balloon, i) => {
    gsap.to(balloon, {
      y: -20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      delay: i * 0.2,
      ease: "power1.inOut"
    })
  })
}

// 花瓣喷射动画：起点精确对准蛋糕（使用 cake.value 的位置），在小屏上自动做微调
const playFlowerBurst = (opts = {}) => {
  const cnt = card.value
  const cakeEl = cake.value
  if (!cnt || !cakeEl) return
  const cardRect = cnt.getBoundingClientRect()
  const cakeRect = cakeEl.getBoundingClientRect()

  // 计算相对于卡片左上角的起点（蛋糕上方偏一点）
  const originX = cakeRect.left - cardRect.left + cakeRect.width / 2
  const originY = cakeRect.top - cardRect.top + Math.max(6, cakeRect.height * 0.18)

  const petals = []
  // 根据屏幕宽度在小屏上使用更少的花瓣并缩短飞行距离
  const isSmall = window.innerWidth <= 480
  const total = opts.count || (isSmall ? 10 : 14)

  for (let i = 0; i < total; i++) {
    const pet = document.createElement('div')
    pet.className = 'petal'
    const hue = 310 + Math.floor(Math.random() * 60)
    pet.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.0)), linear-gradient(180deg, hsl(${hue} 80% 64%), hsl(${hue} 70% 50%))`
    // 把元素放置在卡片内部的绝对坐标（减去自身一半宽度后居中）
    pet.style.left = `${originX}px`
    pet.style.top = `${originY}px`
    cnt.appendChild(pet)
    petals.push(pet)
  }

  petals.forEach((p, i) => {
    const t = Math.random()
    const baseAngle = (Math.PI * 2 * i) / petals.length
    const angle = baseAngle + (Math.random() - 0.5) * 0.6
    const distance = (isSmall ? 60 : 110) + Math.random() * (isSmall ? 80 : 170)
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance - (20 + Math.random() * 30)
    const rot = (Math.random() - 0.5) * 720
    const dur = 0.9 + Math.random() * 0.8
    gsap.fromTo(
      p,
      { x: 0, y: 0, opacity: 1, scale: 0.28 + t * 0.3, rotation: Math.random() * 90 - 45 },
      {
        x: tx,
        y: ty,
        rotation: rot,
        scale: 0.9 + Math.random() * 0.5,
        opacity: 0,
        ease: 'power3.out',
        duration: dur,
        delay: i * 0.03,
        onComplete: () => {
          if (p && p.parentNode) p.parentNode.removeChild(p)
        }
      }
    )
  })
}

// 暴露到全局方便调试/重播
window.playHomeFlower = playFlowerBurst
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px 20px;
}

.birthday-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.title {
  color: var(--primary-color);
  font-size: 3em;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.cake {
  margin: 30px auto;
  width: 200px;
  height: 200px;
  position: relative;
}

.cake-layers {
  width: 200px;
  height: 120px;
  background: var(--primary-color);
  border-radius: 10px;
  position: relative;
}

.cake-layers::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  height: 40px;
  background: var(--secondary-color);
  border-radius: 10px 10px 0 0;
}

.candles {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.candle {
  width: 8px;
  height: 30px;
  background: linear-gradient(to bottom, #ff6b6b, #ff8787);
  position: relative;
}

.candle::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #ffd700;
  border-radius: 50%;
  filter: blur(3px);
  animation: flicker 1s infinite alternate;
}

.message {
  margin-top: 30px;
  line-height: 1.8;
  color: #666;
  font-size: 1.2em;
}

.dear {
  color: var(--primary-color);
  font-size: 1.2em;
  font-weight: bold;
}

.age-counter {
  margin-top: 30px;
  padding: 20px;
  background: rgba(255, 105, 180, 0.1);
  border-radius: 15px;
}

.countdown {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.countdown span {
  background: var(--primary-color);
  color: white;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: bold;
}

.balloons {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.balloon {
  position: absolute;
  width: 30px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
}

.balloon:nth-child(2n) {
  background: var(--secondary-color);
}

.balloon:nth-child(1) { left: 10%; top: 20%; }
.balloon:nth-child(2) { left: 30%; top: 40%; }
.balloon:nth-child(3) { left: 50%; top: 10%; }
.balloon:nth-child(4) { right: 30%; top: 30%; }
.balloon:nth-child(5) { right: 10%; top: 50%; }

@keyframes flicker {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(1.2); }
}

/* 花瓣样式（用于 entrance burst） */
.petal {
  position: absolute;
  width: 18px;
  height: 30px;
  border-radius: 50% 50% 40% 40%;
  transform-origin: center;
  pointer-events: none;
  will-change: transform, opacity;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
}

@media (max-width: 480px) {
  .birthday-card {
    padding: 20px;
  }
  
  .title {
    font-size: 2em;
  }
  
  .message {
    font-size: 1em;
  }
  
  .countdown {
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>

<style scoped>
.confetti-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
</style>