const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');
const { parse } = require('node-html-parser');

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

try {
    const xmlData = fs.readFileSync(xmlPath, 'utf8');
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
    const jsonObj = parser.parse(xmlData);
    const entries = Array.isArray(jsonObj.feed.entry) ? jsonObj.feed.entry : [jsonObj.feed.entry];

    const processedPosts = entries
        .filter(entry => entry['blogger:status'] === 'LIVE' || entry['blogger:status'] === undefined)
        .map(entry => {
            const rawContent = typeof entry.content === 'string' ? entry.content : entry.content?.['#text'] || '';
            const plainText = htmlToText(rawContent);
            const title = typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || 'Untitled';
            
            let id = entry.id || '';
            id = id.replace(/tag:blogger\.com,1999:blog-/g, '');

            return {
                id,
                title,
                published: entry.published,
                updated: entry.updated,
                content: plainText,
                type: entry['blogger:type'],
                tags: entry.category ? (Array.isArray(entry.category) ? entry.category : [entry.category]).map(c => c.term).filter(t => t && !t.includes('blogger.com')) : [],
                dir: isArabic(title + plainText) ? 'rtl' : 'ltr',
                audioId: extractAudioId(rawContent)
            };
        });

    const tsContent = `export const posts = ${JSON.stringify(processedPosts, null, 2)};`;
    fs.writeFileSync(outputPath, tsContent, 'utf8');
    console.log('SUCCESS: Posts data cleaned and written to src/data/posts.ts');
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
