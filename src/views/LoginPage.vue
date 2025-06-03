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
                    <q-icon name="psychology" size="4rem" class="text-orange q-mb-md" />
                    <h1 class="text-h2 text-weight-bold text-white q-mb-sm">SignalCore</h1>
                    <p class="text-h6 text-white opacity-90">The control tower for your AI stack</p>
                  </div>

                  <!-- Login Form -->
                  <q-form @submit="handleLogin" class="q-gutter-md">
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
                      <q-btn flat color="orange" label="Forgot password?" size="sm" />
                    </div>

                    <q-btn
                      type="submit"
                      unelevated
                      color="orange"
                      size="lg"
                      class="full-width q-mt-lg"
                      :loading="loading"
                    >
                      Sign In to Console
                    </q-btn>
                  </q-form>

                  <q-separator dark class="q-my-lg" />

                  <!-- Social Login -->
                  <div class="q-gutter-sm">
                    <q-btn
                      unelevated
                      color="white"
                      text-color="dark"
                      icon="login"
                      class="full-width"
                      @click="handleGoogleLogin"
                    >
                      Continue with Google
                    </q-btn>
                    <q-btn
                      unelevated
                      color="grey-8"
                      text-color="white"
                      icon="login"
                      class="full-width"
                      @click="handleGithubLogin"
                    >
                      Continue with GitHub
                    </q-btn>
                  </div>

                  <!-- Sign Up Link -->
                  <div class="text-center q-mt-xl">
                    <p class="text-white">
                      Don't have an account?
                      <q-btn flat color="orange" label="Sign up here" @click="handleSignUp" />
                    </p>
                  </div>
                </div>
              </div>

              <!-- Footer with Year -->
              <div class="login-footer">
                <div class="text-center text-white opacity-70">
                  <p class="text-body2">
                    © {{ currentYear }} SignalCore. All rights reserved.
                  </p>
                  <p class="text-caption">
                    Route smarter. Build faster. Think bigger.
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const handleLogin = async () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    router.push('/app')
  }, 1500)
}

const handleGoogleLogin = () => {
  // Simulate Google OAuth
  setTimeout(() => {
    router.push('/app')
  }, 1000)
}

const handleGithubLogin = () => {
  // Simulate GitHub OAuth
  setTimeout(() => {
    router.push('/app')
  }, 1000)
}

const handleSignUp = () => {
  // Handle sign up logic
  console.log('Sign up clicked')
}
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