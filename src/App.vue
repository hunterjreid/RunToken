<template>
  <router-view />
</template>

<script setup>
// No script needed for router-view
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', 'Roboto', sans-serif;
  overflow-x: hidden;
  min-width: 320px;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Ensure Quasar doesn't force mobile layout */
.q-layout {
  width: 100% !important;
  max-width: none !important;
}

.q-page-container {
  width: 100% !important;
}

.q-page {
  width: 100% !important;
}

/* Override any mobile-first constraints */
@media (min-width: 768px) {
  .q-layout {
    min-width: 768px;
  }
}

@media (min-width: 1024px) {
  .q-layout {
    min-width: 1024px;
  }
}

@media (min-width: 1200px) {
  .q-layout {
    min-width: 1200px;
  }
}
</style>
