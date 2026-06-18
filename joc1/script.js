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
    const badge = document.getElementById("sectionBadge");
    const title = document.getElementById("headerTitle");

    badge.textContent = `Secció ${currentSection} / 3`;

    if (currentSection === 1) {
        title.textContent = "Relacionar paraules i pictogrames";
    } else if (currentSection === 2) {
        title.textContent = "Construir frases complexes";
    } else {
        title.textContent = "Situacions i contexts diaris";
    }

    // El "Joc de Pictogrames" no cal actualitzar-lo aquí, 
    // ja que és estàtic al HTML ara.
    scoreEl.textContent = score;

    // Afegeix això a la teva funció updateHeader existent
    const scoreLabel = document.getElementById("scoreLabel");
    if (scoreLabel) {
        scoreLabel.textContent = (score === 1) ? "Punt" : "Punts";
    }
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
            document.querySelector('.sidebar').style.display = "none";
            document.querySelector('.main-container').style.justifyContent = "center";
            question.textContent = "🎉 Enhorabona! Has completat totes les seccions.";
            targetZone.innerHTML = "";
            options.innerHTML = "Partida finalitzada. Gràcies per jugar!";
            duoHint.style.display = "none";
            actionBtn.style.display = "none";
            const scoreLabel = document.getElementById("scoreLabel");
            if (scoreLabel) {
                scoreLabel.textContent = (score === 1) ? "Punt" : "Punts";
            }
            if (score === 1) {
                msg.innerHTML = `<div style="font-size: 24px; margin: 20px 0;">Puntuació final: <strong>${score} punt</strong></div>`;
            } else {
                msg.innerHTML = `<div style="font-size: 24px; margin: 20px 0;">Puntuació final: <strong>${score} punts</strong></div>`;
            }
            msg.innerHTML = `<div style="font-size: 24px; margin: 20px 0;">Puntuació final: <strong>${score} punts</strong></div>`;
            return;
        }
    }

    msg.textContent = "";
    options.innerHTML = "";
    targetZone.innerHTML = "";
    duoHint.style.display = "none";
    actionBtn.style.display = "none";
    updateHeader();

    // Determinem quantes opcions volem (5 per seccions 1 i 3, 10 per secció 2)
    const numOptions = (currentSection === 2) ? 10 : 5;

    if (currentSection === 1) {
        const correct = data[Math.floor(Math.random() * data.length)];
        const isWordToPic = Math.random() < 0.5;

        // Agafem distractors segons numOptions
        const distractors = shuffle(data.filter(x => x !== correct)).slice(0, numOptions - 1);
        const finalOpts = shuffle([correct, ...distractors]);

        if (isWordToPic) {
            question.textContent = `Arrossega el pictograma correcte cap a la zona blanca:`;
            targetZone.innerHTML = `<div class="target-label">${correct.w.toUpperCase()}</div>`;
            targetZone.dataset.correct = correct.e;

            finalOpts.forEach((o, i) => {
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

            finalOpts.forEach((o, i) => {
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

        // Omplim fins a 10 elements. Si els pictogrames correctes són pocs, afegim distractors
        let distractors = [];
        while (distractors.length < (numOptions - correctAnswersOrder.length)) {
            let d = data[Math.floor(Math.random() * data.length)].e;
            if (!correctAnswersOrder.includes(d) && !distractors.includes(d)) {
                distractors.push(d);
            }
        }

        const allPieces = shuffle([...correctAnswersOrder, ...distractors]);
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
            { q: "Està plovent molt fort a fora 🌧️, què necessites per no banyar-te?", correct: "🌂", opts: ["🪑", "🚲", "🍉", "🚗", "🧸"] },
            { q: "Tens molta gana i vols esmorzar sa, què pots menjar? 🥣", correct: "🍎", opts: ["🔑", "🚗", "💻", "🍕", "🚀"] },
            { q: "Fa molta calor i vols anar ràpid a la platja 🌊, quin transport agafes?", correct: "🚗", opts: ["🛏️", "🧸", "📚", "🐱", "🚂"] },
            { q: "S'ha fet de nit i estàs molt cansat, on vas directament? 🌙", correct: "🛏️", opts: ["🍕", "🚀", "🧼", "🎨", "🍞"] },
            { q: "Vols fer un dibuix molt bonic en un llibre, què fas servir?", correct: "🎨", opts: ["🐱", "🚂", "🍞", "🔑", "💻"] }
        ];

        const sit = situacions[(questionInSectionIdx - 1) % situacions.length];
        question.textContent = `${sit.q}`;
        targetZone.innerHTML = `<div class="target-label">?</div>`;
        targetZone.dataset.correct = sit.correct;

        // AQUÍ ÉS EL CANVI: 
        // Agafem el correcte i 4 distractors del array opts per sumar 5 en total
        const finalOpts = shuffle([sit.correct, ...sit.opts.slice(0, 4)]);

        finalOpts.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'drag-item item-pic'; 
            div.textContent = opt;
            div.draggable = true; 
            div.id = `drag-${i}`;
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
        score += 1;
        targetZone.classList.add('correct-bg');

        updateProgressCircle(ok);
        questionInSectionIdx++;
        updateHeader();
        setTimeout(() => {
            targetZone.classList.remove('correct-bg');
            next();
        }, 1500);
    } else {
        score = Math.max(0, score - 2);
        targetZone.classList.add('wrong-bg');

        // ... dins del bloc else de resolveRound ...
        setTimeout(() => {
            // Títol "Resposta correcta" amb mida ajustada
            targetZone.innerHTML = `
        <div style="font-size: 18px; font-weight: bold; color: #d32f2f; margin-bottom: 15px; text-transform: uppercase;">
            Resposta correcta:
        </div>`;

            if (currentSection === 2) {
                const correctDiv = document.createElement('div');
                correctDiv.style.display = "flex";
                correctDiv.style.gap = "6px";
                correctDiv.style.justifyContent = "center";

                correctAnswersOrder.forEach(pictograma => {
                    const el = document.createElement('div');
                    el.className = "drag-item item-pic";
                    el.textContent = pictograma;
                    // Reduïm la mida a 30px per equilibrar amb el text
                    el.style.fontSize = "30px";
                    el.style.padding = "5px 10px";
                    correctDiv.appendChild(el);
                });
                targetZone.appendChild(correctDiv);
            } else {
                const correctVal = targetZone.dataset.correct;
                // Mida 30px per a la resposta única també
                targetZone.innerHTML += `<div class="drag-item item-pic" style="font-size: 30px; padding: 5px 15px;">${correctVal}</div>`;
            }

            updateProgressCircle(ok);
            questionInSectionIdx++;
            updateHeader();

            setTimeout(() => {
                targetZone.classList.remove('wrong-bg');
                next();
            }, 2000);
        }, 1000);
    }
}

initDragAndDrop();
updateHeader();
next();