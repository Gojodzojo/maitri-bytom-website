<script lang="ts">
    export let images: string[];

    let currentImageIndex = 0;

    $: if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    $: if (currentImageIndex >= images.length) currentImageIndex = 0;
</script>

<div class="image-slider">
    <div
        class="image"
        style="background-image: url({images[currentImageIndex]});"
    >
        <div class="slider-btn" on:click={() => currentImageIndex--}>
            &laquo;
        </div>
        <div class="slider-btn" on:click={() => currentImageIndex++}>
            &raquo;
        </div>
    </div>
</div>

<style>
    .image-slider {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }

    .image {
        width: 100vmin;
        max-width: 100%;
        aspect-ratio: 16 / 9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .slider-btn {
        background-color: white;
        padding: 10px;
        font-size: xx-large;
        font-weight: bolder;
        margin: 20px;
        opacity: 0.7;
    }

    .slider-btn:hover {
        cursor: pointer;
    }
</style>
