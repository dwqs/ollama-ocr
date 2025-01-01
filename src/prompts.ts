const prompts: Record<string, string> = {
  markdown: `Please look at this image and extract all the text content. Format the output in markdown:
    - Use headers (# ## ###) for titles and sections
    - Use bullet points (-) for lists
    - Use proper markdown formatting for emphasis and structure
    - Preserve the original text hierarchy and formatting as much as possible
    `,
  text: `Please look at this image and extract all the text content. Provide the output as plain text, maintaining the original layout and line breaks where appropriate. Include all visible text from the image.`,
  json: `Please look at this image and extract all the text content. Structure the output as JSON with these guidelines:
    - Identify different sections or components
    - Use appropriate keys for different text elements
    - Maintain the hierarchical structure of the content
    - Include all visible text from the image
    `,
  structured: `Please look at this image and extract all the text content, focusing on structural elements:
    - Identify and format any tables
    - Extract lists and maintain their structure
    - Preserve any hierarchical relationships
    - Format sections and subsections clearly
    `,
  key_value: `Please look at this image and extract text that appears in key-value pairs:
    - Look for labels and their associated values
    - Extract form fields and their contents
    - Identify any paired information
    - Present each pair on a new line as 'key: value'
    `,
}

export default prompts
