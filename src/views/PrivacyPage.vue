<template>
  <div class="privacy-page">
    <div class="privacy-header">
      <div class="logo-container">
        <div class="lightning-logo">
          <q-icon name="bolt" class="lightning-icon" />
        </div>
        <h1 class="privacy-title">Privacy Policy</h1>
      </div>
      <q-btn flat @click="$router.push('/')" label="← Back to RunToken" class="back-btn" />
    </div>

    <div class="privacy-content">
      <div class="policy-section">
        <p class="last-updated">Last updated: January 3, 2025</p>
        
        <div class="section">
          <h2>Our Commitment</h2>
          <p>At RunToken, we believe in radical privacy. We've built our entire infrastructure around the principle that your data should never be stored, logged, or retained. This isn't just marketing—it's our technical architecture.</p>
        </div>

        <div class="section">
          <h2>What We Don't Collect</h2>
          <ul>
            <li><strong>Request Content:</strong> We don't store your prompts, completions, or any API request data</li>
            <li><strong>Usage Logs:</strong> No logs of what models you use or when you use them</li>
            <li><strong>Personal Conversations:</strong> Your interactions with AI models are never saved</li>
            <li><strong>Analytics Tracking:</strong> No cookies, no tracking pixels, no behavioral analytics</li>
          </ul>
        </div>

        <div class="section">
          <h2>What We Do Collect</h2>
          <ul>
            <li><strong>Account Information:</strong> Email address for account creation and billing</li>
            <li><strong>Payment Data:</strong> Processed securely through Stripe (we don't store credit card info)</li>
            <li><strong>API Keys:</strong> Encrypted and used only for authentication</li>
            <li><strong>Usage Metrics:</strong> Aggregate, anonymous usage statistics for billing and performance</li>
          </ul>
        </div>

        <div class="section">
          <h2>Technical Implementation</h2>
          <p>Our "zero logs" policy isn't just a promise—it's enforced at the infrastructure level:</p>
          <ul>
            <li>Request data is processed in memory and immediately discarded</li>
            <li>No persistent storage of API requests or responses</li>
            <li>Automatic data purging after request completion</li>
            <li>End-to-end encryption for all data in transit</li>
          </ul>
        </div>

        <div class="section">
          <h2>Data Sharing</h2>
          <p>We don't share your data with third parties because we don't have your data to share. The only exception is:</p>
          <ul>
            <li><strong>AI Model Providers:</strong> Your requests are forwarded to the selected AI provider (OpenAI, Anthropic, etc.) but we don't store or log these interactions</li>
            <li><strong>Legal Requirements:</strong> We may be required to provide account information (not usage data) in response to valid legal requests</li>
          </ul>
        </div>

        <div class="section">
          <h2>Data Retention</h2>
          <p>For the data we do collect:</p>
          <ul>
            <li><strong>Account Information:</strong> Retained until account deletion</li>
            <li><strong>Billing Records:</strong> Retained for 7 years for tax and legal compliance</li>
            <li><strong>Usage Metrics:</strong> Aggregated data retained for 90 days for billing purposes</li>
            <li><strong>API Requests:</strong> Zero retention—immediately discarded after processing</li>
          </ul>
        </div>

        <div class="section">
          <h2>Your Rights</h2>
          <ul>
            <li><strong>Access:</strong> Request a copy of your account data</li>
            <li><strong>Deletion:</strong> Delete your account and associated data at any time</li>
            <li><strong>Portability:</strong> Export your account settings and usage statistics</li>
            <li><strong>Transparency:</strong> Contact us for details about our data practices</li>
          </ul>
        </div>

        <div class="section">
          <h2>Security</h2>
          <p>We implement industry-standard security measures:</p>
          <ul>
            <li>SOC 2 Type II compliance</li>
            <li>End-to-end encryption for all communications</li>
            <li>Regular security audits and penetration testing</li>
            <li>Minimal data collection reduces attack surface</li>
          </ul>
        </div>

        <div class="section">
          <h2>Contact Us</h2>
          <p>Questions about this privacy policy? Contact us:</p>
          <ul>
            <li>Email: <a href="mailto:privacy@runtoken.dev" class="contact-link">privacy@runtoken.dev</a></li>
            <li>Security issues: <a href="mailto:security@runtoken.dev" class="contact-link">security@runtoken.dev</a></li>
          </ul>
        </div>

        <div class="section">
          <h2>Changes to This Policy</h2>
          <p>We'll notify users of any material changes to this privacy policy via email and update the "last updated" date above. Continued use of our service after changes constitutes acceptance of the updated policy.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this static page
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 2rem;
}

.privacy-header {
  max-width: 800px;
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

.privacy-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.back-btn {
  color: #F7D52E !important;
  font-weight: 600;
}

.back-btn:hover {
  background: rgba(247, 213, 46, 0.1) !important;
}

.privacy-content {
  max-width: 800px;
  margin: 0 auto;
}

.policy-section {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 3rem;
}

.last-updated {
  color: #aaaaaa;
  font-style: italic;
  margin-bottom: 3rem;
  text-align: center;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #F7D52E;
  margin-bottom: 1rem;
}

.section p {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.section ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.section li {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.section li strong {
  color: #ffffff;
}

.contact-link {
  color: #F7D52E;
  text-decoration: none;
  font-weight: 600;
}

.contact-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .privacy-page {
    padding: 1rem;
  }
  
  .privacy-header {
    flex-direction: column;
    text-align: center;
  }
  
  .privacy-title {
    font-size: 2rem;
  }
  
  .policy-section {
    padding: 2rem;
  }
}
</style> 