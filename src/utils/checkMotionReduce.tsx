export const checkMotionReduce = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)") && window.matchMedia("(prefers-reduced-motion: reduce)").matches
};