import { useGetCryptosQuery } from '../services/cryptoApi'
import { useState } from 'react';
import CryptoCard from '../components/CryptoCard';

function Home() {
    const { data, isLoading, isError } = useGetCryptosQuery();
    const [searchTerm, setSearchTerm] = useState("")

    if (isLoading) return <div>Loading..</div>
    if (isError) return <div>Something went wrong</div>
    return (
        <div>
            <input type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search Cryptocurrency' />
            <ol className='crypto-list'>
                {data?.filter((coin) =>
                    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).
                    map((coin) => (
                        <CryptoCard key={coin.id} coin={coin} />
                    ))}
            </ol>
        </div>
    )
}

export default Home