<template>
  <div class="auth-success">
    <div class="success-container">
      <q-circular-progress
        indeterminate
        size="50px"
        color="orange"
        class="q-mb-md"
      />
      <h3 class="text-white q-mb-sm">Authentication Successful!</h3>
      <p class="text-white opacity-80">Redirecting you to the dashboard...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()

onMounted(() => {
  const token = route.query.token
  
  if (token) {
    // Store the token
    localStorage.setItem('authToken', token)
    
    // Fetch user data with the token
    fetchUserData(token)
  } else {
    // No token, redirect to login
    $q.notify({
      type: 'negative',
      message: 'Authentication failed - no token received',
      position: 'top-right'
    })
    router.push('/login')
  }
})

const fetchUserData = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
      
      $q.notify({
        type: 'positive',
        message: `Welcome back, ${data.user.first_name}!`,
        position: 'top-right'
      })
      
      setTimeout(() => {
        router.push('/app')
      }, 1000)
    } else {
      throw new Error('Failed to fetch user data')
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    $q.notify({
      type: 'negative',
      message: 'Failed to complete authentication',
      position: 'top-right'
    })
    router.push('/login')
  }
}
</script>

<style scoped>
.auth-success {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(255, 107, 53, 0.9) 0%, 
    rgba(247, 147, 30, 0.8) 50%, 
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-container {
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}
</style> 