<script lang="ts">
    import { makeSlug } from "$scripts/makeSlug";
    import type { ArticleMarkdown } from "$scripts/types";

    export let pages: ArticleMarkdown[];
    export let currentPath: string;
    let isOpened = false;

    const constatntPagesBtnData = [
        {
            href: "/",
            isOpened: currentPath === "",
            text: "Strona Główna",
        },
        {
            href: "/aktualnosci/1",
            isOpened: currentPath.includes("aktualnosci"),
            text: "Aktualności",
        },
    ];

    const headerPagesBtnData = pages.map(({ frontmatter }) => {
        const pageSlug = makeSlug(frontmatter);
        const href = `/${pageSlug}`;
        const isOpened = currentPath.includes(pageSlug);
        const text = frontmatter.title;

        return {
            href,
            isOpened,
            text,
        };
    });
</script>

<button on:click={() => (isOpened = !isOpened)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
        />
    </svg>
</button>

<div style="left: {isOpened ? '0' : '100'}%;">
    {#each [...constatntPagesBtnData, ...headerPagesBtnData] as { href, isOpened, text }}
        <a class:active-section={isOpened} {href}>{text}</a>
    {/each}
</div>

<style>
    @media (min-width: 1200px) {
        button {
            display: none;
        }

        div {
            position: unset;
        }
    }

    @media (max-width: 1200px) {
        button {
            height: 25%;
            cursor: pointer;
            border: none;
            padding: 0;
            background-color: white;
        }

        svg {
            width: 100%;
            height: 100%;
            transition: fill 0.2s;
        }

        svg:hover {
            fill: var(--highlight-color) !important;
        }

        div {
            position: fixed;
            top: var(--header-height);
            height: calc(100vh - var(--header-height));
            width: 100%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            transition: left 0.2s;
        }
    }

    div {
        display: flex;
        gap: 25px;
    }

    a {
        color: black;
        transition: color 0.2s;
    }

    .active-section,
    a:hover {
        color: var(--highlight-color) !important;
    }
</style>
