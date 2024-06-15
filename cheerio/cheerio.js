// 导入需要的库
const cheerio = require('cheerio');
const http = require('http');
const https = require('https');
 
// 设置代理
const proxyHost = 'www.duoip.cn';
const proxyPort = 8000;
 
// 创建一个函数，用于爬取网页
async function crawler(url) {
    // 使用https.get方法，设置代理
    const options = {
        hostname: url,
        port: 443,
        path: '/',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    };
    options.agent = new https.Agent({
        proxy: {
            host: proxyHost,
            port: proxyPort
        }
    });
    const response = await new Promise((resolve, reject) => {
        https.get(options, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
    // 使用cheerio解析网页
    const $ = cheerio.load(response);
    // 获取所有的img标签
    const images = $('img');
    // 遍历所有的img标签，获取src属性
    for (let i = 0; i < images.length; i++) {
        const src = images[i].attribs.src;
        // 打印出每一张图片的src属性
        console.log(src);
    }
}
 
// 调用函数，传入需要爬取的网页地址
crawler('https://www.zhihu.com/');
