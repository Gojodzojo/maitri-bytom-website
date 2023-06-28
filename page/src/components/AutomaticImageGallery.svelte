<svelte:options tag="automatic-image-gallery" />

<script lang="ts">
    import { fade } from "svelte/transition";
    import { specialParse } from "$netlify_cms/tagUtils";
    import { onDestroy } from "svelte";
    import type { Slide } from "$scripts/types";

    export let interval: number = 5000;
    export let slides: Slide[] | string = [];

    const fadeSettings = { duration: 1000 };

    $: slidesArray = (
        typeof slides === "object" ? slides : specialParse(slides)
    ) as Slide[];

    let currentImageIndex = 0;
    $: image = slidesArray[currentImageIndex]?.image || "";
    $: text = slidesArray[currentImageIndex]?.text || "";

    function changeSlide() {
        if (slidesArray.length !== 0) {
            currentImageIndex = (currentImageIndex + 1) % slidesArray.length;
        }
    }

    let intervalId: NodeJS.Timer;

    $: {
        clearInterval(intervalId);
        intervalId = setInterval(changeSlide, interval);
    }

    onDestroy(() => clearInterval(intervalId));
</script>

<div class="automatic-image-gallery">
    {#key image}
        <img transition:fade={fadeSettings} src={image} alt="" />
    {/key}

    <div class="cover">
        {#key text}
            <h1 transition:fade={fadeSettings}>{text}</h1>
        {/key}
    </div>
</div>

<style>
    .automatic-image-gallery {
        width: 100%;
        height: 50vh;
        position: relative;
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }

    h1 {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        font-size: xx-large;
        line-height: normal;
        color: white;
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>
