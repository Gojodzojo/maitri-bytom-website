export function stripHtmlTags(text: string) {
    return text.split(/<.*?>/g).join('')
}