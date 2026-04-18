import { getState } from '../state.js';
import { AudioPlayer } from './AudioPlayer.js';
import { PostContent } from './PostContent.js';
import { navigate } from '../router.js';

export const PostDetail = (postId: string) => {
    const section = document.createElement('div');
    section.className = 'fade-in';

    const state = getState();
    const post = state.posts.find(p => p.id === postId);

    if (!post) {
        section.innerHTML = '<div class="container" style="padding: 5rem 0;"><h2>Information non trouvée</h2></div>';
        return section;
    }

    const container = document.createElement('div');
    container.className = 'container detail-container';
    container.setAttribute('dir', post.dir);

    // Header Section
    const header = document.createElement('header');
    header.className = 'detail-header';
    
    header.innerHTML = `
        <p class="detail-type">${post.type === 'PAGE' ? 'Section' : 'Publication'}</p>
        <h1 class="detail-title">${post.title}</h1>
    `;

    container.appendChild(header);

    // Content Section (Intro)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'detail-content';
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
            listTitle.className = 'detail-children-title';
            container.appendChild(listTitle);

            const list = document.createElement('div');
            list.className = 'children-list';

            children.forEach(child => {
                const item = document.createElement('div');
                item.className = 'child-item';
                
                const date = new Date(child.published).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'short'
                });

                item.innerHTML = `
                    <div style="flex: 1;">
                        <h3 class="child-item-title">${child.title}</h3>
                        <p class="child-item-date">${date}</p>
                    </div>
                    <span class="child-item-arrow">→</span>
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
