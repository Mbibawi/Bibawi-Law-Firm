const { XMLParser } = require('fast-xml-parser');
const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');

const xmlPath = path.resolve('Blogs/Maître BIBAWI/feed.atom');
const outputPath = path.resolve('src/data/posts.ts');

function extractAudioId(html) {
    const driveRegex = /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?export=download&id=)([\w-]+)/;
    const match = html.match(driveRegex);
    return match ? match[1] : null;
}

function htmlToText(html) {
    const root = parse(html);
    root.querySelectorAll('br, p, div, h1, h2, h3, h4, h5, h6, li').forEach(el => el.insertAdjacentHTML('afterend', '\n'));
    root.querySelectorAll('script, style').forEach(el => el.remove());
    return root.textContent.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n');
}

function isArabic(text) {
    const arabicRegex = /[\u0600-\u06FF]/g;
    const sample = text.substring(0, 200);
    const matches = sample.match(arabicRegex);
    return (matches?.length || 0) > (sample.length * 0.2);
}

function cleanId(id) {
    const prefix = 'tag:blogger.com,1999:blog-';
    return id.includes(prefix) ? id.replace(prefix, '') : id;
}

function parseBlog() {
    console.log('Reading from:', xmlPath);
    const xmlBuffer = fs.readFileSync(xmlPath);
    const xmlData = xmlBuffer.toString('utf8');

    const parser = new XMLParser({ 
        ignoreAttributes: false, 
        attributeNamePrefix: '',
        processEntities: true
    });
    
    const jsonObj = parser.parse(xmlData);
    const entriesArr = jsonObj.feed.entry;
    const entries = Array.isArray(entriesArr) ? entriesArr : [entriesArr];

    const allProcessedPosts = [];

    entries
        .filter(entry => entry['blogger:status'] === 'LIVE' || entry['blogger:status'] === undefined)
        .forEach(entry => {
            const rawContent = typeof entry.content === 'string' ? entry.content : entry.content?.['#text'] || '';
            const entryTitle = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || 'Untitled';
            const entryId = cleanId(entry.id || '');
            
            const rootHtml = parse(rawContent);
            const articles = rootHtml.querySelectorAll('article');
            
            let tags = [];
            if (entry.category) {
                const categories = Array.isArray(entry.category) ? entry.category : [entry.category];
                tags = categories.map(c => c.term).filter(term => term && !term.includes('blogger.com'));
            }

            if (articles.length > 0) {
                const introHtml = rawContent.split(/<article/i)[0] || '';
                allProcessedPosts.push({
                    id: entryId,
                    title: entryTitle,
                    published: entry.published,
                    updated: entry.updated,
                    content: htmlToText(introHtml),
                    type: entry['blogger:type'],
                    tags,
                    dir: isArabic(entryTitle + introHtml) ? 'rtl' : 'ltr',
                    audioId: extractAudioId(introHtml),
                    isRoot: true
                });

                articles.forEach(article => {
                    const articleIdAttr = article.getAttribute('id') || 'sub';
                    const subId = `${entryId}__${articleIdAttr}`; // CHANGED # to __
                    const subTitle = article.querySelector('.TitleSubject')?.textContent.trim() || 'Untitled';
                    const subContent = article.querySelector('.DescriptionSubject')?.innerHTML || article.innerHTML;
                    const subAudioId = extractAudioId(article.innerHTML);

                    allProcessedPosts.push({
                        id: subId,
                        title: subTitle,
                        published: entry.published,
                        updated: entry.updated,
                        content: htmlToText(subContent),
                        type: 'POST',
                        tags,
                        dir: isArabic(subTitle + subContent) ? 'rtl' : 'ltr',
                        audioId: subAudioId,
                        isRoot: false,
                        parentId: entryId
                    });
                });
            } else {
                allProcessedPosts.push({
                    id: entryId,
                    title: entryTitle,
                    published: entry.published,
                    updated: entry.updated,
                    content: htmlToText(rawContent),
                    type: entry['blogger:type'],
                    tags,
                    dir: isArabic(entryTitle + rawContent) ? 'rtl' : 'ltr',
                    audioId: extractAudioId(rawContent),
                    isRoot: entry['blogger:type'] === 'PAGE',
                });
            }
        });

    const tsContent = `export const posts = ${JSON.stringify(allProcessedPosts, null, 2)};`;
    
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, tsContent, { encoding: 'utf8' });
    console.log('Successfully wrote', allProcessedPosts.length, 'posts to', outputPath);
}

parseBlog();
