import { Link } from 'react-router';

import { getHeroImage, type Hero } from '@/heroes/services/heroApi';

export const HeroCard = ({ hero }: { hero: Hero }) => (
  <Link
    to={`/heroes/${hero.id}`}
    className="group overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-amber-300/60"
  >
    <img
      src={getHeroImage(hero.image)}
      alt={hero.alias}
      loading="lazy"
      className="aspect-[4/3] w-full object-cover"
    />
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="text-sm text-slate-400">{hero.universe}</p>
        <h2 className="mt-1 text-lg font-bold text-white">{hero.alias}</h2>
      </div>
      <span className="text-sm text-amber-300">Ver perfil →</span>
    </div>
  </Link>
);
