export const setHtmlTag = (open?: boolean, className = 'noScroll'): void => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (open) htmlElement.classList.add(className);
    else htmlElement.classList.remove(className);
};
