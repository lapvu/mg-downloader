const echasync = require('echasync');
module.exports = function (link, x) {
    let final = [];
    return new Promise((resolve, reject) => {
        x(link, [".ul_listchap li a@href"])((err, result) => {
            if (err) {
                reject(err)
            } else {
                echasync.do(result, function (next, item, index, result) {
                    getImage(item, x).then((data) => {
                        final.push(data);
                        next();
                    })
                }, function () {
                    resolve(final.slice(5))
                });
            }
        })
    })
}
function getImage(link, x) {
    return new Promise((resolve, reject) => {
        x(link, { name: "h2 font", script: ["script"] })((err, result) => {
            if (err) {
                reject(err)
            } else {
                x(result.script[6], ["img@src"])((err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({
                            name: result.name,
                            link: data
                        })
                    }
                })
            }
        })
    })
}

