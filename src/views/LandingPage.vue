<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <!-- Floating Header -->
      <q-header elevated class="floating-header">
        <q-toolbar class="text-white">
          <q-toolbar-title class="text-weight-bold">
            <div class="logo-container">
              <div class="lightning-logo">
                <q-icon name="bolt" class="lightning-icon" />
              </div>
              <span class="logo-text">RunToken</span>
            </div>
          </q-toolbar-title>

          <q-btn flat @click="scrollToSection('features')" label="Features" class="text-white q-mr-sm nav-btn" />
          <q-btn flat @click="scrollToSection('pricing')" label="Pricing" class="text-white q-mr-sm nav-btn" />
          <q-btn flat @click="$router.push('/playground')" label="Playground" class="text-white q-mr-sm nav-btn" />
          <q-btn flat @click="$router.push('/app')" label="Console" class="text-white q-mr-sm nav-btn" />
          <q-btn 
            unelevated 
            class="launch-btn" 
            @click="$router.push('/app')" 
            label="LAUNCH SIGNAL"
            rounded
          />
        </q-toolbar>
      </q-header>

      <!-- Main Content -->
      <q-page-container>
        <q-page class="landing-page">
          <!-- Hero Section with Parallax -->
          <section class="hero-parallax" ref="heroRef">
            <div class="hero-background">
              <!-- Animated Background Elements -->
              <div class="floating-shapes">
                <div class="shape shape-1" v-for="n in 20" :key="n"></div>
              </div>
              
              <!-- Parallax Layers -->
              <div class="parallax-layer layer-1" :style="{ transform: `translateY(${parallaxY * 0.5}px)` }">
                <div class="abstract-mouth">
                  <div class="mouth-part mouth-top"></div>
                  <div class="mouth-part mouth-bottom"></div>
                  <div class="teeth">
                    <div v-for="n in 6" :key="n" class="tooth"></div>
                  </div>
                </div>
              </div>

              <div class="parallax-layer layer-2" :style="{ transform: `translateY(${parallaxY * 0.3}px)` }">
                <div class="rockets-container">
                  <div class="rocket rocket-1">
                    <div class="rocket-body"></div>
                    <div class="rocket-nose"></div>
                    <div class="rocket-fins"></div>
                    <div class="rocket-fire"></div>
                  </div>
                  <div class="rocket rocket-2">
                    <div class="rocket-body"></div>
                    <div class="rocket-nose"></div>
                    <div class="rocket-fins"></div>
                    <div class="rocket-fire"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hero Content -->
            <div class="hero-content" :style="{ transform: `translateY(${parallaxY * 0.1}px)` }">
              <div class="hero-text-container">
                <div class="hero-text">
                  <h1 class="hero-title animate-in">
                    <span class="title-line">The control tower</span>
                    <span class="title-line">for your AI stack.</span>
                  </h1>
                  
                  <div class="hero-domains animate-in-delay">
                    <span class="domain">runtoken.dev</span>
                    <span class="domain-separator">•</span>
                    <span class="domain">runtoken.run</span>
                  </div>
                </div>

                <!-- Smiley Face -->
                <div class="smiley-face animate-in-delay-2">
                  <div class="smiley-circle">
                    <div class="smiley-eyes">
                      <div class="eye"></div>
                      <div class="eye"></div>
                    </div>
                    <div class="smiley-mouth"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Where Signals Become Outcomes Section -->
          <section class="signals-section" ref="signalsRef">
            <div class="signals-content">
              <div class="signals-text">
                <h2 class="signals-title animate-on-scroll">
                  Where signals become outcomes.
                </h2>
                
                <q-btn 
                  size="xl"
                  class="launch-signal-btn animate-on-scroll-delay" 
                  unelevated
                  rounded
                  @click="$router.push('/app')"
                >
                  LAUNCH SIGNAL
                </q-btn>
              </div>
              
              <!-- Animated Rockets with Trails -->
              <div class="signals-rockets">
                <div class="signal-rocket rocket-animated" v-for="n in 3" :key="n" :class="`rocket-${n}`">
                  <div class="rocket-body-large"></div>
                  <div class="rocket-nose-large"></div>
                  <div class="rocket-fins-large"></div>
                  <div class="rocket-trail"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Features Cards Section -->
          <section class="features-section" id="features">
            <div class="features-container">
              <div class="feature-card open-source animate-on-scroll">
                <div class="feature-icon">
                  <q-icon name="inventory" />
                </div>
                <h3 class="feature-title">Open Source Models</h3>
                <p class="feature-subtitle">Tap into Hugging Face, Mistral & more</p>
              </div>
              
              <div class="feature-card fast animate-on-scroll-delay">
                <div class="feature-icon">
                  <q-icon name="bolt" />
                </div>
                <h3 class="feature-title">Fast</h3>
                <p class="feature-subtitle">Latency-optimized routing engine</p>
              </div>
              
              <div class="feature-card private animate-on-scroll-delay-2">
                <div class="feature-icon">
                  <q-icon name="lock" />
                </div>
                <h3 class="feature-title">Private</h3>
                <p class="feature-subtitle">No logging, no retention</p>
              </div>
            </div>
          </section>

          <!-- Stats Section -->
          <section class="stats-section">
            <div class="stats-container">
              <div class="stat-tile animate-on-scroll">
                <div class="stat-value">90 ms</div>
                <div class="stat-metric">Median Latency</div>
                <div class="stat-blurb">End‑to‑end, global.</div>
              </div>
              
              <div class="stat-tile animate-on-scroll-delay">
                <div class="stat-value">0</div>
                <div class="stat-metric">Stored Requests</div>
                <div class="stat-blurb">We literally can't show logs.</div>
              </div>
              
              <div class="stat-tile animate-on-scroll-delay-2">
                <div class="stat-value">100+</div>
                <div class="stat-metric">Models Routed</div>
                <div class="stat-blurb">Any provider, any time.</div>
              </div>
            </div>
          </section>

          <!-- Testimonials -->
          <section class="testimonials-section">
            <div class="testimonials-container">
              <div class="testimonial animate-on-scroll">
                <p class="testimonial-text">"RunToken feels like having a superpower. 100 ms to any model—incredible."</p>
                <div class="testimonial-author">—Sarah K., ML Engineer</div>
              </div>
              
              <div class="testimonial animate-on-scroll-delay">
                <p class="testimonial-text">"Finally ditched our legacy gateway. Dropped infra cost by 40%."</p>
                <div class="testimonial-author">—Amir R., CTO</div>
              </div>
            </div>
          </section>

          <!-- Pricing Teaser -->
          <section class="pricing-section" id="pricing">
            <div class="pricing-container">
              <h2 class="pricing-title animate-on-scroll">Ready to Launch?</h2>
              
              <div class="pricing-tiers">
                <div class="pricing-tier free animate-on-scroll">
                  <div class="tier-header">
                    <h3 class="tier-name">Free Tier</h3>
                    <div class="tier-price">$0</div>
                  </div>
                  <ul class="tier-features">
                    <li>500k tokens/mo</li>
                    <li>Community Slack</li>
                    <li>Self‑host script</li>
                  </ul>
                  <q-btn class="tier-btn" unelevated @click="$router.push('/app')">Start Free</q-btn>
                </div>
                
                <div class="pricing-tier pro animate-on-scroll-delay">
                  <div class="tier-header">
                    <h3 class="tier-name">Pro Tier</h3>
                    <div class="tier-price">$29<span class="tier-period">/mo</span></div>
                  </div>
                  <ul class="tier-features">
                    <li>20M tokens</li>
                    <li>Priority routing</li>
                    <li>Multi‑region failover</li>
                  </ul>
                  <q-btn class="tier-btn launch-btn" unelevated @click="$router.push('/app')">Launch Signal</q-btn>
                </div>
                
                <div class="pricing-tier enterprise animate-on-scroll-delay-2">
                  <div class="tier-header">
                    <h3 class="tier-name">Enterprise</h3>
                    <div class="tier-price">Custom</div>
                  </div>
                  <ul class="tier-features">
                    <li>Unlimited everything</li>
                    <li>Private peering</li>
                    <li>Custom SLAs</li>
                  </ul>
                  <q-btn class="tier-btn" outline @click="window.open('mailto:enterprise@runtoken.dev')">Let's talk →</q-btn>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQ Section -->
          <section class="faq-section">
            <div class="faq-container">
              <h2 class="faq-title animate-on-scroll">Frequently Asked Questions</h2>
              
              <div class="faq-items">
                <div class="faq-item animate-on-scroll">
                  <h3 class="faq-question">Do you store logs?</h3>
                  <p class="faq-answer">No. Once the response lands, the request evaporates.</p>
                </div>
                
                <div class="faq-item animate-on-scroll-delay">
                  <h3 class="faq-question">How fast is it?</h3>
                  <p class="faq-answer">Sub‑100 ms in most regions. <router-link to="/status" class="faq-link">Check live status →</router-link></p>
                </div>
                
                <div class="faq-item animate-on-scroll-delay-2">
                  <h3 class="faq-question">What models are supported?</h3>
                  <p class="faq-answer">OpenAI, Anthropic, Groq, Together, HuggingFace Inference, and anything HTTP.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="footer-section">
            <div class="footer-content">
              <div class="footer-brand">
                <div class="footer-logo">
                  <div class="lightning-logo">
                    <q-icon name="bolt" class="lightning-icon" />
                  </div>
                  <span class="footer-brand-text">RunToken™ 2025 – Where signals become outcomes.</span>
                </div>
              </div>
              <div class="footer-links">
                <router-link to="/privacy" class="footer-link">Privacy</router-link>
                <router-link to="/terms" class="footer-link">Terms</router-link>
                <router-link to="/status" class="footer-link">Status</router-link>
              </div>
            </div>
          </footer>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroRef = ref(null)
const signalsRef = ref(null)
const parallaxY = ref(0)

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const scrolled = window.pageYOffset
  parallaxY.value = scrolled
  
  // Animate elements on scroll
  const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-delay, .animate-on-scroll-delay-2')
  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    if (rect.top < windowHeight * 0.8) {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 100)
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Initial animation trigger
  setTimeout(() => {
    const initialElements = document.querySelectorAll('.animate-in, .animate-in-delay, .animate-in-delay-2')
    initialElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 300)
    })
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.landing-page {
  background: #0a0a0a;
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

/* Header */
.floating-header {
  background: rgba(10, 10, 10, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(247, 213, 46, 0.1);
  position: fixed;
  z-index: 1000;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lightning-logo {
  width: 40px;
  height: 40px;
  background: #F7D52E;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightning-icon {
  color: #0a0a0a;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #F0F0F0;
  letter-spacing: -0.5px;
}

.nav-btn {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-btn:hover {
  color: #F7D52E !important;
}

.launch-btn {
  background: #F7D52E !important;
  color: #0a0a0a !important;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 20px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.launch-btn:hover {
  background: #f1c40f !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(247, 213, 46, 0.4);
}

/* Hero Section */
.hero-parallax {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  display: grid;
  place-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(247, 213, 46, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1:nth-child(1) { width: 3px; height: 3px; top: 10%; left: 10%; animation-delay: 0s; }
.shape-1:nth-child(2) { width: 2px; height: 2px; top: 20%; left: 80%; animation-delay: 1s; }
.shape-1:nth-child(3) { width: 4px; height: 4px; top: 60%; left: 20%; animation-delay: 2s; }
.shape-1:nth-child(4) { width: 2px; height: 2px; top: 80%; left: 90%; animation-delay: 3s; }
.shape-1:nth-child(5) { width: 3px; height: 3px; top: 30%; left: 60%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Abstract Mouth */
.abstract-mouth {
  position: absolute;
  top: 30%;
  right: 10%;
  width: 200px;
  height: 120px;
  transform: rotate(-15deg);
}

.mouth-part {
  position: absolute;
  background: linear-gradient(45deg, #16a085, #f39c12);
  border-radius: 50px;
}

.mouth-top {
  width: 180px;
  height: 40px;
  top: 0;
  animation: mouthMove 4s ease-in-out infinite;
}

.mouth-bottom {
  width: 180px;
  height: 40px;
  bottom: 0;
  background: linear-gradient(45deg, #e74c3c, #f39c12);
  animation: mouthMove 4s ease-in-out infinite reverse;
}

.teeth {
  position: absolute;
  top: 25px;
  left: 20px;
  display: flex;
  gap: 8px;
}

.tooth {
  width: 8px;
  height: 20px;
  background: white;
  border-radius: 0 0 4px 4px;
  animation: teethGlint 3s ease-in-out infinite;
}

@keyframes mouthMove {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes teethGlint {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; box-shadow: 0 0 10px rgba(255,255,255,0.5); }
}

/* Rockets */
.rockets-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.rocket {
  position: absolute;
  animation: rocketFloat 8s ease-in-out infinite;
}

.rocket-1 {
  top: 40%;
  left: 70%;
  animation-delay: 0s;
}

.rocket-2 {
  top: 20%;
  left: 15%;
  animation-delay: 2s;
  transform: scale(0.7);
}

.rocket-body {
  width: 30px;
  height: 60px;
  background: linear-gradient(180deg, #e74c3c 0%, #c0392b 100%);
  border-radius: 15px 15px 5px 5px;
  position: relative;
}

.rocket-nose {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #2ecc71;
  position: absolute;
  top: -25px;
  left: 0;
}

.rocket-fins {
  position: absolute;
  bottom: -10px;
  left: -8px;
  width: 46px;
  height: 15px;
  background: #34495e;
  border-radius: 0 0 10px 10px;
}

.rocket-fire {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 30px;
  background: linear-gradient(180deg, #f39c12 0%, #e67e22 50%, #d35400 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: fireFlicker 0.3s ease-in-out infinite alternate;
}

@keyframes rocketFloat {
  0%, 100% { transform: translate(0, 0) rotate(5deg); }
  25% { transform: translate(20px, -30px) rotate(-5deg); }
  50% { transform: translate(-10px, -50px) rotate(5deg); }
  75% { transform: translate(30px, -20px) rotate(-5deg); }
}

@keyframes fireFlicker {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(1.1) rotate(2deg); }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 10;
  display: grid;
  place-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 2rem;
}

.hero-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
}

.hero-text {
  flex: 1;
  max-width: 600px;
  text-align: left;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 2rem 0;
  color: #F0F0F0;
}

.title-line {
  display: block;
}

.title-line:first-child {
  color: #F7D52E;
}

.hero-domains {
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #F0F0F0;
  font-weight: 500;
  letter-spacing: 1px;
}

.domain {
  color: #F7D52E;
}

.domain-separator {
  margin: 0 1rem;
  color: #888;
}

/* Smiley Face */
.smiley-face {
  flex-shrink: 0;
}

.smiley-circle {
  width: 120px;
  height: 120px;
  background: #F7D52E;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: smileyBounce 3s ease-in-out infinite;
}

.smiley-eyes {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.eye {
  width: 8px;
  height: 8px;
  background: #0a0a0a;
  border-radius: 50%;
}

.smiley-mouth {
  width: 40px;
  height: 20px;
  border: 3px solid #0a0a0a;
  border-top: none;
  border-radius: 0 0 40px 40px;
}

@keyframes smileyBounce {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

/* Signals Section */
.signals-section {
  padding: 100px 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  width: 100vw;
  display: grid;
  place-items: center;
  min-height: 80vh;
}

.signals-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  max-width: 1400px;
  width: 100%;
}

.signals-text {
  flex: 1;
  max-width: 500px;
  text-align: left;
}

.signals-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #F0F0F0;
  line-height: 1.2;
  margin-bottom: 3rem;
}

.launch-signal-btn {
  background: #F7D52E !important;
  color: #0a0a0a !important;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 16px 40px;
  letter-spacing: 1px;
  border: none;
  transition: all 0.3s ease;
}

.launch-signal-btn:hover {
  background: #f1c40f !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(247, 213, 46, 0.3);
}

/* Animated Rockets in Signals Section */
.signals-rockets {
  position: relative;
  width: 400px;
  height: 400px;
}

.signal-rocket {
  position: absolute;
  animation: signalRocketMove 6s ease-in-out infinite;
}

.rocket-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.rocket-2 {
  top: 60%;
  left: 60%;
  animation-delay: 2s;
  transform: scale(0.8);
}

.rocket-3 {
  top: 10%;
  right: 10%;
  animation-delay: 4s;
  transform: scale(0.6);
}

.rocket-body-large {
  width: 40px;
  height: 80px;
  background: linear-gradient(180deg, #95a5a6 0%, #7f8c8d 100%);
  border-radius: 20px 20px 8px 8px;
  position: relative;
}

.rocket-nose-large {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #2ecc71;
  position: absolute;
  top: -30px;
  left: 0;
}

.rocket-fins-large {
  position: absolute;
  bottom: -15px;
  left: -10px;
  width: 60px;
  height: 20px;
  background: #2c3e50;
  border-radius: 0 0 15px 15px;
}

.rocket-trail {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, #f39c12 50%, #e67e22 100%);
  border-radius: 2px;
  opacity: 0.8;
  animation: trailPulse 1s ease-in-out infinite alternate;
}

@keyframes signalRocketMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -40px) rotate(10deg); }
  50% { transform: translate(-20px, -80px) rotate(-5deg); }
  75% { transform: translate(40px, -30px) rotate(15deg); }
}

@keyframes trailPulse {
  0% { opacity: 0.5; transform: translateX(-50%) scaleY(1); }
  100% { opacity: 1; transform: translateX(-50%) scaleY(1.2); }
}

/* Features Section */
.features-section {
  padding: 80px 2rem;
  background: #0a0a0a;
  width: 100vw;
  display: grid;
  place-items: center;
  min-height: 60vh;
}

.features-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
}

.feature-card {
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 2px solid transparent;
}

.feature-card.open-source {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
}

.feature-card.fast {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
}

.feature-card.private {
  background: linear-gradient(135deg, #e91e63 0%, #ad1457 100%);
  color: white;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border-color: #F7D52E;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #F7D52E;
}

.feature-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F7D52E;
}

.feature-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
}

/* Stats Section */
.stats-section {
  padding: 80px 2rem;
  background: #111111;
  width: 100vw;
  display: grid;
  place-items: center;
  min-height: 60vh;
}

.stats-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-tile {
  background: #1a1a1a;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.stat-tile:hover {
  transform: translateY(-5px);
  border-color: #F7D52E;
}

.stat-value {
  font-size: 3rem;
  font-weight: 900;
  color: #F7D52E;
  margin-bottom: 0.5rem;
}

.stat-metric {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.stat-blurb {
  font-size: 0.9rem;
  color: #aaaaaa;
}

/* Testimonials */
.testimonials-section {
  padding: 80px 2rem;
  background: #0a0a0a;
  width: 100vw;
  display: grid;
  place-items: center;
  min-height: 60vh;
}

.testimonials-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.testimonial {
  background: #1a1a1a;
  padding: 3rem;
  border-radius: 20px;
  border-left: 4px solid #F7D52E;
}

.testimonial-text {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-style: italic;
  line-height: 1.5;
}

.testimonial-author {
  color: #aaaaaa;
  font-weight: 600;
}

/* Pricing */
.pricing-section {
  padding: 80px 5% 100px;
  background: #111111;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.pricing-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.pricing-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 3rem;
}

.pricing-tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.pricing-tier {
  background: #1a1a1a;
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid #333;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-tier.pro {
  border-color: #F7D52E;
  transform: scale(1.05);
}

.pricing-tier.pro::before {
  content: 'POPULAR';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #F7D52E;
  color: #0a0a0a;
  padding: 5px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.tier-header {
  margin-bottom: 2rem;
}

.tier-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.tier-price {
  font-size: 2.5rem;
  font-weight: 900;
  color: #F7D52E;
}

.tier-period {
  font-size: 1rem;
  color: #aaaaaa;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.tier-features li {
  color: #aaaaaa;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.tier-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #F7D52E;
  font-weight: bold;
}

.tier-btn {
  width: 100%;
  padding: 12px 24px;
  border-radius: 10px;
}

/* FAQ */
.faq-section {
  padding: 80px 5% 100px;
  background: #0a0a0a;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.faq-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.faq-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
}

.faq-items {
  display: grid;
  gap: 2rem;
}

.faq-item {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #333;
}

.faq-question {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.faq-answer {
  color: #aaaaaa;
  line-height: 1.6;
}

.faq-link {
  color: #F7D52E;
  text-decoration: none;
}

.faq-link:hover {
  text-decoration: underline;
}

/* Footer */
.footer-section {
  padding: 60px 5% 40px;
  background: #111111;
  border-top: 1px solid #333;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-brand-text {
  color: #aaaaaa;
  font-weight: 600;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: #aaaaaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #F7D52E;
}

/* Animations */
.animate-in, .animate-in-delay, .animate-in-delay-2,
.animate-on-scroll, .animate-on-scroll-delay, .animate-on-scroll-delay-2 {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.animate-in.visible, .animate-in-delay.visible, .animate-in-delay-2.visible,
.animate-on-scroll.visible, .animate-on-scroll-delay.visible, .animate-on-scroll-delay-2.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    padding: 120px 5% 0;
    justify-content: center;
    width: 100vw;
  }
  
  .hero-text-container {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    max-width: 90vw;
  }
  
  .hero-text {
    text-align: center;
  }
  
  .smiley-face {
    margin: 0;
  }
  
  .signals-content {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  
  .signals-text {
    text-align: center;
  }
  
  .signals-rockets {
    margin-top: 0;
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .floating-header .q-toolbar {
    padding: 0 1rem;
  }
  
  .nav-btn {
    display: none;
  }
  
  .hero-content {
    padding: 100px 2rem 0;
    width: 100vw;
  }
  
  .hero-text-container {
    max-width: 95vw;
    gap: 2rem;
  }
  
  .signals-content {
    gap: 2rem;
  }
  
  .features-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .abstract-mouth {
    display: none;
  }
  
  .rocket-2 {
    display: none;
  }
  
  .stats-container,
  .testimonials-container,
  .pricing-tiers {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pricing-tier.pro {
    transform: none;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .signals-title {
    font-size: 1.8rem;
  }
  
  .pricing-title,
  .faq-title {
    font-size: 2rem;
  }
  
  .hero-content {
    padding: 100px 1rem 0;
  }
  
  .hero-text-container {
    max-width: 98vw;
    gap: 1.5rem;
  }
}
</style> 