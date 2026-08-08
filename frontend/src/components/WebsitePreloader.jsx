const WebsitePreloader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-center h-14 mb-2 gap-0">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <img
            key={idx}
            src={`/assets/logo_letter_${idx}.png`}
            alt=""
            className="preloader-letter h-14 w-auto object-contain"
            style={{ animationDelay: `${idx * 0.12}s` }}
          />
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-slate-100" />
    </div>
  );
};

export default WebsitePreloader;
