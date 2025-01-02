<template>
  Select output format:&nbsp;&nbsp;
  <el-select v-model="type" placeholder="Select" size="large" style="width: 240px">
    <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  &nbsp;&nbsp; Select model:&nbsp;&nbsp;
  <el-select v-model="model" placeholder="Select" size="large" style="width: 240px">
    <el-option v-for="item in models" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
  <div class="upload-wrap">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div>You can directly paste the picture you want to identify</div>
  </div>
  <div v-show="source" class="result-wrap">
    <el-image
      class="source-image"
      :src="source"
      :preview-src-list="[source]"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      fit="cover"
    />
    <div class="result">
      <span>Identification results:&nbsp;</span>
      <div style="flex: 1; position: relative">
        <div v-html="resultHTML" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElLoading } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { Ollama } from 'ollama/browser'
import { v4 as uuidv4 } from 'uuid'
import { createHighlighter } from 'shiki'

import prompts from './prompts'

// eslint-disable-next-line
// @ts-ignore
const ollama = new Ollama({ host: `http://127.0.0.1:11434` })
// eslint-disable-next-line
let loading: any = null
// eslint-disable-next-line
let timer: any = null
const source = ref('')
const base64Data = ref('')
// eslint-disable-next-line
const resultMap = ref<Record<string, any>>({})
const type = ref('json')
const resultHTML = ref('')
const pasteId = ref('')
const highlighter = ref()
const model = ref('llama3.2-vision:11b')

const types = [
  {
    label: 'json',
    value: 'json',
  },
  {
    label: 'markdown',
    value: 'markdown',
  },
  {
    label: 'plain text',
    value: 'text',
  },
]
const models = [
  {
    label: 'llama3.2-vision:11b',
    value: 'llama3.2-vision:11b',
  },
  {
    label: 'llava:13b',
    value: 'llava:13b',
  },
  {
    label: 'minicpm-v:8b',
    value: 'minicpm-v:8b',
  },
]

const isJSON = computed(() => type.value === 'json')

watch([type, model], () => {
  if (base64Data.value) {
    processImage()
  }
})

onMounted(async () => {
  document.addEventListener('paste', handlePaste)
  highlighter.value = await createHighlighter({
    themes: ['vitesse-dark'],
    langs: types.map((item) => item.value),
  })
})

// eslint-disable-next-line
function formatResult(result: any) {
  console.log('result: ', result)
  if (highlighter.value) {
    const r = isJSON.value ? JSON.stringify(result, null, 2) : result
    resultHTML.value = highlighter.value.codeToHtml(r, {
      lang: type.value,
      theme: 'vitesse-dark',
    })
  } else {
    ElMessage({
      message: 'Cant highlight the result, pls refresh the page and try again',
      type: 'error',
    })
  }
}

// eslint-disable-next-line
function generateResult(response: any) {
  if (!response) {
    ElMessage({
      message: 'No recognition results were obtained',
      type: 'warning',
    })
    return
  }
  try {
    const res = isJSON.value ? JSON.parse(response) : response
    if (!resultMap.value[model.value]) {
      resultMap.value[model.value] = {}
    }
    if (!resultMap.value[model.value][pasteId.value]) {
      resultMap.value[model.value][pasteId.value] = {}
    }
    resultMap.value[model.value][pasteId.value][type.value] = res
    formatResult(res)
    // eslint-disable-next-line
  } catch (e: any) {
    ElMessage.error(e.message || 'JSON parsing failed')
  }
}

async function processImage() {
  if (resultMap.value[model.value] && resultMap.value[model.value][pasteId.value]) {
    const cache = resultMap.value[model.value][pasteId.value]
    if (cache[type.value]) {
      formatResult(cache[type.value])
      return
    }
  }

  loading = ElLoading.service({
    lock: true,
    text: 'Processing, please wait patiently...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    timer = setTimeout(() => {
      loading.close()
      loading = null
      ElMessage({
        message: 'The recognition time is a bit long, please refresh the page and try again',
        type: 'warning',
      })
    }, 10000 * 30)
    // eslint-disable-next-line
    const payload: any = {
      model: model.value,
      prompt: prompts[type.value],
      stream: false,
      images: [base64Data.value],
    }
    if (isJSON.value) {
      payload.format = 'json'
    }
    const response = await ollama.generate(payload)

    ElMessage({
      message: 'Identification completed',
      type: 'success',
    })
    // eslint-disable-next-line
    // @ts-ignore
    generateResult(response?.response)
    // eslint-disable-next-line
  } catch (e: any) {
    ElMessage.error(
      `${e.message}. Please make sure that the Ollama service on this machine is started.`,
    )
  }
  clearTimeout(timer)
  loading.close()
  loading = null
}

function handlePaste(evt: Event) {
  if (loading) {
    return
  }
  evt.preventDefault()
  // eslint-disable-next-line
  // @ts-ignore
  const clipboardData = evt.clipboardData || window.clipboardData
  if (!clipboardData?.items) {
    return
  }
  const image = clipboardData.items[0]
  if (!image) {
    ElMessage({
      message: 'No data to paste',
      type: 'warning',
    })
    return
  }

  if (!image.type?.includes('image')) {
    ElMessage({
      message: 'Only supports pasting pictures',
      type: 'warning',
    })
    return
  }
  const blob = image.getAsFile() // convert to blob
  const reader = new FileReader()
  pasteId.value = uuidv4()
  try {
    reader.onload = function () {
      if (reader.result) {
        source.value = reader.result.toString()
        base64Data.value = reader.result.toString().split(',')[1]
        processImage()
      } else {
        ElMessage.error('Image parsing error, please try again')
      }
    }
    // eslint-disable-next-line
    blob && reader.readAsDataURL(blob)

    // eslint-disable-next-line
  } catch (e: any) {
    ElMessage.error(e.message || 'Image parsing error, please try again')
  }
}
</script>

<style scoped>
.el-icon--upload {
  font-size: 67px;
}
.upload-wrap {
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding-top: 60px;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 275px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    border-color: var(--el-color-primary);
  }
}

.result-wrap {
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
  gap: 20px;
}

.result {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 888px;
  overflow: auto;
  width: calc(100% - 300px);
}

.source-image {
  width: 300px;
  max-height: 150px;
}
</style>

<style>
pre.shiki {
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
  min-height: 4em;
  white-space: pre;
  border-width: 1px;
  border-color: #9ca3af4d;
  border-radius: 0.25rem;
  padding: 1rem;
  overflow: auto;
}
</style>
