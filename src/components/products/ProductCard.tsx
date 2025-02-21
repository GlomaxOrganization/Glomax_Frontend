
import { Category } from "../../types/types.ts";
import { ImageCarousel } from "../Utilities/ImageCarousel.tsx";

export const ProductCard = (props: { category: Category }) => {
    const { category } = props;

    return (
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-black shadow-lg transition hover:shadow-xl bg-[#5C4033]">
            <a href={`/productDetail/${category.id}`}>
                <ImageCarousel images={category.images} />
            </a>

            <div className="p-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-white">
                        <a href={'/productDetail/'+category.id}>{category.name}</a>
                    </h5>
                </a>

                <div className="mt-3 flex flex-wrap gap-2">
                    {category.sizes.reverse().map((size, index) => (
                        <div
                            key={index}
                            className="rounded-full border border-white px-3 py-1 text-xs font-medium text-white">
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
                    <span className="text-lg font-bold text-white">
                        ${category.price.toFixed(2)}
                    </span>
                    <a href={"/productDetail/"+category.id}
                       className="rounded-lg px-4 py-2 text-sm font-medium text-white transition focus:ring-4 focus:ring-blue-300 bg-blue-500 hover:bg-blue-600">
                        Ver más
                    </a>
                </div>
            </div>
        </div>
    );
};
