<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <q-page-container>
        <q-page class="login-page">
          <!-- Massive Background Image -->
          <div class="login-background">
            <div class="login-overlay">
              <!-- Navigation -->
              <div class="login-nav">
                <q-btn flat color="white" @click="$router.push('/')" label="← Back to Home" />
              </div>

              <!-- Main Login Content -->
              <div class="login-content">
                <div class="login-card">
                  <!-- Logo & Branding -->
                  <div class="text-center q-mb-xl">
                    <q-icon name="token" size="4rem" class="text-orange q-mb-md" />
                    <h1 class="text-h2 text-weight-bold text-white q-mb-sm">RunToken</h1>
                    <p class="text-h6 text-white opacity-90">Powerful API key management platform</p>
                  </div>

                  <!-- Login Options -->
                  <div class="text-center q-mb-lg">
                    <p class="text-h6 text-white q-mb-md">Sign in to continue</p>
                    <p class="text-body2 text-white opacity-80">Choose your preferred sign-in method</p>
                  </div>

                  <!-- Login Method Toggle -->
                  <div class="login-method-toggle q-mb-lg">
                    <q-btn-toggle
                      v-model="loginMethod"
                      spread
                      no-caps
                      rounded
                      toggle-color="orange"
                      color="white"
                      text-color="dark"
                      :options="[
                        {label: 'Email', value: 'email'},
                        {label: 'Google', value: 'google'}
                      ]"
                    />
                  </div>

                  <!-- Email/Password Login -->
                  <div v-if="loginMethod === 'email'" class="email-login">
                    <div class="text-center q-mb-md">
                      <q-chip 
                        :color="showRegister ? 'green' : 'blue'" 
                        text-color="white" 
                        icon="person"
                        :label="showRegister ? 'Create New Account' : 'Sign Into Existing Account'"
                      />
                    </div>
                    <q-form @submit="handleEmailLogin" class="q-gutter-md">
                      <q-input
                        v-model="email"
                        type="email"
                        label="Email Address"
                        outlined
                        required
                        dark
                        color="orange"
                        class="login-input"
                      >
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>

                      <q-input
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        outlined
                        required
                        dark
                        color="orange"
                        class="login-input"
                        :error="lastError.includes('password') || lastError.includes('credentials')"
                        :error-message="lastError.includes('credentials') ? 'Check your email and password' : ''"
                        @input="lastError = ''"
                      >
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="showPassword ? 'visibility' : 'visibility_off'"
                            class="cursor-pointer"
                            @click="showPassword = !showPassword"
                          />
                        </template>
                      </q-input>

                      <div class="row justify-between items-center">
                        <q-checkbox v-model="rememberMe" label="Remember me" dark color="orange" />
                        <q-btn flat color="orange" label="Need an account?" size="sm" @click="showRegister = !showRegister" />
                      </div>

                      <q-btn
                        type="submit"
                        unelevated
                        color="orange"
                        size="lg"
                        class="full-width q-mt-lg"
                        :loading="loading"
                      >
                        {{ showRegister ? 'Create Account' : 'Sign In with Email' }}
                      </q-btn>
                    </q-form>

                    <!-- Simple Register Fields -->
                    <div v-if="showRegister" class="register-fields q-mt-md">
                      <q-input
                        v-model="firstName"
                        label="First Name"
                        outlined
                        dark
                        color="orange"
                        class="login-input q-mb-sm"
                      />
                      <q-input
                        v-model="lastName"
                        label="Last Name"
                        outlined
                        dark
                        color="orange"
                        class="login-input"
                      />
                    </div>
                  </div>

                  <!-- Google OAuth Login -->
                  <div v-else-if="loginMethod === 'google'" class="google-login">
                    <div class="q-gutter-md">
                      <q-btn
                        unelevated
                        color="white"
                        text-color="dark"
                        icon="login"
                        size="lg"
                        class="full-width google-btn"
                        @click="handleGoogleLogin"
                        :loading="loading"
                      >
                        <q-icon name="account_circle" class="q-mr-sm" />
                        Continue with Google
                      </q-btn>
                    </div>
                  </div>

                  <div class="text-center q-mt-xl">
                    <p class="text-body2 text-white opacity-70">
                      By signing in, you agree to our 
                      <q-btn flat color="orange" label="Terms of Service" size="sm" @click="$router.push('/terms')" />
                      and 
                      <q-btn flat color="orange" label="Privacy Policy" size="sm" @click="$router.push('/privacy')" />
                    </p>
                  </div>


                </div>
              </div>

              <!-- Footer with Year -->
              <div class="login-footer">
                <div class="text-center text-white opacity-70">
                  <p class="text-body2">
                    © {{ currentYear }} RunToken. All rights reserved.
                  </p>
                  <p class="text-caption">
                    Secure your APIs. Scale your business.
                  </p>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { authAPI } from '../services/api'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

// Form data
const loginMethod = ref('email')
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const showRegister = ref(false)
const loading = ref(false)
const lastError = ref('')

const currentYear = computed(() => new Date().getFullYear())

// Email/Password login or register
const handleEmailLogin = async () => {
  if (!email.value || !password.value) {
    $q.notify({
      type: 'negative',
      message: 'Please enter both email and password',
      position: 'top-right'
    })
    return
  }

  if (showRegister.value && (!firstName.value || !lastName.value)) {
    $q.notify({
      type: 'negative',
      message: 'Please enter your first and last name',
      position: 'top-right'
    })
    return
  }

  loading.value = true
  lastError.value = ''
  
  // Show loading feedback
  const loadingNotification = $q.notify({
    type: 'ongoing',
    message: showRegister.value ? '🔄 Creating your RunToken account...' : '🔄 Signing into RunToken...',
    spinner: true,
    position: 'top-right',
    timeout: 0,
    group: 'auth-loading'
  })
  
  try {
    let response;
    
    console.log('Attempting authentication...', { 
      method: showRegister.value ? 'register' : 'login',
      email: email.value 
    });
    
    if (showRegister.value) {
      // Register new user
      response = await authAPI.register({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value
      })
      
      console.log('Registration successful:', response);
      
      $q.notify({
        type: 'positive',
        message: `🎉 Welcome to RunToken, ${firstName.value}!`,
        caption: `Account created successfully with ${email.value}`,
        position: 'top-right',
        timeout: 4000
      })
    } else {
      // Login existing user
      response = await authAPI.login({
        email: email.value,
        password: password.value
      })
      
      console.log('Login successful:', response);
      
      $q.notify({
        type: 'positive',
        message: `✅ Welcome back to RunToken!`,
        caption: `Successfully logged in as ${email.value}`,
        position: 'top-right',
        timeout: 3000
      })
    }
    
    // Validate response
    if (!response || !response.token) {
      throw new Error('Invalid response from server')
    }
    
    // Store auth data
    localStorage.setItem('authToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    
    // Small delay for user feedback
    setTimeout(() => {
      router.push('/app')
    }, 1000)
    
  } catch (error) {
    console.error('RunToken Auth Error:', error)
    
    // Clear loading
    loading.value = false
    $q.notify.cancel('auth-loading')
    
    const errorMsg = error.response?.data?.error || error.message || 'Unknown error occurred'
    
    // Handle network errors
    if (error.code === 'NETWORK_ERROR' || error.message === 'Network Error') {
      $q.notify({
        type: 'negative',
        message: `❌ Cannot connect to RunToken servers`,
        caption: 'Please check your internet connection and try again',
        position: 'top-right',
        timeout: 8000,
        actions: [
          {
            label: 'Retry',
            color: 'white',
            handler: () => handleEmailLogin()
          }
        ]
      })
      return
    }
    
    // Handle specific error cases with detailed feedback
    if (error.response?.status === 409 && showRegister.value) {
      // User already exists - switch to login mode
      showRegister.value = false
      $q.notify({
        type: 'warning',
        message: `✅ Account with ${email.value} already exists!`,
        caption: 'Switched to login mode - please enter your password',
        position: 'top-right',
        timeout: 5000
      })
    } else if (error.response?.status === 401 && !showRegister.value) {
      // Invalid login credentials
      lastError.value = 'invalid credentials'
      $q.notify({
        type: 'negative',
        message: `❌ RunToken login failed`,
        caption: `Invalid credentials for ${email.value}`,
        position: 'top-right',
        timeout: 6000,
        actions: [
          {
            label: 'Create Account',
            color: 'orange',
            handler: () => {
              showRegister.value = true
              lastError.value = ''
            }
          },
          {
            label: 'Try Again',
            color: 'white',
            handler: () => {
              password.value = ''
              lastError.value = ''
            }
          }
        ]
      })
    } else if (error.response?.status === 429) {
      // Rate limited
      $q.notify({
        type: 'warning',
        message: `⏰ Too many attempts`,
        caption: 'Please wait a moment before trying again',
        position: 'top-right',
        timeout: 5000
      })
    } else {
      // Generic error
      $q.notify({
        type: 'negative',
        message: `❌ RunToken ${showRegister.value ? 'registration' : 'login'} failed`,
        caption: errorMsg,
        position: 'top-right',
        timeout: 5000,
        actions: [
          {
            label: 'Retry',
            color: 'white',
            handler: () => handleEmailLogin()
          }
        ]
      })
    }
  } finally {
    // Always clear loading state
    setTimeout(() => {
      loading.value = false
      $q.notify.cancel('auth-loading')
    }, 500)
  }
}

// Google OAuth login
const handleGoogleLogin = async () => {
  loading.value = true
  
  try {
    // Check if Google OAuth is available
    const response = await fetch('http://localhost:5000/api/auth/google')
    
    if (response.ok) {
      // Redirect to backend Google OAuth endpoint
      const backendURL = 'http://localhost:5000'
      window.location.href = `${backendURL}/api/auth/google`
    } else {
      const error = await response.json()
      $q.notify({
        type: 'warning',
        message: 'Google OAuth not configured. Please use email/password login.',
        position: 'top-right'
      })
      loginMethod.value = 'email'
      loading.value = false
    }
  } catch (error) {
    console.error('Google OAuth check failed:', error)
    $q.notify({
      type: 'negative',
      message: 'Could not connect to authentication service',
      position: 'top-right'
    })
    loading.value = false
  }
}

// Handle OAuth success/error from URL params
onMounted(async () => {
  // Check if user is already logged in
  if (localStorage.getItem('authToken')) {
    router.push('/app')
    return
  }
  
  // Test backend connection
  try {
    const response = await fetch('http://localhost:5000/health')
    if (response.ok) {
      console.log('✅ RunToken backend connection successful')
    } else {
      console.warn('⚠️ RunToken backend responded with error:', response.status)
    }
  } catch (error) {
    console.error('❌ RunToken backend connection failed:', error)
    $q.notify({
      type: 'warning',
      message: '⚠️ Cannot connect to RunToken servers',
      caption: 'Please make sure the backend is running on port 5000',
      position: 'top-right',
      timeout: 8000
    })
  }
  
  // Handle OAuth callback
  const token = route.query.token
  const error = route.query.error
  
  if (token) {
    // Store the token and redirect to dashboard
    localStorage.setItem('authToken', token)
    
    $q.notify({
      type: 'positive',
      message: 'RunToken login successful!',
      position: 'top-right'
    })
    
    router.push('/app')
  } else if (error) {
    $q.notify({
      type: 'negative',
      message: `RunToken login failed: ${error}`,
      position: 'top-right'
    })
  }
})
</script>

<style scoped>
.login-page {
  height: 100vh;
  overflow: hidden;
}

.login-background {
  position: relative;
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80') center/cover no-repeat;
  background-attachment: fixed;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 107, 53, 0.9) 0%, 
    rgba(247, 147, 30, 0.8) 50%, 
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}

.login-nav {
  width: 100%;
  max-width: 1200px;
  align-self: flex-start;
}

.login-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.login-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.login-input {
  margin-bottom: 1rem;
}

.login-input .q-field__control {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.google-btn {
  background: white !important;
  color: #1a1a1a !important;
  font-weight: 600;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.google-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.login-method-toggle {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 4px;
}

.login-method-toggle .q-btn-toggle {
  background: transparent;
}

.email-login, .google-login {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-footer {
  width: 100%;
  max-width: 1200px;
  padding: 1rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .login-overlay {
    padding: 1rem;
  }
}

/* Animation */
.login-card {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 