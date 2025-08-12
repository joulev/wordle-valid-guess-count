<script lang="ts">
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

<div class="flex flex-row items-center gap-8">
  <div class="w-18 shrink-0">{label}</div>
  <WordInput bind:ref bind:value {cellStates} {onComplete} />
  <div>{@render children?.()}</div>
</div>
