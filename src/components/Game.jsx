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
            const result = await call.json();
            return ({
                name: result.name,
                icon: result.sprites.front_default,                    
                id: id,
                isChosen: false,
            })
        }
        catch(err) {
            console.log(err);
        }
    }
    async function fetchPokemons() {
        setLoading(true);
        let indices = [...Array(200).keys()];
        let selected = [];

        while (selected.length < 9) {
            console.log(randomIdx);
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

    function resetGame() {
        fetchPokemons();
        setPlayerScore(0);
        setHighScore(0);
    }
    
    console.log(pokemons);
    return (
        <>
            <div>
                <div>Current score: {playerScore}</div>
                <div>High score: {highScore}</div>
            </div>
            <button className='btn btn-primary' onClick={resetGame} disabled={loading}>Reset Game</button>
            
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