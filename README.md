Welcome this is a practice project built with React, Vite, and Framer Motion.

It's Single Page Application made using react-router, lazy loading was implemented to mainly handle 2 interrelated heavy dependencies(lottie-web and bulbasaur.json in Pokemon Memory game) but then used in all games.

The app contains following random mini games for you to enjoy and tinker around with:

1. Rock Paper Scissors vs computer
2. Tic Tac Toe 2 players
3. Pokemon Memory game
4. Simon Says
5. Snake

Structure:

```
src/
├── assets/ # Static images, JSON data(attribution and Bulbasaur lottie loading)
├── components/ # Reusable UI components
├── pages/ # Individual Game Components
│ ├── Snake.tsx
│ ├── PokemonMemory.tsx
│ └── ...
├── utils/ # Helper functions (Just one that gives Simon Says buttons sound)
├── App.tsx # Main router & Animated Transition logic
└── main.tsx # Entry point
```
