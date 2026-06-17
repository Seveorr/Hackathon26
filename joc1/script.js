let score = 0;
let currentSection = 1;
let questionInSectionIdx = 1;
const maxQuestionsPerSection = 10;
let correctAnswersOrder = [];

const frasesComplexes = [
    { text: "El nen menja una poma vermella", ordre: ["👦", "🍽️", "🍎", "🔴"] },
    { text: "La nena llegeix un llibre gran", ordre: ["👧", "📖", "📚", "🏢"] },
    { text: "El gos corre feliç pel parc", ordre: ["🐶", "🏃", "😀", "🌳"] },
    { text: "El gat negre dorm al llit", ordre: ["🐱", "⚫", "😴", "🛏️"] },
    { text: "El nen beu llet freda a casa", ordre: ["👦", "🥤", "🥛", "🏠"] },
    { text: "La nena pinta una flor bonica", ordre: ["👧", "🎨", "🌸", "❤️"] },
    { text: "El mico menja un plàtan groc", ordre: ["🐵", "🍽️", "🍌", "🟡"] },
    { text: "El ocell vola pel cel blau", ordre: ["🐦", "🚀", "☁️", "🔵"] },
    { text: "El cavall corre ràpid sota el sol", ordre: ["🐎", "🏃", "⚡", "☀️"] },
    { text: "El peix neda content a l'aigua", ordre: ["🐟", "🏊", "😀", "💧"] }
];

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

function updateHeader() {
    if (currentSection === 1) {
        phaseHeader.textContent = "Secció 1 / 3: Relacionar paraules i pictogrames";
    } else if (currentSection === 2) {
        phaseHeader.textContent = "Secció 2 / 3: Construir frases complexes";
    } else {
        phaseHeader.textContent = "Secció 3 / 3: Situacions i contexts diaris";
    }
    scoreEl.textContent = score;
}

const modal = document.getElementById("exitModal");
const phaseHeader = document.getElementById("phaseHeader");
const question = document.getElementById("question");
const targetZone = document.getElementById("targetZone");
const duoHint = document.getElementById("duoHint");
const options = document.getElementById("options");
const msg = document.getElementById("msg");
const scoreEl = document.getElementById("score");
const actionBtn = document.getElementById("actionBtn");

function showExitModal() { modal.classList.add("active"); }
function hideExitModal() { modal.classList.remove("active"); }
function redirectToMenu() { window.location.href = "../menu.html"; }

function updateProgressCircle(isCorrect) {
    const circle = document.getElementById(`c${questionInSectionIdx}`);
    if (circle) {
        if (isCorrect) {
            circle.className = "circle correct";
            circle.textContent = "✓";
        } else {
            circle.className = "circle incorrect";
            circle.textContent = "X";
        }
    }
}

function resetProgressBar() {
    for (let i = 1; i <= maxQuestionsPerSection; i++) {
        const circle = document.getElementById(`c${i}`);
        if (circle) {
            circle.className = "circle";
            circle.textContent = i;
        }
    }
}

function initDragAndDrop() {
    targetZone.addEventListener('dragover', e => e.preventDefault());
    targetZone.addEventListener('drop', handleDrop);
    options.addEventListener('dragover', e => e.preventDefault());
    options.addEventListener('drop', handleDropBack);
}

function makeElementDraggable(el) {
    el.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', el.id);
    });

    let offsetX = 0, offsetY = 0;

    el.addEventListener('touchstart', e => {
        if (!el.draggable) return;
        const touch = e.touches[0];
        const rect = el.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
        el.style.position = 'fixed';
        el.style.zIndex = '1000';
        el.style.width = rect.width + 'px';
        el.style.height = rect.height + 'px';
    }, { passive: true });

    el.addEventListener('touchmove', e => {
        if (!el.draggable) return;
        const touch = e.touches[0];
        el.style.left = (touch.clientX - offsetX) + 'px';
        el.style.top = (touch.clientY - offsetY) + 'px';
    }, { passive: true });

    el.addEventListener('touchend', e => {
        if (!el.draggable) return;
        el.style.position = ''; el.style.zIndex = ''; el.style.left = ''; el.style.top = ''; el.style.width = ''; el.style.height = '';

        const touch = e.changedTouches[0];
        const targetDrop = document.elementFromPoint(touch.clientX, touch.clientY);

        if (targetDrop && (targetDrop.id === 'targetZone' || targetDrop.closest('#targetZone'))) {
            appendElementToTarget(el);
        } else {
            options.appendChild(el);
            if (currentSection === 2 && targetZone.querySelectorAll('.drag-item').length === 0) {
                actionBtn.style.display = "none";
            }
        }
    });
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedEl = document.getElementById(id);
    if (draggedEl) appendElementToTarget(draggedEl);
}

function handleDropBack(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedEl = document.getElementById(id);
    if (draggedEl) {
        options.appendChild(draggedEl);
        if (currentSection === 2 && targetZone.querySelectorAll('.drag-item').length === 0) {
            actionBtn.style.display = "none";
        }
    }
}

function appendElementToTarget(el) {
    if (currentSection === 1 || currentSection === 3) {
        if (targetZone.querySelectorAll('.drag-item').length === 0) {
            targetZone.appendChild(el);
            checkAnswerDirectly(el);
        }
    } else if (currentSection === 2) {
        targetZone.appendChild(el);
        actionBtn.style.display = "inline-block";
        actionBtn.textContent = "Comprovar frase";
        actionBtn.onclick = checkSentenceOrder;
    }
}

function next() {
    if (questionInSectionIdx > maxQuestionsPerSection) {
        questionInSectionIdx = 1;
        currentSection++;
        resetProgressBar();

        if (currentSection > 3) {
            question.textContent = "🎉 Enhorabona! Has completat totes les seccions.";
            targetZone.innerHTML = `<div class="target-label">Partida Finalitzada</div>`;
            options.innerHTML = "";
            duoHint.style.display = "none";
            actionBtn.style.display = "none";
            msg.innerHTML = `Puntuació final: <strong>${score} punts</strong>.`;
            return;
        }
    }

    msg.textContent = "";
    options.innerHTML = "";
    targetZone.innerHTML = "";
    duoHint.style.display = "none";
    actionBtn.style.display = "none";
    updateHeader();

    if (currentSection === 1) {
        const correct = data[Math.floor(Math.random() * data.length)];
        const isWordToPic = Math.random() < 0.5;

        if (isWordToPic) {
            question.textContent = `Arrossega el pictograma correcte cap a la zona blanca:`;
            targetZone.innerHTML = `<div class="target-label">${correct.w.toUpperCase()}</div>`;
            targetZone.dataset.correct = correct.e;

            const opts = shuffle([correct, ...shuffle(data.filter(x => x !== correct)).slice(0, 3)]);
            opts.forEach((o, i) => {
                const div = document.createElement('div');
                div.className = 'drag-item item-pic'; div.textContent = o.e;
                div.draggable = true; div.id = `drag-${i}`;
                makeElementDraggable(div);
                options.appendChild(div);
            });
        } else {
            question.textContent = `Arrossega la paraula correcta cap a la zona blanca:`;
            targetZone.innerHTML = `<div class="target-label-pic">${correct.e}</div>`;
            targetZone.dataset.correct = correct.w;

            const opts = shuffle([correct, ...shuffle(data.filter(x => x !== correct)).slice(0, 3)]);
            opts.forEach((o, i) => {
                const div = document.createElement('div');
                div.className = 'drag-item item-word'; div.textContent = o.w;
                div.draggable = true; div.id = `drag-${i}`;
                makeElementDraggable(div);
                options.appendChild(div);
            });
        }
    }
    else if (currentSection === 2) {
        const fraseSeleccionada = frasesComplexes[(questionInSectionIdx - 1) % frasesComplexes.length];

        question.textContent = `Ordena els pictogrames per traduir la frase:`;
        duoHint.textContent = `"${fraseSeleccionada.text}"`;
        duoHint.style.display = "block";

        correctAnswersOrder = fraseSeleccionada.ordre;

        let distractor = data[Math.floor(Math.random() * data.length)].e;
        while (correctAnswersOrder.includes(distractor)) {
            distractor = data[Math.floor(Math.random() * data.length)].e;
        }

        const allPieces = shuffle([...correctAnswersOrder, distractor]);
        allPieces.forEach((sym, i) => {
            const div = document.createElement('div');
            div.className = 'drag-item item-pic'; div.textContent = sym;
            div.draggable = true; div.id = `drag-${i}`;
            div.dataset.val = sym;
            makeElementDraggable(div);
            options.appendChild(div);
        });
    }
    else if (currentSection === 3) {
        const situacions = [
            { q: "Està plovent molt fort a fora 🌧️, què necessites per no banyar-te?", correct: "🌂", opts: ["🪑", "🚲", "🍉"] },
            { q: "Tens molta gana i vols esmorzar sa, què pots menjar? 🥣", correct: "🍎", opts: ["🔑", "🚗", "💻"] },
            { q: "Fa molta calor i vols anar ràpid a la platja 🌊, quin transport agafes?", correct: "🚗", opts: ["🛏️", "🧸", "📚"] },
            { q: "S'ha fet de nit i estàs molt cansat, on vas directament? 🌙", correct: "🛏️", opts: ["🍕", "🚀", "🧼"] },
            { q: "Vols fer un dibuix molt bonic en un llibre, què haces servir?", correct: "🎨", opts: ["🐱", "🚂", "🍞"] }
        ];

        const sit = situacions[(questionInSectionIdx - 1) % situacions.length];
        question.textContent = `${sit.q}`;
        targetZone.innerHTML = `<div class="target-label">?</div>`;
        targetZone.dataset.correct = sit.correct;

        const finalOpts = shuffle([sit.correct, ...sit.opts]);
        finalOpts.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'drag-item item-pic'; div.textContent = opt;
            div.draggable = true; div.id = `drag-${i}`;
            makeElementDraggable(div);
            options.appendChild(div);
        });
    }
}

function checkAnswerDirectly(element) {
    const answer = element.textContent;
    const correct = targetZone.dataset.correct;
    resolveRound(answer === correct);
}

function checkSentenceOrder() {
    const items = Array.from(targetZone.querySelectorAll('.drag-item'));
    const userOrder = items.map(el => el.dataset.val);

    if (userOrder.length !== correctAnswersOrder.length) {
        resolveRound(false);
        return;
    }

    const isCorrect = userOrder.every((val, index) => val === correctAnswersOrder[index]);
    resolveRound(isCorrect);
}

function resolveRound(ok) {
    document.querySelectorAll('.drag-item').forEach(el => el.draggable = false);

    if (ok) {
        score += 10;
        msg.textContent = "Correcte!";
    } else {
        score = Math.max(0, score - 5);
        msg.textContent = "Incorrecte! La resposta correcta era: " + targetZone.dataset.correct;
    }

    updateProgressCircle(ok);
    questionInSectionIdx++;
    updateHeader();
    setTimeout(next, 1200);
}

initDragAndDrop();
updateHeader();
next();