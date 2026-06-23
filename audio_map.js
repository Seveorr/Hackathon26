let currentAudio = new Audio();

// Fixa't en el "= null" al final, això evita l'error si no es passa cap callback
function playAudio(key, callback = null) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    const map = {
        "pictomatcher": "audio/bdd1b3f2-c9db-4540-9686-5fc0f931dbd0.mp3",
        "troba_les_emocions": "audio/07b9d64f-80cf-47ab-88f1-f90c0a957de3.mp3",
        "diàlegs": "audio/e612dfed-7d54-4218-9ed0-33f3f23bedae.mp3",
        "configuració": "audio/382bf4e5-684c-4c90-a911-546c9f0aa2f6.mp3",
        "descripció": "audio/56ce881d-647f-469d-900a-a1bc9846c970.mp3",
        "ambaccessibilitat": "audio/8c9273d2-c97c-43fc-a4c5-7e9a9137a5af.mp3",
        "senseaccessibilitat": "audio/007c9317-415d-417c-9568-1dc2200dc96d.mp3",
        "benvinguda_accessibilitat": "audio/0a4f6c7a-19c8-40f8-bfdb-be58a40f7ca4.mp3",
        "accessibilitat": "audio/9f84489f-cb48-451f-b6b7-9c38a67f62e8.mp3",
        "menú-principal": "audio/7a2df328-4a65-4458-843b-0f8602cdcbfa.mp3"
    };
    if (map[key]) {
        currentAudio.src = map[key];

        // Si hi ha un callback (una funció per executar després), l'assignem
        if (callback) {
            currentAudio.onended = callback;
        } else {
            currentAudio.onended = null; // Neteja l'anterior si no n'hi ha
        }

        currentAudio.play().catch(e => console.log("Àudio bloquejat:", e));
    } else {
        console.warn("Clau no trobada:", key);
    }
}