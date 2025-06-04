<template>
  <q-header elevated class="floating-header" :class="{ 'menu-expanded': showMenu }" reveal>
    <div class="header-container">
      <q-toolbar class="glassmorphism-toolbar">
        <!-- Left: Brand Logo -->
        <div class="brand-section">
          <router-link to="/" class="brand-link">
            <span class="brand-initials">RT</span>
          </router-link>
        </div>

        <!-- Center: Menu Toggle -->
        <div class="menu-toggle-section">
          <q-btn 
            flat 
            round 
            class="menu-toggle-btn"
            @click="toggleMenu"
            :class="{ 'menu-open': showMenu }"
          >
            <div class="hamburger-icon">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </div>
          </q-btn>
        </div>

        <!-- Right: Primary CTA -->
        <div class="cta-section">
          <q-btn 
            unelevated 
            class="header-cta-btn" 
            @click="$router.push('/app')" 
            rounded
          >
            LAUNCH
          </q-btn>
        </div>
      </q-toolbar>

      <!-- Integrated Dropdown Menu -->
      <div v-if="showMenu" class="integrated-menu">
        <div class="menu-items">
          <router-link to="/what-we-do" class="menu-item" @click="closeMenu">What We Do</router-link>
          <router-link to="/our-work" class="menu-item" @click="closeMenu">Our Work</router-link>
          <router-link to="/pricing" class="menu-item" @click="closeMenu">Pricing</router-link>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}
</script>

<style scoped>
/* Header */
.floating-header {
  --padding: 0.5em;
  --header-fill: rgba(255, 255, 255, 0.25);
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  border: none;
  transition: all 0.25s ease-out;
  height: auto;
  box-shadow: none;
  background: transparent;
}

.header-container {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  backdrop-filter: blur(4px);
  box-shadow: rgba(255, 255, 255, 0.95) 0px 0px 1em 0.25em inset, rgba(0, 0, 0, 0.2) 0px 0.125em 0.125em -0.125em;
  margin: 0px auto;
  background: var(--header-fill);
  padding: var(--padding);
  border-radius: clamp(1em, calc(calc(var(--padding) * 2 + 3.5em) / 2), 2.25em);
  transition: box-shadow 0.25s ease-out, gap 0.25s ease-out, padding 0.25s ease-out, border-radius 0.25s ease-out, background 0.25s ease-out, backdrop-filter 0.5s ease-out;
}

.menu-expanded .header-container {
  border-radius: clamp(1em, 1.5em, 2em);
  padding: var(--padding) var(--padding) 1em var(--padding);
}

.glassmorphism-toolbar {
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
}

.brand-section {
  display: flex;
  align-items: center;
}

.brand-link {
  text-decoration: none;
}

.brand-initials {
  font-family: 'JetBrains Mono', 'Space Grotesk', monospace;
  font-size: 20px;
  font-weight: 800;
  color: #FF4A1C;
  letter-spacing: -1px;
  text-shadow: 0 0 10px rgba(255, 74, 28, 0.3);
  transition: all 0.2s ease;
}

.brand-link:hover .brand-initials {
  transform: scale(1.05);
  text-shadow: 0 0 15px rgba(255, 74, 28, 0.5);
}

.menu-toggle-section {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.menu-toggle-btn {
  background: none !important;
  border: none;
  padding: 8px !important;
  margin: 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.menu-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.hamburger-icon {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: #e5e5e5;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.menu-open .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.menu-open .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.cta-section {
  display: flex;
  align-items: center;
}

.header-cta-btn {
  background: linear-gradient(135deg, #FF4A1C 0%, #FA3C3C 100%) !important;
  color: white !important;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 10px 20px !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  border: none;
  box-shadow: 0 4px 15px rgba(255, 74, 28, 0.3);
}

.header-cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 74, 28, 0.4);
  filter: brightness(1.1);
}

/* Integrated Dropdown Menu */
.integrated-menu {
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.menu-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  letter-spacing: 0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  text-align: left;
}

.menu-item:hover {
  color: #FF4A1C;
  background: rgba(255, 74, 28, 0.15);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(255, 74, 28, 0.2);
}

.menu-item.router-link-active {
  color: #FF4A1C;
  background: rgba(255, 74, 28, 0.1);
  border: 1px solid rgba(255, 74, 28, 0.2);
}
</style> 