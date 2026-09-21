import React from 'react'
import { useGetCryptosQuery } from './services/cryptoApi'

function App() {
  const { data, isLoading, isError } = useGetCryptosQuery();
  if (isLoading) return <div>Yuklanmoqda</div>
  if (isError) return <div>Xatolik yuz berdi</div>
  return (
    <div>
      <ol>
        {data?.map((coin) => (
          <li key={coin.id}>{coin.name} - {coin.current_price}</li>
        ))}
      </ol>
    </div>
  )
}

export default App