export function buildPreview({text = '', audio = '', image = ''}): string {
  if (text && image) return `Photo: ${text.slice(0, 30)}`;
  if (audio && image) return 'Photo & Voice message';
  if (text) return text.slice(0, 30);
  if (image) return "Photo";
  if (audio) return "Voice message";
  return "";
}