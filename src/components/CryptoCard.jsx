
function CryptoCard({ coin }) {
    return (
        <div className="crypto-card">
            <img src={coin.image} alt={coin.name} width="30" />
            <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
            <p>Price: {coin.current_price}</p>
            <p className={coin.price_change_percentage_24h > 0 ? "price-positive" : "price-negative"}>
                24h: {coin.price_change_percentage_24h}%
            </p>
        </div>
    )
}

export default CryptoCard