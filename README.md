## Exploring Zustand

Billed as a simpler alternative to Redux, this is their [tutorial project](https://zustand.docs.pmnd.rs/guides/tutorial-tic-tac-toe) on their website.

This is like that, but also done as TypeScript to explore typings.

## Reflection

Their store creation is simple:

```

// create the store object:
const storeObj = {
  bears: 0,
  // pretend there is other stuff here!
}

// create the store actions:
const increasePopulation = (state) => ({...state, bears: state.bears + 1});
const removeAllBears = () => ({...state, bears: 0});

// but wait! Zustand has a way to do this for us with create()
// make a hook:
const useStore = create(set => ({
  ...storeObj,
  increasePopulation: () => set(increasePopulation),
  removeAllBears: () => set(removeAllBears)
}))


```

One more thing! The `set` parameter that create uses lets us change just the properties we want. So we don't need to be doing `...state` as we have above. Thats it. Makes sense when you spell it all out first. Then looking at it together as a one-liner is more digestible.
