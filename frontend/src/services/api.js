import axios from 'axios'

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      error.code = 'NETWORK_ERROR'
      error.message = 'Network Error'
      console.error('🔴 RunToken API: Network error - cannot connect to backend')
    }
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/api/auth/login', credentials)
    return response.data
  },
  
  register: async (userData) => {
    const response = await api.post('/api/auth/register', {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company || ''
    })
    return response.data
  },
  
  logout: async () => {
    const response = await api.post('/api/auth/logout')
    return response.data
  },
  
  refreshToken: async () => {
    const response = await api.post('/api/auth/refresh')
    return response.data
  },
  
  getProfile: async () => {
    const response = await api.get('/api/user/profile')
    return response.data
  }
}

// API Keys API functions
export const apiKeysAPI = {
  getKeys: async () => {
    const response = await api.get('/api/keys')
    return response.data
  },
  
  createKey: async (keyData) => {
    const response = await api.post('/api/keys', keyData)
    return response.data
  },
  
  deleteKey: async (keyId) => {
    const response = await api.delete(`/api/keys/${keyId}`)
    return response.data
  },
  
  regenerateKey: async (keyId) => {
    const response = await api.put(`/api/keys/${keyId}/regenerate`)
    return response.data
  }
}

// Analytics API functions
export const analyticsAPI = {
  getUsageStats: async (timeframe = '7d') => {
    const response = await api.get(`/api/analytics/usage?timeframe=${timeframe}`)
    return response.data
  },
  
  getApiCalls: async (page = 1, limit = 50) => {
    const response = await api.get(`/api/analytics/calls?page=${page}&limit=${limit}`)
    return response.data
  }
}

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health')
    return response.data
  }
}

export default api 