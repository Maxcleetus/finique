const AppLoader = ({ label = 'Loading...', className = '', inline = false }) => {
  const baseClass = inline
    ? 'inline-flex items-center justify-center gap-2'
    : 'flex min-h-[120px] items-center justify-center gap-3';

  return (
    <div className={`${baseClass} ${className}`}>
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-navy/70 border-t-transparent" />
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
};

export default AppLoader;
