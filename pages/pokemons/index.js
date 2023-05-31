import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import PokemonList from '@/components/PokemonList';
import Title from '@/components/Title';

export default function Pokemons({ pokemonsList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 22;
  const filteredPokemons = pokemonsList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pageCount = Math.ceil(filteredPokemons.length / itemsPerPage);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedPokemons = filteredPokemons.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>Pokedex Home</title>
      </Head>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="bg-gray-800 py-8">
          <div className="container mx-auto px-4">
            <Title content="Choose your Pokemon!" className="text-5xl font-bold mb-4 text-center" />

            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <label htmlFor="searchInput" className="text-gray-200 font-bold mb-2">
                  Search Pokémon by name:
                </label>
                <input
                  type="text"
                  id="searchInput"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Enter Pokémon name"
                  className="w-full p-4 bg-gray-900 text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              {paginatedPokemons.map((pokemon) => (
                <div key={pokemon.name} className="flex items-center">
                  <Link href={`/pokemons/${pokemon.name}`}>
                    <img
                      src={`/images/pokemon/${pokemon.name}.png`}
                      alt={pokemon.name}
                      className="w-12 h-12 mr-4 cursor-pointer"
                    />
                  </Link>
                  <Link href={`/pokemons/${pokemon.name}`}>
                    <div className="pokemon-name text-white cursor-pointer">{pokemon.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={'pagination-container'}
              activeClassName={'active'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-link'}
              nextClassName={'page-link'}
              disabledClassName={'disabled'}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .pokemon-name {
          font-weight: bold;
          color: white;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .page-item {
          list-style-type: none;
          margin: 0 0.5rem;
        }

        .page-link {
          display: inline-block;
          padding: 0.5rem 1rem;
          color: white;
          background-color: gray;
          border: none;
          cursor: pointer;
        }

        .active .page-link {
          background-color: blue;
        }

        .disabled .page-link {
          opacity: 0.5;
          pointer-events: none;
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

























