export function makeSlug(frontmatter: Record<string, any>) {
    let slug = ''
    
    if(frontmatter.date) {
        const date = new Date(frontmatter.date).toLocaleDateString("pl").split('.').join('-');
        slug = date + '-'
    }

    const title = frontmatter.title.split(' ').join('-')
    slug += title

    return slug;
}