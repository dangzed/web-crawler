const request = require('request')
const cheerio = require('cheerio')

let url = 'https://toidicodedao.com/'
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html, {decodeEntities: false});
        $('.entry-title a').each((index, el) => {
            let title = $(el).text()
            let link = $(el).attr('href')
            console.log('\nTitle: '+title+'\nLink: '+link)
        })
    } else {
        console.log('Some errors occur ')
    }
})

