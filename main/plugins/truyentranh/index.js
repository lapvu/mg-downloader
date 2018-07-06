const echasync = require('echasync');
module.exports = function (link, x) {
    let final = []
    return new Promise((resolve, reject) => {
        x(link, [".content p a@href"])(async (err, result) => {
            if (err) {
                reject(err)
            } else {
                echasync.do(result, function (next, item, index, result) {
                    getImage(item, x).then((data) => {
                        final.push(data);
                        next();
                    })
                }, function () {
                    resolve(final)
                });
            }
        })
    })
}
function getImage(link, x) {
    return new Promise((resolve, reject) => {
        x(link, { name: ".chapter-title", link: [".each-page img@src"] })((err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

