import React, { useState } from 'react';

import './App.css';

import SearchForm from './components/SearchForm';
import Results from './components/Results';

function App() {
  const [dinghies, setDinghies] = useState();

  function search(name, manufacturer, crew, symmetric, asymmetric, trapeze) {
    // TODO Make this more concise
    let queryString = "/v1/dinghies?";
    if (name) {
      queryString += "name=" + name;
    }
    if (manufacturer) {
      queryString += "&manufacturer=" + manufacturer;
    }
    if (crew) {
      queryString += "&crew=" + crew;
    }
    if (symmetric) {
      queryString += "&symmetric=" + symmetric;
    }
    if (asymmetric) {
      queryString += "&asymmetric=" + asymmetric;
    }
    if (trapeze) {
      queryString += "&trapeze=" + trapeze;
    }
    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setDinghies(() => data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function clearResults() {
    setDinghies(() => null);
  }

  return (
    <div>
      <header>
        <h1>Dinghy Search</h1>
        <p>If you want to use the API in your own projects check out the <a href="/swagger-ui/index.html">API documentation</a></p>
        <SearchForm search={search} clearResults={clearResults} />
      </header>
      <main>
        <Results dinghies={dinghies} />
      </main>
    </div>
  );
}

export default App;
