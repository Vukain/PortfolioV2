import { checkScreenOrientation } from "./checkScreenOrientation";

export const checkProjectSize = () => {
    const sectionHeight = document.getElementById('projects')!.offsetTop;
    const gallery = document.getElementById('gallery');
    const projectSize = checkScreenOrientation() ? gallery!.offsetWidth : gallery!.offsetHeight;

    return { sectionHeight, projectSize }
};