const confetti = document.querySelector('.confetti');
const toast = document.querySelector('#toast');

function celebrate(amount = 70) {
  const colors = ['#ff6e96', '#ffc950', '#8472d9', '#79c6c1', '#ff9c73'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('i');
    piece.style.cssText = `position:absolute;left:${Math.random()*100}vw;top:-12px;width:${6+Math.random()*7}px;height:${10+Math.random()*9}px;background:${colors[i%colors.length]};border-radius:${Math.random()>.5?'50%':'2px'};transform:rotate(${Math.random()*180}deg);transition:transform ${1.8+Math.random()*1.8}s cubic-bezier(.15,.65,.3,1),opacity .5s ${1.5+Math.random()*1.8}s;`;
    confetti.appendChild(piece);
    requestAnimationFrame(() => { piece.style.transform = `translate(${(Math.random()-.5)*180}px, ${window.innerHeight+70}px) rotate(${300+Math.random()*600}deg)`; piece.style.opacity = 0; });
    setTimeout(() => piece.remove(), 4000);
  }
}
const surprise = document.querySelector('#birthday-surprise');
function openSurprise(){
  celebrate(115); surprise.classList.add('open'); surprise.setAttribute('aria-hidden', 'false');
}
function closeSurprise(){ surprise.classList.remove('open'); surprise.setAttribute('aria-hidden', 'true'); }
document.querySelector('#celebrate').addEventListener('click', openSurprise);
document.querySelector('.close-surprise').addEventListener('click', closeSurprise);
function heartRain(container = '#heart-rain') {
  const rain = document.querySelector(container);
  const shades = ['#ff6e96', '#ff9ab4', '#e97ab1', '#ffd0db', '#f65d8d'];
  for (let i = 0; i < 90; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart-drop'; heart.textContent = '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--size', `${12 + Math.random() * 25}px`);
    heart.style.setProperty('--fall-time', `${2.2 + Math.random() * 2.3}s`);
    heart.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
    heart.style.color = shades[i % shades.length];
    heart.style.animationDelay = `${Math.random() * .65}s`;
    rain.appendChild(heart);
    setTimeout(() => heart.remove(), 5200);
  }
}
document.querySelector('#again').addEventListener('click', heartRain);
surprise.addEventListener('click', event => { if (event.target === surprise) closeSurprise(); });

const modal = document.querySelector('#wish-modal');
const wishText = document.querySelector('#wish-text');
document.querySelectorAll('.wish-card').forEach(card => card.addEventListener('click', () => {
  wishText.textContent = card.dataset.wish;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); celebrate(32);
}));
document.querySelector('.close-modal').addEventListener('click', closeLetter);
modal.addEventListener('click', event => { if (event.target === modal) closeLetter(); });
function closeLetter(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }

document.querySelectorAll('.photo-slot input').forEach(input => input.addEventListener('change', event => {
  const file = event.target.files[0]; if (!file) return;
  const image = document.createElement('img'); image.src = URL.createObjectURL(file); image.alt = 'A memory of Manisha';
  event.target.parentElement.appendChild(image); event.target.parentElement.classList.add('has-photo');
}));

document.querySelector('#wish-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('#personal-wish');
  if (!input.value.trim()) { input.focus(); return; }
  celebrate(95); heartRain();
  const flight = document.querySelector('#wish-flight');
  const button = event.submitter.getBoundingClientRect();
  flight.style.setProperty('--start-x', `${button.left + button.width / 2 - 28}px`); flight.style.setProperty('--start-y', `${button.top - 18}px`);
  flight.classList.remove('launch'); void flight.offsetWidth; flight.classList.add('launch');
  toast.textContent = 'Your wishes have been sent to your love! ♥'; toast.classList.add('show');
  input.value = '';
  setTimeout(() => toast.classList.remove('show'), 3800);
});

const photoMemory = document.querySelector('#photo-memory');
const romanticLines = [
  'Every picture of you is another reason my heart feels at home. ♥',
  'You make even the smallest moments look like a beautiful love story.',
  'My favorite view will always be you, exactly as you are.',
  'Some memories fade, but every moment with you only grows more precious.',
  'You are the kind of magic I never want to stop believing in.',
  'If I could choose one place to be, it would always be beside you.',
  'Your smile turns an ordinary day into my favorite memory.',
  'This is one of the many moments I will keep close to my heart.',
  'With you, every little thing feels like something worth celebrating.',
  'You are my today, my favorite memory, and my sweetest tomorrow.',
];
let lastRomanticLine = -1;
document.querySelector('#photo-grid').addEventListener('click', event => {
  if (event.target.tagName !== 'IMG') return;
  event.preventDefault(); event.stopPropagation();
  document.querySelector('#memory-image').src = event.target.src;
  let lineIndex; do { lineIndex = Math.floor(Math.random() * romanticLines.length); } while (lineIndex === lastRomanticLine);
  lastRomanticLine = lineIndex;
  const frame = document.querySelector('.photo-frame');
  frame.querySelector('p').textContent = romanticLines[lineIndex];
  frame.classList.remove('new-memory'); void frame.offsetWidth; frame.classList.add('new-memory');
  photoMemory.classList.add('open'); photoMemory.setAttribute('aria-hidden', 'false'); heartRain('#photo-heart-rain');
});
function closePhotoMemory(){ photoMemory.classList.remove('open'); photoMemory.setAttribute('aria-hidden', 'true'); }
document.querySelector('.close-photo').addEventListener('click', closePhotoMemory);
photoMemory.addEventListener('click', event => { if (event.target === photoMemory) closePhotoMemory(); });

const mainTracks = [
  { src: 'birthday-message.mpeg', name: 'song 1' },
  { src: 'apsara.mpeg', name: 'song 2' },
];
let activeTrack = 0;
function playMainSong(restart = false) {
  document.querySelector('#intro-song').pause();
  const mainSong = document.querySelector('#main-song');
  if (restart) mainSong.currentTime = 0;
  mainSong.play().catch(() => {});
  document.querySelector('#music-button').textContent = `♫ Playing ${mainTracks[activeTrack].name}`;
}
document.querySelector('#music-button').addEventListener('click', () => playMainSong(true));
document.querySelector('#switch-music').addEventListener('click', () => {
  activeTrack = (activeTrack + 1) % mainTracks.length;
  const mainSong = document.querySelector('#main-song');
  mainSong.pause(); mainSong.src = mainTracks[activeTrack].src; mainSong.load();
  playMainSong();
  document.querySelector('#switch-music').textContent = activeTrack === 0 ? '⇄ Switch to song 2' : '⇄ Switch to song 1';
});
document.querySelector('#stop-music').addEventListener('click', () => {
  document.querySelector('#main-song').pause();
  document.querySelector('#music-button').textContent = `♫ Play ${mainTracks[activeTrack].name}`;
});

const introSong = document.querySelector('#intro-song');
function playIntroSong() {
  introSong.currentTime = 180;
  introSong.play().then(() => { document.querySelector('#front-music-button').textContent = '♫ Apsara is playing'; }).catch(() => {});
}
introSong.addEventListener('loadedmetadata', () => {
  playIntroSong();
}, { once: true });
document.querySelector('#front-music-button').addEventListener('click', playIntroSong);

const birthdayVideo = document.querySelector('#video-card video');
birthdayVideo.addEventListener('dblclick', () => document.querySelector('#video-card').requestFullscreen?.());
birthdayVideo.addEventListener('play', () => {
  document.querySelector('#main-song').pause();
  document.querySelector('#music-button').textContent = '♫ Page music paused for video';
});
birthdayVideo.addEventListener('ended', () => playMainSong());

document.querySelector('#open-gift').addEventListener('click', () => {
  const intro = document.querySelector('#gift-intro');
  document.querySelector('#open-gift').classList.add('open'); celebrate(115);
  setTimeout(() => intro.classList.add('opened'), 650);
  setTimeout(playMainSong, 650);
});
/* ================================
   PASSWORD PROTECTION
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
    const passwordScreen = document.getElementById("password-screen");
    const passwordInput = document.getElementById("site-password");
    const unlockButton = document.getElementById("unlock-button");
    const passwordError = document.getElementById("password-error");

    // CHANGE THIS PASSWORD
    const correctPassword = "Mine Cat";

    function unlockWebsite() {
        const enteredPassword = passwordInput.value;

        if (enteredPassword === correctPassword) {
            passwordScreen.style.display = "none";
            document.body.style.overflow = "";
        } else {
            passwordError.textContent = "Incorrect password ❤️";
            passwordInput.value = "";
            passwordInput.focus();
        }
    }

    unlockButton.addEventListener("click", unlockWebsite);

    passwordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            unlockWebsite();
        }
    });

    passwordInput.focus();
});
