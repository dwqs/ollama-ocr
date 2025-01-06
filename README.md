> inspired by [imanoop7/Ollama-OCR](https://github.com/imanoop7/Ollama-OCR)

## Ollama OCR for web

A powerful OCR (Optical Character Recognition) package that uses state-of-the-art vision language models through Ollama to extract text from images.

## Supported Models

- **LLaVA**: A multimodal model that combines a vision encoder and Vicuna for general-purpose visual and language understanding, achieving impressive chat capabilities mimicking spirits of the multimodal GPT-4. (LLaVa model can generate wrong output sometimes)
- **Llama 3.2 Vision**: Instruction-tuned models are optimized for visual recognition, image reasoning, captioning, and answering general questions about an image
- **MiniCPM-V 2.6**: A GPT-4V Level MLLM for Single Image, Multi Image and Video on Your Phone

## Quick Start

#### Prerequisites

1. Install [Ollama](https://ollama.com/)
2. Pull the required models:

```sh
ollama pull llama3.2-vision:11b
ollama pull llava:13b
ollama pull minicpm-v:8b
```

Then run following command:

```sh
git clone git@github.com:dwqs/ollama-ocr.git
cd ollama-ocr
yarn or npm i
yarn dev or npm run dev
```

## Docker Supports

**Or you can run the demo from docker**: `debounce/ollama-ocr`

## Examples

#### Input Image1

![input-image](https://image-static.segmentfault.com/149/814/1498143911-677575ecd6977_fix732)

#### Output Markdown

![output-markdown.png](https://image-static.segmentfault.com/338/339/3383395719-67757691e9b37_fix732)

#### Input Image2

![input-image](https://image-static.segmentfault.com/257/222/2572220334-677579c2747c7_fix732)

#### Output JSON

![output-json.png](https://image-static.segmentfault.com/104/188/1041885248-677579f517f02_fix732)

## Output Format Details

- **Markdown Format**: The output is a markdown string containing the extracted text from the image.
- **Text Format**: The output is a plain text string containing the extracted text from the image.
- **JSON Format**: The output is a JSON object containing the extracted text from the image.

## License

MIT
