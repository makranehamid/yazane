// App State
let currentLevel = 0;
let score = 0;
let currentQuestionIndex = 0;

/**
 * Full 12-level pedagogical structure with fixes for accuracy
 */
const levelData = {
    1: {
        id: 1,
        title: "L'École",
        bg: "assets/level_1_bg.png",
        questions: [
            { prompt: "Où est le cartable d'Amico ?", target: "le cartable", options: ["🎒", "🚲", "🏠"], correct: 0 },
            { prompt: "Que fait la maîtresse ? Elle lit ou elle chante ?", target: "Elle lit", options: ["📖", "🎤"], correct: 0 },
            {
                prompt: "Trouve la gomme bleue.",
                target: "la gomme bleue",
                options: [
                    `<div class="w-20 h-10 bg-blue-500 rounded-sm shadow-inner border-2 border-blue-600"></div>`, // Custom Blue Eraser
                    `<div class="w-20 h-10 bg-pink-500 rounded-sm shadow-inner border-2 border-pink-600"></div>`,
                    `<div class="w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center text-xl">🎨</div>`
                ],
                correct: 0
            }
        ]
    },
    2: {
        id: 2,
        title: "La Famille",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "C'est ma maman, elle porte un tablier. Touche la maman.", target: "la maman", options: ["👨", "👩‍🍳", "👵"], correct: 1 },
            { prompt: "Mon frère joue au ballon. Où est-il ?", target: "Mon frère", options: ["👧", "👦⚽", "👶"], correct: 1 },
            {
                prompt: "Voici ma maison. Elle a une porte verte.",
                target: "porte verte",
                options: [
                    `<div class="w-16 h-24 bg-green-600 border-4 border-green-800 rounded-t-lg relative flex items-center justify-end px-2"><div class="w-3 h-3 bg-yellow-400 rounded-full"></div></div>`, // Green Door
                    `<div class="w-16 h-24 bg-red-600 border-4 border-red-800 rounded-t-lg relative flex items-center justify-end px-2"><div class="w-3 h-3 bg-yellow-400 rounded-full"></div></div>`,
                    `<div class="w-16 h-24 bg-blue-600 border-4 border-blue-800 rounded-t-lg relative flex items-center justify-end px-2"><div class="w-3 h-3 bg-yellow-400 rounded-full"></div></div>`
                ],
                correct: 0
            }
        ]
    },
    3: {
        id: 3,
        title: "Le Souk",
        bg: "assets/level_3_bg.png",
        questions: [
            { prompt: "Je voudrais quatre bananes. Aide Amico à compter.", target: "quatre bananes", options: ["🍌", "🍌🍌", "🍌🍌🍌🍌"], correct: 2 },
            { prompt: "Choisis le marchand qui sourit.", target: "marchand", options: ["👨‍🌾😊", "👨‍🌾😠"], correct: 0 },
            { prompt: "Le jus d'orange est plein de vitamines. Touche le verre de jus.", target: "le verre", options: ["🥛", "🍹", "🍵"], correct: 1 } // 🍹 as orange juice
        ]
    },
    4: {
        id: 4,
        title: "La Ferme",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "Le mouton est blanc et frisé. Touche le mouton.", target: "le mouton", options: ["🐄", "🐎", "🐑"], correct: 2 },
            { prompt: "Le coq réveille Amico. Quel bruit fait-il ?", target: "cocorico", options: ["🐓", "🐤", "🦆"], correct: 0 },
            { prompt: "La vache donne du lait. Touche la vache.", target: "la vache", options: ["🥛", "🐄"], correct: 1 }
        ]
    },
    5: {
        id: 5,
        title: "Propre comme un Lion",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "Amico se lave les dents. De quoi a-t-il besoin ?", target: "brosse à dents", options: ["🪥", "🍴", "🧼"], correct: 0 },
            { prompt: "Lave-toi les mains avant de manger. Touche le savon.", target: "le savon", options: ["🧼", "🧻", "🧴"], correct: 0 },
            { prompt: "Où sont les yeux d'Amico ? Touche ses yeux.", target: "ses yeux", options: ["👃", "👂", "👀"], correct: 2 }
        ]
    },
    6: {
        id: 6,
        title: "La Météo",
        bg: "assets/level_1_bg.png",
        questions: [
            { prompt: "Il y a des nuages et il pleut. Vite, trouve l'imperméable !", target: "l'imperméable", options: ["🧥", "🕶️", "🧢"], correct: 0 },
            { prompt: "Il fait très chaud. Amico doit mettre son chapeau.", target: "son chapeau", options: ["👒", "🧤", "🧣"], correct: 0 },
            { prompt: "En automne, les feuilles tombent des arbres. De quelle couleur sont-elles ?", target: "marrons", options: ["🌿", "🍂"], correct: 1 }
        ]
    },
    7: {
        id: 7,
        title: "En Route !",
        bg: "assets/home_bg.png",
        questions: [
            {
                prompt: "Le bus est jaune et très grand. Monte dans le bus.",
                target: "le bus",
                options: [
                    `<div class="text-6xl filter sepia saturate-200 hue-rotate-30">🚌</div>`, // Yellow-ish Bus
                    "🚗",
                    "🚲"
                ],
                correct: 0
            },
            { prompt: "Attends ! Le feu est rouge, il faut s'arrêter.", target: "feu rouge", options: ["🛑", "🟢"], correct: 0 },
            { prompt: "Amico va à la plage en voiture avec son papa.", target: "la voiture", options: ["🚗", "✈️", "🚢"], correct: 0 }
        ]
    },
    8: {
        id: 8,
        title: "Sports et Loisirs",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "Amico sait nager. Où est la piscine ?", target: "la piscine", options: ["⚽", "🏊", "🏀"], correct: 1 },
            { prompt: "Je peux lancer le ballon très loin. Lance le ballon !", target: "le ballon", options: ["🎾", "⚽", "🏸"], correct: 1 },
            { prompt: "Amico joue de la guitare. C'est une belle musique.", target: "la guitare", options: ["🎸", "🥁", "🎹"], correct: 0 }
        ]
    },
    9: {
        id: 9,
        title: "Quand je serai grand...",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "Le docteur soigne les malades. Touche le stéthoscope.", target: "le stéthoscope", options: ["🩺", "🔨", "🪛"], correct: 0 },
            { prompt: "Le pompier éteint le feu avec son gros camion rouge.", target: "camion rouge", options: ["🚓", "🚑", "🚒"], correct: 2 },
            { prompt: "Le boulanger fait du bon pain. Ça sent bon !", target: "le boulanger", options: ["👨‍🍳", "👨‍🏫", "👨‍🌾"], correct: 0 }
        ]
    },
    10: {
        id: 10,
        title: "Voyage dans l'Espace",
        bg: "assets/level_1_bg.png",
        questions: [
            { prompt: "Regarde la Lune dans le ciel. Elle brille la nuit.", target: "la Lune", options: ["🌙", "☀️", "☁️"], correct: 0 },
            { prompt: "La fusée part très haut ! Touche la fusée.", target: "la fusée", options: ["🚀", "🚁", "⛵"], correct: 0 },
            {
                prompt: "Peux-tu compter cinq étoiles ?",
                target: "cinq étoiles",
                options: [
                    "⭐",
                    "⭐⭐⭐",
                    `<div class="flex flex-wrap justify-center gap-1 w-24">⭐⭐<br>⭐⭐⭐</div>` // Better layout
                ],
                correct: 2
            }
        ]
    },
    11: {
        id: 11,
        title: "Calendrier Magique",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "Le matin, je prends mon petit-déjeuner. Choisis le bol de céréales.", target: "petit-déjeuner", options: ["🥣🥛", "🍛", "🍕"], correct: 0 },
            { prompt: "Écoute bien : Lundi, Mardi... Quel jour vient après ?", target: "Mardi", options: ["📅", "🗓️"], correct: 0 },
            { prompt: "C'est l'heure de dormir. Bonne nuit !", target: "dormir", options: ["🛌", "🏃", "🎮"], correct: 0 }
        ]
    },
    12: {
        id: 12,
        title: "La Grande Fête",
        bg: "assets/home_bg.png",
        questions: [
            { prompt: "C'est l'anniversaire d'Amico ! Invite tous tes amis.", target: "anniversaire", options: ["🎈", "🧹", "📦"], correct: 0 },
            { prompt: "Il y a un gros gâteau avec des bougies. Souffle les bougies !", target: "le gâteau", options: ["🎂", "🍔", "🥗"], correct: 0 },
            { prompt: "Amico est très heureux. Dis : 'Je suis content !'", target: "content", options: ["😃", "😢", "😠"], correct: 0 }
        ]
    }
};

// --- VOICE SYNTHESIS ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.85;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    }
}

// --- NAVIGATION ---
function goToLevel(levelId) {
    currentLevel = levelId;
    const data = levelData[levelId];
    hideAllScreens();
    const screen = document.getElementById('level-screen');
    screen.classList.add('active');
    screen.style.backgroundImage = `url('${data.bg}')`;
    currentQuestionIndex = 0;
    loadQuestion();
}

function showLevelSelect() {
    hideAllScreens();
    document.getElementById('level-select-screen').classList.add('active');
    speak("Choisis ton niveau !");
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
}

function goHome() {
    hideAllScreens();
    document.getElementById('home-screen').classList.add('active');
    window.speechSynthesis.cancel();
}

// --- LOGIC ---
function loadQuestion() {
    const data = levelData[currentLevel];
    const question = data.questions[currentQuestionIndex];

    const taskContainer = document.getElementById('task-text');
    let displayPrompt = question.prompt;
    if (question.target) {
        displayPrompt = displayPrompt.replace(new RegExp(question.target, 'gi'), (match) => `<span class="text-blue-600 underline">${match}</span>`);
    }
    taskContainer.innerHTML = displayPrompt;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    grid.className = (question.options.length <= 2) ? "grid grid-cols-2 gap-8 px-10" : "grid grid-cols-3 gap-6 px-2";
    question.options.forEach((content, index) => {
        const btn = document.createElement('button');
        btn.className = "btn-bounce bg-white hover:bg-orange-50 p-6 md:p-8 rounded-3xl text-5xl md:text-6xl shadow-xl transition-all border-4 border-transparent active:border-orange-400 flex items-center justify-center min-h-[140px]";
        btn.innerHTML = content;
        btn.onclick = () => checkAnswer(index);
        grid.appendChild(btn);
    });

    setTimeout(() => speak(question.prompt), 500);
}

function repeatQuestion() {
    const question = levelData[currentLevel].questions[currentQuestionIndex];
    speak(question.prompt);
}

function checkAnswer(index) {
    const question = levelData[currentLevel].questions[currentQuestionIndex];
    if (index === question.correct) {
        speak("Bravo !");
        showSuccess();
    } else {
        speak("Essaie encore !");
        shakeElement(document.getElementById('quiz-container'));
    }
}

function showSuccess() {
    const overlay = document.getElementById('success-overlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    for (let i = 0; i < 15; i++) createStar();
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < levelData[currentLevel].questions.length) {
        loadQuestion();
    } else {
        finishLevel();
    }
}

function finishLevel() {
    speak("Génial ! Tu as fini : " + levelData[currentLevel].title);
    setTimeout(showLevelSelect, 2500);
}

function shakeElement(el) {
    el.classList.add('animate-shake');
    setTimeout(() => el.classList.remove('animate-shake'), 500);
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'reward-star text-4xl';
    star.innerHTML = '⭐';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
}

function showPlaceholder(name) {
    alert(name + " sera bientôt disponible !");
    speak(name + " sera bientôt disponible !");
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .animate-shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);
