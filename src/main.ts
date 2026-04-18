import { subscribe, getState } from './state.js';
import { updateRoute, subscribeToRoute } from './router.js';
import { Header } from './components/Header.js';
import { PostList } from './components/PostList.js';
import { PostDetail } from './components/PostDetail.js';

const app = document.getElementById('app')!;

const render = () => {
    const state = getState();
    const pages = state.pages;
    
    app.innerHTML = '';
    app.appendChild(Header(pages));

    const content = document.createElement('main');
    content.className = 'container fade-in';

    if (state.loading) {
        content.innerHTML = '<div class="loading">Loading...</div>';
    } else {
        const routeData = (window as any).currentRouteData || { view: 'home' };
        if (routeData.view === 'home' || routeData.view === 'search') {
            content.appendChild(PostList());
        } else if (routeData.view === 'post') {
            content.appendChild(PostDetail(routeData.params.id));
        }
    }

    app.appendChild(content);
};

// Global route data holder for simplicity in vanilla
(window as any).currentRouteData = { view: 'home' };

subscribe(() => render());
subscribeToRoute((route) => {
    (window as any).currentRouteData = route;
    render();
});

// Initial load
updateRoute();
render();
