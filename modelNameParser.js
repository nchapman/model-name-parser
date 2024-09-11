export function parseModelName(fileName) {
  const nameParts = fileName.split(/[\.\-]/);

  const result = {
    name: null,
    parameters: null,
    context: null,
    quantization: null,
    instruct: null,
    extension: null,
    formatted: null,
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
    extension: result.extension?.toUpperCase() || null,
  };

  return result;
}

// Based on: https://github.com/gouch/to-title-case/blob/master/to-title-case.js
function toTitleCase(text) {
  const smallWords =
    /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
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
        (array[index + 1] !== "-" ||
          (array[index - 1] === "-" && array[index + 1] === "-"))
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
      return current.replace(alphanumericPattern, (match) =>
        match.toUpperCase()
      );
    })
    .join("");
}
