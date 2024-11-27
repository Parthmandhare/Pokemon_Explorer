import pokeBall from "../Assests/pokeball.png"

const Navbar = () => {
  return (
    <div className="bg-red-500 w-full flex justify-center py-2">
        <img src={pokeBall} alt="PokeBall" className="h-10" />
    </div>
  )
}

export default Navbar