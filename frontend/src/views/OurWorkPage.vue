<template>
  <div id="q-app">
    <q-layout view="hHh lpr fFf">
      <UniversalHeader />
      
      <q-page-container>
        <q-page class="our-work-page">
          <section class="hero-section">
            <div class="hero-content">
              <h1 class="page-title">Our Work</h1>
              <p class="page-subtitle">
                Real results from developers who've transformed their AI workflows with RunToken's 
                lightning-fast infrastructure.
              </p>
            </div>
          </section>

          <section class="testimonials-section">
            <div class="testimonials-container">
              <div class="testimonial-card">
                <div class="quote">"RunToken feels like having a superpower. 100 ms to any model—incredible."</div>
                <div class="author">—Sarah K., ML Engineer</div>
                <div class="company">AI Startup</div>
              </div>
              
              <div class="testimonial-card">
                <div class="quote">"Finally ditched our legacy gateway. Dropped infra cost by 40%."</div>
                <div class="author">—Amir R., CTO</div>
                <div class="company">Series B Company</div>
              </div>
              
              <div class="testimonial-card">
                <div class="quote">"Zero logging sold us immediately. Our customers' data stays private."</div>
                <div class="author">—Jessica M., Lead Dev</div>
                <div class="company">Enterprise SaaS</div>
              </div>
            </div>
          </section>

          <section class="stats-section">
            <div class="stats-container">
              <div class="stat-item">
                <div class="stat-number">90ms</div>
                <div class="stat-label">Median Latency</div>
                <div class="stat-desc">End-to-end, global</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">20,000+</div>
                <div class="stat-label">Signals Launched</div>
                <div class="stat-desc">And counting</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">Models Routed</div>
                <div class="stat-desc">Any provider, any time</div>
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
.our-work-page {
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

.testimonials-section {
  padding: 80px 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid #FF4A1C;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 74, 28, 0.2);
}

.quote {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #F0F0F0;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.author {
  font-weight: 700;
  color: #FF4A1C;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.company {
  color: #B8B8B8;
  font-size: 0.9rem;
}

.stats-section {
  padding: 80px 2rem;
  background: rgba(255, 255, 255, 0.02);
  margin: 0 2rem;
  border-radius: 30px;
  margin-bottom: 80px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.stat-item {
  padding: 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: #FF4A1C;
  margin-bottom: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #F0F0F0;
  margin-bottom: 0.5rem;
}

.stat-desc {
  font-size: 0.9rem;
  color: #B8B8B8;
}
</style> 