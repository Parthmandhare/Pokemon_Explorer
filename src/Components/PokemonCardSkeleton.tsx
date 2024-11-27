

const PokemonCardSkeleton = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="w-3/4">
        <div className="w-full rounded overflow-hidden shadow-lg animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="px-4 py-4">
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
            </div>
            <div className="px-4 pt-4 pb-2">
                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
        </div>
    </div>
</div>
  )
}

export default PokemonCardSkeleton