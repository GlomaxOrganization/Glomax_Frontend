import { useMemo } from "react";

const links = [
    "https://www.mercadolibre.com.ar/pagina/glomax?item_id=MLA927433224&category_id=MLA373770&seller_id=506927785&client=recoview-selleritems&recos_listing=true#origin=vip&component=sellerData&typeSeller=eshop",
    "https://listado.mercadolibre.com.ar/_CustId_393183293?item_id=MLA1485162161&category_id=MLA373770&seller_id=393183293&client=recoview-selleritems&recos_listing=true#origin=upp&component=sellerData&typeSeller=classic",
    "https://listado.mercadolibre.com.ar/_CustId_211543848?item_id=MLA1849739248&category_id=MLA109096&seller_id=211543848&client=recoview-selleritems&recos_listing=true#origin=vip&component=sellerData&typeSeller=classic",
];

export const RandomMercadoLibreLink = ()=> {
    const randomLink = useMemo(() => links[Math.floor(Math.random() * links.length)], []);

    return (
        <div className="grid place-items-center">
            <a href={randomLink} target="_blank" rel="noopener noreferrer">
                <img src="/mercadoLibre.svg" alt="Mercado Libre" className="w-12 mx-auto" />
            </a>
        </div>
    );
}
