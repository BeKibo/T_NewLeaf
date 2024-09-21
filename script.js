const text = "NEW LEAF";
let index = 0;

function animateText() {
    const animatedText = document.getElementById("animated-text");
    
    if (index < text.length) {
        animatedText.innerHTML += text.charAt(index);
        index++;
    } else {
        // Réinitialiser après avoir affiché tout le texte
        setTimeout(() => {
            animatedText.innerHTML = "";
            index = 0;
            animateText();
        }, 1000);
        return;
    }

    setTimeout(animateText, 300); // Temps d'attente entre chaque lettre
}

animateText();

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const muteBtn = document.getElementById('mute-btn');
    const loader = document.querySelector('.loader');
    const hiddenContent = document.getElementById('hidden-content');

    // Volume initial à 50%
    audio.volume = 0.06;

    // Initialement, le son n'est pas joué (on attend l'action utilisateur)
    let isPlaying = false;
    let isMuted = true;

    // Fonction pour activer la musique
    const playMusic = () => {
        if (!isPlaying) {
            audio.play(); // Lance la musique
            audio.muted = false; // Active le son
            muteBtn.classList.remove('fa-volume-mute');
            muteBtn.classList.add('fa-volume-up'); // Changer l'icône en volume haut
            isPlaying = true;
            isMuted = false;
        }
    };

    // Fonction pour muter ou réactiver l'audio
    const toggleMute = () => {
        if (isMuted) {
            audio.muted = false; // Réactiver l'audio
            muteBtn.classList.remove('fa-volume-mute');
            muteBtn.classList.add('fa-volume-up'); // Changer l'icône en volume haut
            isMuted = false;
        } else {
            audio.muted = true; // Mute l'audio
            muteBtn.classList.remove('fa-volume-up');
            muteBtn.classList.add('fa-volume-mute'); // Changer l'icône en volume coupé
            isMuted = true;
        }
    };

    // Gestion du bouton Mute/Unmute
    muteBtn.addEventListener('click', () => {
        if (!isPlaying) {
            playMusic(); // Démarre la musique si elle n'a pas encore démarré
        } else {
            toggleMute(); // Sinon, bascule entre mute/unmute
        }
    });

    // Ajoute un trigger global pour jouer/muter/démuter la musique en cliquant n'importe où
    const globalClickHandler = (event) => {
        if (event.target !== muteBtn) {
            if (!isPlaying) {
                playMusic(); // Démarre la musique si elle n'a pas encore démarré
            } else {
                toggleMute(); // Sinon, bascule entre mute/unmute
            }
        }
    };

    document.addEventListener('click', globalClickHandler);

    // Délai avant de masquer le loader et d'afficher le contenu caché
    setTimeout(() => {
        loader.style.opacity = '0'; // Transition de disparition du loader
        setTimeout(() => {
            loader.style.display = 'none'; // Cacher complètement le loader
            hiddenContent.classList.add('active'); // Révéler le contenu caché

            // Désactiver le clic global, ne garder que l'icône mute/unmute actif
            document.removeEventListener('click', globalClickHandler);
        }, 1000); // Attendre 1 seconde après la disparition pour cacher le loader
    }, 1000); // Attendre 5 secondes avant de masquer le loader
});



// JavaScript Countdown
const countdown = () => {
    const countDate = new Date('Oct 07, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
};

// Update countdown every second
setInterval(countdown, 1000);



let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function moveSlide(step) {
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initial call to show the first slide
showSlide(currentSlide);
