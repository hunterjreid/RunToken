<template>
  <footer class="footer-section">
    <!-- Huge Semi-Transparent RunToken Text -->
    <div class="runtoken-watermark">
      RunToken
    </div>
    
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
</template>

<script setup>
// No script needed for this footer component
</script>

<style scoped>
.footer-section {
  padding: 80px 5% 60px;
  background: #111111;
  border-top: 1px solid #333;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  overflow: hidden;
}

.runtoken-watermark {
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(10rem, 25vw, 30rem);
  font-weight: 900;
  color: rgba(247, 213, 46, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lightning-logo {
  display: flex;
  align-items: center;
}

.lightning-icon {
  color: #F7D52E;
  font-size: 1.5rem;
}

.footer-brand-text {
  color: #aaaaaa;
  font-weight: 600;
  font-size: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: #aaaaaa;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
}

.footer-link:hover {
  color: #F7D52E;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .footer-links {
    gap: 1.5rem;
  }
  
  .runtoken-watermark {
    font-size: clamp(6rem, 18vw, 16rem);
    bottom: -80px;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
    gap: 1rem;
  }
  
  .runtoken-watermark {
    font-size: clamp(5rem, 15vw, 10rem);
    bottom: -60px;
  }
  
  .footer-brand-text {
    font-size: 0.9rem;
  }
}
</style> 