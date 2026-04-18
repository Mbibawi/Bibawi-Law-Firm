export const AudioPlayer = (audioSrc: string) => {
    const container = document.createElement('div');
    container.className = 'audio-player fade-in';
    container.style.cssText = `
        background: var(--primary);
        color: var(--white);
        padding: 1.5rem 2rem;
        border-radius: 0;
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        box-shadow: var(--shadow);
    `;

    const title = document.createElement('p');
    title.innerText = 'Explication Audio / Audio Explanation';
    title.style.cssText = 'font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.7; font-weight: 600;';
    
    const audio = new Audio(audioSrc);
    
    const controls = document.createElement('div');
    controls.style.cssText = 'display: flex; align-items: center; gap: 1.5rem;';

    const playBtn = document.createElement('button');
    playBtn.innerHTML = '▶';
    playBtn.style.cssText = `
        background: var(--secondary);
        color: var(--primary);
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        padding-left: 4px;
    `;

    const errorMsg = document.createElement('p');
    errorMsg.style.cssText = 'color: #ff9d9d; font-size: 0.8rem; margin-top: 0.5rem; display: none;';
    errorMsg.innerText = 'Unable to stream. Ensure the file is shared "Publicly" on Google Drive.';

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        flex: 1;
        height: 3px;
        background: rgba(255,255,255,0.1);
        border-radius: 2px;
        cursor: pointer;
        position: relative;
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        width: 0%;
        height: 100%;
        background: var(--secondary);
        border-radius: 2px;
        transition: width 0.1s linear;
    `;

    const timeDisplay = document.createElement('span');
    timeDisplay.innerText = '0:00 / 0:00';
    timeDisplay.style.fontSize = '0.85rem';
    timeDisplay.style.fontFamily = 'monospace';
    timeDisplay.style.opacity = '0.8';

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => {
                console.error('Audio playback failed:', e);
                errorMsg.style.display = 'block';
            });
            playBtn.innerHTML = '⏸';
            playBtn.style.paddingLeft = '0';
        } else {
            audio.pause();
            playBtn.innerHTML = '▶';
            playBtn.style.paddingLeft = '4px';
        }
    });

    audio.addEventListener('error', () => {
        errorMsg.style.display = 'block';
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        
        const current = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration || 0);
        timeDisplay.innerText = `${current} / ${duration}`;
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    controls.appendChild(playBtn);
    progressContainer.appendChild(progressBar);
    controls.appendChild(progressContainer);
    controls.appendChild(timeDisplay);

    container.appendChild(title);
    container.appendChild(controls);
    container.appendChild(errorMsg);

    return container;
};
