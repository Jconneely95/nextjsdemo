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
  water: 'bg-blue-700',
  steel: 'bg-gray-400',
  poison: 'bg-green-800',
  mouse: 'bg-purple-700'
};

export const getPokemon = async () => {
  const response = await fetch('http://localhost:8000/pokemon/?sort=type');
  const data = await response.json();
  return data;
};

export default function PokemonPage({ details, stats }) {
  const router = useRouter();

  <PokemonList />

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon - {details && details.name}</h1>
      <div className="flex items-center justify-center mb-6">
        <Image src={details && details.imageURL} width={200} height={200} alt={details && details.name} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p>
            <span className="font-bold">Height:</span> {stats && stats.height_m} Metres
          </p>
          <p>
            <span className="font-bold">Weight:</span> {stats && stats.weight_kg} Kilograms
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>
            <span className="font-bold">Speed:</span> {stats && stats.speed}
          </p>
          <p>
            <span className="font-bold">Attack:</span> {stats && stats.attack}
          </p>
          <p>
            <span className="font-bold">Defense:</span> {stats && stats.defense}
          </p>
          <p>
            <span className="font-bold">HP:</span> {stats && stats.hp}
          </p>
        </div>
      </div>
      {details && details.types && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Type</h2>
          <div className="flex space-x-2">
            {details.types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded text-white text-sm font-semibold"
                style={{ backgroundColor: typeColors[type.toLowerCase()] }}
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
  const pokemonName = context.params.pokemonname;

  // Fetch Pokemon details from your backend API
  const detailsResponse = await fetch(`http://127.0.0.1:8000/pokemon/${pokemonName}`);
  const detailsData = await detailsResponse.json();

  // Fetch Pokemon stats from your backend API
  const statsResponse = await fetch(`http://127.0.0.1:8000/pokemon/stats/${pokemonName}`);
  const statsData = await statsResponse.json();

  return {
    props: {
      details: detailsData,
      stats: statsData,
    },
  };
}


