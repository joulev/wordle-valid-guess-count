<script lang="ts">
  import words from "~/words.json";

  import EligibleGuesses from "~/components/eligible-guesses.svelte";
  import InputRow from "~/components/input-row.svelte";

  let rawAnswer = $state("");
  const answer = $derived(rawAnswer.toLowerCase());
  let answerRef = $state<HTMLDivElement | null>(null);

  let rawGuesses = $state<string[]>(["", "", "", "", "", ""]);
  const guesses = $derived(rawGuesses.map((guess) => guess.toLowerCase()));
  let guessRefs = $state<(HTMLDivElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  function focusChildInput(element: HTMLDivElement | null) {
    element?.querySelector("input")?.focus();
  }

  function blurChildInput(element: HTMLDivElement | null) {
    element?.querySelector("input")?.blur();
  }

  function getCellStates(word: string) {
    return word
      .split("")
      .map((letter, index) => {
        if (letter === answer[index]) return "green";
        if (answer.includes(letter)) return "yellow";
        return "gray";
      })
      .concat(["gray", "gray", "gray", "gray", "gray"]);
  }
  const cellStates = $derived([
    getCellStates(guesses[0]),
    getCellStates(guesses[1]),
    getCellStates(guesses[2]),
    getCellStates(guesses[3]),
    getCellStates(guesses[4]),
    getCellStates(guesses[5]),
  ]);

  function getEligibleGuesses() {
    let currentEligibleGuesses = words;
    const eligibleGuesses = [
      structuredClone(currentEligibleGuesses),
      null,
      null,
      null,
      null,
      null,
    ];
    for (let i = 0; i < 5; i++) {
      const guess = guesses[i].split("");
      const cellState = cellStates[i];
      const mustNotHave = guess.filter(
        (_, index) => cellState[index] === "gray",
      );
      const mustHave = guess.filter((_, index) => cellState[index] !== "gray");
      const mustMatch = guess.map((letter, index) =>
        cellState[index] === "green" ? letter : null,
      );
      const mustNotMatch = guess.map((letter, index) =>
        cellState[index] === "yellow" ? letter : null,
      );
      currentEligibleGuesses = currentEligibleGuesses.filter((word) => {
        const wordLetters = word.split("");
        if (mustNotHave.some((letter) => wordLetters.includes(letter)))
          return false;
        if (mustHave.some((letter) => !wordLetters.includes(letter)))
          return false;
        if (
          mustNotMatch.some(
            (letter, index) => letter !== null && wordLetters[index] === letter,
          )
        )
          return false;
        if (
          mustMatch.some(
            (letter, index) => letter !== null && wordLetters[index] !== letter,
          )
        )
          return false;
        return true;
      });
      eligibleGuesses[i + 1] = structuredClone(currentEligibleGuesses);
    }
    return eligibleGuesses;
  }
  const eligibleGuesses = $derived(getEligibleGuesses());
</script>

<div class="flex flex-col gap-8 p-8">
  <div>
    Do the Wordle for today, then come back here and see how difficult each of
    your guesses are.
  </div>
  <InputRow
    label="Solution"
    bind:ref={answerRef}
    bind:value={rawAnswer}
    cellStates={["green", "green", "green", "green", "green"]}
    onComplete={() => focusChildInput(guessRefs[0])}
  />
  <div class="flex flex-col gap-2">
    <InputRow
      label="Guess #1"
      bind:ref={() => guessRefs[0], (value) => (guessRefs[0] = value)}
      bind:value={() => rawGuesses[0], (value) => (rawGuesses[0] = value)}
      cellStates={cellStates[0]}
      onComplete={() => {
        if (guesses[0] === answer) {
          blurChildInput(guessRefs[0]);
        } else {
          focusChildInput(guessRefs[1]);
        }
      }}
    >
      <EligibleGuesses enabled guesses={eligibleGuesses[0]} />
    </InputRow>
    <InputRow
      label="Guess #2"
      bind:ref={() => guessRefs[1], (value) => (guessRefs[1] = value)}
      bind:value={() => rawGuesses[1], (value) => (rawGuesses[1] = value)}
      cellStates={cellStates[1]}
      onComplete={() => {
        if (guesses[1] === answer) {
          blurChildInput(guessRefs[1]);
        } else {
          focusChildInput(guessRefs[2]);
        }
      }}
    >
      <EligibleGuesses
        enabled={Boolean(guesses[0])}
        guesses={eligibleGuesses[1]}
      />
    </InputRow>
    <InputRow
      label="Guess #3"
      bind:ref={() => guessRefs[2], (value) => (guessRefs[2] = value)}
      bind:value={() => rawGuesses[2], (value) => (rawGuesses[2] = value)}
      cellStates={cellStates[2]}
      onComplete={() => {
        if (guesses[2] === answer) {
          blurChildInput(guessRefs[2]);
        } else {
          focusChildInput(guessRefs[3]);
        }
      }}
    >
      <EligibleGuesses
        enabled={Boolean(guesses[1])}
        guesses={eligibleGuesses[2]}
      />
    </InputRow>
    <InputRow
      label="Guess #4"
      bind:ref={() => guessRefs[3], (value) => (guessRefs[3] = value)}
      bind:value={() => rawGuesses[3], (value) => (rawGuesses[3] = value)}
      cellStates={cellStates[3]}
      onComplete={() => {
        if (guesses[3] === answer) {
          blurChildInput(guessRefs[3]);
        } else {
          focusChildInput(guessRefs[4]);
        }
      }}
    >
      <EligibleGuesses
        enabled={Boolean(guesses[2])}
        guesses={eligibleGuesses[3]}
      />
    </InputRow>
    <InputRow
      label="Guess #5"
      bind:ref={() => guessRefs[4], (value) => (guessRefs[4] = value)}
      bind:value={() => rawGuesses[4], (value) => (rawGuesses[4] = value)}
      cellStates={cellStates[4]}
      onComplete={() => {
        if (guesses[4] === answer) {
          blurChildInput(guessRefs[4]);
        } else {
          focusChildInput(guessRefs[5]);
        }
      }}
    >
      <EligibleGuesses
        enabled={Boolean(guesses[3])}
        guesses={eligibleGuesses[4]}
      />
    </InputRow>
    <InputRow
      label="Guess #6"
      bind:ref={() => guessRefs[5], (value) => (guessRefs[5] = value)}
      bind:value={() => rawGuesses[5], (value) => (rawGuesses[5] = value)}
      cellStates={cellStates[5]}
      onComplete={() => {
        blurChildInput(guessRefs[5]);
      }}
    >
      <EligibleGuesses
        enabled={Boolean(guesses[4]) && guesses[4] !== answer}
        guesses={eligibleGuesses[5]}
      />
    </InputRow>
  </div>
</div>
