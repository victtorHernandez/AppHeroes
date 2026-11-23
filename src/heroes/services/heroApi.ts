import axios from 'axios';

export interface Hero {
  id: string;
  name: string;
  alias: string;
  powers: string[];
  description: string;
  strength: number;
  intelligence: number;
  speed: number;
  durability: number;
  team: string;
  image: string;
  firstAppearance: string;
  status: string;
  category: string;
  universe: string;
}

const apiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(
  /\/+$/,
  '',
);
const api = axios.create({ baseURL: apiUrl });

export async function getHeroes(signal?: AbortSignal): Promise<Hero[]> {
  const { data } = await api.get<{ heroes: Hero[] }>('/api/heroes', {
    params: { limit: 25 },
    signal,
  });
  return data.heroes;
}

export async function getHero(id: string, signal?: AbortSignal): Promise<Hero> {
  const { data } = await api.get<Hero>(
    `/api/heroes/${encodeURIComponent(id)}`,
    { signal },
  );
  return data;
}

export function getHeroImage(image: string): string {
  return `${apiUrl}/images/${encodeURIComponent(image)}`;
}
