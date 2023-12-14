import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body">
      <div className="spinner"><img src="/assets/conversion.png" alt="conversion image" width="150"></img></div>
      <header>
        <h1>
            Gotta Convert Them All
        </h1>
        <hr />
      </header>
      <main>App components go here</main>
      <footer>
        <nav>
            <li><a className="github" href="https://github.com/StarLicker/startup/tree/main">GitHub Repo</a></li>
        </nav>
    </footer>
    </div>
  );
}