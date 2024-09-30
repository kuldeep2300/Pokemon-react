import "./Pokemon.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

export const PokemonCards = ({ pokemonData }) => {

  return (
    <li className="pokemon-card" data-aos="fade-up">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>
      <h2 className="pokemon-name"> {pokemonData.name} </h2>

      <div className="pokemon-info pokemon-hightlight">
        <p>
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>

      <div className="grid-three--cols">
        <p className="pokemon-info">
          <span>Height: </span> {pokemonData.height}
        </p>
        <p className="pokemon-info">
          <span>Weight: </span> {pokemonData.weight}
        </p>
        <p className="pokemon-info">
          <span>Speed: </span> {pokemonData.stats[5].base_stat}
        </p>
      </div>

      <div className="grid-three--cols">
        <div className="pokemon-info">
          <span>Experience: </span>
          <p> {pokemonData.base_experience} </p>
        </div>
        <div className="pokemon-info">
          <span>Attack: </span>
          <p> {pokemonData.stats[1].base_stat} </p>
        </div>
        <div className="pokemon-info">
          <span>Abilities: </span>
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)}
          </p>
        </div>
      </div>
    </li>
  );
};
