import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getHero, getHeroImage, type Hero } from '@/heroes/services/heroApi';

export const HeroPage = () => {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      setError('No se indicó el personaje.');
      setLoading(false);
      return () => controller.abort();
    }

    getHero(id, controller.signal)
      .then(setHero)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar el personaje.',
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  if (loading) return <p className="py-10 text-center text-slate-300">Cargando personaje...</p>;
  if (error) return <p role="alert" className="text-red-300">{error}</p>;
  if (!hero) return <p className="text-slate-300">No se encontró el personaje.</p>;

  return (
    <article>
      <Link to="/" className="mb-6 inline-block text-sm text-amber-300 hover:text-amber-200">
        ← Volver a personajes
      </Link>
      <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-slate-900 md:grid-cols-2">
        <img src={getHeroImage(hero.image)} alt={hero.alias} className="h-full min-h-72 w-full object-cover" />
        <div className="p-6 md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-300">
            {hero.universe} · {hero.category}
          </p>
          <h1 className="mt-2 text-4xl font-black">{hero.alias}</h1>
          <p className="mt-1 text-slate-400">{hero.name}</p>
          <p className="mt-5 leading-7 text-slate-300">{hero.description}</p>
          <p className="mt-5 text-sm text-slate-400">
            Equipo: <span className="text-white">{hero.team}</span>
            <span className="mx-2">·</span>
            Primera aparición: <span className="text-white">{hero.firstAppearance}</span>
          </p>
          <h2 className="mt-7 font-bold">Poderes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {hero.powers.map((power) => (
              <li key={power} className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
                {power}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
