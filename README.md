# Model Name Parser

This function `parseModelName` is used to parse the model name and extract information from the given file name.

## Usage

```javascript
import { parseModelName } from "./model-name-parser";

const fileName = "dolphin-2.2-yi-34b-200k.q4_k_s.gguf";
const result = parseModelName(fileName);

console.log(result);
```

```json
{
  "name": "dolphin-2.2-yi",
  "parameters": "34b",
  "context": "200k",
  "quantization": "q4_k_s",
  "instruct": null,
  "extension": "gguf",
  "formatted": {
    "name": "Dolphin 2.2 Yi",
    "parameters": "34B",
    "context": "200K",
    "quantization": "Q4_K_S",
    "instruct": null,
    "extension": "GGUF"
  }
}
```

## Parameters

- `fileName` (string): The name of the file to parse.

## Return Value

The function returns an object with the following properties:

- `name` (string): The original file name.
- `parameters` (string): The parameters extracted from the file name.
- `context` (string): The context extracted from the file name.
- `quantization` (string): The quantization extracted from the file name.
- `instruct` (string): The instruct extracted from the file name.
- `extension` (string): The extension extracted from the file name.
- `formatted` (object): An object containing the formatted extracted parts.
  - `formatted.name` (string): The formatted name with hyphens replaced by spaces and each word capitalized.
  - `formatted.parameters` (string): The formatted parameters in uppercase.
  - `formatted.context` (string): The formatted context in uppercase.
  - `formatted.quantization` (string): The formatted quantization in uppercase.
  - `formatted.instruct` (string): The formatted instruct with each word capitalized.
  - `formatted.extension` (string): The formatted extension in uppercase.

Please note that this function assumes a specific file name format and may not work correctly with other formats.
