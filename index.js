function parseModelName(fileName) {
  const nameParts = fileName.split(/[\.\-]/);

  let name = null;
  let parameters = null;
  let context = null;
  let quantization = null;
  let instruct = null;
  let extension = null;

  // Check if last part matches extension pattern
  if (nameParts[nameParts.length - 1].match(/^(gguf)$/i)) {
    extension = nameParts.pop();
  }

  // Loop through parts and extract information
  for (let part of nameParts) {
    // Number of parameters
    if (part.match(/^\d+b$/i)) {
      parameters = part;
    }

    // Quantization
    // Matches this list: https://github.com/ggerganov/llama.cpp/blob/master/examples/quantize/quantize.cpp
    else if (part.match(/^(T?I?Q\d_.*)|(B?FP?\d+)$/i)) {
      quantization = part;
    }

    // Context
    else if (part.match(/^\d+k$/i)) {
      context = part;
    }

    // Instruct
    else if (part.match(/^(instruct)$/i)) {
      instruct = part;
    }
  }

  // Get name by removing all the known parts from the string and clean it up
  name = fileName.slice();

  if (parameters) {
    name = name.replace(parameters, "");
  }

  if (context) {
    name = name.replace(context, "");
  }

  if (quantization) {
    name = name.replace(quantization, "");
  }

  if (instruct) {
    name = name.replace(instruct, "");
  }

  if (extension) {
    name = name.replace(extension, "");
  }

  // Replace double characters with single character
  name = name.replace(/\-{2,}/g, "-").replace(/\.{2,}/g, ".");

  // Trim trailing characters
  name = name.replace(/[\-\.\s]+$/, "");

  // TODO: Add long name that has all the parts in it
  return {
    name,
    parameters,
    context,
    quantization,
    instruct,
    extension,
    formatted: {
      name: toTitleCase(name.replace(/-/g, " ")),
      parameters: parameters ? parameters.toUpperCase() : null,
      context: context ? context.toUpperCase() : null,
      quantization: quantization ? quantization.toUpperCase() : null,
      instruct: instruct ? toTitleCase(instruct) : null,
      extension: extension ? extension.toUpperCase() : null,
    },
  };
}

// Modernized version of: https://github.com/gouch/to-title-case/blob/master/to-title-case.js
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

const modelNames = [
  "Reflection-Llama-3.1-70B-IQ2_M.gguf",
  "Reflection-Llama-3.1-70B-IQ2_S.gguf",
  "Reflection-Llama-3.1-70B-IQ3_M.gguf",
  "Reflection-Llama-3.1-70B-IQ3_XS.gguf",
  "Reflection-Llama-3.1-70B-IQ4_XS.gguf",
  "Reflection-Llama-3.1-70B-Q2_K.gguf",
  "Reflection-Llama-3.1-70B-Q2_K_L.gguf",
  "Reflection-Llama-3.1-70B-Q3_K_L.gguf",
  "Reflection-Llama-3.1-70B-Q3_K_M.gguf",
  "Reflection-Llama-3.1-70B-Q3_K_S.gguf",
  "Reflection-Llama-3.1-70B-Q3_K_XL.gguf",
  "Reflection-Llama-3.1-70B-Q4_0.gguf",
  "Reflection-Llama-3.1-70B-Q4_K_L.gguf",
  "Reflection-Llama-3.1-70B-Q4_K_M.gguf",
  "Reflection-Llama-3.1-70B-Q4_K_S.gguf",
  "Reflection-Llama-3.1-70B-Q5_K_S.gguf",
  "qwen2-7b-instruct-fp16.gguf",
  "qwen2-7b-instruct-q2_k.gguf",
  "qwen2-7b-instruct-q3_k_m.gguf",
  "qwen2-7b-instruct-q4_0.gguf",
  "qwen2-7b-instruct-q4_k_m.gguf",
  "qwen2-7b-instruct-q5_0.gguf",
  "qwen2-7b-instruct-q5_k_m.gguf",
  "qwen2-7b-instruct-q6_k.gguf",
  "qwen2-7b-instruct-q8_0.gguf",
  "dolphin-2.9.1-yi-1.5-9b-q4_k_m.gguf",
  "dolphin-2.2-yi-34b-200k.IQ3_M.gguf",
  "dolphin-2.2-yi-34b-200k.IQ3_S.gguf",
  "dolphin-2.2-yi-34b-200k.IQ3_XS.gguf",
  "dolphin-2.2-yi-34b-200k.IQ4_XS.gguf",
  "dolphin-2.2-yi-34b-200k.Q2_K.gguf",
  "dolphin-2.2-yi-34b-200k.Q3_K_L.gguf",
  "dolphin-2.2-yi-34b-200k.Q3_K_M.gguf",
  "dolphin-2.2-yi-34b-200k.Q3_K_S.gguf",
  "dolphin-2.2-yi-34b-200k.Q4_K_M.gguf",
  "dolphin-2.2-yi-34b-200k.Q4_K_S.gguf",
  "dolphin-2.2-yi-34b-200k.Q5_K_M.gguf",
  "dolphin-2.2-yi-34b-200k.Q5_K_S.gguf",
  "dolphin-2.2-yi-34b-200k.Q6_K.gguf",
  "dolphin-2.2-yi-34b-200k.Q8_0.gguf",
  "ArliAI-RPMax-12B-v1.1-Q2_K.gguf",
  "ArliAI-RPMax-12B-v1.1-Q3_K_L.gguf",
  "ArliAI-RPMax-12B-v1.1-Q3_K_M.gguf",
  "ArliAI-RPMax-12B-v1.1-Q3_K_S.gguf",
  "ArliAI-RPMax-12B-v1.1-Q4_K_M.gguf",
  "ArliAI-RPMax-12B-v1.1-Q4_K_S.gguf",
  "ArliAI-RPMax-12B-v1.1-Q5_K_M.gguf",
  "ArliAI-RPMax-12B-v1.1-Q5_K_S.gguf",
  "ArliAI-RPMax-12B-v1.1-Q6_K.gguf",
  "ArliAI-RPMax-12B-v1.1-fp16.gguf",
  "ArliAI-RPMax-12B-v1.1-q8_0.gguf",
];

const shuffledModelNames = modelNames.sort(() => Math.random() - 0.5);

for (let modelName of shuffledModelNames) {
  console.log(modelName);
  console.log(parseModelName(modelName));
}
