import { ExternalBlob } from '../backend';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

export interface MediaValidationResult {
  valid: boolean;
  error?: string;
}

export function validateMediaFile(
  file: File,
  acceptedTypes: string[],
  maxSize: number = MAX_FILE_SIZE
): MediaValidationResult {
  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`,
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`,
    };
  }

  return { valid: true };
}

export async function fileToUint8Array(file: File): Promise<Uint8Array<ArrayBuffer>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      resolve(new Uint8Array(arrayBuffer) as Uint8Array<ArrayBuffer>);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export function getMediaPreviewUrl(media: ExternalBlob | null | undefined): string | null {
  if (!media) return null;
  return media.getDirectURL();
}

export function isImageFile(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

export function isVideoFile(file: File): boolean {
  return ACCEPTED_VIDEO_TYPES.includes(file.type);
}
