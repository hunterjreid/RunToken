<template>
  <div class="terms-page">
    <div class="terms-header">
      <div class="logo-container">
        <div class="lightning-logo">
          <q-icon name="bolt" class="lightning-icon" />
        </div>
        <h1 class="terms-title">Terms of Service</h1>
      </div>
      <q-btn flat @click="$router.push('/')" label="← Back to RunToken" class="back-btn" />
    </div>

    <div class="terms-content">
      <div class="terms-section">
        <p class="last-updated">Last updated: January 3, 2025</p>
        
        <div class="section">
          <h2>Agreement to Terms</h2>
          <p>By accessing and using RunToken ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.</p>
        </div>

        <div class="section">
          <h2>Description of Service</h2>
          <p>RunToken provides API routing and management services for AI language models. Our service acts as an intelligent gateway that routes your requests to various AI providers while optimizing for speed, cost, and reliability.</p>
        </div>

        <div class="section">
          <h2>User Accounts</h2>
          <ul>
            <li><strong>Registration:</strong> You must provide accurate and complete information when creating an account</li>
            <li><strong>Security:</strong> You are responsible for maintaining the security of your account and API keys</li>
            <li><strong>Usage:</strong> You must not share your account credentials or API keys with unauthorized parties</li>
            <li><strong>Responsibility:</strong> You are responsible for all activity that occurs under your account</li>
          </ul>
        </div>

        <div class="section">
          <h2>Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Generate illegal, harmful, or abusive content</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Attempt to reverse engineer or compromise our systems</li>
            <li>Generate spam or unsolicited communications</li>
            <li>Create content that violates the terms of our underlying AI providers</li>
          </ul>
        </div>

        <div class="section">
          <h2>Billing and Payment</h2>
          <ul>
            <li><strong>Pay-as-you-go:</strong> You will be charged based on your actual usage of the Service</li>
            <li><strong>Billing Cycle:</strong> Charges are calculated monthly and billed automatically</li>
            <li><strong>Payment Methods:</strong> We accept major credit cards processed through Stripe</li>
            <li><strong>Late Payments:</strong> Overdue accounts may result in service suspension</li>
            <li><strong>Refunds:</strong> Usage-based charges are generally non-refundable</li>
          </ul>
        </div>

        <div class="section">
          <h2>Service Availability</h2>
          <ul>
            <li><strong>Uptime:</strong> We strive for 99.9% uptime but do not guarantee uninterrupted service</li>
            <li><strong>Maintenance:</strong> We may perform scheduled maintenance with advance notice</li>
            <li><strong>Third-party Dependencies:</strong> Service availability depends on underlying AI providers</li>
            <li><strong>Force Majeure:</strong> We are not liable for outages due to circumstances beyond our control</li>
          </ul>
        </div>

        <div class="section">
          <h2>Data and Privacy</h2>
          <ul>
            <li><strong>No Data Retention:</strong> We do not store or log your API requests or responses</li>
            <li><strong>Routing Only:</strong> Your data passes through our system but is not retained</li>
            <li><strong>Third-party Providers:</strong> Your requests are forwarded to AI providers subject to their terms</li>
            <li><strong>Privacy Policy:</strong> See our Privacy Policy for detailed information about data handling</li>
          </ul>
        </div>

        <div class="section">
          <h2>Intellectual Property</h2>
          <ul>
            <li><strong>Your Content:</strong> You retain ownership of content you submit through the Service</li>
            <li><strong>Our Service:</strong> RunToken and its technology remain our intellectual property</li>
            <li><strong>AI Outputs:</strong> Generated content is subject to the terms of the underlying AI provider</li>
            <li><strong>License:</strong> You grant us a license to process your requests solely to provide the Service</li>
          </ul>
        </div>

        <div class="section">
          <h2>Rate Limits and Usage</h2>
          <ul>
            <li><strong>Fair Use:</strong> We may implement rate limits to ensure fair access for all users</li>
            <li><strong>Abuse Prevention:</strong> Excessive usage may result in temporary restrictions</li>
            <li><strong>Enterprise Plans:</strong> Higher limits available for enterprise customers</li>
            <li><strong>Notification:</strong> We will notify you before implementing any restrictions</li>
          </ul>
        </div>

        <div class="section">
          <h2>Limitation of Liability</h2>
          <p>To the maximum extent permitted by law:</p>
          <ul>
            <li>RunToken is provided "as is" without warranties of any kind</li>
            <li>We are not liable for any indirect, incidental, or consequential damages</li>
            <li>Our total liability shall not exceed the amount you paid in the preceding 12 months</li>
            <li>We are not responsible for content generated by AI models</li>
          </ul>
        </div>

        <div class="section">
          <h2>Termination</h2>
          <ul>
            <li><strong>By You:</strong> You may terminate your account at any time</li>
            <li><strong>By Us:</strong> We may suspend or terminate accounts for violations of these Terms</li>
            <li><strong>Effect:</strong> Upon termination, your access to the Service will cease immediately</li>
            <li><strong>Data:</strong> As we don't store request data, there is no data to return upon termination</li>
          </ul>
        </div>

        <div class="section">
          <h2>Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will notify users of material changes via email and update the "last updated" date. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
        </div>

        <div class="section">
          <h2>Governing Law</h2>
          <p>These Terms are governed by the laws of Delaware, United States. Any disputes will be resolved in the courts of Delaware.</p>
        </div>

        <div class="section">
          <h2>Contact Information</h2>
          <p>Questions about these Terms? Contact us:</p>
          <ul>
            <li>Email: <a href="mailto:legal@runtoken.dev" class="contact-link">legal@runtoken.dev</a></li>
            <li>Support: <a href="mailto:support@runtoken.dev" class="contact-link">support@runtoken.dev</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this static page
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 2rem;
}

.terms-header {
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

.terms-title {
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

.terms-content {
  max-width: 800px;
  margin: 0 auto;
}

.terms-section {
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
  .terms-page {
    padding: 1rem;
  }
  
  .terms-header {
    flex-direction: column;
    text-align: center;
  }
  
  .terms-title {
    font-size: 2rem;
  }
  
  .terms-section {
    padding: 2rem;
  }
}
</style> 