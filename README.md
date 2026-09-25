# Crypto Tracker Dashboard

A simple and responsive React application to track cryptocurrency prices, market ranks, and 24-hour changes in real-time.

**Live Demo:** [cryptofinance-tracker.netlify.app](https://cryptofinance-tracker.netlify.app/)

---

## 🚀 Features

- **Real-time Crypto Data**: Displays top cryptocurrencies with price and market rank.
- **Search & Sort**: Filter coins by name/symbol and sort by rank or price.
- **Grid & Table View**: Toggle between Grid cards and Table layout (saved in `localStorage`).
- **Pagination**: Easy navigation through pages with custom controls.
- **Responsive Design**: Works well on Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router
- **State Management**: Redux Toolkit (RTK Query)
- **Styling**: Custom CSS (Flexbox & CSS Grid)
- **Build Tool**: Vite
- **Deployment**: Netlify

---

## ⚙️ How to Run Locally

1. Clone the repo:
   ```bash
   git clone [https://github.com/Asrorhan/crypto-tracker.git](https://github.com/Asrorhan/crypto-tracker.git)
   ```
2. Go to project folder:
   cd crypto-tracker

3. Install dependencies:
   npm install

4. Start dev server:
   npm run dev

📂 Project Structure
src/
├── app/ # Redux store config
├── components/ # UI components (CryptoCard, Pagination, etc.)
├── features/ # RTK Query API slices
├── pages/ # Home and CoinDetails pages
└── index.css # Main CSS styles
