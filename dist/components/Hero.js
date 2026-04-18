const heroUrl = './dist/assets/hero.png';
export const Hero = () => {
    const hero = document.createElement('div');
    hero.className = "hero-split";
    const content = document.createElement('div');
    content.className = "hero-split-left fade-in";
    content.innerHTML = `
        <p class="hero-subtitle">Avocat à la Cour</p>
        <h1 class="hero-title">Maître Mina BIBAWI</h1>
        <p class="hero-description">
            Expertise juridique sur mesure à Paris. Spécialisé en <strong>Droit Commercial</strong>, <strong>Droit Immobilier</strong>, et <strong>Ventes aux Enchères</strong>.
            Accompagnement privilégié pour vos projets d'acquisition en <strong>Égypte</strong>.
        </p>
        <p class="hero-description-en">
            Legal excellence in Paris. Specializing in Commercial, Real Estate, and Auction Law. 
            Bilingual expert advisory for cross-border investments between France and Egypt.
        </p>
        <div class="hero-actions">
            <a href="#/post/Page-Expertise" class="btn-primary">Domaines d'intervention</a>
            <a href="#sections" class="link-gold" style="align-self: center; color: white; border-bottom-color: white;">Découvrir nos services</a>
        </div>
    `;
    const imageSection = document.createElement('div');
    imageSection.className = "hero-split-right";
    imageSection.style.backgroundImage = `url("${heroUrl}")`;
    hero.appendChild(content);
    hero.appendChild(imageSection);
    return hero;
};
//# sourceMappingURL=Hero.js.map