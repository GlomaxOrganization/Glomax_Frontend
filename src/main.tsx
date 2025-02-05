import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import {Home} from "./pages/Home.tsx";

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Home />} />
        </Routes>
    </BrowserRouter>,
);
