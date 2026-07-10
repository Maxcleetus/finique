const WebsitePreloader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white">
      <img src="/assets/logo.png" alt="FINIQUE" className="h-14 w-auto" />
      <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
        uPVC Windows & Doors
      </p>
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-slate-100" />
    </div>
  );
};

export default WebsitePreloader;
