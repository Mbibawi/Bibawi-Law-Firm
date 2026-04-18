export const PostContent = (post) => {
    const content = document.createElement('div');
    content.className = 'post-text-content fade-in';
    content.setAttribute('dir', post.dir);
    const paragraphs = post.content.split('\n\n');
    paragraphs.forEach(pText => {
        if (pText.trim()) {
            let contentString = pText.trim().replace(/\n/g, ' ');
            if (contentString.startsWith('## ')) {
                const h2 = document.createElement('h2');
                h2.innerText = contentString.substring(3); // Remove the "## "
                h2.className = 'post-header';
                content.appendChild(h2);
            }
            else {
                const p = document.createElement('p');
                p.innerText = contentString;
                content.appendChild(p);
            }
        }
    });
    return content;
};
//# sourceMappingURL=PostContent.js.map