function Card({pokemon}) {
    return (
        <div className="p-3 rounded">
            <img src={pokemon.icon}></img>
            <div className="text-primary">{pokemon.name}</div>
        </div>
    )
}

export default Card;