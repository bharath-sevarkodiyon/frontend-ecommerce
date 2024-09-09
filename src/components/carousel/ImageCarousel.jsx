import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel() {
  const images = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/44fe68e438b997c9.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/47cd01296171e65b.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/20a160ef30776af8.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/61775218f4487fe8.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/cc633426b89ad841.png?q=20",
  ];

  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="hidden md:flex justify-center items-center w-full mt-5 mb-5">
      <Carousel
        plugins={[plugin.current]}
        className="max-w-screen-lg w-full"
        // onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="w-full h-[166px]">
                <Card className="w-full h-full">
                  <CardContent className="w-full h-full p-0">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}
