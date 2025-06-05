<template>
  <div id="q-app">
    <q-layout view="hHh lpr fFf">
      <UniversalHeader />
      
      <q-page-container>
        <q-page class="landing-page">
          <!-- Hero Section with Parallax -->
          <section class="hero-parallax" ref="heroRef">
            <div class="hero-background">
              <!-- Animated Background Elements -->
              <div class="floating-shapes">
                <div class="shape shape-1" v-for="n in 15" :key="n"></div>
              </div>
              
              <!-- Parallax Layers -->
              <div class="parallax-layer layer-1" :style="{ transform: `translateY(${parallaxY * 0.5}px)` }">
                <div class="abstract-mouth">
                  <div class="mouth-part mouth-top"></div>
                  <div class="mouth-part mouth-bottom"></div>
                  <div class="teeth">
                    <div v-for="n in 6" :key="n" class="tooth"></div>
                  </div>
                </div>
              </div>

              <div class="parallax-layer layer-2" :style="{ transform: `translateY(${parallaxY * 0.3}px)` }">
                <div class="rockets-container">
                  <div class="rocket rocket-1">
                    <div class="rocket-body"></div>
                    <div class="rocket-nose"></div>
                    <div class="rocket-fins"></div>
                    <div class="rocket-fire"></div>
                  </div>
                  <div class="rocket rocket-2">
                    <div class="rocket-body"></div>
                    <div class="rocket-nose"></div>
                    <div class="rocket-fins"></div>
                    <div class="rocket-fire"></div>
                  </div>
                </div>
              </div>
              
              <!-- Subtle gradient background -->
              <div class="hero-gradient-overlay"></div>
            </div>

            <!-- Hero Content -->
            <div class="hero-content">
              <div class="hero-container">
                <!-- Main Headline -->
                <h1 class="hero-headline animate-in">
                <br> <br>
                  <span class="headline-normal">Fire off the</span>
                  <span class="headline-emphasis">future</span>
                  <br>
                  <span class="headline-normal">with</span>
                  <span class="headline-emphasis-gradient">blistering speed</span>
                </h1>
                
                <!-- Sub-headline -->
                <p class="hero-subheadline animate-in-delay">
                  <q-icon name="search" class="discover-icon" /> <strong>Discover</strong> and <q-icon name="rocket_launch" class="rocket-icon" /> <strong>Route</strong> AI models instantly —<br>
                  trigger outcomes, swap engines, and launch signals in your sleep.
                </p>

                <!-- CTA Button -->
                <div class="cta-container animate-in-delay-2">
                  <button class="fire-cta-btn" @click="$router.push('/app')">
                    <span class="cta-text">🔥 Fire it off</span>
                    <span class="cta-arrow">→</span>
                  </button>
                  <p class="cta-note">89/100 early access spots left</p>
                </div>

                <!-- Neural Network LLM Carousel - Flat Tilted Layout -->
                <div class="neural-llm-carousel animate-in-delay-3">
                  <div class="neural-perspective-container">
                    <!-- Synaptic Network Background -->
                    <div class="synaptic-network">
                      <svg class="synapse-connections" viewBox="0 0 1400 600">
                        <defs>
                          <linearGradient id="synapseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#FF4A1C;stop-opacity:0" />
                            <stop offset="30%" style="stop-color:#F7D52E;stop-opacity:1" />
                            <stop offset="70%" style="stop-color:#FF4A1C;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#F7D52E;stop-opacity:0" />
                          </linearGradient>
                          <linearGradient id="synapseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#F7D52E;stop-opacity:0" />
                            <stop offset="50%" style="stop-color:#FF4A1C;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#F7D52E;stop-opacity:0" />
                          </linearGradient>
                          <linearGradient id="synapseGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:0" />
                            <stop offset="40%" style="stop-color:#F7D52E;stop-opacity:1" />
                            <stop offset="60%" style="stop-color:#FF4A1C;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#FF6B35;stop-opacity:0" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        
                        <!-- Straight Vertical Synaptic Connections -->
                        <path class="synapse-line synapse-1" 
                              d="M 200,500 L 200,100" 
                              stroke="url(#synapseGradient1)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-2" 
                              d="M 350,500 L 350,100" 
                              stroke="url(#synapseGradient2)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-3" 
                              d="M 500,500 L 500,100" 
                              stroke="url(#synapseGradient3)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-4" 
                              d="M 650,500 L 650,100" 
                              stroke="url(#synapseGradient1)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-5" 
                              d="M 800,500 L 800,100" 
                              stroke="url(#synapseGradient2)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-6" 
                              d="M 950,500 L 950,100" 
                              stroke="url(#synapseGradient3)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-7" 
                              d="M 1100,500 L 1100,100" 
                              stroke="url(#synapseGradient1)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-8" 
                              d="M 1250,500 L 1250,100" 
                              stroke="url(#synapseGradient2)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-9" 
                              d="M 300,500 L 300,100" 
                              stroke="url(#synapseGradient3)" 
                              filter="url(#glow)" />
                        <path class="synapse-line synapse-10" 
                              d="M 750,500 L 750,100" 
                              stroke="url(#synapseGradient1)" 
                              filter="url(#glow)" />
                                
                        <!-- Synaptic Pulse Markers -->
                        <circle class="synapse-pulse pulse-1" r="4" fill="#F7D52E">
                          <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
                            <mpath href="#synapse-path-1"/>
                          </animateMotion>
                        </circle>
                        <circle class="synapse-pulse pulse-2" r="3" fill="#FF4A1C">
                          <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                            <mpath href="#synapse-path-2"/>
                          </animateMotion>
                        </circle>
                        <circle class="synapse-pulse pulse-3" r="5" fill="#FF6B35">
                          <animateMotion dur="5s" repeatCount="indefinite" begin="2s">
                            <mpath href="#synapse-path-3"/>
                          </animateMotion>
                        </circle>
                        <circle class="synapse-pulse pulse-4" r="3" fill="#F7D52E">
                          <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                            <mpath href="#synapse-path-4"/>
                          </animateMotion>
                        </circle>
                        
                        <!-- Hidden paths for pulse animation -->
                        <path id="synapse-path-1" d="M 200,500 L 200,100" opacity="0" />
                        <path id="synapse-path-2" d="M 350,500 L 350,100" opacity="0" />
                        <path id="synapse-path-3" d="M 500,500 L 500,100" opacity="0" />
                        <path id="synapse-path-4" d="M 650,500 L 650,100" opacity="0" />
                      </svg>
                    </div>
                    
                    <!-- LLM Neural Nodes - Curved Screen Tiles -->
                    <div class="neural-nodes-container" :key="neuralNodesKey">
                      <div 
                        v-for="nodeIndex in 7" 
                        :key="nodeIndex" 
                        class="llm-neural-node" 
                        :class="`node-${nodeIndex}`"
                        :style="getNeuralNodeStyle(nodeIndex - 1)"
                      >
                        <!-- Node Core Container - Larger for curved screen tiles -->
                        <div class="node-core">
                          <!-- Internal Neuron Cluster - Scaled for larger tiles -->
                          <div class="neuron-cluster">
                            <div 
                              v-for="neuronIndex in getNeuronCount(nodeIndex - 1)" 
                              :key="neuronIndex"
                              class="internal-neuron"
                              :class="[
                                `neuron-${neuronIndex}`,
                                `cluster-${nodeIndex}`
                              ]"
                              :style="getNeuronPosition(nodeIndex - 1, neuronIndex - 1)"
                            >
                              <div class="neuron-core"></div>
                              <div class="neuron-glow"></div>
                            </div>
                          </div>
                          
                          <!-- Node Edge Connection Points - Scaled for larger tiles -->
                          <div class="connection-points">
                            <div 
                              v-for="pointIndex in 6" 
                              :key="pointIndex"
                              class="connection-point"
                              :class="`point-${pointIndex}`"
                              :style="getConnectionPointStyle(pointIndex - 1)"
                            ></div>
                          </div>
                          
                          <!-- Node Energy Field - Enhanced for screen tiles -->
                          <div class="node-energy-field"></div>
                        </div>
                        
                        <!-- Node Activation Ring - Enhanced for screen tiles -->
                        <div class="activation-ring"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Where Signals Become Outcomes Section -->
          <section class="signals-section" ref="signalsRef">
            <div class="signals-content">
              <div class="signals-text">
                <h2 class="signals-title animate-on-scroll">
                  Where signals become outcomes.
                </h2>
                
                <q-btn 
                  size="xl"
                  class="launch-signal-btn animate-on-scroll-delay" 
                  unelevated
                  rounded
                  @click="$router.push('/app')"
                >
                  LAUNCH SIGNAL
                </q-btn>
              </div>
              
              <!-- Animated Rockets with Trails -->
              <div class="signals-rockets">
                <div class="signal-rocket rocket-animated" v-for="n in 3" :key="n" :class="`rocket-${n}`">
                  <div class="rocket-body-large"></div>
                  <div class="rocket-nose-large"></div>
                  <div class="rocket-fins-large"></div>
                  <div class="rocket-trail"></div>
                </div>
              </div>
            </div>
          </section>

          <!-- Features Cards Section -->
          <section class="features-section" id="features">
            <div class="features-container">
              <div class="feature-card open-source animate-on-scroll">
                <div class="feature-icon">
                  <q-icon name="inventory" />
                </div>
                <h3 class="feature-title">Open Source Models</h3>
                <p class="feature-subtitle">Tap into Hugging Face, Mistral & more</p>
              </div>
              
              <div class="feature-card fast animate-on-scroll-delay">
                <div class="feature-icon">
                  <q-icon name="bolt" />
                </div>
                <h3 class="feature-title">Fast</h3>
                <p class="feature-subtitle">Latency-optimized routing engine</p>
              </div>
              
              <div class="feature-card private animate-on-scroll-delay-2">
                <div class="feature-icon">
                  <q-icon name="lock" />
                </div>
                <h3 class="feature-title">Private</h3>
                <p class="feature-subtitle">No logging, no retention</p>
              </div>
            </div>
          </section>

          <!-- Stats Section -->
          <section class="stats-section">
            <div class="stats-container">
              <div class="stat-tile animate-on-scroll">
                <div class="stat-value">90 ms</div>
                <div class="stat-metric">Median Latency</div>
                <div class="stat-blurb">End‑to‑end, global.</div>
              </div>
              
              <div class="stat-tile animate-on-scroll-delay">
                <div class="stat-value">0</div>
                <div class="stat-metric">Stored Requests</div>
                <div class="stat-blurb">We literally can't show logs.</div>
              </div>
              
              <div class="stat-tile animate-on-scroll-delay-2">
                <div class="stat-value">100+</div>
                <div class="stat-metric">Models Routed</div>
                <div class="stat-blurb">Any provider, any time.</div>
              </div>
            </div>
          </section>

          <!-- Testimonials -->
          <section class="testimonials-section">
            <div class="testimonials-container">
              <div class="testimonial animate-on-scroll">
                <p class="testimonial-text">"RunToken feels like having a superpower. 100 ms to any model—incredible."</p>
                <div class="testimonial-author">—Sarah K., ML Engineer</div>
              </div>
              
              <div class="testimonial animate-on-scroll-delay">
                <p class="testimonial-text">"Finally ditched our legacy gateway. Dropped infra cost by 40%."</p>
                <div class="testimonial-author">—Amir R., CTO</div>
              </div>
            </div>
          </section>

          <!-- Pricing Teaser -->
          <section class="pricing-section" id="pricing">
            <div class="pricing-container">
              <h2 class="pricing-title animate-on-scroll">Ready to Launch?</h2>
              
              <div class="pricing-tiers">
                <div class="pricing-tier free animate-on-scroll">
                  <div class="tier-header">
                    <h3 class="tier-name">Free Tier</h3>
                    <div class="tier-price">$0</div>
                  </div>
                  <ul class="tier-features">
                    <li>500k tokens/mo</li>
                    <li>Community Slack</li>
                    <li>Self‑host script</li>
                  </ul>
                  <q-btn class="tier-btn" unelevated @click="$router.push('/app')">Start Free</q-btn>
                </div>
                
                <div class="pricing-tier pro animate-on-scroll-delay">
                  <div class="tier-header">
                    <h3 class="tier-name">Pro Tier</h3>
                    <div class="tier-price">$29<span class="tier-period">/mo</span></div>
                  </div>
                  <ul class="tier-features">
                    <li>20M tokens</li>
                    <li>Priority routing</li>
                    <li>Multi‑region failover</li>
                  </ul>
                  <q-btn class="tier-btn launch-btn" unelevated @click="$router.push('/app')">Launch Signal</q-btn>
                </div>
                
                <div class="pricing-tier enterprise animate-on-scroll-delay-2">
                  <div class="tier-header">
                    <h3 class="tier-name">Enterprise</h3>
                    <div class="tier-price">Custom</div>
                  </div>
                  <ul class="tier-features">
                    <li>Unlimited everything</li>
                    <li>Private peering</li>
                    <li>Custom SLAs</li>
                  </ul>
                  <q-btn class="tier-btn" outline @click="window.open('mailto:enterprise@runtoken.dev')">Let's talk →</q-btn>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQ Section -->
          <section class="faq-section">
            <div class="faq-container">
              <h2 class="faq-title animate-on-scroll">Frequently Asked Questions</h2>
              
              <div class="faq-items">
                <div class="faq-item animate-on-scroll">
                  <h3 class="faq-question">Do you store logs?</h3>
                  <p class="faq-answer">No. Once the response lands, the request evaporates.</p>
                </div>
                
                <div class="faq-item animate-on-scroll-delay">
                  <h3 class="faq-question">How fast is it?</h3>
                  <p class="faq-answer">Sub‑100 ms in most regions. <router-link to="/status" class="faq-link">Check live status →</router-link></p>
                </div>
                
                <div class="faq-item animate-on-scroll-delay-2">
                  <h3 class="faq-question">What models are supported?</h3>
                  <p class="faq-answer">OpenAI, Anthropic, Groq, Together, HuggingFace Inference, and anything HTTP.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="footer-section">
            <div class="footer-content">
              <div class="footer-brand">
                <div class="footer-logo">
                  <div class="lightning-logo">
                    <q-icon name="bolt" class="lightning-icon" />
                  </div>
                  <span class="footer-brand-text">RunToken™ 2025 – Where signals become outcomes.</span>
                </div>
              </div>
              <div class="footer-links">
                <router-link to="/privacy" class="footer-link">Privacy</router-link>
                <router-link to="/terms" class="footer-link">Terms</router-link>
                <router-link to="/status" class="footer-link">Status</router-link>
              </div>
            </div>
          </footer>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import UniversalHeader from '../components/UniversalHeader.vue'

const heroRef = ref(null)
const signalsRef = ref(null)
const parallaxY = ref(0)
const neuralNodesKey = ref(0) // Force re-render of neural nodes on resize

const features = ref([
  {
    icon: '⚡',
    label: 'Speed',
    value: '90ms',
    desc: 'Global latency'
  },
  {
    icon: '🔒',
    label: 'Privacy',
    value: 'Zero',
    desc: 'Logs stored'
  },
  {
    icon: '🚀',
    label: 'Models',
    value: '100+',
    desc: 'AI providers'
  },
  {
    icon: '🌍',
    label: 'Coverage',
    value: 'Global',
    desc: 'Edge network'
  }
]);

// Flat Horizontal Carousel Layout - Inward Angled Tiles - RESPONSIVE
const getNeuralNodeStyle = (index) => {
  // Get viewport width to calculate responsive offsets
  const viewportWidth = window.innerWidth || 1400;
  
  // Base scale factor based on viewport width (1400px = 1.0, scales down for smaller screens)
  const baseScale = Math.min(1.0, viewportWidth / 1400);
  
  // Reduce rotation angles on smaller screens for better visibility
  const rotationScale = viewportWidth > 768 ? 1 : 0.6;
  
  // Full width carousel with inward-facing tiles - RESPONSIVE SPREAD
  const carouselLayout = [
    // T1 - Far left edge, facing inward (toward center) 
    { xOffsetVw: -35 * baseScale, scale: 1.0 * baseScale, rotateY: 85 * rotationScale, zIndex: 7 },
    // T2 - Left, facing inward
    { xOffsetVw: -25 * baseScale, scale: 0.8 * baseScale, rotateY: 65 * rotationScale, zIndex: 6 },
    // T3 - Left front, slightly facing inward
    { xOffsetVw: -12 * baseScale, scale: 0.7 * baseScale, rotateY: 40 * rotationScale, zIndex: 5 },
    // T4 - Center, facing straight
    { xOffsetVw: 0, scale: 0.6 * baseScale, rotateY: 0, zIndex: 1 },
    // T5 - Right front, slightly facing inward
    { xOffsetVw: 12 * baseScale, scale: 0.7 * baseScale, rotateY: -40 * rotationScale, zIndex: 5 },
    // T6 - Right, facing inward
    { xOffsetVw: 25 * baseScale, scale: 0.8 * baseScale, rotateY: -65 * rotationScale, zIndex: 6 },
    // T7 - Far right edge, facing inward (toward center)
    { xOffsetVw: 35 * baseScale, scale: 1.0 * baseScale, rotateY: -85 * rotationScale, zIndex: 7 }
  ];
  
  const tile = carouselLayout[index] || carouselLayout[3]; // Default to center if out of bounds
  
  return {
    left: '50%',
    top: '50%',
    transform: `translateX(calc(-50% + ${tile.xOffsetVw}vw)) translateY(-50%) rotateY(${tile.rotateY}deg) scale(${tile.scale})`,
    zIndex: tile.zIndex,
  };
};

const getNeuronCount = (nodeIndex) => {
  // Different nodes have different neuron densities - 7 nodes now
  const neuronCounts = [10, 14, 16, 18, 16, 14, 12]; // Center nodes (3,4) have most neurons
  return neuronCounts[nodeIndex] || 12;
};

const getNeuronPosition = (nodeIndex, neuronIndex) => {
  // Generate organic cluster positions for neurons within each node
  const clusterPatterns = [
    // Node 0 - Scattered pattern (far left)
    { baseX: 25, baseY: 25, spreadX: 50, spreadY: 50, pattern: 'scattered' },
    // Node 1 - Grid-like pattern
    { baseX: 20, baseY: 20, spreadX: 60, spreadY: 60, pattern: 'grid' },
    // Node 2 - Circular arrangement
    { baseX: 15, baseY: 15, spreadX: 70, spreadY: 70, pattern: 'circular' },
    // Node 3 - Organic cloud (center-left, dense)
    { baseX: 10, baseY: 10, spreadX: 80, spreadY: 80, pattern: 'organic' },
    // Node 4 - Organic cloud (center-right, dense)
    { baseX: 10, baseY: 10, spreadX: 80, spreadY: 80, pattern: 'organic' },
    // Node 5 - Circular arrangement
    { baseX: 15, baseY: 15, spreadX: 70, spreadY: 70, pattern: 'circular' },
    // Node 6 - Scattered pattern (far right)
    { baseX: 25, baseY: 25, spreadX: 50, spreadY: 50, pattern: 'scattered' }
  ];
  
  const pattern = clusterPatterns[nodeIndex] || clusterPatterns[0];
  let x, y;
  
  switch (pattern.pattern) {
    case 'grid':
      const cols = Math.ceil(Math.sqrt(getNeuronCount(nodeIndex)));
      const row = Math.floor(neuronIndex / cols);
      const col = neuronIndex % cols;
      x = pattern.baseX + (col * (pattern.spreadX / cols));
      y = pattern.baseY + (row * (pattern.spreadY / cols));
      break;
      
    case 'organic':
      // Use golden ratio and noise for organic placement
      const goldenAngle = 137.5 * (Math.PI / 180);
      const radius = Math.sqrt(neuronIndex) * 8;
      x = pattern.baseX + pattern.spreadX/2 + Math.cos(neuronIndex * goldenAngle) * radius;
      y = pattern.baseY + pattern.spreadY/2 + Math.sin(neuronIndex * goldenAngle) * radius;
      break;
      
    case 'circular':
      const circleAngle = (neuronIndex / getNeuronCount(nodeIndex)) * 2 * Math.PI;
      const circleRadius = 25 + (neuronIndex % 3) * 10; // Varying radius
      x = pattern.baseX + pattern.spreadX/2 + Math.cos(circleAngle) * circleRadius;
      y = pattern.baseY + pattern.spreadY/2 + Math.sin(circleAngle) * circleRadius;
      break;
      
    case 'scattered':
      // Pseudo-random but deterministic positioning
      const seed = nodeIndex * 1000 + neuronIndex;
      x = pattern.baseX + ((seed * 9301 + 49297) % 233280) / 233280 * pattern.spreadX;
      y = pattern.baseY + ((seed * 4096 + 150889) % 714025) / 714025 * pattern.spreadY;
      break;
      
    default:
      x = pattern.baseX + (neuronIndex * 10) % pattern.spreadX;
      y = pattern.baseY + Math.floor((neuronIndex * 10) / pattern.spreadX) * 10;
  }
  
  return {
    left: `${Math.max(5, Math.min(90, x))}%`,
    top: `${Math.max(5, Math.min(90, y))}%`,
    animationDelay: `${(nodeIndex * 500 + neuronIndex * 200)}ms`,
  };
};

const getConnectionPointStyle = (pointIndex) => {
  // Position connection points around the perimeter of each node
  const angles = [0, 60, 120, 180, 240, 300]; // 6 connection points
  const angle = angles[pointIndex] || 0;
  const angleRad = (angle * Math.PI) / 180;
  const radius = 45; // Distance from center
  
  const x = 50 + Math.cos(angleRad) * radius;
  const y = 50 + Math.sin(angleRad) * radius;
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${pointIndex * 300}ms`,
  };
};

const handleScroll = () => {
  const scrolled = window.pageYOffset
  parallaxY.value = scrolled
  
  // Animate elements on scroll
  const elements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-delay, .animate-on-scroll-delay-2')
  elements.forEach((el, index) => {
    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    if (rect.top < windowHeight * 0.8) {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 100)
    }
  })
}

const handleResize = () => {
  // Force re-render of neural nodes when screen size changes
  neuralNodesKey.value++
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  
  // Initial animation trigger
  setTimeout(() => {
    const initialElements = document.querySelectorAll('.animate-in, .animate-in-delay, .animate-in-delay-2')
    initialElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible')
      }, index * 300)
    })
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.landing-page {
  background: #0a0a0a;
  overflow-x: hidden;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
}

/* Hero Section - Full height from top */
.hero-parallax {
  position: relative;
  min-height: 100vh;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #2d1b69 60%, #0f0f23 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(247, 213, 46, 0.1) 0%, transparent 70%);
  animation: pulseGlow 4s ease-in-out infinite alternate;
}

@keyframes pulseGlow {
  0% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: rgba(247, 213, 46, 0.15);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

.shape-1:nth-child(1) { width: 4px; height: 4px; top: 15%; left: 20%; animation-delay: 0s; }
.shape-1:nth-child(2) { width: 3px; height: 3px; top: 25%; left: 80%; animation-delay: 1s; }
.shape-1:nth-child(3) { width: 5px; height: 5px; top: 60%; left: 15%; animation-delay: 2s; }
.shape-1:nth-child(4) { width: 2px; height: 2px; top: 70%; left: 85%; animation-delay: 3s; }
.shape-1:nth-child(5) { width: 4px; height: 4px; top: 40%; left: 60%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
  50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 0 2rem;
}

.hero-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-headline {
  font-family: 'Georgia', 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  color: #F0F0F0;
  font-style: italic;
}

.headline-normal {
  display: inline;
  color: #F0F0F0;
}

.headline-emphasis {
  color: #FF4A1C;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(255, 74, 28, 0.3);
  animation: sparkle 3s ease-in-out infinite;
}

.headline-emphasis-gradient {
  background: linear-gradient(45deg, #FF4A1C, #FA3C3C, #FF6B35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 900;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 74, 28, 0.3); }
  50% { text-shadow: 0 0 30px rgba(255, 74, 28, 0.6), 0 0 40px rgba(255, 74, 28, 0.2); }
}

@keyframes gradientShift {
  0%, 100% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(10deg) brightness(1.2); }
}

.hero-subheadline {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  font-size: clamp(1.2rem, 2.8vw, 1.5rem);
  color: #B8B8B8;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 1rem;
  letter-spacing: 0.2px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.discover-icon {
  color: #FF4A1C !important;
  font-size: 1.2em !important;
  margin-right: 6px !important;
  vertical-align: middle !important;
  filter: drop-shadow(0 0 8px rgba(255, 74, 28, 0.4));
}

.rocket-icon {
  color: #FF4A1C !important;
  font-size: 1.2em !important;
  margin-right: 6px !important;
  vertical-align: middle !important;
  filter: drop-shadow(0 0 8px rgba(255, 74, 28, 0.4));
}

.hero-subheadline strong {
  color: #F0F0F0;
  font-weight: 700;
}

.emphasis-text {
  color: #FF4A1C;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 74, 28, 0.2);
}

.cta-container {
  margin: 2rem 0;
}

.fire-cta-btn {
  background: linear-gradient(135deg, #FF4A1C 0%, #FA3C3C 100%) !important;
  color: white !important;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 18px 40px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 25px rgba(255, 74, 28, 0.3);
  position: relative;
  overflow: hidden;
}

.fire-cta-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.fire-cta-btn:hover:before {
  left: 100%;
}

.fire-cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 74, 28, 0.4);
  filter: brightness(1.1);
}

.cta-text {
  font-size: 1.1rem;
}

.cta-arrow {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.fire-cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}

.cta-note {
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.8rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  letter-spacing: 0.5px;
}

/* Neural Network LLM Carousel - Full Width Override */
.neural-llm-carousel {
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  width: 100vw !important;
  max-width: none !important;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
  overflow: hidden;
}

.neural-perspective-container {
  position: relative;
  width: 100vw !important;
  max-width: none !important;
  height: 40vh;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0 !important;
  right: 0 !important;
}

/* Responsive neural container height */
@media (max-width: 768px) {
  .neural-llm-carousel {
    min-height: 35vh;
  }
  
  .neural-perspective-container {
    height: 30vh;
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .neural-llm-carousel {
    min-height: 30vh;
  }
  
  .neural-perspective-container {
    height: 25vh;
    min-height: 200px;
  }
}

/* Connection Lines between tiles */
.synaptic-network {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

.synapse-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.synapse-line {
  stroke-width: 3px;
  stroke-linecap: round;
  fill: none;
  opacity: 0.4;
  animation: connectionFlow 8s ease-in-out infinite;
}

/* Connection lines flow from outer tiles toward center */
.synapse-1 { animation-delay: 0s; } /* Left to center */
.synapse-2 { animation-delay: 1s; }
.synapse-3 { animation-delay: 2s; }
.synapse-4 { animation-delay: 3s; } /* Center connections */
.synapse-5 { animation-delay: 4s; }
.synapse-6 { animation-delay: 5s; }
.synapse-7 { animation-delay: 6s; } /* Right to center */

@keyframes connectionFlow {
  0%, 80%, 100% { 
    opacity: 0.2;
    stroke-width: 2px;
  }
  10%, 30% { 
    opacity: 1;
    stroke-width: 4px;
  }
}

/* LLM Neural Nodes - FULL WIDTH FORCE */
.neural-nodes-container {
  position: absolute;
  top: 50%;
  left: 0 !important;
  right: 0 !important;
  transform: translateY(-50%);
  width: 100vw !important;
  max-width: none !important;
  height: 80vh;
  z-index: 10;
  perspective: 1500px;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 !important;
  padding: 0 !important;
}

.llm-neural-node {
  position: absolute;
  width: 200px;
  height: 280px; /* Taller tiles for better visibility */
  transition: all 0.3s ease;
  cursor: pointer;
  transform-origin: center center;
  transform-style: preserve-3d; /* Enable 3D transforms on tiles */
}

/* Removed hover scaling to prevent synaptic network movement */

/* Node Core Container - Flat design */
.node-core {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(15, 15, 35, 0.95) 0%, 
    rgba(26, 26, 46, 0.98) 50%,
    rgba(45, 27, 105, 0.95) 100%);
  border-radius: 20px;
  border: 3px solid rgba(247, 213, 46, 0.3);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 8px 30px rgba(0, 0, 0, 0.3),
    inset 0 2px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.5s ease;
}

/* LLM Thinking Animation - Flow toward center */
.llm-neural-node {
  animation: llmThinkingFlow 14s ease-in-out infinite;
}

/* Outer tiles light up first, then flow toward center */
.node-1 { animation-delay: 0s; }    /* Far left starts */
.node-7 { animation-delay: 0.5s; }  /* Far right starts */
.node-2 { animation-delay: 2s; }    /* Move inward */
.node-6 { animation-delay: 2.5s; }  /* Move inward */
.node-3 { animation-delay: 4s; }    /* Closer to center */
.node-5 { animation-delay: 4.5s; }  /* Closer to center */
.node-4 { animation-delay: 6s; }    /* Center tile last - the culmination */

@keyframes llmThinkingFlow {
  0%, 85%, 100% { 
    opacity: 0.5;
  }
  10%, 25% { 
    opacity: 1;
  }
}

/* When a tile is "thinking", it glows bright */
.llm-neural-node.thinking .node-core {
  border-color: rgba(247, 213, 46, 1) !important;
  box-shadow: 
    0 25px 80px rgba(247, 213, 46, 0.4),
    0 10px 40px rgba(255, 74, 28, 0.3),
    inset 0 3px 0 rgba(255, 255, 255, 0.3) !important;
}

/* Internal Neuron Cluster */
.neuron-cluster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.internal-neuron {
  position: absolute;
  width: 10px; /* Larger neurons for visibility */
  height: 10px;
  border-radius: 50%;
  transform-origin: center;
  transition: all 0.3s ease;
}

.neuron-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #F7D52E 0%, #FF4A1C 100%);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(247, 213, 46, 0.6);
  animation: gentleNeuronPulse 8s ease-in-out infinite;
}

.neuron-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(247, 213, 46, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.4;
}

/* Gentle neuron pulse */
@keyframes gentleNeuronPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.3);
    opacity: 1;
  }
}

/* Different clusters pulse at different times flowing toward center */
.cluster-1 .neuron-core { animation-delay: 0s; }    /* Far left */
.cluster-7 .neuron-core { animation-delay: 0.5s; }  /* Far right */
.cluster-2 .neuron-core { animation-delay: 1s; }    
.cluster-6 .neuron-core { animation-delay: 1.5s; }  
.cluster-3 .neuron-core { animation-delay: 2s; }    
.cluster-5 .neuron-core { animation-delay: 2.5s; }  
.cluster-4 .neuron-core { animation-delay: 3s; }    /* Center */

/* Connection Points on tile edges */
.connection-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
}

.connection-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #F7D52E 0%, #FF4A1C 100%);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(247, 213, 46, 0.8);
  animation: connectionPulseFlow 10s ease-in-out infinite;
  transform: translate(-50%, -50%);
  opacity: 0.7;
}

@keyframes connectionPulseFlow {
  0%, 90%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  10% { 
    transform: translate(-50%, -50%) scale(2);
    opacity: 1;
  }
}

/* Energy field around each tile */
.node-energy-field {
  position: absolute;
  top: -15px;
  left: -15px;
  width: calc(100% + 30px);
  height: calc(100% + 30px);
  border-radius: 35px;
  background: radial-gradient(ellipse at center, 
    rgba(247, 213, 46, 0.1) 0%, 
    transparent 100%);
  pointer-events: none;
  opacity: 0.6;
}

/* Activation ring */
.activation-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border-radius: 25px;
  border: 2px solid rgba(247, 213, 46, 0.4);
  pointer-events: none;
  opacity: 0.5;
}

/* Center tile (node 4) is the focal point */
.node-4 .node-core {
  border-color: rgba(247, 213, 46, 0.6);
  border-width: 4px;
  box-shadow: 
    0 25px 70px rgba(247, 213, 46, 0.2),
    0 10px 35px rgba(0, 0, 0, 0.4),
    inset 0 3px 0 rgba(255, 255, 255, 0.15);
}

.node-4 .internal-neuron {
  width: 12px;
  height: 12px;
}

/* Responsive Design for Full Screen Flat Layout */
@media (max-width: 1400px) {
  .llm-neural-node {
    width: 180px;
    height: 260px;
  }
}

@media (max-width: 1200px) {
  .llm-neural-node {
    width: 160px;
    height: 240px;
  }
  
  .internal-neuron {
    width: 8px;
    height: 8px;
  }
  
  .connection-point {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 900px) {
  .llm-neural-node {
    width: 140px;
    height: 200px;
  }
  
  .internal-neuron {
    width: 7px;
    height: 7px;
  }
  
  .connection-point {
    width: 9px;
    height: 9px;
  }
}

@media (max-width: 768px) {
  .llm-neural-node {
    width: 120px;
    height: 180px;
  }
  
  .internal-neuron {
    width: 6px;
    height: 6px;
  }
  
  .connection-point {
    width: 8px;
    height: 8px;
  }
  
  /* Hide extreme outer nodes on mobile for better layout */
  .node-1, .node-7 {
    display: none;
  }
}

@media (max-width: 480px) {
  .llm-neural-node {
    width: 100px;
    height: 160px;
  }
  
  .internal-neuron {
    width: 5px;
    height: 5px;
  }
  
  .connection-point {
    width: 6px;
    height: 6px;
  }
  
  /* Show only center 3 nodes on very small screens */
  .node-2, .node-6 {
    display: none;
  }
}

/* Signals Section */
.signals-section {
  padding: 100px 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.signals-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  max-width: 1400px;
  width: 100%;
}

.signals-text {
  flex: 1;
  max-width: 500px;
  text-align: left;
}

.signals-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #F0F0F0;
  line-height: 1.2;
  margin-bottom: 3rem;
}

.launch-signal-btn {
  background: #F7D52E !important;
  color: #0a0a0a !important;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 16px 40px;
  letter-spacing: 1px;
  border: none;
  transition: all 0.3s ease;
}

.launch-signal-btn:hover {
  background: #f1c40f !important;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(247, 213, 46, 0.3);
}

/* Animated Rockets in Signals Section */
.signals-rockets {
  position: relative;
  width: 400px;
  height: 400px;
}

.signal-rocket {
  position: absolute;
  animation: signalRocketMove 6s ease-in-out infinite;
}

.rocket-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.rocket-2 {
  top: 60%;
  left: 60%;
  animation-delay: 2s;
  transform: scale(0.8);
}

.rocket-3 {
  top: 10%;
  right: 10%;
  animation-delay: 4s;
  transform: scale(0.6);
}

.rocket-body-large {
  width: 40px;
  height: 80px;
  background: linear-gradient(180deg, #95a5a6 0%, #7f8c8d 100%);
  border-radius: 20px 20px 8px 8px;
  position: relative;
}

.rocket-nose-large {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 30px solid #2ecc71;
  position: absolute;
  top: -30px;
  left: 0;
}

.rocket-fins-large {
  position: absolute;
  bottom: -15px;
  left: -10px;
  width: 60px;
  height: 20px;
  background: #34495e;
  border-radius: 0 0 15px 15px;
}

.rocket-trail {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, #f39c12 50%, #e67e22 100%);
  border-radius: 2px;
  opacity: 0.8;
  animation: trailPulse 1s ease-in-out infinite alternate;
}

@keyframes signalRocketMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(30px, -40px) rotate(10deg); }
  50% { transform: translate(-20px, -80px) rotate(-5deg); }
  75% { transform: translate(40px, -30px) rotate(15deg); }
}

@keyframes trailPulse {
  0% { opacity: 0.5; transform: translateX(-50%) scaleY(1); }
  100% { opacity: 1; transform: translateX(-50%) scaleY(1.2); }
}

/* Features Section */
.features-section {
  padding: 80px 2rem;
  background: #0a0a0a;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.features-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: 1fr;
  gap: 2rem;
  justify-items: center;
  align-items: stretch;
}

.feature-card {
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  border: 2px solid transparent;
  height: 280px;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.feature-card.open-source {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
}

.feature-card.fast {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
}

.feature-card.private {
  background: linear-gradient(135deg, #e91e63 0%, #ad1457 100%);
  color: white;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border-color: #F7D52E;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #F7D52E;
}

.feature-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F7D52E;
}

.feature-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;
}

/* Stats Section */
.stats-section {
  padding: 80px 2rem;
  background: #111111;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.stats-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-tile {
  background: #1a1a1a;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #333;
  transition: all 0.3s ease;
}

.stat-tile:hover {
  transform: translateY(-5px);
  border-color: #F7D52E;
}

.stat-value {
  font-size: 3rem;
  font-weight: 900;
  color: #F7D52E;
  margin-bottom: 0.5rem;
}

.stat-metric {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.stat-blurb {
  font-size: 0.9rem;
  color: #aaaaaa;
}

/* Testimonials */
.testimonials-section {
  padding: 80px 2rem;
  background: #0a0a0a;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.testimonials-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.testimonial {
  background: #1a1a1a;
  padding: 3rem;
  border-radius: 20px;
  border-left: 4px solid #F7D52E;
}

.testimonial-text {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-style: italic;
  line-height: 1.5;
}

.testimonial-author {
  color: #aaaaaa;
  font-weight: 600;
}

/* Pricing */
.pricing-section {
  padding: 80px 5% 100px;
  background: #111111;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.pricing-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.pricing-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 3rem;
}

.pricing-tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.pricing-tier {
  background: #1a1a1a;
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 1px solid #333;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-tier.pro {
  border-color: #F7D52E;
  transform: scale(1.05);
}

.pricing-tier.pro::before {
  content: 'POPULAR';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #F7D52E;
  color: #0a0a0a;
  padding: 5px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.tier-header {
  margin-bottom: 2rem;
}

.tier-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.tier-price {
  font-size: 2.5rem;
  font-weight: 900;
  color: #F7D52E;
}

.tier-period {
  font-size: 1rem;
  color: #aaaaaa;
}

.tier-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.tier-features li {
  color: #aaaaaa;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.tier-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #F7D52E;
  font-weight: bold;
}

.tier-btn {
  width: 100%;
  padding: 12px 24px;
  border-radius: 10px;
}

/* FAQ */
.faq-section {
  padding: 80px 5% 100px;
  background: #0a0a0a;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.faq-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.faq-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  margin-bottom: 3rem;
}

.faq-items {
  display: grid;
  gap: 2rem;
}

.faq-item {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid #333;
}

.faq-question {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.faq-answer {
  color: #aaaaaa;
  line-height: 1.6;
}

.faq-link {
  color: #F7D52E;
  text-decoration: none;
}

.faq-link:hover {
  text-decoration: underline;
}

/* Footer */
.footer-section {
  padding: 60px 5% 40px;
  background: #111111;
  border-top: 1px solid #333;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-brand-text {
  color: #aaaaaa;
  font-weight: 600;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: #aaaaaa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #F7D52E;
}

/* Animations */
.animate-in, .animate-in-delay, .animate-in-delay-2,
.animate-on-scroll, .animate-on-scroll-delay, .animate-on-scroll-delay-2 {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.animate-in.visible, .animate-in-delay.visible, .animate-in-delay-2.visible,
.animate-on-scroll.visible, .animate-on-scroll-delay.visible, .animate-on-scroll-delay-2.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    padding: 120px 5% 0;
    justify-content: center;
    width: 100%;
  }
  
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    max-width: 90%;
  }
  
  .signals-content {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  
  .signals-text {
    text-align: center;
  }
  
  .signals-rockets {
    margin-top: 0;
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .floating-header .q-toolbar {
    padding: 0 1rem;
  }
  
  .nav-btn {
    display: none;
  }
  
  .hero-content {
    padding: 100px 2rem 0;
    width: 100%;
  }
  
  .hero-container {
    max-width: 95%;
    gap: 2rem;
  }
  
  .feature-tiles-3d {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    max-width: 300px;
  }
  
  .tile-3d {
    width: 120px;
    height: 120px;
  }
  
  .tile-icon {
    font-size: 2rem;
  }
  
  .tile-value {
    font-size: 1.5rem;
  }
  
  .signals-content {
    gap: 2rem;
  }
  
  .features-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .abstract-mouth {
    display: none;
  }
  
  .rocket-2 {
    display: none;
  }
  
  .stats-container,
  .testimonials-container,
  .pricing-tiers {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pricing-tier.pro {
    transform: none;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-headline {
    font-size: 2.2rem;
  }
  
  .signals-title {
    font-size: 1.8rem;
  }
  
  .pricing-title,
  .faq-title {
    font-size: 2rem;
  }
  
  .hero-content {
    padding: 100px 1rem 0;
  }
  
  .hero-container {
    max-width: 98%;
    gap: 1.5rem;
  }
}

/* Abstract Mouth */
.abstract-mouth {
  position: absolute;
  top: 30%;
  right: 10%;
  width: 200px;
  height: 120px;
  transform: rotate(-15deg);
}

.mouth-part {
  position: absolute;
  background: linear-gradient(45deg, #16a085, #f39c12);
  border-radius: 50px;
}

.mouth-top {
  width: 180px;
  height: 40px;
  top: 0;
  animation: mouthMove 4s ease-in-out infinite;
}

.mouth-bottom {
  width: 180px;
  height: 40px;
  bottom: 0;
  background: linear-gradient(45deg, #e74c3c, #f39c12);
  animation: mouthMove 4s ease-in-out infinite reverse;
}

.teeth {
  position: absolute;
  top: 25px;
  left: 20px;
  display: flex;
  gap: 8px;
}

.tooth {
  width: 8px;
  height: 20px;
  background: white;
  border-radius: 0 0 4px 4px;
  animation: teethGlint 3s ease-in-out infinite;
}

@keyframes mouthMove {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes teethGlint {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; box-shadow: 0 0 10px rgba(255,255,255,0.5); }
}

/* Rockets */
.rockets-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.rocket {
  position: absolute;
  animation: rocketFloat 8s ease-in-out infinite;
}

.rocket-1 {
  top: 40%;
  left: 70%;
  animation-delay: 0s;
}

.rocket-2 {
  top: 20%;
  left: 15%;
  animation-delay: 2s;
  transform: scale(0.7);
}

.rocket-body {
  width: 30px;
  height: 60px;
  background: linear-gradient(180deg, #e74c3c 0%, #c0392b 100%);
  border-radius: 15px 15px 5px 5px;
  position: relative;
}

.rocket-nose {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid #2ecc71;
  position: absolute;
  top: -25px;
  left: 0;
}

.rocket-fins {
  position: absolute;
  bottom: -10px;
  left: -8px;
  width: 46px;
  height: 15px;
  background: #34495e;
  border-radius: 0 0 10px 10px;
}

.rocket-fire {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 30px;
  background: linear-gradient(180deg, #f39c12 0%, #e67e22 50%, #d35400 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: fireFlicker 0.3s ease-in-out infinite alternate;
}

@keyframes rocketFloat {
  0%, 100% { transform: translate(0, 0) rotate(5deg); }
  25% { transform: translate(20px, -30px) rotate(-5deg); }
  50% { transform: translate(-10px, -50px) rotate(5deg); }
  75% { transform: translate(30px, -20px) rotate(-5deg); }
}

@keyframes fireFlicker {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(1.1) rotate(2deg); }
}
</style> 