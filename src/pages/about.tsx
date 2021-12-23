const AboutPage = () => {
  return (
    <div class="flex flex-col items-center text-xl">
      <h2 class="text-2xl p-4">About</h2>
      <p class="max-w-xl">
        This is a remake of{" "}
        <a href="https://roundest.t3.gg">a dumb app I made in Next.js</a>. This
        time it's in SolidJS!
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
            href="https://github.com/TheoBr/democratic-geodude"
          >
            Public Github repo
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
