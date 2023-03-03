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

<style src="../styles/CustomImg.css"></style>
