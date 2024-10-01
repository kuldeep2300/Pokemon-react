import { useEffect, useState } from "react";
import "./Pokemon.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        // console.log(curPokemon.url);

        const res = await fetch(curPokemon.url);
        const data = await res.json();

        // console.log(data); this will represt object like data, but when we return this, it will return promises

        return data;
      });

      console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //Search Functionality
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="waiting">
        <h1>Loading...</h1>
      </div>
    );

  if (error)
    return (
      <div>
        <h1>Errro: {error.message} </h1>
      </div>
    );

  return (
    <section className="container">
      <header data-aos="fade-down">
        <h1>Let's Catch Pokemon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokemon"
          data-aos="fade-right"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
          {/* {pokemon.map((curPokemon) => { */}
          {searchData.map((curPokemon) => {
            return (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            );
          })}
        </ul>
      </div>
    </section>
  );
};
