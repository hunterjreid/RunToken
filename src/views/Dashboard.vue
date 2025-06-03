<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <!-- Header -->
      <q-header elevated class="bg-header text-white">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <q-icon name="psychology" />
            </q-avatar>
            SignalCore Console
          </q-toolbar-title>

          <div>
            <q-btn flat @click="$router.push('/')" label="Home" class="q-mr-sm" />
            <q-btn flat round dense icon="notifications" class="q-mr-sm">
              <q-badge color="red" text-color="white" floating>2</q-badge>
            </q-btn>
            <q-btn flat round dense icon="account_circle" />
          </div>
        </q-toolbar>
      </q-header>

      <!-- Main Content -->
      <q-page-container>
        <q-page class="q-pa-lg">
          <!-- API Usage Overview -->
          <div class="row q-gutter-md q-mb-xl">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-grey-7">API Calls Today</div>
                  <div class="text-h3 text-primary q-mt-sm">24,580</div>
                  <div class="text-positive text-caption">↑ 15% from yesterday</div>
                </q-card-section>
              </q-card>
            </div>
            
            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-grey-7">Usage Cost</div>
                  <div class="text-h3 text-green q-mt-sm">$12.34</div>
                  <div class="text-caption text-grey-6">$0.0005 per signal</div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-grey-7">Avg Response</div>
                  <div class="text-h3 text-orange q-mt-sm">47ms</div>
                  <div class="text-positive text-caption">↓ 8ms improvement</div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 text-grey-7">Success Rate</div>
                  <div class="text-h3 text-positive q-mt-sm">99.8%</div>
                  <div class="text-caption text-grey-6">24/7 reliability</div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- API Key & Quick Actions -->
          <div class="row q-gutter-md q-mb-xl">
            <div class="col-lg-8 col-md-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 q-mb-md">API Configuration</div>
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">API Key</div>
                    <q-input 
                      v-model="apiKey" 
                      readonly 
                      outlined 
                      dense
                      class="api-key-input"
                    >
                      <template v-slot:append>
                        <q-btn flat round dense icon="content_copy" @click="copyApiKey" />
                      </template>
                    </q-input>
                  </div>
                  <div class="row q-gutter-sm">
                    <q-btn color="primary" label="Documentation" icon="description" />
                    <q-btn outline color="primary" label="Generate New Key" icon="refresh" />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-lg-4 col-md-12">
              <q-card>
                <q-card-section>
                  <div class="text-h6 q-mb-md">Current Plan</div>
                  <div class="text-h4 text-primary q-mb-xs">Pay-as-you-go</div>
                  <div class="text-body2 text-grey-6 q-mb-md">
                    $0.0005 per API call<br>
                    No monthly fees
                  </div>
                  <q-btn color="orange" label="Add Credits" icon="add" class="full-width" @click="showAddCreditsDialog = true" />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Recent Activity -->
          <q-card>
            <q-card-section>
              <div class="text-h6 q-mb-md">Recent Signal Activity</div>
              <q-table
                :rows="rows"
                :columns="columns"
                row-key="id"
                :pagination="{ sortBy: 'timestamp', descending: true, page: 1, rowsPerPage: 10 }"
                flat
                bordered
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
            <q-card style="min-width: 500px;">
              <q-card-section class="bg-orange text-white">
                <div class="text-h6">
                  <q-icon name="account_balance_wallet" class="q-mr-sm" />
                  Add Credits to Your Account
                </div>
              </q-card-section>
              
              <q-card-section>
                <div class="text-body1 q-mb-md">
                  Choose a credit package to add to your account. All credits never expire.
                </div>

                <!-- Credit Packages -->
                <div class="q-gutter-md q-mb-lg">
                  <q-card 
                    v-for="creditPackage in creditPackages" 
                    :key="creditPackage.id"
                    :class="['credit-package', selectedPackage?.id === creditPackage.id ? 'selected' : '']"
                    @click="selectedPackage = creditPackage"
                    clickable
                  >
                    <q-card-section>
                      <div class="row items-center justify-between">
                        <div>
                          <div class="text-h6 text-weight-bold">{{ creditPackage.credits.toLocaleString() }} Credits</div>
                          <div class="text-body2 text-grey-6">{{ creditPackage.description }}</div>
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
                  <div class="text-subtitle2 q-mb-sm">Payment Method</div>
                  <q-select
                    v-model="selectedPaymentMethod"
                    :options="paymentMethods"
                    option-label="label"
                    option-value="value"
                    outlined
                    dense
                  >
                    <template v-slot:prepend>
                      <q-icon :name="selectedPaymentMethod?.icon || 'credit_card'" />
                    </template>
                  </q-select>
                </div>

                <!-- Total Summary -->
                <q-card flat bordered class="q-pa-md bg-grey-1">
                  <div class="row justify-between items-center q-mb-sm">
                    <span>Credits:</span>
                    <span class="text-weight-bold">{{ selectedPackage?.credits.toLocaleString() || '0' }}</span>
                  </div>
                  <div v-if="selectedPackage?.bonus" class="row justify-between items-center q-mb-sm">
                    <span class="text-positive">Bonus Credits:</span>
                    <span class="text-weight-bold text-positive">+{{ selectedPackage.bonus.toLocaleString() }}</span>
                  </div>
                  <q-separator class="q-my-sm" />
                  <div class="row justify-between items-center">
                    <span class="text-h6">Total:</span>
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
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const apiKey = ref('sk_live_4f8b9c2d1e6a3f7b9c2d1e6a3f7b9c2d')
const showAddCreditsDialog = ref(false)
const selectedPackage = ref(null)
const selectedPaymentMethod = ref(null)
const purchaseLoading = ref(false)

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
  // You could add a toast notification here
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
</script>

<style scoped>
.bg-header {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.api-key-input {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
}

.q-table {
  font-size: 14px;
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
  border-color: #ff6b35;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}

.credit-package.selected {
  border-color: #ff6b35;
  background: rgba(255, 107, 53, 0.05);
}
</style> 