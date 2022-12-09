export function makeSlug(frontmatter: Record<string, any>) {
    let slug = ''
    
    if(frontmatter.date) {
        const date = new Date(frontmatter.date).toLocaleDateString("pl").split('.').join('-');
        slug = date + '-'
    }

    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    const title: string = frontmatter
        .title
        .split(' ')
        .join('-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u0142/g, "l")
    
    slug += title

    return slug;
}