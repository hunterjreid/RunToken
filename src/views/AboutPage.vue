<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <!-- Header -->
      <q-header elevated class="bg-header text-white">
        <q-toolbar>
          <q-toolbar-title class="text-white text-weight-bold">
            <q-icon name="psychology" class="q-mr-sm" />
            SignalCore
          </q-toolbar-title>

          <q-btn flat @click="$router.push('/')" label="Home" class="q-mr-sm" />
          <q-btn flat @click="$router.push('/app')" label="Console" class="text-orange q-mr-sm" />
          <q-btn flat @click="$router.push('/playground')" label="Playground" class="q-mr-sm" />
          <q-btn unelevated color="white" text-color="orange" @click="$router.push('/login')" label="Sign In" />
        </q-toolbar>
      </q-header>

      <!-- Main Content -->
      <q-page-container>
        <q-page class="flex column">
          <!-- Hero Section -->
          <section class="about-hero flex flex-center text-center text-white">
            <div class="q-pa-xl">
              <h1 class="text-h2 text-weight-bold q-mb-md">About SignalCore</h1>
              <p class="text-h5 opacity-90">
                The control tower for your AI stack - routing intelligence at scale
              </p>
            </div>
          </section>

          <!-- Mission Section -->
          <section class="q-pa-xl">
            <div class="row justify-center">
              <div class="col-lg-8 col-md-10 col-xs-12">
                <div class="text-center q-mb-xl">
                  <h2 class="text-h3 text-weight-bold text-grey-8 q-mb-md">Our Mission</h2>
                  <p class="text-h6 text-grey-6">
                    To democratize AI infrastructure and make intelligent signal routing accessible to every developer
                  </p>
                </div>

                <div class="row q-gutter-lg">
                  <div class="col-md-4 col-sm-12" v-for="value in values" :key="value.title">
                    <q-card flat bordered class="text-center q-pa-lg full-height">
                      <q-card-section>
                        <q-icon :name="value.icon" size="3rem" :color="value.color" class="q-mb-md" />
                        <div class="text-h6 text-weight-bold q-mb-sm">{{ value.title }}</div>
                        <p class="text-grey-6">{{ value.description }}</p>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Story Section -->
          <section class="q-pa-xl bg-grey-1">
            <div class="row justify-center">
              <div class="col-lg-8 col-md-10 col-xs-12">
                <div class="text-center q-mb-xl">
                  <h2 class="text-h3 text-weight-bold text-grey-8">Our Story</h2>
                </div>
                
                <div class="row items-center q-gutter-xl">
                  <div class="col-md-6 col-xs-12">
                    <q-card flat class="bg-gradient text-white q-pa-xl">
                      <h3 class="text-h4 text-weight-bold q-mb-md">Founded in 2024</h3>
                      <p class="text-body1">
                        SignalCore emerged from the frustration of managing multiple AI models and providers. 
                        Our founders, AI engineers who experienced the complexity firsthand, envisioned a unified 
                        control tower that would make AI infrastructure as simple as flipping a switch.
                      </p>
                    </q-card>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-card flat bordered class="q-pa-xl">
                      <h3 class="text-h4 text-weight-bold text-grey-8 q-mb-md">Today</h3>
                      <p class="text-body1 text-grey-6">
                        We now route over 1 million AI signals daily for thousands of developers worldwide. 
                        Our platform integrates with 15+ AI providers and maintains 99.9% uptime with sub-50ms 
                        response times, powering the next generation of intelligent applications.
                      </p>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Team Section -->
          <section class="q-pa-xl">
            <div class="text-center q-mb-xl">
              <h2 class="text-h3 text-weight-bold text-grey-8">Meet Our Team</h2>
              <p class="text-h6 text-grey-6">The minds behind the AI revolution</p>
            </div>

            <div class="row q-gutter-lg justify-center">
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="member in teamMembers" :key="member.name">
                <q-card flat bordered class="text-center team-card">
                  <q-card-section>
                    <q-avatar size="120px" class="q-mb-md">
                      <q-icon :name="member.avatar" size="4rem" />
                    </q-avatar>
                    <div class="text-h6 text-weight-bold">{{ member.name }}</div>
                    <div class="text-subtitle2 text-orange q-mb-sm">{{ member.role }}</div>
                    <p class="text-caption text-grey-6">{{ member.bio }}</p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </section>

          <!-- CTA Section -->
          <section class="q-pa-xl bg-gradient text-white text-center">
            <h2 class="text-h3 text-weight-bold q-mb-md">Ready to Transform Your AI Stack?</h2>
            <p class="text-h6 q-mb-xl opacity-90">
              Join thousands of developers who route smarter with SignalCore
            </p>
            <div class="q-gutter-md">
              <q-btn 
                size="xl" 
                color="white" 
                text-color="orange" 
                unelevated 
                @click="$router.push('/playground')" 
                class="q-px-xl"
              >
                Try Playground
              </q-btn>
              <q-btn 
                size="xl" 
                outline
                color="white"
                @click="$router.push('/app')" 
                class="q-px-xl"
              >
                View Console
              </q-btn>
            </div>
          </section>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const values = ref([
  {
    icon: 'psychology',
    color: 'orange',
    title: 'Intelligence',
    description: 'Smart routing algorithms that automatically optimize for performance, cost, and reliability across AI providers.'
  },
  {
    icon: 'speed',
    color: 'green',
    title: 'Performance',
    description: 'Sub-50ms response times with global edge distribution and intelligent caching for lightning-fast AI interactions.'
  },
  {
    icon: 'security',
    color: 'blue',
    title: 'Security',
    description: 'Enterprise-grade security with end-to-end encryption, compliance certifications, and audit trails.'
  }
])

const teamMembers = ref([
  {
    name: 'Alex Chen',
    role: 'CEO & Co-Founder',
    avatar: 'person',
    bio: 'Former Google AI researcher with 10+ years building large-scale ML infrastructure.'
  },
  {
    name: 'Sarah Kim',
    role: 'CTO & Co-Founder',
    avatar: 'engineering',
    bio: 'Ex-OpenAI engineer specializing in distributed systems and AI model optimization.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of AI',
    avatar: 'psychology',
    bio: 'PhD in Machine Learning, expert in neural architecture search and model routing.'
  },
  {
    name: 'Jordan Liu',
    role: 'Lead Platform Engineer',
    avatar: 'code',
    bio: 'Infrastructure wizard focused on building resilient, scalable AI gateway systems.'
  }
])
</script>

<style scoped>
.bg-header {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.about-hero {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  min-height: 50vh;
}

.bg-gradient {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
}

.team-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
</style> 