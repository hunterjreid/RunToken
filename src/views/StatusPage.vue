<template>
  <div class="status-page">
    <div class="status-header">
      <div class="logo-container">
        <div class="lightning-logo">
          <q-icon name="bolt" class="lightning-icon" />
        </div>
        <h1 class="status-title">RunToken Status</h1>
      </div>
      <div class="status-badge operational">
        <q-icon name="check_circle" class="status-icon" />
        All Systems Operational
      </div>
    </div>

    <div class="status-content">
      <div class="services-section">
        <h2 class="section-title">Services</h2>
        
        <div class="service-item">
          <div class="service-info">
            <div class="service-name">API Gateway</div>
            <div class="service-description">Core API routing and load balancing</div>
          </div>
          <div class="service-status operational">
            <q-icon name="check_circle" />
            Operational
          </div>
        </div>

        <div class="service-item">
          <div class="service-info">
            <div class="service-name">Model Inference</div>
            <div class="service-description">LLM model processing and responses</div>
          </div>
          <div class="service-status operational">
            <q-icon name="check_circle" />
            Operational
          </div>
        </div>

        <div class="service-item">
          <div class="service-info">
            <div class="service-name">Authentication</div>
            <div class="service-description">User authentication and API key validation</div>
          </div>
          <div class="service-status operational">
            <q-icon name="check_circle" />
            Operational
          </div>
        </div>

        <div class="service-item">
          <div class="service-info">
            <div class="service-name">Monitoring</div>
            <div class="service-description">System health and performance tracking</div>
          </div>
          <div class="service-status operational">
            <q-icon name="check_circle" />
            Operational
          </div>
        </div>

        <div class="service-item">
          <div class="service-info">
            <div class="service-name">Edge Network</div>
            <div class="service-description">Global CDN and edge computing nodes</div>
          </div>
          <div class="service-status operational">
            <q-icon name="check_circle" />
            Operational
          </div>
        </div>
      </div>

      <div class="metrics-section">
        <h2 class="section-title">Performance Metrics</h2>
        
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">92ms</div>
            <div class="metric-label">Avg Response Time</div>
            <div class="metric-status good">Good</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">99.9%</div>
            <div class="metric-label">Uptime (30 days)</div>
            <div class="metric-status good">Good</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">0</div>
            <div class="metric-label">Active Incidents</div>
            <div class="metric-status good">Good</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">1.2M</div>
            <div class="metric-label">Requests/Day</div>
            <div class="metric-status good">Good</div>
          </div>
        </div>
      </div>

      <div class="recent-updates">
        <h2 class="section-title">Recent Updates</h2>
        
        <div class="update-item">
          <div class="update-date">Jan 3, 2025</div>
          <div class="update-content">
            <div class="update-title">Performance Optimization</div>
            <div class="update-description">Reduced average response time by 15% through infrastructure improvements.</div>
          </div>
        </div>
        
        <div class="update-item">
          <div class="update-date">Dec 28, 2024</div>
          <div class="update-content">
            <div class="update-title">New Model Support</div>
            <div class="update-description">Added support for latest GPT-4 and Claude models with enhanced routing.</div>
          </div>
        </div>
        
        <div class="update-item">
          <div class="update-date">Dec 20, 2024</div>
          <div class="update-content">
            <div class="update-title">Edge Network Expansion</div>
            <div class="update-description">Deployed new edge nodes in Asia-Pacific region for improved latency.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="status-footer">
      <div class="footer-links">
        <q-btn flat @click="$router.push('/')" label="← Back to RunToken" class="back-btn" />
        <span class="last-updated">Last updated: {{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

onMounted(() => {
  updateTime()
  // Update time every minute
  setInterval(updateTime, 60000)
})
</script>

<style scoped>
.status-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 2rem;
}

.status-header {
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lightning-logo {
  width: 50px;
  height: 50px;
  background: #F7D52E;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightning-icon {
  color: #0a0a0a;
  font-size: 1.8rem;
  font-weight: bold;
}

.status-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
}

.status-badge.operational {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.status-content {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #F7D52E;
  margin-bottom: 2rem;
}

.services-section {
  margin-bottom: 4rem;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #F7D52E;
  transform: translateY(-2px);
}

.service-info {
  flex: 1;
}

.service-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.service-description {
  color: #aaaaaa;
  font-size: 0.9rem;
}

.service-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.service-status.operational {
  color: #10b981;
}

.metrics-section {
  margin-bottom: 4rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.metric-card:hover {
  border-color: #F7D52E;
  transform: translateY(-2px);
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #F7D52E;
  margin-bottom: 0.5rem;
}

.metric-label {
  color: #aaaaaa;
  margin-bottom: 1rem;
}

.metric-status {
  font-weight: 600;
  font-size: 0.9rem;
}

.metric-status.good {
  color: #10b981;
}

.recent-updates {
  margin-bottom: 4rem;
}

.update-item {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.update-item:hover {
  border-color: #F7D52E;
  transform: translateY(-2px);
}

.update-date {
  min-width: 120px;
  color: #F7D52E;
  font-weight: 600;
  font-size: 0.9rem;
}

.update-content {
  flex: 1;
}

.update-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.update-description {
  color: #aaaaaa;
  line-height: 1.5;
}

.status-footer {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #333;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-btn {
  color: #F7D52E !important;
  font-weight: 600;
}

.back-btn:hover {
  background: rgba(247, 213, 46, 0.1) !important;
}

.last-updated {
  color: #aaaaaa;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .status-page {
    padding: 1rem;
  }
  
  .status-header {
    flex-direction: column;
    text-align: center;
  }
  
  .status-title {
    font-size: 2rem;
  }
  
  .service-item,
  .update-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    flex-direction: column;
    text-align: center;
  }
}
</style> 