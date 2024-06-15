var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.hubwiz.com/course/5437538a032c781670afddbe/';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        html += data;
    });
    res.on('end', function () {
        var chapter = crawlerChapter(html);
        printInfo(chapter);
    })
}).on('error', function () {
    console.log('爬取页面错误')
});
function crawlerChapter(html) {
    var $ = cheerio.load(html);
    var chapters = $('.panel');
    var data = [];

    chapters.map(function (node) {
        var chapters = $(this);
        var chapterTitle = chapters.find('h4').text().trim();
        var sections = chapters.find('li');
        var chapterData = {
            chaptersTitle: chapterTitle,
            section: []
        };
        sections.map(function (node) {
            var section = $(this).text().trim();
            chapterData.section.push(section);
        });
        data.push(chapterData);
    });
    return data;
}
function printInfo(data) {
    data = data.filter(function filterByID(obj) {
        return obj.chaptersTitle ? true : false;
    });
    data.map(function (item) {
        var chapterTitle = item.chaptersTitle;
        console.log('【' + chapterTitle + '】');
        item.section.map(function (section) {
            console.log(' 【' + section + '】')
        })
    })
}
