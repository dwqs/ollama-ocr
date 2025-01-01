> inspired by [imanoop7/Ollama-OCR](https://github.com/imanoop7/Ollama-OCR)

## Ollama OCR for web

A powerful OCR (Optical Character Recognition) package that uses state-of-the-art vision language models through Ollama to extract text from images.

## Quick Start

#### Prerequisites

1. Install [Ollama](https://ollama.com/)
2. Pull the required models:

```sh
ollama pull llama3.2-vision:11b
ollama pull llava:13b
```

Then run following command:

```sh
git clone git@github.com:dwqs/ollama-ocr.git
cd ollama-ocr
yarn or npm i
yarn dev or npm run dev
```

**Or you can run the demo from docker**: `debounce/ollama-ocr`

## Output Format Details

- **Markdown Format**: The output is a markdown string containing the extracted text from the image.
- **Text Format**: The output is a plain text string containing the extracted text from the image.
- **JSON Format**: The output is a JSON object containing the extracted text from the image.
