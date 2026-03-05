import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/enquiries', label: 'Enquiries' }
];

const AdminLayout = () => {
  const { logout, admin } = useAuth();

  return (
    <div className="min-h-screen bg-brand-slate">
      <header className="border-b border-brand-border bg-white">
        <div className="container-shell flex h-16 items-center justify-between">
          <p className="text-sm font-bold text-brand-navy">FINIQUE Admin</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">{admin?.email}</span>
            <button type="button" onClick={logout} className="rounded-md bg-brand-navy px-3 py-2 text-xs text-white">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-shell grid gap-6 py-8 lg:grid-cols-[240px,1fr]">
        <aside className="card h-fit p-3">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-semibold ${
                  isActive ? 'bg-brand-navy text-white' : 'text-brand-navy hover:bg-brand-slate'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </aside>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
