export function buildPreview({text = '', audio = '', image = ''}): string {
  if (text && image) return `Photo: ${text}`;
  if (audio && image) return 'Photo & Voice message';
  if (text) return text;
  if (image) return "Photo";
  if (audio) return "Voice message";
  return "";
}