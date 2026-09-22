import React from 'react'
import { useGetCryptosQuery } from './services/cryptoApi'
import { useState } from 'react';
import CryptoCard from './components/CryptoCard';

function App() {
  const { data, isLoading, isError } = useGetCryptosQuery();
  const [searchTerm, setSearchTerm] = useState("")

  if (isLoading) return <div>Yuklanmoqda</div>
  if (isError) return <div>Xatolik yuz berdi</div>
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

export default App