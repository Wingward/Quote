import { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const quotes = useRef([]);
  const quote = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  const fetchQuotes = async () => {
    try {
      if (quoteRef.current) quoteRef.current.innerText = "Yükleniyor...";
      if (authorRef.current) authorRef.current.innerText = "";

      const response = await fetch(`/api/zenquotes?t=${new Date().getTime()}`);

      if (!response.ok) throw new Error("Ağ hatası");

      const data = await response.json();

      quotes.current = data;
      getRandomQuote();
    } catch (error) {
      if (quoteRef.current) quoteRef.current.innerText = "ZenQuotes verisi alınamadı.";
    }
  };

  const getRandomQuote = () => {
    if (quotes.current?.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.current.length);

      quote.current = quotes.current[randomIndex];

      if (quoteRef.current) quoteRef.current.innerText = `"${quote.current?.q}"`;
      if (authorRef.current) authorRef.current.innerText = `— ${quote.current?.a}`;
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className='container'>
      <h1>Project: Quote Generator</h1>
      <button onClick={fetchQuotes}>New Quote</button>
      <div className="quote-container">
        <p className="quote" ref={quoteRef}>Yükleniyor...</p>
        <strong className="author" ref={authorRef}></strong>
      </div>
    </div>
  );
};

export default App;