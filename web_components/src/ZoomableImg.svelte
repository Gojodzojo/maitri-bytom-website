<svelte:options tag="zoomable-img" />

<script lang="ts">
    import { fade } from "svelte/transition";
    export let src: string | undefined = undefined;
    export let title: string | undefined = undefined;
    export let alt: string | undefined = undefined;

    let is_opened = false;
</script>

{#if is_opened}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="background"
        on:click={() => (is_opened = false)}
        transition:fade={{ duration: 150 }}
    >
        <img {src} {title} {alt} />
    </div>
{/if}

<div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img on:click={() => (is_opened = true)} {src} {title} {alt} />
    {#if title}
        <p>{title}</p>
    {/if}
</div>

<style>
    img {
        display: block;
        margin: 0 auto;
        margin-top: 3em;
        max-width: 100%;
        max-height: 50vh;
        cursor: pointer;
    }

    p {
        text-align: center;
        color: #888;
        height: 1em;
        margin: 1em 0;
    }

    .background > img {
        margin-top: 0;
        max-height: 90vh;
        max-width: 90%;
        cursor: unset;
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.9);
    }
</style>
