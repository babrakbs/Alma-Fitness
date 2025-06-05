const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isNumber = (str) => {
    return /^-?\d+$/.test(str);
};

export {
    isNumber,
    isEmailValid
}