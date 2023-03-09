<svelte:options tag="image-gallery" />

<script lang="ts">
    import TransitioningImg from "./TransitioningImg.svelte";
    import { specialParse } from "$netlify_cms/tagUtils";

    export let images: string[] | string = [];
    const isNotWebComponent = customElements.get("image-gallery") === undefined;

    $: imagesArray = (
        typeof images === "object" ? images : specialParse(images)
    ) as string[];

    let currentImageIndex = 0;

    $: if (currentImageIndex < 0) {
        currentImageIndex = imagesArray.length - 1;
    } else if (currentImageIndex >= imagesArray.length) {
        currentImageIndex = 0;
    }

    $: src = imagesArray[currentImageIndex];
</script>

<div>
    {#if isNotWebComponent}
        <TransitioningImg {src} />
    {:else}
        <transitioning-img {src} />
    {/if}

    <button style="left: 0;" on:click={() => currentImageIndex--}>
        &laquo;
    </button>
    <button style="right: 0;" on:click={() => currentImageIndex++}>
        &raquo;
    </button>
</div>

<style>
    div {
        width: 100vmin;
        max-width: 100%;
        aspect-ratio: 16 / 9;
        margin: auto;
        position: relative;
        margin-top: 50px;
    }

    button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
        border: none;
        padding: 10px;
        font-size: xx-large;
        font-weight: bolder;
        margin: 20px;
        opacity: 0.7;
    }

    button:hover {
        cursor: pointer;
    }
</style>
