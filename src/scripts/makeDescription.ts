export function stripHtmlTags(text: string) {
    return text.split(/<.*?>/g).join('')
}

export function truncate(text: string, len: number) {
    if(text.length <= len)  return text;
    return text.substring(0, len) + '…'
}

export function makeDescription(text: string) {
    return truncate(stripHtmlTags(text), 500)
}