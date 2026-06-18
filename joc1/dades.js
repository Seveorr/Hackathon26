const data = [
    // Aliments i begudes
    { e: "🍎", w: "poma" }, { e: "🍞", w: "pa" }, { e: "🥛", w: "llet" }, { e: "🍌", w: "plàtan" }, { e: "🧀", w: "formatge" },
    { e: "🥚", w: "ou" }, { e: "🥕", w: "pastanaga" }, { e: "🍗", w: "pollastre" }, { e: "🐟", w: "peix" }, { e: "🍦", w: "gelat" },
    { e: "🍕", w: "pizza" }, { e: "🍓", w: "maduixa" }, { e: "🍊", w: "taronja" }, { e: "🍉", w: "síndria" }, { e: "🥔", w: "patata" },
    { e: "🍅", w: "tomàquet" }, { e: "🍚", w: "arròs" }, { e: "🍫", w: "xocolata" }, { e: "💧", w: "aigua" }, { e: "🧃", w: "suc" },
    // Animals
    { e: "🐶", w: "gos" }, { e: "🐱", w: "gat" }, { e: "🐭", w: "ratolí" }, { e: "🐰", w: "conill" }, { e: "🦊", w: "guineu" },
    { e: "🐻", w: "os" }, { e: "🐼", w: "panda" }, { e: "🦁", w: "lleó" }, { e: "🐮", w: "vaca" }, { e: "🐷", w: "porc" },
    { e: "🐵", w: "mono" }, { e: "🐸", w: "granota" }, { e: "🐦", w: "ocell" }, { e: "🐧", w: "pingüí" }, { e: "🦆", w: "ànec" },
    { e: "🐝", w: "abella" }, { e: "🕷️", w: "aranya" }, { e: "🐢", w: "tortuga" }, { e: "🐬", w: "dofí" }, { e: "🐎", w: "cavall" },
    // Accions / Verbs
    { e: "🏃", w: "córrer" }, { e: "🍽️", w: "menjar" }, { e: "🥤", w: "beure" }, { e: "😴", w: "dormir" }, { e: "📖", w: "llegir" },
    { e: "✍️", w: "escriure" }, { e: "🗣️", w: "parlar" }, { e: "🎵", w: "cantar" }, { e: "💃", w: "ballar" }, { e: "🚶", w: "caminar" },
    { e: "🏊", w: "nedar" }, { e: "🚴", w: "pedalar" }, { e: "🎨", w: "pintar" }, { e: "🧼", w: "rentar" }, { e: "🧠", w: "pensar" },
    { e: "🤝", w: "ajudar" }, { e: "🧗", w: "pujar" }, { e: "✂️", w: "tallar" }, { e: "🧹", w: "escombrar" }, { e: "🛒", w: "comprar" },
    // Objectes de casa i escola
    { e: "🏠", w: "casa" }, { e: "🪑", w: "cadira" }, { e: "🛏️", w: "llit" }, { e: "🔑", w: "clau" }, { e: "🚪", w: "porta" },
    { e: "🧸", w: "nino" }, { e: "🎒", w: "motxilla" }, { e: "✏️", w: "llapis" }, { e: "📚", w: "llibre" }, { e: "💻", w: "ordinador" },
    { e: "📱", w: "mòbil" }, { e: "📺", w: "televisió" }, { e: "👕", w: "samarreta" }, { e: "👟", w: "sabata" }, { e: "👓", w: "ulleres" },
    { e: "🌂", w: "parany" }, { e: "🚲", w: "bicicleta" }, { e: "⏰", w: "rellotge" }, { e: "🧼", w: "sabó" }, { e: "🥄", w: "cullerot" },
    // Natura i transport
    { e: "☀️", w: "sol" }, { e: "🌙", w: "lluna" }, { e: "⭐", w: "estel" }, { e: "☁️", w: "núvol" }, { e: "🌧️", w: "pluja" },
    { e: "❄️", w: "neu" }, { e: "🔥", w: "foc" }, { e: "🌳", w: "arbre" }, { e: "🌸", w: "flor" }, { e: "🚗", w: "cotxe" },
    { e: "🚌", w: "autobús" }, { e: "🚂", w: "tren" }, { e: "✈️", w: "avió" }, { e: "⛵", w: "vaixell" }, { e: "🚀", w: "coet" }
];