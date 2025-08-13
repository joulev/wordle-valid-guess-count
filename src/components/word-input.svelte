<script lang="ts">
  import {
    PinInput,
    type PinInputRootSnippetProps,
    REGEXP_ONLY_CHARS,
  } from "bits-ui";
  import clsx from "clsx";
  import type { CellState } from "~/types";

  let {
    ref = $bindable<HTMLDivElement | null>(),
    value = $bindable(""),
    cellStates = $bindable<CellState[]>([]),
    onComplete,
  }: {
    ref?: HTMLDivElement | null;
    value: string;
    cellStates: CellState[];
    onComplete?: () => void;
  } = $props();

  type CellProps = PinInputRootSnippetProps["cells"][0];

  const cellColour = (state: CellState) => {
    switch (state) {
      case "green":
        return "var(--color-correct)";
      case "yellow":
        return "var(--color-misplaced)";
      case "gray":
        return "var(--color-absent)";
    }
  };
</script>

<PinInput.Root
  bind:ref
  bind:value
  class="inline-flex items-center justify-center gap-2 border border-transparent text-white outline-offset-2 outline-neutral-200 focus-within:outline"
  maxlength={5}
  pattern={REGEXP_ONLY_CHARS}
  autocorrect="off"
  autocapitalize="off"
  autocomplete="off"
  spellcheck="false"
  inputmode="text"
  {onComplete}
>
  {#snippet children({ cells })}
    <div class="flex gap-2">
      {#each cells as cell, i (i)}
        {@render Cell(cell, i)}
      {/each}
    </div>
  {/snippet}
</PinInput.Root>

{#snippet Cell(cell: CellProps, index: number)}
  <PinInput.Cell
    {cell}
    class={clsx(
      "grid size-12 place-items-center border bg-(--bg) text-2xl font-bold uppercase",
      cell.hasFakeCaret ? "border-neutral-200" : "border-(--bg)",
    )}
    style="--bg: {cellColour(cellStates[index] ?? 'gray')}"
  >
    {#if cell.char !== null}
      <div>
        {cell.char?.toUpperCase() ?? ""}
      </div>
    {/if}
  </PinInput.Cell>
{/snippet}
