import { ItemCart, Product } from "../types/types.ts";

export function addToCartLocalStorage(props: {
    product: Product | null;
    setError: (error: string) => void;
    setShowNotification: (showNotification: boolean) => void;
    amountSelected: number;
    colorSelected: number;
    sizeSelected: number;
}) {
    const { product, setShowNotification, setError, sizeSelected, colorSelected, amountSelected } = props;

    if (!product) {
        setError("No se puede agregar un producto inexistente.");
        return;
    }

    const cart: ItemCart[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = cart.findIndex(
        (item) =>
            item.id === product.id &&
            item.product.size.id === sizeSelected &&
            item.product.color.id === colorSelected
    );

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].amount += amountSelected;
    } else {
        const size = product.category.sizes.find((s) => s.id === sizeSelected);
        const color = product.category.colors.find((c) => c.id === colorSelected);

        if (!size || !color) {
            setError("No se encontró el tamaño o color seleccionado.");
            return;
        }

        const newProduct: ItemCart = {
            id: product.id,
            product: product,
            amount: amountSelected,
        };

        cart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setError("Producto agregado correctamente!");
    setShowNotification(true);
}
