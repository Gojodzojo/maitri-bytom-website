import type { MarkdownInstance } from "astro";

export function filterDrafts<T extends MarkdownInstance<{ draft: boolean }>>(
    a: T[]
) {
    return a.filter(
        ({ frontmatter }) =>
            frontmatter.draft == undefined || !frontmatter.draft
    );
}