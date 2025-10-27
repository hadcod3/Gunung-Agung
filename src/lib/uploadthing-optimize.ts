export const optimizeUploadThingImage = (
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'jpeg' | 'png' | 'avif';
    blur?: number;
    grayscale?: boolean;
  } = {}
): string => {
  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    blur,
    grayscale = false
  } = options;

  // If it's not an UploadThing URL, return original
  if (!url.includes('uploadthing.com') && !url.includes('utfs.io')) {
    return url;
  }

  const params = new URLSearchParams();

  // Add width if specified
  if (width) params.append('w', width.toString());
  
  // Add height if specified
  if (height) params.append('h', height.toString());
  
  // Add quality
  params.append('q', quality.toString());
  
  // Add format
  if (format !== 'auto') {
    params.append('f', format);
  }

  // Add blur effect
  if (blur && blur > 0) {
    params.append('blur', blur.toString());
  }

  // Add grayscale effect
  if (grayscale) {
    params.append('grayscale', 'true');
  }

  // For UploadThing URLs, we can use query parameters for optimization
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
};

/**
 * Predefined optimization presets
 */
export const imagePresets = {
  thumbnail: (url: string) => optimizeUploadThingImage(url, {
    width: 200,
    height: 200,
    quality: 70,
    format: 'webp'
  }),
  
  card: (url: string) => optimizeUploadThingImage(url, {
    width: 400,
    quality: 80,
    format: 'webp'
  }),
  
  gallery: (url: string) => optimizeUploadThingImage(url, {
    width: 800,
    quality: 85,
    format: 'webp'
  }),
  
  fullscreen: (url: string) => optimizeUploadThingImage(url, {
    width: 1200,
    quality: 90,
    format: 'webp'
  }),
  
  blurPlaceholder: (url: string) => optimizeUploadThingImage(url, {
    width: 50,
    quality: 30,
    blur: 10,
    format: 'webp'
  })
};