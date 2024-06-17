import Nav from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      <div className="w-full items-center">
        <div className="font-bambi">
          <h1>Forever Awaits</h1>
          <p>10.12.24</p>
        </div>
        <Nav />
      </div>

      <div
        id="when"
        className="mb-32 grid text-center lg:w-full lg:mb-0 lg:text-center bg-wheat p-24"
      >
        <h2 className="font-bambi text-8xl lg:text-left text-peach mb-8">
          when
        </h2>
        <div className="text-black text-3xl">
          <strong>
            <p>Saturday, October 12th, 2024</p>
          </strong>
          <p>Ceremony: 3:30pm</p>
          <p>Reception: ~5:30pm</p>
          <p className="text-xl">
            *We're still finalizing the schedule. Check back closer to the
            wedding for the full rundown.
          </p>
        </div>
      </div>

      <div
        id="where"
        className="mb-32 grid text-center lg:w-full lg:mb-0 lg:text-center bg-sage p-24"
      >
        <h2 className="font-bambi text-8xl lg:text-left text-wheat mb-8">
          where
        </h2>
        <p>
          Wilderness Lodge
          <br />
          13448 Weeks Valley Rd
          <br />
          Wattsburg, PA 16442
        </p>
      </div>

      <div id="who">
        <div>
          <h2>Drew</h2>
        </div>
        <div>
          <h2>Ainsley</h2>
        </div>
      </div>

      <div id="wear">Cocktail Attire</div>
      <div id="what">registry</div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
