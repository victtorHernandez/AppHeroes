import { useEffect, useMemo, useState } from 'react';

import { HeroCard } from '@/heroes/components/HeroCard';
import { getHeroes, type Hero } from '@/heroes/services/heroApi';

export const SearchPage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [query, setQuery] = useState('');
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

  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return heroes;
    return heroes.filter((hero) =>
      [hero.alias, hero.name, hero.team, hero.universe, ...hero.powers]
        .join(' ')
        .toLocaleLowerCase()
        .includes(term),
    );
  }, [heroes, query]);

  return (
    <section>
      <h1 className="text-3xl font-black">Buscar personajes</h1>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Nombre, universo, equipo o poder"
        aria-label="Buscar personajes"
        className="mt-5 w-full max-w-xl rounded-lg border border-white/15 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-amber-300"
      />
      {loading && <p className="py-10 text-center text-slate-300">Cargando personajes...</p>}
      {error && <p role="alert" className="mt-5 text-red-300">No se pudo conectar con la API: {error}</p>}
      {!loading && !error && (
        <>
          <p className="my-5 text-sm text-slate-400">{results.length} resultados</p>
          {results.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
            </div>
          ) : (
            <p className="py-8 text-slate-300">No hay personajes que coincidan.</p>
          )}
        </>
      )}
    </section>
  );
};
