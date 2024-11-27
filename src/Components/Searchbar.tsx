import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPokemonById } from '../Store/Slices/pokemonSlice'; // Adjust path
import { RootState, AppDispatch } from '../Store/store'; // Adjust path
import { useDispatch as useReduxDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAppDispatch: () => AppDispatch = useReduxDispatch;

const Searchbar = () => {

  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { selectedPokemon } = useSelector((state: RootState) => state.pokemon);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchPokemonById(query.toLowerCase()));
    }
    // if(selectedPokemon?.id){
      navigate(`/pokemon/${selectedPokemon?.id}`)
    // }
  };

  return (
 
      <form className="flex flex-col md:flex-row gap-4 w-full" onSubmit={handleSearch}>
        <div className="flex gap-2 bg-slate-200 p-1 items-center rounded-md pl-5 pr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for Pokémon..."
            className="bg-slate-200 text-gray-400 w-fit mx-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <button className="bg-red-500 text-white px-8 py-1 font-semibold rounded-md">
          Search
        </button>
      </form>

    

  );
};

export default Searchbar;
