import { Link } from 'react-router-dom';

function CryptoCard({ coin }) {
    const isPositive = coin.price_change_percentage_24h >= 0;

    return (
        <li className="crypto-card-item">
            <Link to={`/coin/${coin.id}`} className="crypto-card">
                <img src={coin.image} alt={coin.name} />
                <h3>{coin.name} ({coin.symbol?.toUpperCase()})</h3>
                <p className="price">${coin.current_price?.toLocaleString()}</p>
                <p className={`change ${isPositive ? 'positive' : 'negative'}`}>
                    24h: {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
            </Link>
        </li>
    );
}

export default CryptoCard;