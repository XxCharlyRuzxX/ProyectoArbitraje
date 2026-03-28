import * as FileSystem from "expo-file-system/legacy";
import { SportCard } from "../schemas/sport-card";

const API_URL = "http://localhost:3000/sport-card/NG_CARD";


const PDF_DIR = `${FileSystem.documentDirectory}actas/`;

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(PDF_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(PDF_DIR, { intermediates: true });
  }
}

function buildFilename(payload: SportCard): string {
  const home = payload.homeTeam.teamName.replace(/\s+/g, "_");
  const away = payload.awayTeam.teamName.replace(/\s+/g, "_");
  const date = new Date(payload.matchInfo.date).toISOString().slice(0, 10);
  return `acta_${home}_vs_${away}_${date}.pdf`;
}

export interface PdfResult {
  uri: string;
  filename: string;
}

export async function generatePdf(payload: SportCard): Promise<PdfResult> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error del servidor (${response.status}): ${errorText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/pdf")) {
    throw new Error(`Respuesta inesperada del servidor: ${contentType}`);
  }

  // 2. Convierte la respuesta a base64
  // expo-file-system no puede escribir un Blob directamente,
  // pero sí puede escribir un string base64
  const blob = await response.blob();
  const base64 = await blobToBase64(blob);

  // 3. Guarda el archivo en el dispositivo
  await ensureDir();
  const filename = buildFilename(payload);
  const uri = `${PDF_DIR}${filename}`;

  await FileSystem.writeAsStringAsync(uri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return { uri, filename };
}

// Convierte un Blob a string base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // El resultado es "data:application/pdf;base64,XXXX..."
      // Necesitamos solo la parte base64
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Error al leer el blob"));
    reader.readAsDataURL(blob);
  });
}
