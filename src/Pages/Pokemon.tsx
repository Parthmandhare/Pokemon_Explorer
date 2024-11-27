import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonById } from '../Store/Slices/pokemonSlice';
import { RootState, AppDispatch } from '../Store/store';
import Navbar from '../Components/Navbar';

const Pokemon = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPokemon, loading } = useSelector((state: RootState) => state.pokemon);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(fetchPokemonById(id));
  }, [dispatch, id]);

  if (loading || !selectedPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-2 mx-8 md:mx-16 lg:mx-40 mt-10">
        <button
          className="text-red-600 font-semibold hover:text-lg w-fit"
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 shadow-lg mt-3 w-full h-full">
          <div className="flex flex-col gap-14 bg-yellow-300 text-white px-10 py-2">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold">#{selectedPokemon.id}</p>
              <p className="text-3xl font-bold">{selectedPokemon.name}</p>
            </div>
            <div className="flex justify-center">
              <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="w-1/2"
              />
            </div>
          </div>
          <div className="px-10 py-8 flex flex-col gap-5">
            <p className="text-2xl font-bold">Pokemon Data</p>
            <div className="text-slate-400 flex flex-col gap-3">
              <div className="flex gap-1">
                <div>Height:</div>
                <div>{selectedPokemon.height / 10} m</div>
              </div>
              <div className="flex gap-1">
                <div>Weight:</div>
                <div>{selectedPokemon.weight / 10} kg</div>
              </div>
              <div className="flex gap-1">
                <div>Abilities:</div>
                <div>
                  {selectedPokemon.abilities.map((a: any) => a.ability.name).join(', ')}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-slate-400">
              <p className='text-lg font-bold text-black'>Stats</p>
              {selectedPokemon.stats.map((stat: any) => (
                <div key={stat.stat.name}>
                  {stat.stat.name} - {stat.base_stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
