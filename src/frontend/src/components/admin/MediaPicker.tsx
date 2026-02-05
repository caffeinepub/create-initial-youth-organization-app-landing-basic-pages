import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { ExternalBlob } from '../../backend';
import {
  validateMediaFile,
  fileToUint8Array,
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  isImageFile,
  isVideoFile,
} from '@/utils/media';

interface MediaPickerProps {
  label?: string;
  value: ExternalBlob | null | undefined;
  onChange: (media: ExternalBlob | null) => void;
  accept?: 'image' | 'video' | 'both';
  disabled?: boolean;
}

export default function MediaPicker({
  label = 'Add picture or video',
  value,
  onChange,
  accept = 'both',
  disabled = false,
}: MediaPickerProps) {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = (() => {
    if (accept === 'image') return ACCEPTED_IMAGE_TYPES;
    if (accept === 'video') return ACCEPTED_VIDEO_TYPES;
    return [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];
  })();

  const acceptString = acceptedTypes.join(',');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploadProgress(0);

    // Validate file
    const validation = validateMediaFile(file, acceptedTypes);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setUploadProgress(null);
      return;
    }

    try {
      // Convert file to Uint8Array
      const bytes = await fileToUint8Array(file);

      // Create ExternalBlob with upload progress tracking
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      onChange(blob);
      setUploadProgress(null);
    } catch (err) {
      console.error('Failed to process file:', err);
      setError('Failed to process file. Please try again.');
      setUploadProgress(null);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange(null);
    setError(null);
    setUploadProgress(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const previewUrl = value?.getDirectURL();
  const isImage = previewUrl && (accept === 'image' || accept === 'both');
  const isVideo = previewUrl && (accept === 'video' || accept === 'both');

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {!value && uploadProgress === null && (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={disabled}
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          {label}
        </Button>
      )}

      {uploadProgress !== null && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {value && uploadProgress === null && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative rounded-lg overflow-hidden bg-muted">
                {isImage && previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                )}
                {isVideo && previewUrl && (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-48 object-cover"
                  />
                )}
                {!previewUrl && (
                  <div className="w-full h-48 flex items-center justify-center">
                    {accept === 'video' ? (
                      <VideoIcon className="h-12 w-12 text-muted-foreground" />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleButtonClick}
                  disabled={disabled}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Replace
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemove}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
