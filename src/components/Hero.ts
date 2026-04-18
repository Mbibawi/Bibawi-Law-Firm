const heroUrl = './dist/assets/hero.png';

export const Hero = () => {
    const hero = document.createElement('div');
    hero.style.cssText = `
        position: relative;
        height: 60vh;
        min-height: 400px;
        background: url("${heroUrl}") center/cover no-repeat;
        display: flex;
        align-items: center;
        margin-bottom: 4rem;
        background-attachment: fixed;
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(to right, rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.4));
    `;

    const content = document.createElement('div');
    content.className = 'container fade-in';
    content.style.position = 'relative';
    content.style.zIndex = '2';
    content.style.color = 'white';

    content.innerHTML = `
        <div style="max-width: 700px;">
            <p style="color: var(--secondary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 1rem; font-size: 0.9rem;">Avocat à la Cour</p>
            <h1 style="color: white; font-size: 3.5rem; margin-bottom: 1.5rem; line-height: 1.1;">Maître Mina BIBAWI</h1>
            <p style="font-size: 1.2rem; color: #e6f1ff; margin-bottom: 2.5rem; line-height: 1.6; opacity: 0.9;">
                Expertise juridique sur mesure à Paris. Spécialisé en <strong>Droit Commercial</strong>, <strong>Droit Immobilier</strong>, et <strong>Ventes aux Enchères</strong>.
                Accompagnement privilégié pour vos projets d'acquisition en <strong>Égypte</strong>.
            </p>
            <p style="font-size: 1rem; color: #e6f1ff; margin-bottom: 2.5rem; line-height: 1.6; font-style: italic; border-left: 3px solid var(--secondary); padding-left: 1.5rem;">
                Legal excellence in Paris. Specializing in Commercial, Real Estate, and Auction Law. 
                Bilingual expert advisory for cross-border investments between France and Egypt.
            </p>
            <div style="display: flex; gap: 1.5rem;">
                <a href="#/post/3878060186025196014.post-3137521404184090704" class="btn-primary">Domaines d'intervention</a>
                <a href="#sections" class="link-gold" style="align-self: center; color: white; border-bottom-color: white;">Découvrir nos services</a>
            </div>
        </div>
    `;

    hero.appendChild(overlay);
    hero.appendChild(content);
    return hero;
};
