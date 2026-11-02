export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    const success = document.execCommand('copy');
    field.remove();
    return success;
  } catch {
    return false;
  }
}

export function publicPageUrl(file: string): string {
  return new URL(file, document.baseURI).toString();
}
