export const getLocal = key => {
    let value = localStorage.getItem(key) || '';
    if(value.includes('[') || value.includes('{')) value = JSON.parse(value);
    return value;
}

export const setLocal = (key, value) => {
    if (typeof value === 'object' && typeof value !== 'null') value = JSON.stringify(value);
    localStorage.setItem(key, value);
}

// set to window
window.getLocal = getLocal;
window.setLocal = setLocal;