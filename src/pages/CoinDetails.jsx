import { useParams, Link } from 'react-router-dom';
import { useGetCoinDetailsQuery } from '../services/cryptoApi';
import { useGetCoinHistoryQuery } from '../services/cryptoApi';
import Chart from 'react-apexcharts';
import { useState } from 'react';

function CoinDetails() {
    const [days, setDays] = useState("7");

    const { id } = useParams();
    const { data, isLoading, isError } = useGetCoinDetailsQuery(id);
    const { data: historyData, isLoading: historyLoading } = useGetCoinHistoryQuery({ coinId: id, days });

    if (isLoading) return <h2>Loading..</h2>;
    if (isError) return <h2>Something went wrong!</h2>;

    const priceList = historyData?.prices?.map((item) => item[1]);
    const timeList = historyData?.prices?.map((item) => {
        const date = new Date(item[0]);
        return date.toLocaleDateString();
    });

    const chartOptions = {
        chart: {
            id: 'coin-price-chart',
            toolbar: { show: false },
        },
        xaxis: {
            categories: timeList || [],
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#3b82f6'],
    }
    const chartSeries = [
        {
            name: 'Price (USD)',
            data: priceList || [],
        }
    ]
    const timeFrameOptions = ["1", "7", "30", "365"]

    return (
        <div className='coin-details-container' >
            <Link className="back-link" to="/">← Back</Link>

            <div className="coin-details-card">
                <img src={data?.image?.large} alt={data?.name} width="80" />
                <h1>{data?.name} ({data?.symbol?.toUpperCase()})</h1>
                <p><strong>Rank:</strong> #{data?.market_cap_rank}</p>
                <p><strong>Current Price:</strong> ${data?.market_data?.current_price?.usd}</p>
                <p><strong>24h Changing:</strong> {data?.market_data?.price_change_percentage_24h}%</p>
                <p><strong>Market Cap:</strong> ${data?.market_data?.market_cap?.usd?.toLocaleString()}</p>
            </div>

            <div className='timeframe-container'>
                {timeFrameOptions.map((time) => {
                    return <button
                        key={time}
                        onClick={() => setDays(time)}
                        className={days === time ? "active" : ""}
                    >
                        {time}D
                    </button>
                })}
            </div>

            {
                historyLoading ? (
                    <div>History loading..</div>
                ) : (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="line"
                        height={350}
                    />
                )
            }
        </div >
    );
}

export default CoinDetails;