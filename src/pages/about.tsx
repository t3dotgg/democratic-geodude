const AboutPage = () => {
  return (
    <div class="flex flex-col items-center text-xl">
      <h2 class="text-2xl p-4">About</h2>
      <p class="max-w-xl">
        I made this because I'm weird and dumb idk what you expect me to say
      </p>
      <div class="p-4" />
      <ul>
        <li>
          {"- "}
          <a class="text-blue-200 underline" href="https://twitter.com/t3dotgg">
            Follow me on Twitter
          </a>
        </li>
        <li>
          {"- "}
          <a
            class="text-blue-200 underline"
            href="https://plausible.io/roundest.t3.gg"
          >
            Public analytics on Plausible
          </a>
        </li>
        <li>
          {"- "}
          <a
            class="text-blue-200 underline"
            href="https://github.com/TheoBr/roundest-mon"
          >
            Public Github repo
          </a>
        </li>
        <li>
          {"- "}
          <a
            class="text-blue-200 underline"
            href="https://www.twitch.tv/videos/1215014362"
          >
            Twitch stream where I built this monstrosity
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
