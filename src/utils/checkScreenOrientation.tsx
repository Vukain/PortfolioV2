export const checkScreenOrientation = () => {
    return window.matchMedia('(orientation: landscape) and (min-width: 600px)').matches;
};