import { navigate } from '../router.js';
const logoUrl = './dist/assets/logo.png';
export const Header = (pages) => {
    const header = document.createElement('header');
    header.className = 'main-header';
    const container = document.createElement('div');
    container.className = 'container header-container';
    // Logo
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    logoContainer.innerHTML = `<img src="${logoUrl}" alt="Mina Bibawi Logo" class="logo-img">`;
    logoContainer.addEventListener('click', () => navigate('/'));
    // Navigation
    const nav = document.createElement('nav');
    const menuList = document.createElement('ul');
    menuList.className = 'nav-menu';
    const menuItems = pages.map(p => ({ label: p.title, id: p.id }));
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