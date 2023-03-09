import type { MarkdownInstance } from "astro";

export interface HeaderPageFrontmatter {
    title: string;
    position: number;
    draft: boolean;
}

export interface NewsFrontmatter {
    image: string;
    title: string;
    date: string;
    author: string;
    draft: boolean;
    tags: string[];
}

export interface FooterSectionFrontmatter {
    title: string;
    position: number;
    draft: boolean;
}

export interface IndexFrontmatter {
    title: string;
}

export interface InstructionFrontmatter {
    title: string;
    position: number;
}

// https://stackoverflow.com/questions/55904032/how-to-get-optional-property-from-union
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type ValueOfUnion<T, K> = T extends any ? K extends keyof T ? T[K] : undefined : never;
type UnionMapping<T> = {
    [K in keyof UnionToIntersection<T> | keyof T]: ValueOfUnion<T, K>;
}
type UnionMerge<T> = Pick<UnionMapping<T>, keyof T> & Partial<UnionMapping<T>>;

export type ArticleMarkdown = MarkdownInstance<UnionMerge<InstructionFrontmatter | HeaderPageFrontmatter | NewsFrontmatter>>

