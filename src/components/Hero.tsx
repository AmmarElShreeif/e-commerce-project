//

export default function Hero() {
  return (
    <section className="bg-center bg-no-repeat bg-[url('/hero.webp')] bg-gray-300 bg-blend-soft-light">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-secoundry-100 md:text-5xl lg:text-6xl">
          Discover Your Style, Redefine Fashion
        </h1>
        <p className="mb-8 text-lg font-semibold text-secoundry-100 lg:text-xl sm:px-16 lg:px-48">
          Step into TrendHive, your ultimate destination for modern and stylish
          clothing. Explore a curated collection of trendy apparel and
          accessories designed to elevate your wardrobe.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-md bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-100"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-bold text-center text-black rounded-md border border-spacing-2 border-black hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}
