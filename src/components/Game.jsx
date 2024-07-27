import Card from './Card.jsx'

import {useEffect, useState} from 'react';

function Game() {
    const [pokemons, setPokemons] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [loading, setLoading] = useState(false);

    async function getPokemon(id) {
        try{
            const call = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (call.status >= 400) {
                throw new Error("server error");
            }
            else {
                const result = await call.json();
                return ({
                    name: result.name,
                    icon: result.sprites.front_default,                    
                    id: id,
                    isChosen: false,
                })
            }            
        }
        catch(err) {
            console.log(err);
        }
    }
    async function fetchPokemons() {
        setLoading(true);
        let indices = [...Array(300).keys()];
        let selected = [];

        while (selected.length < 9) {
            const randomIdx = Math.floor(Math.random() * indices.length);
            selected.push(indices[randomIdx]);
            indices.splice(randomIdx, 1);
        }
        setPokemons(await Promise.all(selected.map(getPokemon)));
        setLoading(false);
    }

    // At initial mount - setPokemons to random list of 9 pokemons
    useEffect(() => {
        fetchPokemons();
    }, []);

    // Shuffle cards at each round
    useEffect(() => {
        shufflePokemons();
    }, [playerScore]);

    // Update scores at each round
    useEffect(() => {
        if (playerScore > highScore) setHighScore(playerScore);
    },[playerScore, highScore])


    function shufflePokemons() {
        const array = [...pokemons];
        /* Randomize array in-place using Durstenfeld shuffle algorithm */

        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        setPokemons(array);
    }

    return (
        <>
            <div className='d-flex flex-column align-items-start'>
                <div className='m-1'><span className='fw-bold'>Current score: </span> {playerScore}</div>
                <div className='m-1'><span className='fw-bold'>High score: </span>{highScore}</div>
            </div>

            <div className='text-danger'>Don&#39;t click on the same pokemon twice</div>
            
            <div className="d-flex flex-wrap justify-content-center">
                {pokemons.map((pokemon) => {
                    return (
                        <Card pokemon={pokemon} pokemons={pokemons} setPokemons={setPokemons} shufflePokemons={shufflePokemons} loading={loading} playerScore = {playerScore} setPlayerScore ={setPlayerScore} key={pokemon.id}/>
                    )
                })}
            </div>
        </>
    )
}

export default Game;