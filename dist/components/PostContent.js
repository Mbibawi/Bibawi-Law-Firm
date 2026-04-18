export const PostContent = (text, dir) => {
    const content = document.createElement('div');
    content.className = 'post-text-content fade-in';
    content.setAttribute('dir', dir);
    content.style.cssText = `
        white-space: pre-wrap;
        font-size: 1.1rem;
        color: var(--text-color);
        line-height: 1.8;
        text-align: ${dir === 'rtl' ? 'right' : 'justify'};
        margin: 2rem 0;
    `;
    // Process text into paragraphs if there are double newlines, 
    // but pre-wrap already handles single newlines well.
    // For a cleaner look, we can split by double newlines into p tags.
    const paragraphs = text.split('\n\n');
    paragraphs.forEach(pText => {
        if (pText.trim()) {
            const p = document.createElement('p');
            p.innerText = pText.trim();
            p.style.marginBottom = '1.5rem';
            content.appendChild(p);
        }
    });
    return content;
};
//# sourceMappingURL=PostContent.js.map