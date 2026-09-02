import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isVideo(url: string | undefined): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.ogg') || lowerUrl.endsWith('.mov');
}

export function getMediaUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // If it's a local public asset
  if (url.startsWith('/') && !url.startsWith('/uploads/')) {
    return url;
  }

  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const apiOrigin = rawApiUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

  // If stored with localhost:5000 in database but production API is configured
  if (url.includes('localhost:5000') && apiOrigin && !apiOrigin.includes('localhost:5000')) {
    return url.replace(/https?:\/\/localhost:5000/, apiOrigin);
  }

  // If stored as relative uploads path
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return apiOrigin ? `${apiOrigin}${cleanPath}` : cleanPath;
  }

  return url;
}

