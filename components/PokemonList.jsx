import React from 'react';
import Link from 'next/link';

export const getPokemon = async () => {
  const response = await fetch('http://localhost:8000/pokemon/?sort=type');
  const data = await response.json();
  return data;
};



const typeColours = {
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

function PokemonListItem({ pokemon }) {
  return (
    <Link href={`/pokemons/${pokemon.name}`}>
      <li className="border border-gray-400 p-5 flex flex-col">
        <span className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full ${typeColours[pokemon.type1]}`}></div>
          <span className="text-gray-700 text-xl">{pokemon.name}</span>
        </span>
        <span className="text-gray-700">{pokemon.classification}</span>
      </li>
    </Link>
  );
}

export default function PokemonList({ pokemons }) {
  return (
    <ul>
      {pokemons.length > 0 ? (
        pokemons.map((pokemon, index) => <PokemonListItem pokemon={pokemon} key={index} />)
      ) : (
        <h1 className="text-3xl text-gray-600">No Pokemons Found</h1>
      )}
    </ul>
  );
}





