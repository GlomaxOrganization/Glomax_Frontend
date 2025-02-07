import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import {Home} from "./pages/Home.tsx";
import {Products} from "./pages/Products.tsx";
import {Suspense} from "react";
import {ProductDetail} from "./pages/ProductDetail.tsx";

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
    <BrowserRouter>
        <Suspense fallback={<p>Cargando...</p>}>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/products'} element={<Products />} />
                <Route path={'/productDetail/:id'} element={<ProductDetail />} />
            </Routes>
        </Suspense>
    </BrowserRouter>,
);
