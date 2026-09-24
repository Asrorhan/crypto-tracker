import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CryptoCard from '../components/CryptoCard';

function Home() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState('market_cap_rank');
    const [sortOrder, setSortOrder] = useState('asc');
    const [viewMode, setViewMode] = useState(() => {
        return localStorage.getItem('viewMode') || 'grid';
    });

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        localStorage.setItem('viewMode', mode);
    };
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetCryptosQuery();

    if (isLoading) return <div>Loading..</div>
    if (isError) return <div>Something went wrong!</div>

    const processedCoins =
        data?.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()
            )).
            sort((a, b) => {
                if (sortOrder === "asc") {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                }
                return a[sortBy] < b[sortBy] ? 1 : -1;
            })
    return (
        <div>
            <div className="controls-container">
                <input type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search Cryptocurrency' />

                <select value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}>
                    <option value="market_cap_rank">Rank</option>
                    <option value="current_price">Price</option>
                    <option value="price_change_percentage_24h">24h Change</option>
                </select>

                <select value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Low to High (Ascending)</option>
                    <option value="desc">High to Low (Descending)</option>
                </select>

                <div className='view-mode-toggle' >
                    <button
                        className={viewMode === "grid" ? "active" : ""}
                        onClick={() => handleViewModeChange("grid")}
                    >
                        Grid
                    </button>
                    <button
                        className={viewMode === "table" ? "active" : ""}
                        onClick={() => handleViewModeChange("table")}
                    >
                        Table
                    </button>
                </div>
            </div>

            {viewMode === "grid" ? (
                <ol className='crypto-list'>
                    {processedCoins?.map((coin) => (
                        <CryptoCard key={coin.id} coin={coin} />
                    ))}
                </ol>
            ) : (
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processedCoins?.map((coin) => (
                            <tr
                                key={coin.id}
                                onClick={() => navigate(`/coin/${coin.id}`)}
                                className="clickable-row"
                            >
                                <td>{coin.market_cap_rank}</td>
                                <td className="coin-cell">
                                    <img src={coin.image} alt={coin.name} width="20" />
                                    <span>{coin.name}</span>
                                </td>
                                <td>${coin.current_price?.toLocaleString()}</td>
                                <td>{coin.price_change_percentage_24h?.toFixed(2)}%</td>
                                <td>${coin.market_cap?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home