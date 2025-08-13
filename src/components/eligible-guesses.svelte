<script lang="ts">
  import { showSpoiler } from "~/lib/show-spoiler.svelte";

  const { guesses, enabled }: { guesses: string[] | null; enabled: boolean } =
    $props();
</script>

{#if !enabled || !guesses || guesses.length === 0}
  <div class="grow"></div>
{:else}
  <div class="flex grow flex-col">
    <div>
      {guesses.length} valid guess{guesses.length === 1 ? "" : "es"}
    </div>
    <div class="grid w-68 grid-cols-1 md:w-full md:max-w-96">
      <div class="truncate text-xs text-neutral-500">
        {#if showSpoiler.value}
          <button onclick={() => (showSpoiler.value = false)}>[Hide]</button>
          {#each guesses.slice(0, 10) as guess (guess)}
            <span class="ml-1">{guess}</span>
          {/each}
        {:else}
          <button onclick={() => (showSpoiler.value = true)}>[Show]</button>
        {/if}
      </div>
    </div>
  </div>
{/if}
