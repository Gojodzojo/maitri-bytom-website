import type { MarkdownInstance } from "astro"

export interface ArticleFrontmatter {
    title: string
    date?: string
    author?: string
    image?: string
    tags?: string[]
    image_gallery?: string[]
}

export type ArticleMarkdown = MarkdownInstance<ArticleFrontmatter>