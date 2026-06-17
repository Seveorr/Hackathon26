

// ===== Banc de dades =====

// Nivel 1: emoji + nombre de la emoción
const emotions = [
    { face: "😊", name: "Felicitat" },
    { face: "😢", name: "Tristesa" },
    { face: "😠", name: "Enuig" },
    { face: "😨", name: "Por" },
    { face: "😲", name: "Sorpresa" },
    { face: "🤢", name: "Fàstic" },
    { face: "😴", name: "Cansament" },
    { face: "😍", name: "Amor" },
    { face: "😳", name: "Vergonya" },
    { face: "😎", name: "Confiança" },
    { face: "😤", name: "Frustració" },
    { face: "😇", name: "Pau" },
    { face: "😡", name: "Ira" },
    { face: "😞", name: "Decepció" },
    { face: "😌", name: "Alleujament" },
    { face: "😐", name: "Indiferència" },
    { face: "😕", name: "Confusió" },
    { face: "😬", name: "Ansietat" },
    { face: "😏", name: "Satisfacció" },
    { face: "😔", name: "Melancolia" },
    { face: "😪", name: "Somnolència" },
    { face: "😖", name: "Desesperació" },
    { face: "😝", name: "Diversió" },
    { face: "😚", name: "Afecte" },
    { face: "😥", name: "Preocupació" }

];

// Nivel 3: situaciones + emoción correcta
const situations = [
    { text: "Se t'ha caigut el gelat a terra just després de comprar-lo.", name: "Tristesa" },
    { text: "El teu millor amic t'ha organitzat una festa sorpresa d'aniversari.", name: "Sorpresa" },
    { text: "Algú s'ha colat davant teu a la cua sense demanar permís.", name: "Enfada" },
    { text: "Vas a parlar en públic per primera vegada davant de molta gent.", name: "Por" },
    { text: "Has aprovat un examen molt difícil per al qual vas estudiar molt.", name: "Felicitat" },
    { text: "Has trobat menjar caducat a la nevera.", name: "Fàstic" },
    { text: "T'has equivocat de nom en saludar algú davant de tothom.", name: "Vergonya" },
    { text: "Portes moltes hores despert i els ulls se t'enclouen sols.", name: "Cansament" },
    { text: "El teu equip de futbol preferit ha guanyat la final a l'últim minut.", name: "Felicitat" },
    { text: "Veus una aranya enorme caminant per la teva habitació.", name: "Por" },
    { text: "La teva mascota s'ha perdut i no saps on és.", name: "Tristesa" },
    { text: "Has acabat la teva presentació i creus que ha sortit genial.", name: "Confiança" }
];

const TOTAL_ROUNDS = 8;
const TIMER_SECONDS = 10;

// Nivel 8: causa + emoción correcta + frases de respuesta (1 correcta + distractores)
const causeEffect = [
    {
        cause: "El teu amic no ha vingut al teu aniversari sense avisar.",
        emotion: "Tristesa",
        responses: [
            { text: "M'ha sabut greu que no vinguessis ni avisessis.", correct: true },
            { text: "Que bé que no vinguessis!", correct: false },
            { text: "Tant me fa, no m'importa gens.", correct: false },
            { text: "Quina sorpresa més maca!", correct: false }
        ]
    },
    {
        cause: "Algú s'ha colat davant teu a la cua sense demanar permís.",
        emotion: "Enfada",
        responses: [
            { text: "Perdona, hi havia una cua, et pots posar darrere?", correct: true },
            { text: "No passa res, tranquil, posa't on vulguis.", correct: false },
            { text: "Quina alegria veure't per aquí.", correct: false },
            { text: "Em sap molt greu, ha estat culpa meva.", correct: false }
        ]
    },
    {
        cause: "Vas a parlar en públic per primera vegada davant de molta gent.",
        emotion: "Por",
        responses: [
            { text: "Estic un poc nerviós, però he practicat molt.", correct: true },
            { text: "Això m'avorreix moltíssim.", correct: false },
            { text: "No sento absolutament res.", correct: false },
            { text: "Quin fàstic em fa això.", correct: false }
        ]
    },
    {
        cause: "Has aprovat un examen molt difícil per al qual vas estudiar molt.",
        emotion: "Felicitat",
        responses: [
            { text: "Quina alegria, tot l'esforç ha valgut la pena!", correct: true },
            { text: "Quina pena, no m'ho esperava.", correct: false },
            { text: "Estic furiós amb el resultat.", correct: false },
            { text: "Em fa molta por aquest resultat.", correct: false }
        ]
    },
    {
        cause: "Has trobat menjar caducat a la nevera.",
        emotion: "Fàstic",
        responses: [
            { text: "Uf, això fa mala olor, s'ha de llençar.", correct: true },
            { text: "Mmm, que bo, m'ho menjaré.", correct: false },
            { text: "Quina bona notícia, gràcies.", correct: false },
            { text: "Estic molt orgullós d'això.", correct: false }
        ]
    },
    {
        cause: "T'has equivocat de nom en saludar algú davant de tothom.",
        emotion: "Vergonya",
        responses: [
            { text: "Ui, perdona, m'he confós de nom.", correct: true },
            { text: "Ho he fet a dretcient, quina gràcia!", correct: false },
            { text: "Estic molt enfadat amb tu.", correct: false },
            { text: "Que cansat estic avui.", correct: false }
        ]
    },
    {
        cause: "La teva mascota s'ha perdut i no saps on és.",
        emotion: "Tristesa",
        responses: [
            { text: "Estic molt preocupat, espero trobar-la aviat.", correct: true },
            { text: "No m'importa, segur que està bé.", correct: false },
            { text: "Que emocionant, una aventura nova.", correct: false },
            { text: "Tant me fa, tinc altres mascotes.", correct: false }
        ]
    },
    {
        cause: "El teu equip preferit ha guanyat la final a l'últim minut.",
        emotion: "Felicitat",
        responses: [
            { text: "Increïble! Quin partit tan emocionant!", correct: true },
            { text: "Quin avorriment ha estat tot això.", correct: false },
            { text: "M'ha fet molt de fàstic el resultat.", correct: false },
            { text: "Estic molt trist per haver guanyat.", correct: false }
        ]
    }
];

let currentLevel = 1;
let round = 0;
let score = 0;
let currentAnswer = "";
let shuffled = [];
let timerInterval = null;

// ===== Elementos del DOM =====
const levelSelect = document.getElementById("level-select");
const gameCard = document.getElementById("game-card");
const endScreen = document.getElementById("end-screen");
const scoreboard = document.getElementById("scoreboard");
const progressTrack = document.getElementById("progress-track");
const timerTrack = document.getElementById("timer-track");
const timerFill = document.getElementById("timer-fill");
const timerPill = document.getElementById("timer-pill");
const timerValue = document.getElementById("timer-value");

const promptEl = document.getElementById("prompt");
const faceEl = document.getElementById("face");
const situationEl = document.getElementById("situation");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const roundEl = document.getElementById("round");
const totalRoundsEl = document.getElementById("total-rounds");
const progressFill = document.getElementById("progress-fill");

const endTitle = document.getElementById("end-title");
const endText = document.getElementById("end-text");
const endFace = document.getElementById("end-face");
const restartBtn = document.getElementById("restart-btn");
const menuBtn = document.getElementById("menu-btn");
const backBtn = document.getElementById("back-btn");

totalRoundsEl.textContent = TOTAL_ROUNDS;

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ===== Navegación entre pantallas =====

function showLevelSelect() {
    clearTimer();

    document.body.classList.remove("playing");

    levelSelect.style.display = "grid";
    gameCard.style.display = "none";
    endScreen.style.display = "none";
    scoreboard.style.display = "none";
    progressTrack.style.display = "none";
    timerTrack.style.display = "none";
    timerPill.style.display = "none";

    document.getElementById("header-subtitle").textContent =
        "Tria un nivell per començar a aprendre sobre les emocions";
}

function startGame(level) {
    currentLevel = level;
    round = 0;
    score = 0;

    document.body.classList.add("playing");

    levelSelect.style.display = "none";
    gameCard.style.display = "block";
    endScreen.style.display = "none";
    scoreboard.style.display = "flex";
    progressTrack.style.display = "block";

    if (level === 1) {
        document.getElementById("header-subtitle").textContent = "Nivell 1 · Mira la careta i endevina quina emoció sent";
        promptEl.textContent = "Com es sent aquesta careta?";
        faceEl.style.display = "block";
        situationEl.style.display = "none";
        timerTrack.style.display = "none";
        timerPill.style.display = "none";
        shuffled = shuffle(emotions).slice(0, TOTAL_ROUNDS);
    }

    if (level === 3) {
        document.getElementById("header-subtitle").textContent = "Nivell 3 · Llegeix la situació i endevina quina emoció sentiria";
        promptEl.textContent = "Quina emoció sentiries en aquesta situació?";
        faceEl.style.display = "none";
        situationEl.style.display = "block";
        timerTrack.style.display = "none";
        timerPill.style.display = "none";
        shuffled = shuffle(situations).slice(0, TOTAL_ROUNDS);
    }

    if (level === 8) {
        document.getElementById("header-subtitle").textContent = "Nivell 8 · Llegeix la causa: tria l'emoció i què diries";
        promptEl.textContent = "Quina emoció sentiries en aquesta situació?";
        faceEl.style.display = "none";
        situationEl.style.display = "block";
        timerTrack.style.display = "none";
        timerPill.style.display = "none";
        shuffled = shuffle(causeEffect).slice(0, TOTAL_ROUNDS);
    }

    nextRound();
}

// ===== Limpieza de estado al cambiar de pantalla =====

function clearTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== Lógica de rondas =====

function nextRound() {
    if (round >= TOTAL_ROUNDS) {
        showEnd();
        return;
    }

    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    nextBtn.style.display = "none";

    const current = shuffled[round];

    if (currentLevel === 1) {
        currentAnswer = current.name;
        faceEl.textContent = current.face;
        faceEl.style.animation = "none";
        requestAnimationFrame(() => { faceEl.style.animation = "pop 0.35s ease"; });
        renderEmotionOptions(currentAnswer);
    }

    if (currentLevel === 3) {
        currentAnswer = current.name;
        situationEl.textContent = current.text;
        situationEl.style.animation = "none";
        requestAnimationFrame(() => { situationEl.style.animation = "pop 0.35s ease"; });
        renderEmotionOptions(currentAnswer);
    }

    if (currentLevel === 8) {
        currentAnswer = current.emotion;
        promptEl.textContent = "Què diries en aquesta situació?";
        situationEl.textContent = current.cause;
        situationEl.style.animation = "none";
        requestAnimationFrame(() => { situationEl.style.animation = "pop 0.35s ease"; });
        renderResponseOptions(current);
    }

    round++;
    roundEl.textContent = round;
    scoreEl.textContent = score;
    progressFill.style.width = `${((round - 1) / TOTAL_ROUNDS) * 100}%`;
}

// Genera las 4 opciones de emoción (1 correcta + 3 distractores del banco del nivel 1)
function renderEmotionOptions(correctName) {
    const distractors = shuffle(
        emotions.filter(e => e.name !== correctName)
    ).slice(0, 3).map(e => e.name);

    const allOptions = shuffle([correctName, ...distractors]);

    optionsEl.innerHTML = "";
    allOptions.forEach(name => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = name;
        btn.addEventListener("click", () => selectOption(btn, name));
        optionsEl.appendChild(btn);
    });
}

// Nivel 8: muestra las 4 frases de respuesta posibles para la causa actual
function renderResponseOptions(current) {
    const allOptions = shuffle(current.responses);

    optionsEl.innerHTML = "";
    allOptions.forEach(resp => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = resp.text;
        btn.addEventListener("click", () => selectResponseOption(btn, resp.correct, current));
        optionsEl.appendChild(btn);
    });
}

function selectOption(button, chosen) {
    const allButtons = optionsEl.querySelectorAll(".option");
    allButtons.forEach(b => b.classList.add("disabled"));

    const isCorrect = (chosen === currentAnswer);

    if (isCorrect) {
        button.classList.add("correct");
        feedbackEl.textContent = "Correcte! 🎉 És " + currentAnswer.toLowerCase() + ".";
        feedbackEl.classList.add("ok");
        score++;
        scoreEl.textContent = score;
    } else {
        button.classList.add("wrong");
        allButtons.forEach(b => {
            if (b.textContent === currentAnswer) b.classList.add("correct");
        });
        feedbackEl.textContent = "Gairebé... la resposta correcta era " + currentAnswer.toLowerCase() + ".";
        feedbackEl.classList.add("ko");
    }

    progressFill.style.width = `${(round / TOTAL_ROUNDS) * 100}%`;
    nextBtn.style.display = "inline-block";
}

// Nivel 8: el jugador elige qué diría en la situación
function selectResponseOption(button, isCorrect, current) {
    const allButtons = optionsEl.querySelectorAll(".option");
    allButtons.forEach(b => b.classList.add("disabled"));

    if (isCorrect) {
        button.classList.add("correct");
        feedbackEl.textContent = "Perfecte! 🎉 Aquesta és una bona manera de dir-ho.";
        feedbackEl.classList.add("ok");
        score++;
        scoreEl.textContent = score;
    } else {
        button.classList.add("wrong");
        allButtons.forEach(b => {
            const respMatch = current.responses.find(r => r.text === b.textContent);
            if (respMatch && respMatch.correct) b.classList.add("correct");
        });
        feedbackEl.textContent = "Aquesta frase no encaixa amb la situació (sentiries " + current.emotion.toLowerCase() + ").";
        feedbackEl.classList.add("ko");
    }

    progressFill.style.width = `${(round / TOTAL_ROUNDS) * 100}%`;
    nextBtn.style.display = "inline-block";
}


function showEnd() {
    clearTimer();

    document.body.classList.add("playing");

    gameCard.style.display = "none";
    endScreen.style.display = "block";
    progressFill.style.width = "100%";

    let msg, face;

    if (score === TOTAL_ROUNDS) {
        msg = "Perfecte! Ets un expert en emocions.";
        face = "🏆";
    } else if (score >= TOTAL_ROUNDS * 0.6) {
        msg = "Molt bé! Vas reconeixent les emocions cada vegada millor.";
        face = "🌟";
    } else {
        msg = "Continua practicant! Cada emoció té la seva pròpia història.";
        face = "💪";
    }

    endFace.textContent = face;
    endTitle.textContent = msg;
    endText.textContent = `Has encertat ${score} de ${TOTAL_ROUNDS}`;
}

// ===== Eventos =====

document.querySelectorAll(".level-card-select").forEach(card => {
    const level = parseInt(card.dataset.level, 10);
    card.addEventListener("click", () => startGame(level));
    card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            startGame(level);
        }
    });
});

nextBtn.addEventListener("click", nextRound);
restartBtn.addEventListener("click", () => startGame(currentLevel));
menuBtn.addEventListener("click", showLevelSelect);
backBtn.addEventListener("click", showLevelSelect);

showLevelSelect();