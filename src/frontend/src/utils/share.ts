/**
 * Share utility with native Web Share API support and clipboard fallback
 */

export interface ShareResult {
  success: boolean;
  method: 'native' | 'clipboard' | 'error';
  message: string;
}

/**
 * Attempts to share a URL using the native Web Share API when available,
 * falls back to copying to clipboard on unsupported browsers/devices
 */
export async function shareUrl(url: string, title?: string): Promise<ShareResult> {
  // Check if Web Share API is available
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || 'The Youth And Friends Organization',
        url: url,
      });
      return {
        success: true,
        method: 'native',
        message: 'Shared successfully',
      };
    } catch (error: any) {
      // User cancelled the share dialog or share failed
      if (error.name === 'AbortError') {
        return {
          success: false,
          method: 'native',
          message: 'Share cancelled',
        };
      }
      // Fall through to clipboard fallback on other errors
      console.warn('Native share failed, falling back to clipboard:', error);
    }
  }

  // Fallback: Copy to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return {
        success: true,
        method: 'clipboard',
        message: 'Link copied to clipboard',
      };
    } else {
      // Fallback for older browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        return {
          success: true,
          method: 'clipboard',
          message: 'Link copied to clipboard',
        };
      } else {
        throw new Error('Copy command failed');
      }
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return {
      success: false,
      method: 'error',
      message: 'Failed to share link',
    };
  }
}
