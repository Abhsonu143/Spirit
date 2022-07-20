import CryptoJS from "crypto-js";
import key from "../secretKey.js";


const Encrypt = (word) =>{
    return CryptoJS.AES.encrypt(word, process.env.SECRETKEY).toString();
};

const Decrypt = (word) =>{
    return CryptoJS.AES.decrypt(word, process.env.SECRETKEY).toString(CryptoJS.enc.Utf8);
};

export {Encrypt, Decrypt};