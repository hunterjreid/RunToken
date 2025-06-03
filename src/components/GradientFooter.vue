<template>
  <footer class="gradient-footer relative-position overflow-hidden">
    <!-- Abstract Gradient Shapes -->
    <div class="gradient-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- Footer Content -->
    <div class="footer-content relative-position">
      <div class="container">
        <div class="row q-py-xl">
          <!-- Main CTA Section -->
          <div class="col-lg-8 col-md-12 q-mb-xl">
            <h2 class="footer-title text-white text-weight-bold q-mb-md">
              Ready to Command Your AI Stack?
            </h2>
            <p class="footer-subtitle text-white q-mb-xl">
              Join developers building the future with intelligent AI routing and control
            </p>
            <div class="cta-buttons q-gutter-md">
              <q-btn 
                size="xl" 
                color="white" 
                text-color="deep-orange-8" 
                unelevated 
                @click="$router.push('/app')" 
                class="q-px-xl q-py-md"
                rounded
              >
                Start Building
              </q-btn>
              <q-btn 
                size="xl" 
                outline
                color="white" 
                @click="$router.push('/about')" 
                class="q-px-xl q-py-md"
                rounded
              >
                Learn More
              </q-btn>
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="col-lg-4 col-md-12">
            <div class="row q-gutter-lg">
              <div class="col-6">
                <h4 class="text-white text-weight-bold q-mb-md">Platform</h4>
                <div class="footer-links">
                  <a href="#" class="footer-link">AI Routing</a>
                  <a href="#" class="footer-link">LLM Management</a>
                  <a href="#" class="footer-link">Signal Analytics</a>
                  <a href="#" class="footer-link">API Gateway</a>
                </div>
              </div>
              <div class="col-6">
                <h4 class="text-white text-weight-bold q-mb-md">Company</h4>
                <div class="footer-links">
                  <a @click="$router.push('/about')" class="footer-link">About</a>
                  <a href="#" class="footer-link">Documentation</a>
                  <a href="#" class="footer-link">Careers</a>
                  <a href="#" class="footer-link">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Section -->
        <div class="footer-bottom q-pt-lg q-pb-md">
          <div class="row items-center">
            <div class="col-md-6 col-xs-12">
              <div class="footer-logo text-white text-weight-bold text-h5">
                <q-icon name="psychology" class="q-mr-sm" />
                SignalCore
              </div>
            </div>
            <div class="col-md-6 col-xs-12 text-right">
              <p class="text-white opacity-70 q-ma-none">
                © 2024 SignalCore. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script needed for this footer component
</script>

<style scoped>
.gradient-footer {
  background: linear-gradient(135deg, #ff3b30 0%, #ff6b35 30%, #f7931e 70%, #ff8c00 100%);
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.gradient-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: linear-gradient(135deg, rgba(255, 59, 48, 0.8) 0%, rgba(255, 107, 53, 0.6) 50%, rgba(247, 147, 30, 0.4) 100%);
  animation: float 20s ease-in-out infinite;
}

.shape-1 {
  width: 600px;
  height: 400px;
  top: -100px;
  right: -200px;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  animation-delay: 0s;
  transform: rotate(45deg);
}

.shape-2 {
  width: 800px;
  height: 500px;
  bottom: -150px;
  left: -300px;
  border-radius: 40% 60% 30% 70% / 60% 40% 60% 40%;
  animation-delay: 7s;
  transform: rotate(-30deg);
  background: linear-gradient(225deg, rgba(255, 140, 0, 0.7) 0%, rgba(255, 107, 53, 0.5) 50%, rgba(255, 59, 48, 0.3) 100%);
}

.shape-3 {
  width: 400px;
  height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(15deg);
  border-radius: 70% 30% 50% 50% / 40% 70% 30% 60%;
  animation-delay: 14s;
  background: linear-gradient(45deg, rgba(247, 147, 30, 0.6) 0%, rgba(255, 140, 0, 0.4) 100%);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  33% {
    transform: translateY(-30px) rotate(5deg) scale(1.05);
  }
  66% {
    transform: translateY(20px) rotate(-3deg) scale(0.95);
  }
}

.footer-content {
  position: relative;
  z-index: 2;
  backdrop-filter: blur(1px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.footer-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  opacity: 0.9;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.cta-buttons .q-btn {
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.cta-buttons .q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-logo {
  font-size: 1.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .gradient-footer {
    min-height: 600px;
  }
  
  .footer-title {
    font-size: 2.5rem;
    text-align: center;
  }
  
  .footer-subtitle {
    font-size: 1.2rem;
    text-align: center;
  }
  
  .cta-buttons {
    text-align: center;
  }
  
  .cta-buttons .q-btn {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .footer-bottom .text-right {
    text-align: center !important;
  }
  
  .shape-1 {
    width: 400px;
    height: 300px;
    top: -50px;
    right: -150px;
  }
  
  .shape-2 {
    width: 500px;
    height: 350px;
    bottom: -100px;
    left: -200px;
  }
}
</style> 