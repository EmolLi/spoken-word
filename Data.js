/**
 * Created by emol on 1/28/17.
 */
let DATA = module.exports = {};
let fs = require('fs');
let appDataJson = "./appData.json";

let data = JSON.parse(fs.readFileSync(appDataJson, 'utf8'));


DATA.update = function (app, phrase){
    data[app]["phrase"] = phrase;
    //alert(data[app]["phrase"]);
    fs.writeFileSync(appDataJson, JSON.stringify(data, 'utf8'));
}

DATA.getdata = function () {
    return data;
}

//when we close the program, we save our cached data into disk
DATA.save = function () {

}
DATA.show = function(app){
    alert(data[app]["phrase"]);
}
