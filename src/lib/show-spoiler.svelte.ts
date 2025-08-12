function setup() {
  let showSpoiler = $state(false);
  return {
    get value() {
      return showSpoiler;
    },
    set value(value: boolean) {
      showSpoiler = value;
    },
  };
}

export const showSpoiler = setup();
