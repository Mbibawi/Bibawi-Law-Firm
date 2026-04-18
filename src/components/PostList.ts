import { getState } from '../state.js';
import { Hero } from './Hero.js';
import { navigate } from '../router.js';

export const PostList = () => {
    const container = document.createElement('div');
    
    // Check if we are on home view or search
    const routeData = (window as any).currentRouteData || { view: 'home' };
    
    if (routeData.view === 'home') {
        container.appendChild(Hero());
    }

    const section = document.createElement('section');
    section.id = 'sections';
    section.className = 'container';
    
    const { filteredPosts, searchQuery } = getState();

    // If searching, show standard list (but styled better)
    if (searchQuery) {
        // ... search layout ...
    }

    const title = document.createElement('h2');
    title.textContent = searchQuery ? `Resultats pour "${searchQuery}"` : 'Nos Domaines d’Expertise';
    title.style.cssText = `
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 4rem;
        position: relative;
    `;
    title.insertAdjacentHTML('beforeend', '<div style="width: 60px; height: 3px; background: var(--secondary); margin: 1.5rem auto 0;"></div>');
    
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 3rem;
    `;

    // Important "Root" sections to display on Home
    const rootIds = [
        'Page-Arabic',
        'Page-Expertise',
        'Page-Auctions',
        'Post-Egypt',
        'Page-Contact'
    ];

    const displayPosts = searchQuery 
        ? filteredPosts 
        : filteredPosts.filter(p => rootIds.includes(p.id));

    displayPosts.forEach(post => {
        const item = document.createElement('div');
        item.className = 'fade-in';
        item.style.cssText = `
            padding: 3rem;
            background: var(--bg-soft);
            border-left: 4px solid var(--primary);
            transition: var(--transition);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            height: 100%;
        `;

        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f1f4f8';
            item.style.borderLeftColor = 'var(--secondary)';
            item.style.transform = 'translateX(10px)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'var(--bg-soft)';
            item.style.borderLeftColor = 'var(--primary)';
            item.style.transform = 'translateX(0)';
        });

        // Snippet
        const snippet = post.content.substring(0, 150) + '...';

        item.innerHTML = `
            <h3 style="font-size: 1.6rem; color: var(--primary);">${post.title}</h3>
            <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.7;">${snippet}</p>
            <div style="margin-top: auto; display: flex; align-items: center; gap: 0.5rem; color: var(--secondary); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">
                <span>Consulter</span>
                <span style="font-size: 1.2rem;">→</span>
            </div>
        `;

        item.addEventListener('click', () => navigate(`/post/${post.id}`));
        grid.appendChild(item);
    });

    section.appendChild(grid);
    container.appendChild(section);
    return container;
};
