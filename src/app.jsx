import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Convert } from './convert/convert';
import { History } from './history/history';
import { Scoreboard } from './scoreboard/scoreboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body">
      <div className="spinner"><img src="/assets/conversion.png" alt="conversion image" width="150"></img></div>
      <header>
        <h1>
            Gotta Convert Them All
        </h1>
        <nav>
          <menu>
              <li><NavLink className="nav-link" to='convert'>Convert</NavLink></li>
              <li><NavLink className="nav-link" to='history'>History</NavLink></li>
              <li><NavLink className="nav-link" to='scoreboard'>Scoreboard</NavLink></li>
          </menu>
        </nav>
        <hr />
      </header>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/convert' element={<Convert />} />
        <Route path='/history' element={<History />} />
        <Route path='/scoreboard' element={<Scoreboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <footer>
        <nav>
            <li><NavLink className='nav-link' to='https://github.com/StarLicker/startup/tree/main'>GitHub Repo</NavLink></li>
        </nav>
      </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main>404: Return to sender. Address unknown.</main>;
}