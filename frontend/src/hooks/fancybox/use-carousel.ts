import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Carousel,
  type CarouselInstance,
  type CarouselOptions,
} from '@fancyapps/ui/dist/carousel/';
import '@fancyapps/ui/dist/carousel/carousel.css';
import { Arrows } from '@fancyapps/ui/dist/carousel/carousel.arrows.js';
import { canUseDOM } from '@fancyapps/ui/dist/utils/canUseDOM.js';
import { isEqual } from '@fancyapps/ui/dist/utils/isEqual.js';
import '@fancyapps/ui/dist/carousel/carousel.arrows.css';
import { Dots } from '@fancyapps/ui/dist/carousel/carousel.dots.js';
import '@fancyapps/ui/dist/carousel/carousel.dots.css';

export type CarouselContainerRefType = <ContainerElement extends HTMLElement>(
  el: ContainerElement | null,
) => void;

export type useCarousel = [
  CarouselContainerRefType,
  CarouselInstance | undefined,
];

export default function useCarousel(
  options: Partial<CarouselOptions> = {
    infinite: false,
    fill: true,
    Arrows: true,
  },
): useCarousel {
  const storedOptions = useRef(options);

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [carouselInstance, setCarouselInstance] = useState<
    CarouselInstance | undefined
  >(undefined);

  const reInit = useCallback(() => {
    if (carouselInstance) {
      carouselInstance.destroy().init();
    }
  }, [carouselInstance]);

  useEffect(() => {
    if (!isEqual(options, storedOptions.current)) {
      storedOptions.current = options;
      reInit();
    }
  }, [options, reInit]);

  useEffect(() => {
    if (canUseDOM() && container) {
      const newCarouselInstance = Carousel(container, storedOptions.current, {
        Arrows,
        Dots,
      }).init();

      setCarouselInstance(newCarouselInstance);

      return () => {
        newCarouselInstance.destroy();
      };
    } else {
      setCarouselInstance(undefined);
    }
  }, [container]);

  return [setContainer, carouselInstance];
}
