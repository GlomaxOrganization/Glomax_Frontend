import { Hero } from "../components/home/Hero.tsx";
import { Header } from "../components/General/Header.tsx";
import {VarietyOfProducts} from "../components/home/VarietyOfProducts.tsx";
import {ShippingType} from "../components/home/ShippingType.tsx";

export const Home = () => {
    return (
        <>
            <Header userObtained={null} />
            <Hero />
            <VarietyOfProducts />
            <ShippingType />
        </>
    );
};
