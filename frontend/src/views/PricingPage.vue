<template>
  <div id="q-app">
    <q-layout view="hHh lpr fFf">
      <UniversalHeader />
      
      <q-page-container>
        <q-page class="pricing-page">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="page-title">
                <span class="emphasis">Ready to Launch?</span>
              </h1>
              <p class="page-subtitle">
                Start free, scale fast. Choose the plan that fits your velocity.
              </p>
            </div>
          </section>

          <section class="pricing-section">
            <div class="pricing-container">
              <div class="pricing-tiers">
                <div class="pricing-tier free">
                  <div class="tier-header">
                    <h3 class="tier-name">Free Tier</h3>
                    <div class="tier-price">$0</div>
                  </div>
                  <ul class="tier-features">
                    <li>500k tokens/mo</li>
                    <li>Community Slack</li>
                    <li>Self‑host script</li>
                    <li>90ms global latency</li>
                  </ul>
                  <q-btn class="tier-btn" unelevated @click="$router.push('/app')">Start Free</q-btn>
                </div>
                
                <div class="pricing-tier pro">
                  <div class="popular-badge">POPULAR</div>
                  <div class="tier-header">
                    <h3 class="tier-name">Pro Tier</h3>
                    <div class="tier-price">$29<span class="tier-period">/mo</span></div>
                  </div>
                  <ul class="tier-features">
                    <li>20M tokens</li>
                    <li>Priority routing</li>
                    <li>Multi‑region failover</li>
                    <li>60ms latency SLA</li>
                  </ul>
                  <q-btn class="tier-btn launch-btn" unelevated @click="$router.push('/app')">Launch Signal</q-btn>
                </div>
                
                <div class="pricing-tier enterprise">
                  <div class="tier-header">
                    <h3 class="tier-name">Enterprise</h3>
                    <div class="tier-price">Custom</div>
                  </div>
                  <ul class="tier-features">
                    <li>Unlimited everything</li>
                    <li>Private peering</li>
                    <li>Custom SLAs</li>
                    <li>Dedicated support</li>
                  </ul>
                  <q-btn class="tier-btn" outline @click="window.open('mailto:enterprise@runtoken.dev')">Let's talk →</q-btn>
                </div>
              </div>
            </div>
          </section>

          <section class="faq-section">
            <div class="faq-container">
              <h2 class="faq-title">Frequently Asked Questions</h2>
              
              <div class="faq-items">
                <div class="faq-item">
                  <h3 class="faq-question">Do you store logs?</h3>
                  <p class="faq-answer">No. Once the response lands, the request evaporates.</p>
                </div>
                
                <div class="faq-item">
                  <h3 class="faq-question">How fast is it?</h3>
                  <p class="faq-answer">Sub‑100 ms in most regions. <router-link to="/status" class="faq-link">Check live status →</router-link></p>
                </div>
                
                <div class="faq-item">
                  <h3 class="faq-question">What models are supported?</h3>
                  <p class="faq-answer">OpenAI, Anthropic, Groq, Together, HuggingFace Inference, and anything HTTP.</p>
                </div>
              </div>
            </div>
          </section>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import UniversalHeader from '../components/UniversalHeader.vue'
</script>

<style scoped>
.pricing-page {
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #2d1b69 60%, #0f0f23 100%);
  min-height: 100vh;
  color: #F0F0F0;
}

.hero-section {
  padding: 120px 2rem 80px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-family: 'Inter', 'Arial', sans-serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  margin-bottom: 2rem;
  /* Gradient effect using background-clip */
  background: linear-gradient(180deg, #bcbcbc 40%, #474747 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-title .emphasis {
  font-weight: 700;
  color: #222 !important;
  -webkit-text-fill-color: #222;
  background: none;
}

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #B8B8B8;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.pricing-section {
  padding: 80px 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
}

.pricing-tier {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
  text-align: center;
}

.pricing-tier:hover {
  transform: translateY(-5px);
  border-color: #FF4A1C;
  box-shadow: 0 10px 30px rgba(255, 74, 28, 0.2);
}

.pricing-tier.pro {
  border-color: #FF4A1C;
  transform: scale(1.05);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #FF4A1C;
  color: white;
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
  color: #F0F0F0;
  margin-bottom: 0.5rem;
}

.tier-price {
  font-size: 2.5rem;
  font-weight: 900;
  color: #FF4A1C;
  font-family: 'JetBrains Mono', monospace;
}

.tier-period {
  font-size: 1rem;
  color: #B8B8B8;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
}

.tier-features li {
  color: #B8B8B8;
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.tier-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #FF4A1C;
  font-weight: bold;
}

.tier-btn {
  width: 100%;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 700;
}

.launch-btn {
  background: linear-gradient(135deg, #FF4A1C 0%, #FA3C3C 100%) !important;
  color: white !important;
}

.faq-section {
  padding: 80px 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #F0F0F0;
  text-align: center;
  margin-bottom: 3rem;
}

.faq-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.faq-item {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-question {
  font-size: 1.3rem;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 1rem;
}

.faq-answer {
  color: #B8B8B8;
  line-height: 1.6;
}

.faq-link {
  color: #FF4A1C;
  text-decoration: none;
}

.faq-link:hover {
  text-decoration: underline;
}
</style> 