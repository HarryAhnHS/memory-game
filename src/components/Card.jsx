function Card({pokemon, pokemons, setPokemons, loading, playerScore, setPlayerScore}) {

    const handleClick = () => {
        if (pokemon.isChosen) {
            const resetPokemons = pokemons.map((pk) => {
                return {...pk, isChosen: false}
            })
            setPokemons(resetPokemons);
            setPlayerScore(0);
        }
        else {
            const updatedPokemon = {...pokemon, isChosen: true}
            const updatedPokemons = pokemons.map((pk) => {
                return pk.id === pokemon.id ? updatedPokemon : pk;
            });

            console.log(updatedPokemons);

            setPokemons(updatedPokemons);
            setPlayerScore(playerScore + 1);
        }
    };

    return (
        <div className="pokecard p-3 rounded m-3" 
        style={{backgroundColor:'lightgray', width:'30%', height: '150px', cursor:'pointer'}}
        onClick={handleClick}>
            {loading
            ?
                <p>Loading...</p>
            :
                <>
                    <img src={pokemon.icon}></img>
                    <p className="text-dark">{pokemon.name}</p>
                </>
                
                
            }

        </div>
    )
}

export default Card;