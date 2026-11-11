/// <reference path="../@types/wp-globals.d.ts" />
export function getMediaBaseUrl(filename: string): string {
  return `${daapForcerefreshSettings.baseMediaUrl}/${filename}`;
}
