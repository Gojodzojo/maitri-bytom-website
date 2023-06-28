<svelte:options tag="image-gallery" />

<script lang="ts">
    import { specialParse } from "$netlify_cms/tagUtils";
    import { fade } from "svelte/transition";

    export let images: string[] | string = [];

    const imagesArray = (
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
    {#key src}
        <img transition:fade={{ duration: 500 }} {src} alt="" />
    {/key}

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

    img {
        position: absolute;
        object-fit: contain;
        width: 100%;
        height: 100%;
    }

    button {
        position: absolute;
        top: 50%;
        transform: translateY(-75%);
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
