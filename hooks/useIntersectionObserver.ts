
import { useState, useEffect, RefObject } from 'react';

interface ObserverOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

const useIntersectionObserver = <T extends HTMLElement,>(
    elementRef: RefObject<T>,
    { threshold = 0.1, rootMargin = '0px', triggerOnce = true }: ObserverOptions
): boolean => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    if (!triggerOnce) {
                      setIntersecting(false);
                    }
                }
            },
            { threshold, rootMargin }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [elementRef, threshold, rootMargin, triggerOnce]);

    return isIntersecting;
};

export default useIntersectionObserver;
