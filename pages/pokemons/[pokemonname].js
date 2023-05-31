import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PokemonList from '@/components/PokemonList';

const typeColors = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-400',
  bug: 'bg-green-200',
  normal: 'bg-purple-200',
  flying: 'bg-orange-200',
  electric: 'bg-yellow-200',
  rock: 'bg-red-700',
  fairy: 'bg-pink-200',
  psychic: 'bg-pink-300',
  ice: 'bg-blue-800',
  dark: 'bg-gray-900',
  fighting: 'bg-red-200',
  ground: 'bg-red-900',
  ghost: 'bg-gray-200',
  dragon: 'bg-purple-800',
  steel: 'bg-gray-400',
  poison: 'bg-green-800',
  mouse: 'bg-purple-700',
};

export default function PokemonPage({ pokemon, stats }) {
  const router = useRouter();
  const { pokemonname } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon - {pokemonname}</h1>
      <div className="flex justify-center items-center">
          {pokemon && (
            <img
              src={`/images/pokemon/${pokemonname}.png`}
              alt={pokemonname}
              width={300}
              height={300}
              className="rounded-lg"
            />
          )}
        </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p>
            <span className="font-bold text-gray-700">Generation:</span> {pokemon && pokemon.data.generation}
          </p>
          <p>
            <span className="font-bold text-gray-700">Classification:</span> {pokemon && pokemon.data.classification}
          </p>
          <p>
            <span className="font-bold text-gray-700">Type:</span>{" "}
            <span
              className={`px-3 py-1 rounded text-white text-sm font-semibold ${typeColors[pokemon && pokemon.data.type1]}`}
            >
              {pokemon && pokemon.data.type1 && pokemon.data.type1.charAt(0).toUpperCase() + pokemon.data.type1.slice(1)}
            </span>
          </p>
          <p>
            <span className="font-bold text-gray-700">Sub Type:</span>{" "}
            <span
              className={`px-3 py-1 rounded text-white text-sm font-semibold ${typeColors[pokemon && pokemon.data.type2]}`}
            >
              {pokemon && pokemon.data.type2 && pokemon.data.type2.charAt(0).toUpperCase() + pokemon.data.type2.slice(1)}
            </span>
          </p>
          <p>
            <span className="font-bold text-gray-700">Height:</span> {stats && stats.height_m} Metres
          </p>
          <p>
            <span className="font-bold text-gray-700">Weight:</span> {stats && stats.weight_kg} Kilograms
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>
            <span className="font-bold text-gray-700">Speed:</span> {stats && stats.speed}
          </p>
          <p>
            <span className="font-bold text-gray-700">Attack:</span> {stats && stats.attack}
          </p>
          <p>
            <span className="font-bold text-gray-700">Defense:</span> {stats && stats.defense}
          </p>
          <p>
            <span className="font-bold text-gray-700">HP:</span> {stats && stats.hp}
          </p>
        </div>
      </div>
      {pokemon && pokemon.types && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Type</h2>
          <div className="flex space-x-2">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded text-white text-sm font-semibold ${typeColors[type.toLowerCase()]}`}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { pokemonname } = context.params;

  const pokemonResponse = await fetch(`http://127.0.0.1:8000/pokemon/${pokemonname}`);
  const pokemonData = await pokemonResponse.json();
  console.log('Pokemon Data:', pokemonData);

  const statsResponse = await fetch(`http://127.0.0.1:8000/pokemon/stats/${pokemonname}`);
  const statsData = await statsResponse.json();
  console.log('Stats Data:', statsData);

  return {
    props: {
      pokemon: pokemonData,
      stats: statsData,
    },
  };
}




