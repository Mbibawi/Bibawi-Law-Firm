export const PostContent = (text: string, dir: 'rtl' | 'ltr') => {
    const content = document.createElement('div');
    content.className = 'post-text-content fade-in';
    content.setAttribute('dir', dir);

    const paragraphs = text.split('\n\n');
    paragraphs.forEach(pText => {
        if (pText.trim()) {
            const p = document.createElement('p');
            // Remove single newlines to allow naturally flowing/justifiable text
            p.innerText = pText.trim().replace(/\n/g, ' '); 
            content.appendChild(p);
        }
    });

    return content;
};
