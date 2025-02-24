const crypto = require("crypto");


// данный метод кодирования пока не используется никде в проекте

const keyObject = {
    KEY: '15059da411fe0a91d4c04263bb2bfdcf1122b4d904c583fec86da73a39bf5526',
    vl: 'b64691855fb4e3ff07bae109e810f26c'
}
const GenerateKey = () => {
    const newKeyObject = {
        KEY: crypto.randomBytes(32).toString("hex"),
        vl: crypto.randomBytes(16).toString("hex")
    }
    console.log(`New KEY: ${newKeyObject.KEY}`);
    console.log(`New Vector: ${newKeyObject.vl}`);
    return newKeyObject;
}

module.exports.GenerateKey = GenerateKey;
module.exports.keyObject = keyObject;