import { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  const getNewQuote = async () => {
    try {
      if (quoteRef.current) quoteRef.current.innerText = "Yükleniyor...";
      if (authorRef.current) authorRef.current.innerText = "";

      const response = await fetch('/zenapi/api/random');
      const data = await response.json();

      const item = data?.[0];

      if (quoteRef.current) quoteRef.current.innerText = `"${item?.q}"`;
      if (authorRef.current) authorRef.current.innerText = `— ${item?.a}`;

    } catch (error) {
      if (quoteRef.current) quoteRef.current.innerText = "Hata oluştu.";
    }
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className='container'>
      <h1>Project: Quote Generator</h1>
      <button onClick={getNewQuote}>New Quote</button>
      <div className="quote-container">
        <p className="quote" ref={quoteRef}>Yükleniyor...</p>
        <strong className="author" ref={authorRef}></strong>
      </div>

    </div>
  );
};

export default App;