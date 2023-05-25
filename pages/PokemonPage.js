import React from 'react';
import { useRouter } from 'next/router';

const PokemonPage = () => {
  const router = useRouter();
  const { pokemonName } = router.query;


  return (
    <div>
      <h1>{pokemonName}</h1>
      {/* Display the Pokemon details and stats here */}
    </div>
  );
};

export default PokemonPage;
