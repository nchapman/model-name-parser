import { parseModelName, formatModelNameResult } from "./model-name-parser.js";

const modelFileNames = [
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
  "ArliAI-RPMax-12B-v1.1-q8_0.gguf"
];

for (const fileName of modelFileNames) {
  const result = parseModelName(fileName);

  console.log("\nFile:", fileName);
  console.log(
    "Long:",
    formatModelNameResult(result, [
      "name",
      "parameters",
      "context",
      "instruct",
      "quantization",
      "extension"
    ])
  );
  console.log(
    "Short:",
    formatModelNameResult(result, ["name", "parameters", "context", "instruct"])
  );
  console.log(result);
}
