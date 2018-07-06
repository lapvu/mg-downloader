const echasync = require('echasync');
module.exports = function (link, x) {
    let final = []
    return new Promise((resolve, reject) => {
        x(link, '#chapter-list-flag', ['ul li p a@href'])(async (err, result) => {
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
        x(link, { name: ".title-header", link: ["#content_chap img@src"] })((err, result) => {
            if (err) {
                reject(err)
            } else {
                const str = result.name.trim();
                resolve({
                    name: str.replace(/\s+/g, ''),
                    link: result.link
                })
            }
        })
    })
}

