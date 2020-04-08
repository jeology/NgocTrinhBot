const axios = require('axios');
const cheerio = require('cheerio');

exports.run = (bot, message, args) => {
        message.channel.send("Mấy anh kì quá nha nhưng mà em tha đó :3");
        // Use the `get` method of axios with the URL of the ButterCMS documentation page as an argument
        axios.get('http://www.random-babe.com/legacy.php').then((response) => {
        // `response` is an HTTP response object, whose body is contained in it's `data` attribute

                let $ = cheerio.load(response.data); //response.data is the whole source code
                let preUrl = cheerio.html($('a img'));
                let midUrl = preUrl.split(`"`);
                endUrl = "http://www.random-babe.com/" + midUrl[1];

                message.channel.send("Hình bạn em nè mấy cục cưng", {files: [endUrl]});
        })
}
