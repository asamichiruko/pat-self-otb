<script setup>
import { useTemplateRef } from "vue"
import { useNotification } from "@/composables/useNotification.js"

const props = defineProps({
  recordModel: Object,
})

const { trigger } = useNotification()
const fileInput = useTemplateRef("openfile")

const exportRecords = () => {
  const json = props.recordModel.exportAsJson()
  const blob = new Blob([JSON.stringify(json)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const dateString = new Date().toLocaleDateString("sv-SE")
  const a = document.createElement("a")
  a.href = url
  a.download = `records-${dateString}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  trigger("データをエクスポートしました", "success")
}

const importRecords = async (e) => {
  const file = e.target.files[0]
  if (!file) {
    return
  } else if (file.type !== "application/json") {
    trigger(".json 形式のファイルを選択してください", "error")
    return
  }
  try {
    const jsonString = await file.text()
    const json = JSON.parse(jsonString)
    props.recordModel.importFromJson(json)

    trigger("データを復元しました", "success")
  } catch {
    trigger(
      `データの復元に失敗しました。選択したデータの内容を確認し、時間をおいて再度お試しください`,
      "error",
    )
  }
}

const selectFile = () => {
  fileInput.value?.click()
}
</script>

<template>
  <div class="settings-form">
    <section>
      <p>
        記録を JSON
        ファイルとしてエクスポートします。エクスポートファイルは記録の復元に利用できます。
      </p>
      <p>
        <button class="primary-button" data-testid="export-button" @click="exportRecords">
          データをエクスポートする
        </button>
      </p>
    </section>

    <section>
      <p>
        保存した JSON
        ファイルをアップロードして記録を復元します。差分の記録だけを追加し、既存の記録は削除しません。
      </p>
      <button class="primary-button" data-testid="import-button" @click="selectFile">
        ファイルをアップロードして復元する
      </button>
      <input
        ref="openfile"
        type="file"
        data-testid="import-file"
        accept=".json"
        @change="importRecords"
      />
    </section>
  </div>
</template>

<style scoped>
input[type="file"] {
  display: none;
}
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
