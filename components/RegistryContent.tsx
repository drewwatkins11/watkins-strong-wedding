export default function RegistryContent() {
  return (
    <div
      className="w-5/6 lg:w-4/5 prose prose-p:font-medium prose-xl prose-headings:mb-3 prose-p:font-montserrat prose-p:text-snow prose-p:text-xl"
      style={{ maxWidth: "1600px;" }}
    >
      <p>
        We're excited to see everyone and know many of you may be traveling from
        several states away. For those who have asked, we've added a registry
        with a few gift ideas, but we have no expectation of gifts!
      </p>
      <p>
        For those who prefer to donate to the honeymoon fund, we appreciate
        recommendations just as much as donations. We'll be visiting Norway in
        February for a week of nordic skiing. This will be the first time either
        of us have taken a transatlantic flight and we're excited to get to do
        it together!
      </p>
      <div className="p-12 border-snow border-4 border-dotted rounded-xl">
        <p>
          Despite Drew's best efforts, Ainsley talked him out of
          custom-developing the registry, thus you can find our registry on
          WithJoy ツ
        </p>
        <a
          href={process.env.NEXT_PUBLIC_REGISTRY_LINK}
          className="mb-4"
          target="_blank"
        >
          <button className="rounded-full py-2 px-6 text-sm border border-black font-semibold hover:scale-110 transition-all hover:shadow-lg bg-snow hover:bg-wheat">
            view registry on withjoy.com
          </button>
        </a>
      </div>
    </div>
  );
}
