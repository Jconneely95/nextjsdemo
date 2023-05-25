import React, { useState } from 'react';
import Head from 'next/head';
import PokemonList from '@/components/PokemonList';
import Title from '@/components/Title';

export default function Pokemons({ pokemonsList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredPokemons = pokemonsList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Pokedex Home</title>
      </Head>
      <div className="bg-blue-400 min-h-screen flex flex-col items-center justify-center">
        <Title content="Choose your Pokemon!" className="text-4xl font-bold text-white mb-4" />

        <div className="mb-4">
          <label htmlFor="searchInput" className="text-white font-bold">
            Search Pokémon by name:
          </label>
          <input
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter Pokémon name"
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <PokemonList pokemons={filteredPokemons} />
      </div>

      <style jsx>{`
        .pokemon-name {
          font-weight: 900;
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch('http://127.0.0.1:8000/pokemon');
    const data = await response.json();

    return {
      props: {
        pokemonsList: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        pokemonsList: [],
      },
    };
  }
}



