import Navbar from "../Components/Navbar"
import PokemonGrid from "../Components/PokemonGrid"
import Searchbar from "../Components/Searchbar"

const Home = () => {
  return (
   <>
     <Navbar/>

     <div className="flex flex-col justify-start mt-10 gap-5 mx-5 md:mx-20 lg:mx-40">
        <div className="text-3xl md:text-4xl font-bold">Pokemon Explorer</div>
        <Searchbar/>
        <PokemonGrid />
     </div>
   </>
  )
}

export default Home