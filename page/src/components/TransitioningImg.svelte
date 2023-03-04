<script lang="ts">
    export let src: string;

    let srcOne = src;
    let srcTwo = src;
    let isImgTwoActive = false;

    $: changeImage(src);
    $: imgTwoOpacity = isImgTwoActive ? "1" : "0";

    function changeImage(src: string) {
        // Occours at the beginning
        if (srcOne == srcTwo && srcOne == src) {
            return;
        }

        // Occours if you want to go to previously seen image
        if (srcOne === src || srcTwo === src) {
            isImgTwoActive = !isImgTwoActive;
            return;
        }

        if (isImgTwoActive) {
            srcOne = src;
        } else {
            srcTwo = src;
        }
    }

    function hadnleLoad() {
        isImgTwoActive = !isImgTwoActive;
    }
</script>

<div>
    <img alt="" src={srcOne} on:load={hadnleLoad} />
    <img
        alt=""
        src={srcTwo}
        on:load={hadnleLoad}
        style="opacity: {imgTwoOpacity};"
    />
</div>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: white;
        transition: opacity 1s;
    }
</style>
