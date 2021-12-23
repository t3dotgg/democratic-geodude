import { Component } from "solid-js";
import { VotePage } from "./vote-page";

const App: Component = () => {
  return (
    <div class="h-screen w-screen flex flex-col justify-between items-center relative">
      <VotePage />
      <div class="w-full text-xl text-center pb-2">
        <a href="https://twitter.com/t3dotgg">Twitter</a>
        <span class="p-4">{"-"}</span>
        <a href="/results">Results</a>
        <span class="p-4">{"-"}</span>
        <a href="/about">About</a>
      </div>
    </div>
  );
};

export default App;
