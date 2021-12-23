import { Component } from "solid-js";

import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const VotePage = lazy(() => import("./pages/vote"));
const ResultsPage = lazy(() => import("./pages/results"));
const AboutPage = lazy(() => import("./pages/about"));

const App: Component = () => {
  return (
    <div class="h-screen w-screen flex flex-col justify-between items-center relative">
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/" element={<VotePage />} />
        {/* <Route path="/*all" element={<NotFound />} /> */}
      </Routes>
      <div class="w-full text-xl text-center pb-2">
        <Link href="https://twitter.com/t3dotgg">Twitter</Link>
        <span class="p-4">{"-"}</span>
        <Link href="/results">Results</Link>
        <span class="p-4">{"-"}</span>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default App;
