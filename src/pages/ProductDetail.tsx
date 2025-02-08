import {useParams} from "react-router-dom";
import {useFetchCategoryById} from "../functions/useFetchCategoryById.tsx";
import {Header} from "../components/General/Header.tsx";
import {useEffect, useState} from "react";
import {ImageGallery} from "../components/Utilities/ImageGallery.tsx";
import {useFetchProduct} from "../functions/useFetchProduct.tsx";

export const ProductDetail = () => {
    const { id } = useParams();
    const category = useFetchCategoryById(id);

    const [amountSelected, setAmountSelected] = useState<number>(1);
    const [sizeSelected, setSizeSelected] = useState<number>(0);
    const [colorSelected, setColorSelected] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (category) {
            setSizeSelected(category.sizes.length > 0 ? category.sizes[0].id : 0);
            setColorSelected(category.colors.length > 0 ? category.colors[0].id : 0);
        }
    }, [category]);

    const product = useFetchProduct(id, sizeSelected, colorSelected);

    useEffect(() => {
        setIsAvailable(product == null);
    }, [product]);

    const addToCart = () => {
        if (!product) {
            setError("No se puede agregar un producto inexistente.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingProductIndex = cart.findIndex(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            (//@ts-expect-error
                item) => item.id === product.id && item.size === sizeSelected && item.color === colorSelected
        );

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].amount += amountSelected;
        } else {
            const newProduct = {
                id: product.id,
                category: product.category,
                size: sizeSelected,
                color: colorSelected,
                amount: amountSelected
            };
            cart.push(newProduct);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setError("Producto agregado correctamente!");
    };


    return (
        <div className="min-h-[93vh]">
            <Header />
            {category &&
                <div className={'grid grid-cols-2 py-20'}>
                    <div className={'w-[80%] mx-auto'}>
                        <ImageGallery images={category.images} />
                    </div>
                    <div className={'flex flex-col gap-8'}>
                        <h1 className={'text-black text-xl font-semibold'}>
                            <a href={"/products"}>Productos</a> {'> '+ category.name}
                        </h1>
                        <h1 className={'text-black text-4xl font-bold'}>{category.name}</h1>
                        <div className={'grid grid-cols-1 gap-2'}>
                            <h2 className={'text-black text-4xl font-bold'}>${category.price}</h2>
                            <h2 className={'text-black text-2xl font-semibold'}>¡${category.price - category.price * 20 / 100} con
                                transferencia!</h2>
                        </div>
                        <div className="grid gap-6">
                            <div className={'grid grid-cols-2'}>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Talles</label>
                                    <select className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                            onChange={(e)=> setSizeSelected(
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                //@ts-expect-error
                                                e.target.value)}>
                                        {category.sizes.reverse().map((s) => (
                                            <option key={s.id} value={s.id}>{s.description} </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Colores</label>
                                    <select className="select select-bordered bg-[#5C4033] w-full max-w-xs text-white"
                                            onChange={(e)=> setColorSelected(
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                //@ts-expect-error
                                                e.target.value)}>
                                        {category.colors.map((s) => (
                                            <option key={s.id} value={s.id}>{s.description}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={'grid grid-cols-2 items-end'}>
                                <div>
                                    <label className="block mb-2 text-lg font-medium text-black">Cantidad</label>
                                    <input type="number" placeholder="Type here" value={amountSelected}
                                           onChange={(e)=> setAmountSelected(
                                               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                               //@ts-expect-error
                                               e.target.value)}
                                           className="input input-bordered w-full max-w-xs"/>
                                </div>

                                <div className="grid gap-4">
                                    <button disabled={isAvailable}
                                        className={`w-[50%] text-white ${isAvailable ? 'bg-[#6E6059FF]' : 'bg-[#5C4033]' }  font-semibold py-3 rounded-lg transition-all duration-200`}
                                        onClick={addToCart}
                                    >
                                        {isAvailable ? 'Sin stock' : 'Agregar al carrito'}
                                    </button>
                                </div>
                                {error && <p className={'text-black text-end block font-semibold pt-5'}>{error}</p>}
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}