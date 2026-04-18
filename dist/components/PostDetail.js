import { getState } from '../state.js';
import { AudioPlayer } from './AudioPlayer.js';
import { PostContent } from './PostContent.js';
import { navigate } from '../router.js';
export const PostDetail = (postId) => {
    const section = document.createElement('div');
    section.className = 'fade-in';
    const state = getState();
    const post = state.posts.find(p => p.id === postId);
    if (!post) {
        section.innerHTML = '<div class="container" style="padding: 5rem 0;"><h2>Information non trouvée</h2></div>';
        return section;
    }
    const container = document.createElement('div');
    container.className = 'container';
    container.style.padding = '5rem 0';
    container.setAttribute('dir', post.dir);
    // Header Section
    const header = document.createElement('header');
    header.style.marginBottom = '4rem';
    header.style.maxWidth = '800px';
    header.innerHTML = `
        <p style="color: var(--secondary); font-weight: 700; text-transform: uppercase; font-size: 0.85rem; margin-bottom: 1rem; letter-spacing: 0.1em;">${post.type === 'PAGE' ? 'Section' : 'Publication'}</p>
        <h1 style="font-size: 3rem; margin-bottom: 2rem; border-bottom: 2px solid var(--border); padding-bottom: 2rem;">${post.title}</h1>
    `;
    container.appendChild(header);
    // Content Section (Intro)
    const contentWrapper = document.createElement('div');
    contentWrapper.style.fontSize = '1.1rem';
    contentWrapper.style.color = 'var(--text-light)';
    contentWrapper.style.marginBottom = '4rem';
    contentWrapper.appendChild(PostContent(post.content, post.dir));
    container.appendChild(contentWrapper);
    // Audio if present
    if (post.audioId) {
        // Changed to export=open for direct streaming in browser
        const audioUrl = `https://docs.google.com/uc?export=open&id=${post.audioId}`;
        const player = AudioPlayer(audioUrl);
        player.style.marginBottom = '4rem';
        container.appendChild(player);
    }
    // Children list
    if (post.isRoot) {
        const children = state.posts.filter(p => p.parentId === post.id);
        if (children.length > 0) {
            const listTitle = document.createElement('h2');
            listTitle.textContent = post.dir === 'rtl' ? 'المقالات والدروس' : 'Ressources et Articles';
            listTitle.style.cssText = `
                font-size: 2rem;
                margin-bottom: 3rem;
                padding-top: 3rem;
                border-top: 1px solid var(--border);
            `;
            container.appendChild(listTitle);
            const list = document.createElement('div');
            list.style.display = 'flex';
            list.style.flexDirection = 'column';
            list.style.gap = '1.5rem';
            children.forEach(child => {
                const item = document.createElement('div');
                item.style.cssText = `
                    padding: 2rem;
                    background: var(--bg-soft);
                    border-left: 3px solid var(--secondary);
                    cursor: pointer;
                    transition: var(--transition);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `;
                item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f1f4f8');
                item.addEventListener('mouseleave', () => item.style.backgroundColor = 'var(--bg-soft)');
                const date = new Date(child.published).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short'
                });
                item.innerHTML = `
                    <div style="flex: 1;">
                        <h3 style="font-size: 1.25rem; font-family: 'Montserrat', sans-serif;">${child.title}</h3>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">${date}</p>
                    </div>
                    <span style="color: var(--secondary); font-size: 1.5rem; margin-left: 1rem;">→</span>
                `;
                item.addEventListener('click', () => navigate(`/post/${child.id}`));
                list.appendChild(item);
            });
            container.appendChild(list);
        }
    }
    section.appendChild(container);
    return section;
};
//# sourceMappingURL=PostDetail.js.map