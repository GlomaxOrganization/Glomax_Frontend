import { Category } from "../../types/types.ts";
import { ImageCarousel } from "../Utilities/ImageCarousel.tsx";

export const ProductCard = (props: { category: Category }) => {
    const { category } = props;

    return (
        <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border border-black shadow-lg transition hover:shadow-xl bg-[#5C4033]">
            <a href={`/productDetail/${category.id}`}>
                { category.images.length > 0 && <ImageCarousel image={category.images[0]} /> }
            </a>

            <div className="p-4 grid gap-4">
                <div className="flex justify-between items-center">
                    <a href={`/productDetail/${category.id}`}>
                        <h5 className="text-xl font-semibold tracking-tight text-white break-words">
                            {category.name}
                        </h5>
                    </a>
                    <img
                        src={category.season.image}
                        alt={category.season.description}
                        className="w-8"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        {category.sizes.map((size, index) => (
                            <div
                                key={index}
                                className="rounded-full border border-white px-4 py-1 text-xs font-medium text-white whitespace-nowrap"
                            >
                                {size.description}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {category.colors.map((color, index) => (
                            <div
                                key={index}
                                className="tooltip h-6 w-6 rounded-full border border-gray-300 shadow-sm"
                                data-tip={color.description}
                                style={{ backgroundColor: color.code }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="flex md:flex-row items-center justify-between gap-4">
                    <span className="text-lg font-bold text-white">
                                ${((category.price + category.price * 10 / 100).toFixed(2))}
                    </span>
                    <a
                        href={`/productDetail/${category.id}`}
                        className="bg-[#FFDEAFFF] hover:bg-[#C8994AFF] text-black font-semibold px-4 py-2 rounded-lg transition duration-300 text-center"
                    >
                        Ver más
                    </a>
                </div>
            </div>
        </div>
    );
};
