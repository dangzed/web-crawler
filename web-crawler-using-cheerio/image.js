const request = require('request')
const cheerio = require('cheerio')
const downloader = require('image-downloader')

const url = 'https://kenh14.vn/ai-roi-cung-khac-cac-hot-girl-nay-cung-khong-ngoai-le-khi-vong-1-cu-ngay-cang-phong-phao-20171207193958533.chn'
request(url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
        let $ = cheerio.load(html, {decodeEntities: false})
        let images = [];
        let imageLinks = $('.LayoutAlbumItem a img').each((index, el) => {
            images.push($(el).attr('src'))
        })

        Promise.all((images.map((image) => downloader.image({
            url: image,
            dest: __dirname
        })))).then(() => console.log(`Saved to ${__dirname}`))
            .catch((err) => console.log('Some error happened'))
    } else console.log(err)
})
