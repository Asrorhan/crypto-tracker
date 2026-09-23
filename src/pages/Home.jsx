import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState } from 'react';
import CryptoCard from '../components/CryptoCard';

function Home() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState('market_cap_rank');
    const [sortOrder, setSortOrder] = useState('asc');

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

            </div>

            <ol className='crypto-list'>
                {processedCoins?.map((coin) => (
                    <CryptoCard key={coin.id} coin={coin} />
                ))}
            </ol>
        </div>
    )
}

export default Home