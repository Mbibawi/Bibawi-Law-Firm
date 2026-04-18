import { navigate } from '../router.js';
const logoUrl = './dist/assets/logo.png';
export const Header = () => {
    const header = document.createElement('header');
    header.style.cssText = `
        background: var(--white);
        padding: 1rem 0;
        border-bottom: 1px solid var(--border);
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.02);
    `;
    const container = document.createElement('div');
    container.className = 'container';
    container.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    // Logo
    const logoContainer = document.createElement('div');
    logoContainer.style.cursor = 'pointer';
    logoContainer.style.display = 'flex';
    logoContainer.style.alignItems = 'center';
    logoContainer.innerHTML = `<img src="${logoUrl}" alt="Mina Bibawi Logo" style="height: 60px; width: auto; object-fit: contain;">`;
    logoContainer.addEventListener('click', () => navigate('/'));
    // Navigation
    const nav = document.createElement('nav');
    const menuList = document.createElement('ul');
    menuList.className = 'nav-menu';
    const menuItems = [
        { label: 'باللغة العربية', id: '3878060186025196014.post-592147784114409479' },
        { label: 'Expertise / Services', id: '3878060186025196014.post-3137521404184090704' },
        { label: 'Enchères / Auctions', id: '3878060186025196014.post-8836655885593735648' },
        { label: 'Contact / Contact', id: '3878060186025196014.post-5619440676654787976' }
    ];
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#/post/${item.id}`;
        a.className = 'nav-link';
        a.textContent = item.label;
        if (item.label === 'باللغة العربية') {
            a.style.fontFamily = 'Inter, sans-serif';
            a.style.fontSize = '1.1rem';
        }
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(`/post/${item.id}`);
        });
        li.appendChild(a);
        menuList.appendChild(li);
    });
    nav.appendChild(menuList);
    container.appendChild(logoContainer);
    container.appendChild(nav);
    header.appendChild(container);
    return header;
};
//# sourceMappingURL=Header.js.map