import Tesseract from "tesseract.js";

export async function extractTextFromImage(
  imageBase64: string
): Promise<string> {
  try {
    // Convert base64 to blob
    const binaryString = atob(imageBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "image/jpeg" });

    // Run OCR
    const result = await Tesseract.recognize(blob, "eng", {
      logger: (m) => console.log("OCR Progress:", m),
    });

    return result.data.text;
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to extract text from image");
  }
}
