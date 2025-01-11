import { useEffect, useState } from "react";

/**
 * A reusable hook to debounce a value.
 *
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds (default is 500ms).
 * @returns - The debounced value.
 */

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
