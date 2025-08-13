<script lang="ts">
  import clsx from "clsx";
  import type { Snippet } from "svelte";
  import type { CellState } from "~/types";

  import WordInput from "~/components/word-input.svelte";

  let {
    label,
    ref = $bindable<HTMLDivElement | null>(),
    value = $bindable(""),
    cellStates = $bindable<CellState[]>([]),
    onComplete = $bindable<() => void>(),
    children,
  }: {
    label: string;
    ref?: HTMLDivElement | null;
    value: string;
    cellStates: CellState[];
    onComplete?: () => void;
    children?: Snippet;
  } = $props();
</script>

<div class="flex flex-col items-center gap-x-8 gap-y-2 md:flex-row">
  <div
    class={clsx(
      "shrink-0 text-xs text-neutral-500 uppercase md:w-15",
      label !== "Solution" && "max-md:hidden",
    )}
  >
    {label}
  </div>
  <div
    class="flex grow flex-col items-center gap-x-8 gap-y-4 md:flex-row-reverse"
  >
    {@render children?.()}
    <WordInput bind:ref bind:value {cellStates} {onComplete} />
  </div>
</div>
