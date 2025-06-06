<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf" class="bg-dark">
      <!-- Main Content -->
      <q-page-container class="bg-dark">
        <q-page class="bg-dark text-white">
          <div class="dashboard-layout">
            <!-- Side Menu -->
            <div class="side-menu">
              <div class="menu-header">
                <div class="logo-section">
                  <q-icon name="bolt" class="logo-icon" />
                  <span class="logo-text">RunToken</span>
                </div>
              </div>
              
              <div class="menu-items">
                <div 
                  v-for="item in menuItems" 
                  :key="item.id"
                  :class="['menu-item', currentView === item.id ? 'active' : '']"
                  @click="currentView = item.id"
                >
                  <q-icon :name="item.icon" class="menu-icon" />
                  <span class="menu-label">{{ item.label }}</span>
                </div>
              </div>
            </div>
            
                        <!-- Main Content Area -->
            <div class="main-content">
              <div class="content-container">
                
                <!-- Dashboard View -->
                <div v-if="currentView === 'dashboard'" class="view-section">
                  <h2 class="section-title">Dashboard Overview</h2>
                  <!-- API Usage Overview -->
                  <div class="row q-gutter-md q-mb-xl">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-grey-4">API Calls Today</div>
                  <div class="text-h3 text-primary q-mt-sm">24,580</div>
                  <div class="text-positive text-caption">↑ 15% from yesterday</div>
                </q-card-section>
              </q-card>
            </div>
            
            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-grey-4">Usage Cost</div>
                  <div class="text-h3 text-green q-mt-sm">$12.34</div>
                  <div class="text-caption text-grey-5">$0.0005 per signal</div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-grey-4">Avg Response</div>
                  <div class="text-h3 text-orange q-mt-sm">47ms</div>
                  <div class="text-positive text-caption">↓ 8ms improvement</div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-grey-4">Success Rate</div>
                  <div class="text-h3 text-positive q-mt-sm">99.8%</div>
                  <div class="text-caption text-grey-5">24/7 reliability</div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Usage Graph -->
          <div class="row q-gutter-md q-mb-xl">
            <div class="col-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">API Usage Over Time</div>
                  <div class="usage-graph-container">
                    <canvas ref="usageChart" class="usage-graph"></canvas>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- API Key & Quick Actions -->
          <div class="row q-gutter-md q-mb-xl">
            <div class="col-lg-8 col-md-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">API Configuration</div>
                  <div class="q-mb-md">
                    <div class="text-subtitle2 text-grey-4 q-mb-xs">API Key</div>
                    <div class="api-key-container">
                      <q-input 
                        v-model="displayApiKey" 
                        readonly 
                        outlined 
                        dense
                        dark
                        class="api-key-input lit-input"
                        bg-color="grey-9"
                        color="white"
                      >
                        <template v-slot:prepend>
                          <q-icon name="vpn_key" class="key-icon" />
                        </template>
                        <template v-slot:append>
                          <q-btn flat round dense icon="content_copy" @click="copyApiKey" class="copy-btn" />
                        </template>
                      </q-input>
                      <div class="key-glow"></div>
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <q-btn color="primary" label="Documentation" icon="description" />
                    <q-btn 
                      outline 
                      color="orange" 
                      label="Generate New Key" 
                      icon="refresh" 
                      @click="generateNewKey"
                      :loading="generatingKey"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-4 col-md-12">
              <q-card class="dark-card">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">Current Plan</div>
                  <div class="text-h4 text-primary q-mb-xs">Pay-as-you-go</div>
                  <div class="text-body2 text-grey-4 q-mb-md">
                    $0.0005 per API call<br>
                    No monthly fees
                  </div>
                  <q-btn color="orange" label="Add Credits" icon="add" class="full-width" @click="showAddCreditsDialog = true" />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Recent Activity -->
          <q-card class="dark-card">
            <q-card-section>
              <div class="text-h6 text-white q-mb-md">Recent Signal Activity</div>
              <q-table
                :rows="rows"
                :columns="columns"
                row-key="id"
                :pagination="{ sortBy: 'timestamp', descending: true, page: 1, rowsPerPage: 10 }"
                flat
                bordered
                dark
                class="dark-table"
              >
                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    <q-chip 
                      :color="props.value === 'Success' ? 'positive' : props.value === 'Error' ? 'negative' : 'warning'"
                      text-color="white"
                      :label="props.value"
                      size="sm"
                    />
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>

          <!-- Add Credits Modal -->
          <q-dialog v-model="showAddCreditsDialog">
            <q-card style="min-width: 500px;" class="bg-grey-9 text-white">
              <q-card-section class="bg-orange text-white">
                <div class="text-h6">
                  <q-icon name="account_balance_wallet" class="q-mr-sm" />
                  Add Credits to Your Account
                </div>
              </q-card-section>
              
              <q-card-section>
                <div class="text-body1 q-mb-md text-grey-3">
                  Choose a credit package to add to your account. All credits never expire.
                </div>

                <!-- Credit Packages -->
                <div class="q-gutter-md q-mb-lg">
                  <q-card 
                    v-for="creditPackage in creditPackages" 
                    :key="creditPackage.id"
                    :class="['credit-package dark-card', selectedPackage?.id === creditPackage.id ? 'selected' : '']"
                    @click="selectedPackage = creditPackage"
                    clickable
                  >
                    <q-card-section>
                      <div class="row items-center justify-between">
                        <div>
                          <div class="text-h6 text-weight-bold text-white">{{ creditPackage.credits.toLocaleString() }} Credits</div>
                          <div class="text-body2 text-grey-4">{{ creditPackage.description }}</div>
                        </div>
                        <div class="text-right">
                          <div class="text-h5 text-weight-bold text-primary">${{ creditPackage.price }}</div>
                          <div v-if="creditPackage.bonus" class="text-caption text-positive">
                            +{{ creditPackage.bonus.toLocaleString() }} bonus credits
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Payment Method -->
                <div class="q-mb-md">
                  <div class="text-subtitle2 text-grey-4 q-mb-sm">Payment Method</div>
                  <q-select
                    v-model="selectedPaymentMethod"
                    :options="paymentMethods"
                    option-label="label"
                    option-value="value"
                    outlined
                    dense
                    dark
                    bg-color="grey-8"
                    color="white"
                  >
                    <template v-slot:prepend>
                      <q-icon :name="selectedPaymentMethod?.icon || 'credit_card'" color="grey-4" />
                    </template>
                  </q-select>
                </div>

                <!-- Total Summary -->
                <q-card flat bordered class="q-pa-md bg-grey-8">
                  <div class="row justify-between items-center q-mb-sm">
                    <span class="text-grey-3">Credits:</span>
                    <span class="text-weight-bold text-white">{{ selectedPackage?.credits.toLocaleString() || '0' }}</span>
                  </div>
                  <div v-if="selectedPackage?.bonus" class="row justify-between items-center q-mb-sm">
                    <span class="text-positive">Bonus Credits:</span>
                    <span class="text-weight-bold text-positive">+{{ selectedPackage.bonus.toLocaleString() }}</span>
                  </div>
                  <q-separator class="q-my-sm" />
                  <div class="row justify-between items-center">
                    <span class="text-h6 text-grey-3">Total:</span>
                    <span class="text-h6 text-weight-bold text-primary">${{ selectedPackage?.price || '0' }}</span>
                  </div>
                </q-card>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="grey" v-close-popup />
                <q-btn 
                  unelevated 
                  label="Purchase Credits" 
                  color="orange" 
                  :disable="!selectedPackage || !selectedPaymentMethod"
                  :loading="purchaseLoading"
                  @click="purchaseCredits"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
                </div>
                
                <!-- API Keys View -->
                <div v-if="currentView === 'keys'" class="view-section">
                  <h2 class="section-title">API Keys Management</h2>
                  <p class="section-description">Manage your API keys and access tokens</p>
                  <!-- API Key content here -->
                </div>
                
                <!-- Usage Analytics View -->
                <div v-if="currentView === 'analytics'" class="view-section">
                  <h2 class="section-title">Usage Analytics</h2>
                  <p class="section-description">Detailed analytics and usage patterns</p>
                  <!-- Analytics content here -->
                </div>
                
                <!-- Settings View -->
                <div v-if="currentView === 'settings'" class="view-section">
                  <h2 class="section-title">Settings</h2>
                  <p class="section-description">Configure your account and preferences</p>
                  <!-- Settings content here -->
                </div>
                
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Generate UUID function
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const initialKey = `sk_live_${generateUUID()}`
const apiKey = ref(initialKey)
const displayApiKey = ref(initialKey)
const showAddCreditsDialog = ref(false)
const selectedPackage = ref(null)
const selectedPaymentMethod = ref(null)
const purchaseLoading = ref(false)
const generatingKey = ref(false)
const usageChart = ref(null)
const currentView = ref('dashboard')

const menuItems = ref([
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'keys', label: 'API Keys', icon: 'vpn_key' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
])

const creditPackages = ref([
  {
    id: 1,
    credits: 10000,
    price: 5,
    description: 'Perfect for testing and small projects',
    bonus: null
  },
  {
    id: 2,
    credits: 50000,
    price: 20,
    description: 'Great for growing applications',
    bonus: 5000
  },
  {
    id: 3,
    credits: 200000,
    price: 75,
    description: 'Best value for production workloads',
    bonus: 25000
  },
  {
    id: 4,
    credits: 500000,
    price: 175,
    description: 'Enterprise-scale processing power',
    bonus: 75000
  }
])

const paymentMethods = ref([
  { label: 'Credit Card', value: 'card', icon: 'credit_card' },
  { label: 'PayPal', value: 'paypal', icon: 'account_balance_wallet' },
  { label: 'Bank Transfer', value: 'bank', icon: 'account_balance' }
])

const columns = [
  {
    name: 'timestamp',
    required: true,
    label: 'Time',
    align: 'left',
    field: 'timestamp',
    sortable: true
  },
  { name: 'model', label: 'Model', field: 'model', sortable: true },
  { name: 'tokens', label: 'Tokens', field: 'tokens', sortable: true },
  { name: 'response_time', label: 'Response Time', field: 'response_time', sortable: true },
  { name: 'cost', label: 'Cost', field: 'cost', sortable: true },
  { name: 'status', label: 'Status', field: 'status', sortable: true }
]

const rows = [
  {
    id: 1,
    timestamp: '14:23:15',
    model: 'GPT-4',
    tokens: '1,247',
    response_time: '42ms',
    cost: '$0.0005',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: '14:23:12',
    model: 'Claude-3',
    tokens: '892',
    response_time: '38ms',
    cost: '$0.0005',
    status: 'Success'
  },
  {
    id: 3,
    timestamp: '14:23:08',
    model: 'Gemini Pro',
    tokens: '1,456',
    response_time: '51ms',
    cost: '$0.0005',
    status: 'Success'
  },
  {
    id: 4,
    timestamp: '14:23:05',
    model: 'LLaMA-2',
    tokens: '743',
    response_time: '67ms',
    cost: '$0.0005',
    status: 'Retry'
  },
  {
    id: 5,
    timestamp: '14:23:02',
    model: 'GPT-3.5',
    tokens: '634',
    response_time: '29ms',
    cost: '$0.0005',
    status: 'Success'
  },
  {
    id: 6,
    timestamp: '14:22:58',
    model: 'GPT-4',
    tokens: '1,123',
    response_time: '45ms',
    cost: '$0.0005',
    status: 'Success'
  },
  {
    id: 7,
    timestamp: '14:22:55',
    model: 'Claude-3',
    tokens: '967',
    response_time: '41ms',
    cost: '$0.0005',
    status: 'Error'
  }
]

function copyApiKey() {
  navigator.clipboard.writeText(apiKey.value)
  $q.notify({
    message: 'API Key copied to clipboard!',
    color: 'positive',
    position: 'top',
    icon: 'check_circle'
  })
}

const generateNewKey = async () => {
  generatingKey.value = true
  
  // Simulate API key generation
  setTimeout(() => {
    // Generate a new API key with UUID
    const newKey = `sk_live_${generateUUID()}`
    
    apiKey.value = newKey
    displayApiKey.value = newKey
    generatingKey.value = false
    
    $q.notify({
      message: 'New API key generated successfully!',
      color: 'positive',
      position: 'top',
      icon: 'vpn_key'
    })
  }, 1500)
}

const purchaseCredits = async () => {
  purchaseLoading.value = true
  
  // Simulate payment processing
  setTimeout(() => {
    purchaseLoading.value = false
    showAddCreditsDialog.value = false
    
    $q.notify({
      message: `Successfully added ${selectedPackage.value.credits.toLocaleString()} credits to your account!`,
      color: 'positive',
      position: 'top',
      icon: 'check_circle'
    })
    
    // Reset selections
    selectedPackage.value = null
    selectedPaymentMethod.value = null
  }, 2000)
}

const createUsageChart = () => {
  const canvas = usageChart.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  canvas.width = canvas.offsetWidth * 2
  canvas.height = 300 * 2
  ctx.scale(2, 2)
  
  // Sample data for the last 24 hours
  const hours = []
  const usage = []
  for (let i = 23; i >= 0; i--) {
    const hour = new Date()
    hour.setHours(hour.getHours() - i)
    hours.push(hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    usage.push(Math.floor(Math.random() * 2000) + 500)
  }
  
  const width = canvas.offsetWidth
  const height = 300
  const padding = 50
  
  // Clear canvas
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(0, 0, width, height)
  
  // Draw grid
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1
  
  // Vertical grid lines
  for (let i = 0; i <= 12; i++) {
    const x = padding + (i * (width - 2 * padding)) / 12
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, height - padding)
    ctx.stroke()
  }
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * (height - 2 * padding)) / 5
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()
  }
  
  // Draw usage line
  const maxUsage = Math.max(...usage)
  ctx.strokeStyle = '#F7D52E'
  ctx.lineWidth = 3
  ctx.beginPath()
  
  for (let i = 0; i < usage.length; i++) {
    const x = padding + (i * (width - 2 * padding)) / (usage.length - 1)
    const y = height - padding - ((usage[i] / maxUsage) * (height - 2 * padding))
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
  
  // Draw usage points
  ctx.fillStyle = '#F7D52E'
  for (let i = 0; i < usage.length; i++) {
    const x = padding + (i * (width - 2 * padding)) / (usage.length - 1)
    const y = height - padding - ((usage[i] / maxUsage) * (height - 2 * padding))
    
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  }
  
  // Draw labels
  ctx.fillStyle = '#aaa'
  ctx.font = '12px Inter'
  ctx.textAlign = 'center'
  
  // Time labels
  for (let i = 0; i < hours.length; i += 4) {
    const x = padding + (i * (width - 2 * padding)) / (usage.length - 1)
    ctx.fillText(hours[i], x, height - padding + 20)
  }
  
  // Usage labels
  ctx.textAlign = 'right'
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * (height - 2 * padding)) / 5
    const value = Math.round(maxUsage - (i * maxUsage) / 5)
    ctx.fillText(value.toLocaleString(), padding - 10, y + 4)
  }
  
  // Title
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 14px Inter'
  ctx.textAlign = 'left'
  ctx.fillText('API Calls per Hour', padding, 30)
}

onMounted(async () => {
  await nextTick()
  setTimeout(createUsageChart, 100)
})
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}

.dashboard-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}

.side-menu {
  width: 260px;
  background: #1a1a1a;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.menu-header {
  padding: 20px;
  border-bottom: 1px solid #333;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  color: #F7D52E;
  font-size: 2rem;
}

.logo-text {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.menu-items {
  flex: 1;
  padding: 20px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #aaa;
}

.menu-item:hover {
  background: #2a2a2a;
  color: #F7D52E;
}

.menu-item.active {
  background: rgba(247, 213, 46, 0.1);
  color: #F7D52E;
  border-right: 3px solid #F7D52E;
}

.menu-icon {
  font-size: 1.2rem;
}

.menu-label {
  font-weight: 500;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: #121212;
}

.content-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 30px;
  width: 100%;
}

.view-section {
  width: 100%;
}

.section-title {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.section-description {
  color: #aaa;
  font-size: 1.1rem;
  margin: 0 0 30px 0;
}

.dark-card {
  background: #1e1e1e !important;
  border: 1px solid #333;
  color: white;
}

.dark-table {
  background: #1e1e1e !important;
}

.dark-table .q-table__top {
  background: #1e1e1e !important;
}

.dark-table .q-table__bottom {
  background: #1e1e1e !important;
}

.dark-table thead tr {
  background: #2a2a2a !important;
}

.dark-table tbody tr {
  background: #1e1e1e !important;
}

.dark-table tbody tr:hover {
  background: #2a2a2a !important;
}

.dark-table th {
  color: #fff !important;
  border-bottom: 1px solid #333 !important;
}

.dark-table td {
  color: #fff !important;
  border-bottom: 1px solid #333 !important;
}

.api-key-container {
  position: relative;
  overflow: hidden;
}

.api-key-input {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  position: relative;
  z-index: 2;
}

.api-key-input .q-field__control {
  background: #2a2a2a !important;
  border: 2px solid #F7D52E !important;
  box-shadow: 0 0 20px rgba(247, 213, 46, 0.3) !important;
}

.lit-input .q-field__control {
  background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%) !important;
  animation: keyGlow 2s ease-in-out infinite alternate;
}

.key-icon {
  color: #F7D52E !important;
  animation: keyIconPulse 1.5s ease-in-out infinite;
}

.copy-btn {
  color: #F7D52E !important;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  color: #FF4A1C !important;
  transform: scale(1.1);
}

.key-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(247, 213, 46, 0.1), transparent);
  animation: slideGlow 3s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes keyGlow {
  0% { box-shadow: 0 0 20px rgba(247, 213, 46, 0.3); }
  100% { box-shadow: 0 0 30px rgba(247, 213, 46, 0.5), 0 0 40px rgba(247, 213, 46, 0.2); }
}

@keyframes keyIconPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); color: #FF4A1C; }
  100% { transform: scale(1); }
}

@keyframes slideGlow {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0%); }
  100% { transform: translateX(100%); }
}

.q-card {
  border-radius: 12px;
}

.credit-package {
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.credit-package:hover {
  border-color: #F7D52E;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(247, 213, 46, 0.2);
}

.credit-package.selected {
  border-color: #F7D52E;
  background: rgba(247, 213, 46, 0.1) !important;
}

.usage-graph-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.usage-graph {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/* Dark scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #2a2a2a;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style> 