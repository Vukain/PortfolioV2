export const checkScreenOrientation = () => {
    return window.matchMedia('(orientation: landscape)').matches;
};