import { Category } from "../../types/types.ts";
import { ImageCarousel } from "../Utilities/ImageCarousel.tsx";

export const ProductCard = (props: { category: Category }) => {
    const { category } = props;

    return (
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg transition hover:shadow-xl dark:border-gray-700 dark:bg-[#5C4033]">
            <a href="#">
                <ImageCarousel images={category.images} />
            </a>

            <div className="p-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {category.name}
                    </h5>
                </a>

                <div className="mt-3 flex flex-wrap gap-2">
                    {category.sizes.reverse().map((size, index) => (
                        <div
                            key={index}
                            className="rounded-full border border-white px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {size.description}
                        </div>
                    ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                    {category.colors.map((color, index) => (
                        <div
                            key={index}
                            className="tooltip h-6 w-6 rounded-full border border-gray-300 shadow-sm"
                            data-tip={color.description}
                            style={{ backgroundColor: color.code }}></div>
                    ))}
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${category.price}
                    </span>
                    <a href="#"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                        Add to cart
                    </a>
                </div>
            </div>
        </div>
    );
};
