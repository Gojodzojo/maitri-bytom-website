<svelte:options tag="article-tags" />

<script lang="ts">
    import { specialParse } from "$netlify_cms/tagUtils";

    export let tags: string | string[] = [];
    $: tagsArray = (
        typeof tags === "object" ? tags : specialParse(tags)
    ) as string[];
</script>

{#if tags.length > 0}
    <h4>
        Tagi:
        {#each tagsArray.filter((t) => !!t).sort() as tag, index}
            <a href={`/tag/${tag}/1`}>{tag}</a>
            {#if index !== tagsArray.length - 1}
                <span>, </span>
            {/if}
        {/each}
    </h4>
{/if}

<style>
    a {
        transition: color 0.2s;
        color: black;
        text-decoration: none;
    }

    a:hover {
        color: var(--highlight-color);
    }

    h4 {
        font-family: "Merriweather", serif;
    }
</style>
