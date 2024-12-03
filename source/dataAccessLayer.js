const fs = require('fs');

const { StringDecoder } = require('node:string_decoder');
const decoder = new StringDecoder('utf8');

module.exports.getLocations = function (path) {

    let buffer = fs.readFileSync(path,'utf8', function (err, data) {
        if (err) throw err;
        const obj = JSON.parse(data);
        return obj
    })
    // let buffer = fs.readFileSync(path)
    // let dataJson = JSON.parse(buffer)
    // let dataDecode = decoder.write(buffer);
    // let json  = dataDecode.toJSON();

    return buffer;
};

// export const getLocations = (path) => { 
//     return fs.readFileSync( path )
// }

/*-------------------------------*/

module.exports.locations = {
    state: [
        {"id":0,"name":"Южно-Сахалинск"},
        {"id":1,"name":"Корсаков"},
        {"id":2,"name":"Холмск"},
        {"id":3,"name":"Долинск"},
        {"id":4,"name":"Поронайск"},
        {"id":5,"name":"Невельск"},
    ]
}