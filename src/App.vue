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
  width: 100%;
}

body {
  font-family: 'Inter', 'Roboto', sans-serif;
  overflow-x: hidden;
  min-width: 320px;
  width: 100%;
}

#app {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.gradient-text {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Ensure Quasar doesn't force mobile layout */
.q-layout {
  width: 100vw !important;
  max-width: none !important;
  min-width: unset !important;
}

.q-page-container {
  width: 100vw !important;
  max-width: none !important;
  padding-top: 0 !important;
}

.q-page {
  width: 100vw !important;
  max-width: none !important;
  padding-top: 0 !important;
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

/* Hide Quasar's auto-generated shadow div */
.q-layout__shadow {
  display: none !important;
}
</style>
