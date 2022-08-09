const generateKey = (len: number): string => {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
};

export default generateKey;
