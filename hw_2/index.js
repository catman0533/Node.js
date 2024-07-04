function generatePassword(length = 12, options = {}) {
    const {
        hasNumbers = true,
        hasSymbols = true,
        hasLowercase = true,
        hasUppercase = true
    } = options;

    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = '';
    if (hasLowercase) chars += lowerAlphabet;
    if (hasUppercase) chars += upperAlphabet;
    if (hasNumbers) chars += numbers;
    if (hasSymbols) chars += symbols;

    if (chars.length === 0) {
        throw new Error('At least one character type must be selected');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

module.exports = {
    generatePassword
};


