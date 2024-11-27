import React from 'react';
import { useNavigate } from 'react-router-dom';
import PokemonCardSkeleton from './PokemonCardSkeleton'; 

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  loading: boolean; // New prop for loading state
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, sprite, loading }) => {
  const navigate = useNavigate();

  // Render skeleton if loading is true
  if (loading) {
    return <PokemonCardSkeleton  />;
  }

  return (
    <div
      className="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl"
      onClick={() => navigate(`/pokemon/${id}`)}
    >
      <img src={sprite} alt={name} className="mx-auto" loading="lazy" />
      <div className="mt-4 text-center">
        <h3 className="text-xl font-semibold">#{id} {name}</h3>
        <div className="text-sm text-gray-500">{types.join(', ')}</div>
      </div>
    </div>
  );
};

export default PokemonCard;
