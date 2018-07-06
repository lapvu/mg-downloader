const echasync = require('echasync');
module.exports = function (link, x) {
    let final = []
    return new Promise((resolve, reject) => {
        x(link, '.table', ['tbody tr td a@href'])(async (err, result) => {
            if (err) {
                reject(err)
            } else {
                echasync.do(result, function (next, item, index, result) {
                    getImage(item, x).then((data) => {
                        console.log(data)
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
        x(link, { name: '.info-title', link: ['#view-chapter img@src'] })((err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

