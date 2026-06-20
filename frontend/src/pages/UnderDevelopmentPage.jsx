import { Helmet } from 'react-helmet-async';

const UnderDevelopmentPage = () => {
  return (
    <>
      <Helmet>
        <title>FINIQUE | Website Under Development</title>
        <meta
          name="description"
          content="The new FINIQUE website is currently under development. Contact us for uPVC window and door enquiries."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="relative isolate flex min-h-screen overflow-hidden bg-[#f5f7fb] text-brand-navy">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(0,7,69,0.12),transparent_32%),radial-gradient(circle_at_12%_88%,rgba(120,136,174,0.16),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgba(0,7,69,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,7,69,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        />

        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-12">
          <header className="flex items-center justify-between border-b border-brand-navy/10 pb-6">
            <img src="/assets/logo.png" alt="FINIQUE" className="h-8 w-auto sm:h-10" />
            <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-navy/60 sm:text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>
              In progress
            </div>
          </header>

          <section className="flex flex-1 items-center py-14 sm:py-20">
            <div className="grid w-full items-end gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
              <div className="max-w-4xl">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand-navy/50 sm:text-sm">
                  A refined experience is taking shape
                </p>
                <h1 className="font-gilroy text-[clamp(3.5rem,10vw,8.5rem)] font-bold leading-[0.82] tracking-[-0.065em]">
                  Building
                  <span className="block text-brand-navy/30">something</span>
                  exceptional.
                </h1>
                <p className="mt-8 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                  Our new website is currently under development. We&rsquo;re working on a better way to explore FINIQUE windows and doors.
                </p>
              </div>

              <aside className="border-l-2 border-brand-navy pl-6 sm:pl-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-navy/45">
                  In the meantime
                </p>
                <h2 className="mt-3 font-gilroy text-2xl font-semibold">Let&rsquo;s talk about your project.</h2>
                <div className="mt-7 space-y-3 text-sm sm:text-base">
                  <a
                    href="tel:+919961707373"
                    className="group flex items-center justify-between gap-4 border-b border-brand-navy/10 pb-3 font-semibold transition-colors hover:text-blue-700"
                  >
                    +91 99617 07373
                    <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">&#8599;</span>
                  </a>
                  <a
                    href="mailto:sales@finiquewindows.com"
                    className="group flex items-center justify-between gap-4 border-b border-brand-navy/10 pb-3 font-semibold transition-colors hover:text-blue-700"
                  >
                    <span className="truncate">sales@finiquewindows.com</span>
                    <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">&#8599;</span>
                  </a>
                </div>
              </aside>
            </div>
          </section>

          <footer className="flex flex-col gap-2 border-t border-brand-navy/10 pt-6 text-xs font-medium text-brand-navy/45 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>&copy; {new Date().getFullYear()} FINIQUE. All rights reserved.</p>
            <p>Windows &middot; Doors &middot; German Engineering</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default UnderDevelopmentPage;
