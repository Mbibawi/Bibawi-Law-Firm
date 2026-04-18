import { subscribe, getState } from './state';
import { updateRoute, subscribeToRoute } from './router';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
const app = document.getElementById('app');
const render = () => {
    const state = getState();
    app.innerHTML = '';
    app.appendChild(Header());
    const content = document.createElement('main');
    content.className = 'container fade-in';
    if (state.loading) {
        content.innerHTML = '<div class="loading">Loading...</div>';
    }
    else {
        const routeData = window.currentRouteData || { view: 'home' };
        if (routeData.view === 'home' || routeData.view === 'search') {
            content.appendChild(PostList());
        }
        else if (routeData.view === 'post') {
            content.appendChild(PostDetail(routeData.params.id));
        }
    }
    app.appendChild(content);
};
// Global route data holder for simplicity in vanilla
window.currentRouteData = { view: 'home' };
subscribe(() => render());
subscribeToRoute((route) => {
    window.currentRouteData = route;
    render();
});
// Initial load
updateRoute();
render();
//# sourceMappingURL=main.js.map