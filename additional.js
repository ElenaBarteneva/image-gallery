function decodeApiKey(string) {
    let newKey = '';
    for (let i=0; i < string.length; i++) {
        if (/[0-9]/.test(string[i])) {
            const newDigit = (Number(string[i]) - 1).toString();
            newKey += newDigit;
        }
        else if (string[i] === string[i].toUpperCase()) {
            newKey += string[i].toLowerCase();
        }
        else if (string[i] === string[i].toLowerCase()) {
            newKey += string[i].toUpperCase();
        }
    
        else if (string[i] === '_') {
            newKey += string[i];
        }

    }
    return newKey;
}

export default decodeApiKey;

