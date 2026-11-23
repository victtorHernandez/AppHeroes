import { Link, NavLink, Outlet } from 'react-router';

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <Link to="/" className="font-black tracking-wider">
            HERO<span className="text-amber-300">VERSE</span>
          </Link>
          <div className="flex gap-5 text-sm text-slate-300">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'text-amber-300' : 'hover:text-white'}>
              Inicio
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? 'text-amber-300' : 'hover:text-white'}>
              Buscar
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <Outlet />
      </main>
    </div>
  );
};
