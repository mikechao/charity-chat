<script setup lang="ts">
// Component data
const features = [
  {
    icon: 'i-heroicons-cpu-chip',
    color: 'blue',
    title: 'AI-Powered Search',
    description: 'Chat with our AI to find charities that match your values and interests',
  },
  {
    icon: 'i-heroicons-cursor-arrow-rays',
    color: 'purple',
    title: 'Personalized Recommendations',
    description: 'Get charity suggestions tailored to your preferences and giving goals',
  },
  {
    icon: 'i-heroicons-globe-alt',
    color: 'emerald',
    title: 'Verified Charities',
    description: 'Access data from CharityAPI.com with trusted, verified charitable organizations',
  },
]

const steps = [
  {
    icon: 'i-heroicons-puzzle-piece-20-solid',
    title: 'Install the Chrome Extension',
    description: 'Add the MCP B-Extension to your Chrome browser to enable charity chat functionality',
    action: {
      label: 'Get Chrome Extension',
      url: 'https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa',
    },
  },
  {
    icon: 'i-heroicons-chat-bubble-left-right',
    title: 'Start a Conversation',
    description: 'Use the extension to chat about your charitable interests, causes you care about, or specific needs you\'d like to address',
  },
  {
    icon: 'i-heroicons-gift',
    title: 'Discover & Donate',
    description: 'Get personalized charity recommendations and learn how you can make a meaningful impact',
  },
]

const trustFeatures = [
  'Verified charity information',
  'Financial transparency',
  'Impact metrics',
  'Real-time data',
]

// Methods
function scrollToFeatures() {
  const element = document.getElementById('features')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
    <!-- Hero Section -->
    <div class="text-center mb-16 py-12">
      <div class="max-w-7xl mx-auto">
        <UBadge
          variant="soft"
          color="primary"
          size="lg"
          class="mb-6 animate-pulse"
          label="✨ AI-Powered Charity Discovery"
        />

        <h1 class="text-5xl lg:text-7xl font-black mb-6 leading-tight">
          <span class="gradient-text animate-gradient-x">Charity Chat</span>
        </h1>

        <p class="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover meaningful charities to support through AI-powered conversations
        </p>

        <div class="flex justify-center gap-4 mb-12">
          <UButton
            to="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
            external
            size="xl"
            color="primary"
            variant="solid"
            class="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <template #leading>
              <UIcon name="i-heroicons-rocket-launch" />
            </template>
            Get Started Free
          </UButton>

          <UButton
            size="xl"
            color="secondary"
            variant="ghost"
            class="shadow-lg hover:shadow-xl transition-all duration-300"
            @click="scrollToFeatures"
          >
            <template #leading>
              <UIcon name="i-heroicons-play-circle" />
            </template>
            Learn More
          </UButton>
        </div>

        <!-- Feature Cards Grid -->
        <div id="features" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-16 max-w-none">
          <UCard
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card-enhanced hover:scale-105 transition-all duration-300"
            :ui="{
              body: 'p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl',
            }"
          >
            <template #header>
              <div class="flex justify-center">
                <UAvatar
                  :icon="feature.icon"
                  size="2xl"
                  :color="feature.color"
                  class="mb-4"
                />
              </div>
            </template>

            <h3 class="text-xl font-bold mb-3 text-gray-900">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Getting Started Section -->
    <div class="mb-16">
      <div class="text-center mb-12">
        <UBadge
          variant="soft"
          color="primary"
          size="lg"
          class="mb-4"
          label="🚀 Quick Setup"
        />
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          Getting Started
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get up and running in just 3 simple steps
        </p>
      </div>

      <div class="space-y-8 max-w-6xl mx-auto">
        <UCard
          v-for="(step, index) in steps"
          :key="index"
          class="step-card-enhanced transition-all duration-300 hover:shadow-xl"
          :ui="{
            body: 'p-8',
          }"
        >
          <div class="flex items-start gap-6">
            <UBadge
              :label="(index + 1).toString()"
              size="xl"
              color="primary"
              variant="solid"
              class="flex-shrink-0 w-12 h-12 flex items-center justify-center text-lg font-bold"
            />

            <div class="flex-1">
              <h3 class="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                <UIcon :name="step.icon" class="text-blue-500" />
                {{ step.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed mb-4">
                {{ step.description }}
              </p>

              <UButton
                v-if="step.action"
                :to="step.action.url"
                external
                variant="outline"
                color="primary"
                class="transition-all duration-200"
              >
                <template #leading>
                  <UIcon name="i-heroicons-arrow-top-right-on-square" />
                </template>
                {{ step.action.label }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- CharityAPI Section -->
    <UCard class="mb-16 overflow-hidden">
      <div class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-12 text-center">
        <div class="max-w-6xl mx-auto">
          <UIcon name="i-heroicons-shield-check" class="mx-auto mb-4 text-6xl" />
          <h2 class="text-3xl font-bold mb-4">
            Powered by CharityAPI
          </h2>
          <p class="text-emerald-100 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
            Our recommendations are powered by comprehensive charity data from CharityAPI.com, ensuring you have access to verified, up-to-date information about charitable organizations.
          </p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div v-for="feature in trustFeatures" :key="feature" class="flex items-center justify-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="text-emerald-200 text-lg" />
              <span class="text-emerald-50 font-medium">{{ feature }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Call to Action Section -->
    <UCard class="text-center overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12">
        <div class="max-w-6xl mx-auto">
          <UIcon name="i-heroicons-heart" class="mx-auto mb-6 text-6xl animate-pulse" />
          <h2 class="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p class="mb-8 text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">
            Install the Chrome extension and start your charitable giving journey today.
          </p>

          <div class="flex justify-center gap-4 flex-wrap">
            <UButton
              to="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa"
              external
              size="xl"
              color="primary"
              variant="solid"
              class="shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <template #leading>
                <UIcon name="i-heroicons-rocket-launch" />
              </template>
              Get Started Now
            </UButton>

            <UButton
              size="xl"
              color="neutral"
              variant="outline"
              class="hover:bg-white hover:text-purple-700 transition-all duration-300"
            >
              <template #leading>
                <UIcon name="i-heroicons-question-mark-circle" />
              </template>
              Learn More
            </UButton>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
