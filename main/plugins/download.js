const axios = require('axios');

module.exports = {
    download: async (url, nameFolder, path, fs) => {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        });
        const arr = url.split('/');
        const filename = arr[arr.length - 1].toLowerCase().replace("?imgmax=0", "");
        fn = filename.replaceAt(filename.lastIndexOf("-"), ".")
        response.data.pipe(fs.createWriteStream(path + '/' + nameFolder + '/' + fn));
        return new Promise((resolve, reject) => {
            response.data.on('end', () => {
                resolve()
            })
            response.data.on('error', err => {
                reject(err)
            })
        })
    },
    percent: (ojb) => {
        let total = 0
        for (let i = 0; i < ojb.length; i++) {
            total = ojb[i].link.length + total;
        }
        return 100 / total
    },
    fromWhere: (link) => {
        if (link.match(/comicvn.net/g)) {
            return 1;
        } else if (link.match(/www\.a3manga\.com/g)) {
            return 2;
        } else if (link.match(/mangak\.info/g)) {
            return 3;
        } else if (link.match(/truyentranh\.net/g)) {
            return 4;
        } else if (link.match(/dammetruyen\.com/g)) {
            return 5;
        } else if (link.match(/thichtruyentranh\.com/g)) {
            return 6;
        }
    }
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

