import React from 'react'
import PokemonCardSkeleton from './PokemonCardSkeleton'

const PokemonGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 gap-5 mt-5">
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton />
    </div>
  )
}

export default PokemonGridSkeleton