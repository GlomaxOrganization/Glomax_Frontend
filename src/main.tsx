import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import {Home} from "./pages/Home.tsx";
import {Products} from "./pages/Products.tsx";
import {Suspense} from "react";
import {ProductDetail} from "./pages/ProductDetail.tsx";
import {Cart} from "./pages/Cart.tsx";
import {Profile} from "./pages/Profile.tsx";
import {EditProfile} from "./pages/EditProfile.tsx";
import {TransferData} from "./components/Cart/TransferData.tsx";
import {PurchaseDetail} from "./pages/PurchaseDetail.tsx";
import {ShippingData} from "./pages/ShippingData.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Sales} from "./pages/Sales.tsx";
import {CreateProducts} from "./pages/CreateProducts.tsx";
import {EditPurchase} from "./pages/EditPurchase.tsx";

const root = createRoot(document.getElementsByTagName('main')[0]);

root.render(
    <BrowserRouter>
        <Suspense fallback={<p>Cargando...</p>}>
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/productos'} element={<Products />} />
                <Route path={'/productDetail/:id'} element={<ProductDetail />} />
                <Route path={'/carrito'} element={<Cart />} />
                <Route path={'/perfil'} element={<Profile />} />
                <Route path={'/editar-perfil'} element={<EditProfile />} />
                <Route path={'/datos-transferencia'} element={<TransferData />} />
                <Route path={'/detalle-compra/:id'} element={<PurchaseDetail />} />
                <Route path={'/editar-compra/:id'} element={<EditPurchase />} />
                <Route path={'/envios'} element={<ShippingData />} />
                <Route path={'/contacto'} element={<Contact />} />
                <Route path={'/ventas'} element={<Sales />} />
                <Route path={'/crear-productos'} element={<CreateProducts />} />
            </Routes>
        </Suspense>
    </BrowserRouter>,
);
