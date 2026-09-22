import { useParams, Link } from 'react-router-dom';
import { useGetCoinDetailsQuery } from '../services/cryptoApi';

function CoinDetails() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetCoinDetailsQuery(id);

    if (isLoading) return <h2>Yuklanmoqda...</h2>;
    if (isError) return <h2>Xatolik yuz berdi!</h2>;

    return (
        <div className='coin-details-containe'>
            <Link className="back-link" to="/">← Back</Link>

            <div className="coin-details-card">
                <img src={data?.image?.large} alt={data?.name} width="80" />
                <h1>{data?.name} ({data?.symbol?.toUpperCase()})</h1>
                <p><strong>Rank:</strong> #{data?.market_cap_rank}</p>
                <p><strong>Current Price:</strong> ${data?.market_data?.current_price?.usd}</p>
                <p><strong>24h Changing:</strong> {data?.market_data?.price_change_percentage_24h}%</p>
                <p><strong>Market Cap:</strong> ${data?.market_data?.market_cap?.usd?.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default CoinDetails;