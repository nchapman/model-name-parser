import { expect, test } from "vitest";
import { parseModelName as p } from "./modelNameParser.js";
import exp from "constants";

test("extract number of parameters", () => {
  expect(p("Reflection-Llama-3.1-70B-IQ2_M.gguf").parameters).toBe("70B");
  expect(p("dolphin-2.9.1-yi-1.5-9b-q4_k_m.gguf").parameters).toBe("9b");
  expect(p("dolphin-2.9.1-yi-1.5-q4_k_m.gguf").parameters).toBe(null);
});

test("extract name", () => {
  expect(p("Reflection-Llama-3.1-70B-IQ2_M.gguf").name).toBe(
    "Reflection-Llama-3.1"
  );
  expect(p("dolphin-2.9.1-yi-1.5-9b-q4_k_m.gguf").name).toBe(
    "dolphin-2.9.1-yi-1.5"
  );
});

test("extract quantization", () => {
  expect(p("Reflection-70B-IQ2_M.gguf").quantization).toBe("IQ2_M");
  expect(p("Reflection-70B-Q4_K_M.gguf").quantization).toBe("Q4_K_M");
  expect(p("Reflection-70B-TQ2_0.gguf").quantization).toBe("TQ2_0");
  expect(p("Reflection-70B-Q4_0_4_4.gguf").quantization).toBe("Q4_0_4_4");
  expect(p("Reflection-70B-F32.gguf").quantization).toBe("F32");
  expect(p("ArliAI-RPMax-12B-v1.1-fp16.gguf").quantization).toBe("fp16");
  expect(p("ArliAI-RPMax-12B-v1.1-bf16.gguf").quantization).toBe("bf16");
  expect(p("dolphin-2.9.1-yi-1.5-9b-q4_k_m.gguf").quantization).toBe("q4_k_m");
  expect(p("dolphin-2.9.1-yi-1.5-9b.gguf").quantization).toBe(null);
});

test("extract context", () => {
  expect(p("dolphin-2.2-yi-34b-200k.IQ3_M.gguf").context).toBe("200k");
});

test("extract instruct", () => {
  expect(p("qwen2-7b-instruct-fp16.gguf").instruct).toBe("instruct");
  expect(p("qwen2-7b-fp16.gguf").instruct).toBe(null);
});

test("extract extension", () => {
  expect(p("qwen2-7b-instruct-fp16.gguf").extension).toBe("gguf");
  expect(p("qwen2-7b-instruct-fp16.zip").extension).toBe(null);
  expect(p("qwen2-7b-instruct-fp16").extension).toBe(null);
});

test("format", () => {
  const { formatted } = p("dolphin-2.9.1-yi-1.5-9b-instruct-128k-q4_k_m.gguf");

  expect(formatted.name).toBe("Dolphin 2.9.1 Yi 1.5");
  expect(formatted.parameters).toBe("9B");
  expect(formatted.quantization).toBe("Q4_K_M");
  expect(formatted.context).toBe("128K");
  expect(formatted.instruct).toBe("Instruct");
});

test("format null values", () => {
  const { formatted } = p("hello-world");

  expect(formatted.name).toBe("Hello World");
  expect(formatted.parameters).toBe(null);
  expect(formatted.quantization).toBe(null);
  expect(formatted.context).toBe(null);
  expect(formatted.instruct).toBe(null);
});

test("format name with special capitalization", () => {
  expect(p("ArliAI-RPMax-12B-v1.1-fp16.gguf").formatted.name).toBe(
    "ArliAI RPMax v1.1"
  );
});
