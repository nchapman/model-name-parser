/**
 * Parses the model name and extracts information from the given file name.
 *
 * @param {string} fileName - The name of the file to parse.
 * @returns {object} - An object containing the extracted information from the file name.
 * @property {string} name - The original file name.
 * @property {string} parameters - The parameters extracted from the file name.
 * @property {string} context - The context extracted from the file name.
 * @property {string} quantization - The quantization extracted from the file name.
 * @property {string} instruct - The instruct extracted from the file name.
 * @property {string} extension - The extension extracted from the file name.
 * @property {object} formatted - An object containing the formatted extracted parts.
 * @property {string} formatted.name - The formatted name with hyphens replaced by spaces and each word capitalized.
 * @property {string} formatted.parameters - The formatted parameters in uppercase.
 * @property {string} formatted.context - The formatted context in uppercase.
 * @property {string} formatted.quantization - The formatted quantization in uppercase.
 * @property {string} formatted.instruct - The formatted instruct with each word capitalized.
 * @property {string} formatted.extension - The formatted extension in uppercase.
 */
export function parseModelName(fileName) {
  const nameParts = fileName.split(/[\.\-]/);

  const result = {
    name: null,
    parameters: null,
    context: null,
    quantization: null,
    instruct: null,
    extension: null,
    formatted: null
  };

  // Loop through parts and extract information
  nameParts.forEach((part, i) => {
    // Parameters: 70b
    if (part.match(/^\d+b$/i)) {
      result.parameters = part;
    }

    // Quantization: Q4_K_M
    // Matches this list: https://github.com/ggerganov/llama.cpp/blob/master/examples/quantize/quantize.cpp
    else if (part.match(/^(T?I?Q\d_.*)|(B?FP?\d+)$/i)) {
      result.quantization = part;
    }

    // Context: 200k
    else if (part.match(/^\d+k$/i)) {
      result.context = part;
    }

    // Instruct: instruct
    else if (part.match(/^(instruct)$/i)) {
      result.instruct = part;
    }

    // Extension: gguf
    else if (i === nameParts.length - 1 && part.match(/^(gguf)$/i)) {
      result.extension = part;
    }
  });

  // Clean up the original file name so we maintain periods in version numbers
  result.name = fileName;

  // Loop through result keys and replace with empty values
  for (let key in result) {
    if (!["name", "formatted"].includes(key)) {
      result.name = result.name.replace(result[key], "");
    }
  }

  // Replace double separator characters with single character
  result.name = result.name.replace(/\-{2,}/g, "-").replace(/\.{2,}/g, ".");

  // Trim trailing separators and spaces
  result.name = result.name.replace(/[\-\.\s]+$/, "");

  // Format extracted parts
  result.formatted = {
    name: toTitleCase(result.name.replace(/-/g, " ")),
    parameters: result.parameters?.toUpperCase() || null,
    context: result.context?.toUpperCase() || null,
    quantization: result.quantization?.toUpperCase() || null,
    instruct: result.instruct ? toTitleCase(result.instruct) : null,
    extension: result.extension?.toUpperCase() || null
  };

  return result;
}

/**
 * Formats the model name result based on the provided keys.
 *
 * @param {Object} result - The result object containing formatted values.
 * @param {Array} keys - The keys to be used for formatting the result.
 * @returns {string} - The formatted model name result.
 */
export function formatModelNameResult(result, keys) {
  return keys
    .map((key) => result.formatted[key])
    .filter(Boolean)
    .join(" ");
}

// Based on: https://github.com/gouch/to-title-case/blob/master/to-title-case.js
function toTitleCase(text) {
  const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
  const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
  const wordSeparators = /([ :–—-])/;

  return text
    .split(wordSeparators)
    .map((current, index, array) => {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ":" &&
        array[index + 1] !== ":" &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== "-" || (array[index - 1] === "-" && array[index + 1] === "-"))
      ) {
        return current.toLowerCase();
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current;
      }

      /* Ignore URLs */
      if (array[index + 1] === ":" && array[index + 2] !== "") {
        return current;
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, (match) => match.toUpperCase());
    })
    .join("");
}
