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
            SignalCore API Playground
          </q-toolbar-title>

          <div>
            <q-btn flat @click="$router.push('/')" label="Home" class="q-mr-sm" />
            <q-btn flat @click="$router.push('/app')" label="Console" class="q-mr-sm" />
            <q-btn flat round dense icon="account_circle" />
          </div>
        </q-toolbar>
      </q-header>

      <!-- Main Content -->
      <q-page-container>
        <q-page class="q-pa-lg">
          <div class="row q-gutter-lg">
            <!-- API Configuration Panel -->
            <div class="col-lg-4 col-md-12">
              <q-card>
                <q-card-section class="bg-orange text-white">
                  <div class="text-h6">
                    <q-icon name="settings" class="q-mr-sm" />
                    API Configuration
                  </div>
                </q-card-section>
                
                <q-card-section>
                  <!-- Endpoint Selection -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Endpoint</div>
                    <q-select
                      v-model="selectedEndpoint"
                      :options="endpoints"
                      option-label="name"
                      option-value="value"
                      outlined
                      dense
                      @update:model-value="updateExample"
                    />
                  </div>

                  <!-- HTTP Method -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Method</div>
                    <q-select
                      v-model="httpMethod"
                      :options="['POST', 'GET', 'PUT', 'DELETE']"
                      outlined
                      dense
                    />
                  </div>

                  <!-- API Key -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">API Key</div>
                    <q-input
                      v-model="apiKey"
                      outlined
                      dense
                      type="password"
                      placeholder="sk_live_..."
                    >
                      <template v-slot:append>
                        <q-icon name="key" />
                      </template>
                    </q-input>
                  </div>

                  <!-- Request Headers -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 q-mb-xs">Headers</div>
                    <q-input
                      v-model="customHeaders"
                      outlined
                      dense
                      type="textarea"
                      rows="3"
                      placeholder='{"Custom-Header": "value"}'
                    />
                  </div>

                  <!-- Test Button -->
                  <q-btn
                    color="orange"
                    unelevated
                    icon="play_arrow"
                    label="Send Request"
                    class="full-width q-mb-md"
                    :loading="loading"
                    @click="sendRequest"
                  />

                  <!-- Copy cURL Button -->
                  <q-btn
                    color="grey-8"
                    unelevated
                    icon="content_copy"
                    label="Copy as cURL"
                    class="full-width"
                    @click="copyCurl"
                  />
                </q-card-section>
              </q-card>

              <!-- Quick Examples -->
              <q-card class="q-mt-md">
                <q-card-section>
                  <div class="text-h6 q-mb-md">
                    <q-icon name="lightbulb" class="q-mr-sm" />
                    Quick Examples
                  </div>
                  <div class="q-gutter-sm">
                    <q-btn
                      size="sm"
                      outline
                      color="primary"
                      label="Text Generation"
                      @click="loadExample('textgen')"
                      class="full-width"
                    />
                    <q-btn
                      size="sm"
                      outline
                      color="primary"
                      label="Chat Completion"
                      @click="loadExample('chat')"
                      class="full-width"
                    />
                    <q-btn
                      size="sm"
                      outline
                      color="primary"
                      label="Model Information"
                      @click="loadExample('models')"
                      class="full-width"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Request & Response Panel -->
            <div class="col-lg-8 col-md-12">
              <!-- Request Body -->
              <q-card class="q-mb-md">
                <q-card-section class="bg-grey-9 text-white">
                  <div class="text-h6">
                    <q-icon name="code" class="q-mr-sm" />
                    Request Body
                  </div>
                </q-card-section>
                
                <q-card-section>
                  <q-input
                    v-model="requestBody"
                    outlined
                    type="textarea"
                    rows="10"
                    class="code-editor"
                    placeholder="Enter JSON request body..."
                  />
                </q-card-section>
              </q-card>

              <!-- Response -->
              <q-card>
                <q-card-section class="bg-grey-9 text-white">
                  <div class="row items-center justify-between">
                    <div class="text-h6">
                      <q-icon name="receipt" class="q-mr-sm" />
                      Response
                    </div>
                    <div v-if="responseTime">
                      <q-chip color="green" text-color="white" size="sm">
                        {{ responseTime }}ms
                      </q-chip>
                    </div>
                  </div>
                </q-card-section>
                
                <q-card-section>
                  <div v-if="!response && !loading" class="text-center text-grey-6 q-pa-xl">
                    <q-icon name="play_circle" size="4rem" class="q-mb-md" />
                    <div class="text-h6">Ready to test</div>
                    <p>Configure your request above and click "Send Request" to see the response</p>
                  </div>

                  <div v-else-if="loading" class="text-center q-pa-xl">
                    <q-spinner-dots size="3rem" color="orange" />
                    <div class="text-h6 q-mt-md">Processing request...</div>
                  </div>

                  <div v-else>
                    <!-- Response Status -->
                    <div class="q-mb-md">
                      <q-chip
                        :color="responseStatus < 300 ? 'positive' : 'negative'"
                        text-color="white"
                        :label="`Status: ${responseStatus}`"
                      />
                    </div>

                    <!-- Response Body -->
                    <q-input
                      v-model="response"
                      outlined
                      type="textarea"
                      rows="15"
                      readonly
                      class="code-editor response-editor"
                    />

                    <!-- Copy Response Button -->
                    <div class="q-mt-md">
                      <q-btn
                        outline
                        color="primary"
                        icon="content_copy"
                        label="Copy Response"
                        @click="copyResponse"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- cURL Command Modal -->
          <q-dialog v-model="showCurlDialog">
            <q-card style="min-width: 600px;">
              <q-card-section class="bg-grey-9 text-white">
                <div class="text-h6">cURL Command</div>
              </q-card-section>
              
              <q-card-section>
                <q-input
                  v-model="curlCommand"
                  outlined
                  type="textarea"
                  rows="8"
                  readonly
                  class="code-editor"
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Close" color="grey" v-close-popup />
                <q-btn unelevated label="Copy" color="orange" @click="copyToClipboard(curlCommand)" />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const selectedEndpoint = ref(null)
const httpMethod = ref('POST')
const apiKey = ref('sk_live_4f8b9c2d1e6a3f7b9c2d1e6a3f7b9c2d')
const customHeaders = ref('{}')
const requestBody = ref('')
const response = ref('')
const responseStatus = ref(null)
const responseTime = ref(null)
const loading = ref(false)
const showCurlDialog = ref(false)

const endpoints = ref([
  { name: 'Chat Completions', value: '/v1/chat/completions' },
  { name: 'Text Generation', value: '/v1/completions' },
  { name: 'Models', value: '/v1/models' },
  { name: 'Embeddings', value: '/v1/embeddings' },
  { name: 'Fine-tuning', value: '/v1/fine-tunes' }
])

const curlCommand = computed(() => {
  const baseUrl = 'https://api.signalcore.ai'
  const endpoint = selectedEndpoint.value?.value || '/v1/chat/completions'
  const headers = []
  
  headers.push(`-H "Authorization: Bearer ${apiKey.value}"`)
  headers.push(`-H "Content-Type: application/json"`)
  
  try {
    const customHeadersObj = JSON.parse(customHeaders.value || '{}')
    Object.entries(customHeadersObj).forEach(([key, value]) => {
      headers.push(`-H "${key}: ${value}"`)
    })
  } catch (e) {
    // Invalid JSON in custom headers
  }
  
  let curl = `curl -X ${httpMethod.value} "${baseUrl}${endpoint}" \\\n`
  curl += headers.join(' \\\n  ') + ' \\\n'
  
  if (requestBody.value && httpMethod.value !== 'GET') {
    curl += `  -d '${requestBody.value}'`
  }
  
  return curl
})

const loadExample = (type) => {
  selectedEndpoint.value = endpoints.value[0] // Chat completions
  httpMethod.value = 'POST'
  
  const examples = {
    textgen: {
      endpoint: endpoints.value[1], // Text generation
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: "Write a creative story about",
        max_tokens: 100,
        temperature: 0.7
      }, null, 2)
    },
    chat: {
      endpoint: endpoints.value[0], // Chat completions
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant."
          },
          {
            role: "user",
            content: "Hello! How can AI help businesses?"
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }, null, 2)
    },
    models: {
      endpoint: endpoints.value[2], // Models
      body: ''
    }
  }
  
  const example = examples[type]
  selectedEndpoint.value = example.endpoint
  requestBody.value = example.body
  if (type === 'models') httpMethod.value = 'GET'
}

const updateExample = () => {
  if (selectedEndpoint.value?.value === '/v1/models') {
    httpMethod.value = 'GET'
    requestBody.value = ''
  } else {
    httpMethod.value = 'POST'
    loadExample('chat')
  }
}

const sendRequest = async () => {
  loading.value = true
  const startTime = Date.now()
  
  // Simulate API call
  setTimeout(() => {
    responseTime.value = Date.now() - startTime
    responseStatus.value = 200
    
    // Mock response based on endpoint
    if (selectedEndpoint.value?.value === '/v1/models') {
      response.value = JSON.stringify({
        object: "list",
        data: [
          { id: "gpt-4", object: "model", created: 1687882411, owned_by: "openai" },
          { id: "gpt-3.5-turbo", object: "model", created: 1677610602, owned_by: "openai" },
          { id: "claude-3-opus", object: "model", created: 1687882411, owned_by: "anthropic" }
        ]
      }, null, 2)
    } else {
      response.value = JSON.stringify({
        id: "chatcmpl-123",
        object: "chat.completion",
        created: Date.now(),
        model: "gpt-4",
        usage: {
          prompt_tokens: 12,
          completion_tokens: 45,
          total_tokens: 57
        },
        choices: [{
          message: {
            role: "assistant",
            content: "AI can help businesses in numerous ways: automating repetitive tasks, analyzing large datasets for insights, improving customer service through chatbots, optimizing operations, and enabling data-driven decision making. It's particularly powerful for scaling operations and reducing costs while improving efficiency."
          },
          finish_reason: "stop",
          index: 0
        }]
      }, null, 2)
    }
    
    loading.value = false
  }, 1500)
}

const copyCurl = () => {
  showCurlDialog.value = true
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  $q.notify({
    message: 'Copied to clipboard!',
    color: 'positive',
    position: 'top'
  })
}

const copyResponse = () => {
  copyToClipboard(response.value)
}

// Initialize with a default example
loadExample('chat')
</script>

<style scoped>
.bg-header {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.code-editor {
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
}

.code-editor .q-field__control {
  background: #1e1e1e;
  color: #fff;
}

.response-editor .q-field__control {
  background: #f5f5f5;
  color: #333;
}

.q-card {
  border-radius: 12px;
}

/* Syntax highlighting for JSON */
.code-editor textarea {
  color: #d4d4d4;
  background: #1e1e1e;
}
</style> 