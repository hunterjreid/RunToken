<template>
  <div id="q-app">
    <q-layout view="hHh lpr fFf">
      <UniversalHeader />
      
      <q-page-container>
        <q-page class="what-we-do-page">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="page-title">What We Do</h1>
              <p class="page-subtitle">
                We build the fastest AI infrastructure on the planet—routing requests to 100+ models 
                with sub-100ms latency while maintaining zero logging for complete privacy.
              </p>
            </div>
          </section>

          <section class="features-section">
            <div class="features-container">
              <div class="feature-block">
                <h2>AI Model Routing</h2>
                <p>Intelligent routing to OpenAI, Anthropic, Groq, Together, HuggingFace Inference, and any HTTP-based model.</p>
              </div>
              
              <div class="feature-block">
                <h2>Lightning Fast</h2>
                <p>Sub-100ms latency globally with our optimized edge infrastructure and smart caching.</p>
              </div>
              
              <div class="feature-block">
                <h2>Zero Logging</h2>
                <p>Your requests evaporate after processing. We literally can't show you logs because we don't store them.</p>
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
.what-we-do-page {
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

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #B8B8B8;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.features-section {
  padding: 80px 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.feature-block {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-block:hover {
  transform: translateY(-5px);
  border-color: #FF4A1C;
  box-shadow: 0 10px 30px rgba(255, 74, 28, 0.2);
}

.feature-block h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #FF4A1C;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
}

.feature-block p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #B8B8B8;
}
</style> 