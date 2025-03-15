import {Image} from "../../types/types.ts";


export const ImageCarousel = (props: { image: Image }) => {
    const { image } = props;

    return (
        <div className="h-96 w-full relative">
                <div
                    className={`carousel-item absolute inset-0 transition-opacity duration-700 ease-in-out`}
                >
                    <img
                        src={image.source}
                        alt={image.source}
                        className="w-full h-full object-cover"
                    />
                </div>
        </div>
    );
};
