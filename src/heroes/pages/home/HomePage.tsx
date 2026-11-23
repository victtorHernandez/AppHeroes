import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { HeroCard } from '@/heroes/components/HeroCard';
import { getHeroes, type Hero } from '@/heroes/services/heroApi';

export const HomePage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    getHeroes(controller.signal)
      .then(setHeroes)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudieron cargar los héroes.',
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <section className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-950 to-slate-900 px-6 py-10 md:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
          DC · Marvel
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight md:text-5xl">
          Héroes y villanos. Sus historias, en un solo lugar.
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          Explora personajes, descubre sus poderes y encuentra a tus favoritos.
        </p>
        <Link
          to="/search"
          className="mt-6 inline-block rounded-lg bg-amber-300 px-4 py-2.5 font-bold text-slate-950 hover:bg-amber-200"
        >
          Buscar personaje
        </Link>
      </section>

      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Personajes</h2>
        {!loading && !error && (
          <span className="text-sm text-slate-400">{heroes.length} en total</span>
        )}
      </div>

      {loading && <p className="py-10 text-center text-slate-300">Cargando personajes...</p>}
      {error && (
        <p role="alert" className="rounded-lg border border-red-400/30 bg-red-950/40 p-4 text-red-200">
          No se pudo conectar con la API: {error}
        </p>
      )}
      {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
        </div>
      )}
    </>
  );
};
