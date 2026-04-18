import { getState } from '../state.js';
import { Hero } from './Hero.js';
import { navigate } from '../router.js';
export const PostList = () => {
    const container = document.createElement('div');
    // Check if we are on home view or search
    const routeData = window.currentRouteData || { view: 'home' };
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
    title.className = 'section-title';
    title.insertAdjacentHTML('beforeend', '<div class="section-title-underline"></div>');
    section.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'post-grid';
    // Important "Root" sections to display on Home
    const rootIds = [
        "Page-Expertise",
        "Page-Auctions",
        "Page-Arabic",
        "Post-Egypt",
        "Page-Contact",
    ];
    const displayPosts = searchQuery
        ? filteredPosts
        : rootIds.map((id) => filteredPosts.find((p) => p.id === id));
    displayPosts.forEach(post => {
        if (!post)
            return;
        const item = document.createElement('div');
        item.className = 'fade-in post-item';
        // Snippet
        const snippet = post.content.substring(0, 150) + '...';
        item.innerHTML = `
            <h3 class="post-item-title">${post.title}</h3>
            <p class="post-item-snippet">${snippet}</p>
            <div class="post-item-footer">
                <span>Consulter</span>
                <span class="post-item-arrow">→</span>
            </div>
        `;
        item.addEventListener('click', () => navigate(`/post/${post.id}`));
        grid.appendChild(item);
    });
    section.appendChild(grid);
    container.appendChild(section);
    return container;
};
//# sourceMappingURL=PostList.js.map