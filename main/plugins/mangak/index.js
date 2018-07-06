const echasync = require('echasync');
module.exports = function (link, x) {
    let final = [];
    return new Promise((resolve, reject) => {
        x(link, [".chapter-list .row span a@href"])((err, result) => {
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
        x(link, { name: ".name_chapter", script: ["script"] })((err, result) => {
            if (err) {
                reject(err)
            } else {
                const link = result.script[11].match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g)
                resolve({
                    name: result.name,
                    link: link
                })
            }
        })
    })
}

