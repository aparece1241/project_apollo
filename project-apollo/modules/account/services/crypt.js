const CryptoJs = require('crypto-js');

//encrypt data or plain text
const en = (data) => {
    let ciphertext = CryptoJs.AES.encrypt(JSON.stringify(data),process.env.SECRET_KEY).toString();
    return ciphertext;
}

//decrypt encyrpted data
const de = (ciphertext) => {
    let bytes = CryptoJs.AES.decrypt(ciphertext, process.env.SECRET_KEY);
    let decryptedData;
    console.log(ciphertext);
    decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
    return decryptedData;
}

module.exports = {en, de};