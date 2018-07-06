const cheerio = require('cheerio');
const echasync = require('echasync');
module.exports = function (link, x) {
    let final = []
    return new Promise((resolve, reject) => {
        x(link, '.u84ho3', ['a@href'])(async (err, result) => {
            if (err) {
                reject(err)
            } else {
               echasync.do(result,function (next,item,index,result) {
                   getImage(item,x).then((data)=>{
                       final.push(data);
                       next();
                   })
                },function () {
                    resolve(final)
                });
            }
        })
    })
}
function getImage(link, x) {
    return new Promise((resolve, reject) => {
        x(link, { body: 'body@html', title: '.sub-bor' })((err, result) => {
            if (err) {
                reject(err)
            } else {
                const $ = cheerio.load(result.body)
                x($('#txtarea').text(), ['img@src'])((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            name: result.title.trim(),
                            link: data
                        })
                    }
                })
            }
        })
    })
}

