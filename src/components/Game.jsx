import Card from './Card.jsx'

import {useEffect, useState} from 'react';

function Game() {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function getPokemon(id) {
            try{
                const call = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const result = await call.json();
                return ({
                    name: result.name,
                    icon: result.sprites.front_default,
                    id: id,
                })
            }
            catch(err) {
                console.log(err);
            }
            
        }
        async function getPokemonsList() {
            const random = Math.floor(Math.random() * 500);
            const randomList = [...Array(9).keys()].map((key) => key+random)
            setPokemons(await Promise.all(randomList.map(getPokemon)));
        }
    
        getPokemonsList();
    }, []);
    
    

    return (
        <div className="container-fluid">
            {pokemons.map((pokemon) => {
                return (
                    <Card pokemon={pokemon} key={pokemon.id}/>
                )
            })}
        </div>
    )
}

export default Game;