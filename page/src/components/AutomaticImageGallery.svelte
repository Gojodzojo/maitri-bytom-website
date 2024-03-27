<svelte:options tag="automatic-image-gallery" />

<script lang="ts">
    import { fade } from "svelte/transition";
    import { specialParse } from "$netlify_cms/tagUtils";
    import { onDestroy } from "svelte";
    import type { Slide } from "$scripts/types";

    export let interval: number = 5000;
    export let slides: Slide[] | string = [];

    const fadeSettings = { duration: 1000 };
    const isWebComponent =
        customElements.get("automatic-image-gallery") !== undefined;

    $: slidesArray = (
        typeof slides === "object" ? slides : specialParse(slides)
    ) as Slide[];

    // There is a bug which breaks transitions when web component
    //  with transition gets added to preview immediatelly
    let currentImageIndex = isWebComponent ? -1 : 0;

    $: image = slidesArray[currentImageIndex]?.image || "";
    $: text = slidesArray[currentImageIndex]?.text || "";

    $: if (currentImageIndex >= slidesArray.length) {
        currentImageIndex = 0;
    }

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

{#if currentImageIndex !== -1}
    <div class="automatic-image-gallery">
        {#key image}
            <img src={image} alt="" transition:fade={fadeSettings} />
        {/key}

        <div class="cover">
            {#key text}
                <h1 transition:fade={fadeSettings}>{text}</h1>
            {/key}
        </div>
    </div>
{/if}

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
        width: 80%;
        text-align: center;
    }

    img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
</style>
