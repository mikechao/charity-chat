<script setup lang="ts">
import type { CharityDetails } from '~/types/charity-details-results'

interface Props {
  charityDetails: CharityDetails | null
  isOpen: boolean
  loading?: boolean
}

const _props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

function formatCurrency(amount: string): string {
  if (!amount || amount === '0')
    return 'N/A'
  const num = Number.parseFloat(amount)
  if (Number.isNaN(num))
    return amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr)
    return 'N/A'
  return dateStr
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        @click="emit('close')"
      />

      <!-- Modal Content -->
      <div class="relative w-full max-w-6xl max-h-[90vh] m-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Charity Details
          </h3>
          <button
            class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="emit('close')"
          >
            <UIcon name="i-heroicons-x-mark-20-solid" class="w-5 h-5" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="text-center">
              <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary-500 mx-auto mb-4" />
              <p class="text-gray-600 dark:text-gray-400">
                Loading charity details...
              </p>
            </div>
          </div>

          <!-- Charity Details -->
          <div v-else-if="charityDetails" class="space-y-6">
            <!-- Basic Information -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Basic Information
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Organization Name:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.name }}
                  </p>
                </div>
                <div v-if="charityDetails.sortName">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Sort Name:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.sortName }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">EIN:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.ein }}
                  </p>
                </div>
                <div v-if="charityDetails.inCareOfName">
                  <span class="font-medium text-gray-600 dark:text-gray-400">In Care Of:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.inCareOfName }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Address Information -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Address
              </h4>
              <div class="text-sm">
                <p class="text-gray-900 dark:text-white">
                  {{ charityDetails.street }}
                </p>
                <p class="text-gray-900 dark:text-white">
                  {{ charityDetails.city }}, {{ charityDetails.state }} {{ charityDetails.zipCode }}
                </p>
                <p v-if="charityDetails.country" class="text-gray-900 dark:text-white">
                  {{ charityDetails.country }}
                </p>
              </div>
            </div>

            <!-- Organization Details -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Organization Details
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Classification:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.classification }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Subsection:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.subsection }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Foundation Type:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.foundation }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Organization Type:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.organization }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Exempt Status:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.exemptStatus }}
                  </p>
                </div>
                <div v-if="charityDetails.affiliation">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Affiliation:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.affiliation }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Activities -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Activities
              </h4>
              <div class="space-y-2 text-sm">
                <div v-if="charityDetails.activity1">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Primary Activity:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.activity1 }}
                  </p>
                </div>
                <div v-if="charityDetails.activity2">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Secondary Activity:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.activity2 }}
                  </p>
                </div>
                <div v-if="charityDetails.activity3">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Tertiary Activity:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.activity3 }}
                  </p>
                </div>
              </div>
            </div>

            <!-- NTEE Classification -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                NTEE Classification
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">NTEE Code:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.nteeCd }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">NTEE Class:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.nteeClass }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">NTEE Type:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.nteeType }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Financial Information -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Financial Information
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Asset Amount:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatCurrency(charityDetails.assetAmount) }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Income Amount:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatCurrency(charityDetails.incomeAmount) }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Form 990 Revenue:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatCurrency(charityDetails.form990) }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Asset Code:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.assetCodeDesc }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Income Code:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.incomeCodeDesc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Donation & Deductibility -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Donation Information
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Accepts Donations:</span>
                  <div class="mt-1">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400': charityDetails.acceptingDonations === '1',
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400': charityDetails.acceptingDonations === '0',
                      }"
                    >
                      {{ charityDetails.acceptingDonations === '1' ? 'Yes' : 'No' }}
                    </span>
                  </div>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Deductibility:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.deductibility }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Deductibility Status:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.deductibilityStatus }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Filing & Administrative -->
            <div>
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Filing & Administrative
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Filing Requirement:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.filingRequirementCodeDesc }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">PF Filing Requirement:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.pfFilingRequirementCodeDesc }}
                  </p>
                </div>
                <div v-if="charityDetails.rullingDate">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Ruling Date:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ formatDate(charityDetails.rullingDate) }}
                  </p>
                </div>
                <div v-if="charityDetails.taxPeriod">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Tax Period:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.taxPeriod }}
                  </p>
                </div>
                <div v-if="charityDetails.accountingPeriod">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Accounting Period:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.accountingPeriod }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">Group Exemption:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.groupExemption }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Revocation Information (if applicable) -->
            <div v-if="charityDetails.revocationDt || charityDetails.revPostingDt || charityDetails.irsRevocationStatus === 4">
              <h4 class="text-sm font-medium text-red-600 dark:text-red-400 mb-3">
                Revocation Information
              </h4>
              <div class="grid grid-cols-1 gap-3 text-sm">
                <div v-if="charityDetails.revocationDt">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Revocation Date:</span>
                  <p class="mt-1 text-red-600 dark:text-red-400">
                    {{ charityDetails.revocationDt }}
                  </p>
                </div>
                <div v-if="charityDetails.revPostingDt">
                  <span class="font-medium text-gray-600 dark:text-gray-400">Revocation Posting Date:</span>
                  <p class="mt-1 text-red-600 dark:text-red-400">
                    {{ charityDetails.revPostingDt }}
                  </p>
                </div>
                <div>
                  <span class="font-medium text-gray-600 dark:text-gray-400">IRS Status:</span>
                  <p class="mt-1 text-gray-900 dark:text-white">
                    {{ charityDetails.irsRevocationStatus === 4 ? 'On IRS revocation file' : 'On Pub78 file' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            @click="emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
