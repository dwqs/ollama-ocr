> inspired by [imanoop7/Ollama-OCR](https://github.com/imanoop7/Ollama-OCR)

## Ollama OCR for web

A powerful OCR (Optical Character Recognition) package that uses state-of-the-art vision language models through Ollama to extract text from images.

## Supported Models

- **LLaVA 13b**: Efficient vision-language model for real-time processing (LLaVa model can generate wrong output sometimes)
- **Llama 3.2 Vision 11b**: Advanced model with high accuracy for complex documents

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
