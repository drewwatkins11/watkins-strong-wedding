import Nav from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="w-full items-center">
        <div className="font-bambi">
          <h1>Forever Awaits</h1>
          <p>10.12.24</p>
        </div>
        <Nav />
      </div>

      <div id="when">
        <div>
          <p>Saturday, October 12th, 2024</p>
          <p>Ceremony: 3:30pm</p>
          <p>Reception: ~5:30pm</p>
          <p>
            *We're still finalizing the schedule. Check back closer to the
            wedding for the full rundown.
          </p>
        </div>
      </div>

      <div id="who">
        <div>
          <h2>Drew</h2>
        </div>
        <div>
          <h2>Ainsley</h2>
        </div>
      </div>

      <div id="where">
        <h2>where</h2>
        <p>
          Wilderness Lodge
          <br />
          13448 Weeks Valley Rd
          <br />
          Wattsburg, PA 16442
        </p>
      </div>
      <div id="wear">Cocktail Attire</div>
      <div id="what">registry</div>
    </main>
  );
}
