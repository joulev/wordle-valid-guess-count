<script lang="ts">
  import { showSpoiler } from "~/lib/show-spoiler.svelte";

  const { guesses, enabled }: { guesses: string[] | null; enabled: boolean } =
    $props();
</script>

{#if !enabled || !guesses || guesses.length === 0}
  <div class="text-xs text-neutral-500">-</div>
{:else}
  <div class="flex flex-col">
    <div>
      {guesses.length} valid guess{guesses.length === 1 ? "" : "es"}
    </div>
    <div class="flex flex-row items-baseline gap-1.5 text-xs text-neutral-500">
      {#if showSpoiler.value}
        <button onclick={() => (showSpoiler.value = false)}>[Hide]</button>
        {#each guesses.slice(0, 10) as guess (guess)}
          <div>{guess}</div>
        {/each}
        {#if guesses.length > 10}
          <div>+{guesses.length - 10}</div>
        {/if}
      {:else}
        <button onclick={() => (showSpoiler.value = true)}>[Show]</button>
      {/if}
    </div>
  </div>
{/if}
