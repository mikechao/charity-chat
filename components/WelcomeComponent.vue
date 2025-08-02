<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <div class="text-center mb-16 py-12">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span class="gradient-text">Charity Chat</span>
        </h1>
        <p class="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover meaningful charities to support through AI-powered conversations
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="feature-card">
            <div class="text-5xl mb-4">🤖</div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">AI-Powered Search</h3>
            <p class="text-gray-600 leading-relaxed">Chat with our AI to find charities that match your values and interests</p>
          </div>
          
          <div class="feature-card">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Personalized Recommendations</h3>
            <p class="text-gray-600 leading-relaxed">Get charity suggestions tailored to your preferences and giving goals</p>
          </div>
          
          <div class="feature-card">
            <div class="text-5xl mb-4">🌍</div>
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Verified Charities</h3>
            <p class="text-gray-600 leading-relaxed">Access data from CharityAPI.com with trusted, verified charitable organizations</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Getting Started Section -->
    <div class="mb-16">
      <h2 class="text-4xl font-bold text-center mb-12 text-gray-900">Getting Started</h2>
      <div class="space-y-8 max-w-4xl mx-auto">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Install the Chrome Extension</h3>
            <p class="text-gray-600 leading-relaxed mb-4">Add the MCP B-Extension to your Chrome browser to enable charity chat functionality</p>
            <a 
              href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              <span>Get Chrome Extension</span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21V9M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div class="step-card">
          <div class="step-number">2</div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Start a Conversation</h3>
            <p class="text-gray-600 leading-relaxed">Use the extension to chat about your charitable interests, causes you care about, or specific needs you'd like to address</p>
          </div>
        </div>
        
        <div class="step-card">
          <div class="step-number">3</div>
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-3 text-gray-900">Discover & Donate</h3>
            <p class="text-gray-600 leading-relaxed">Get personalized charity recommendations and learn how you can make a meaningful impact</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CharityAPI Section -->
    <div class="text-center mb-16 py-12 bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4 text-gray-900">Powered by CharityAPI</h2>
        <p class="text-gray-600 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
          Our recommendations are powered by comprehensive charity data from CharityAPI.com, ensuring you have access to verified, up-to-date information about charitable organizations.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div class="flex items-center justify-center gap-2">
            <span class="text-green-500 font-semibold text-lg">✓</span>
            <span class="text-gray-700 font-medium">Verified charity information</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-green-500 font-semibold text-lg">✓</span>
            <span class="text-gray-700 font-medium">Financial transparency</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-green-500 font-semibold text-lg">✓</span>
            <span class="text-gray-700 font-medium">Impact metrics</span>
          </div>
          <div class="flex items-center justify-center gap-2">
            <span class="text-green-500 font-semibold text-lg">✓</span>
            <span class="text-gray-700 font-medium">Real-time data</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p class="mb-8 text-lg opacity-90 leading-relaxed">
          Install the Chrome extension and start your charitable giving journey today.
        </p>
        <a 
          href="https://chromewebstore.google.com/detail/mcp-bextension/daohopfhkdelnpemnhlekblhnikhdhfa" 
          target="_blank" 
          rel="noopener noreferrer"
          class="cta-button"
        >
          Get Started Now
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
