<script setup>
import { useNotificationBar } from "@/composables/useNotificationBar.js"
import { useDataTransferStore } from "@/stores/useDataTransferStore.js"

const { trigger } = useNotificationBar()
const dataTransferStore = useDataTransferStore()

const filenameFromDate = () => {
  const dateString = new Date().toLocaleDateString("sv-SE")
  return `entries-${dateString}.json`
}

const exportData = () => {
  const file = dataTransferStore.exportToFile()
  const url = URL.createObjectURL(file)
  const a = document.createElement("a")
  a.href = url
  a.download = filenameFromDate()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  trigger("データをエクスポートしました", "success")
}
</script>

<template>
  <form @submit.prevent="exportData">
    <button type="submit" class="primary-button">記録をエクスポートする</button>
  </form>
</template>
