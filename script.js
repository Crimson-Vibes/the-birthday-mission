const intro = [
    { text: "Hellooooooooo.", face: "˶◕‿◕˵" },

    { text: "I have been informed that today is your birthday.", face: "˶ᵔ ᵕ ᵔ˶" },

    { text: "I have also been informed that you don't feel like celebrating.", face: "╥﹏╥" },

    { text: "Which is a bold thing to say while opening a birthday website made specifically for you.", face: "ಠᴗಠ" },

    { text: "That's like walking into a bakery and saying you're not thinking about cake.", face: "•᷄⌓•᷅" },

    { text: "Suspicious behavior.", face: "¬_¬" },

    { text: "Very suspicious behavior.", face: "ಠ_ಠ" },

    { text: "So after careful consideration...", face: "˵•̀ ᴗ •́ ˵" },

    { text: "I have decided to ignore that information.", face: "~⩊~" },

    { text: "Welcome to your birthday.", face: "✦‿✦" },

    { text: "Please remain calm during the ride.", face: "◕ᴗ◕" },

    { text: "Or don't.", face: "◔_◔" },

    { text: "Either way, we're doing this.", face: "✧⩊✧" },

    { text: "Brace yourself...", face: "◉_◉" },

    { text: "Because our magic carpet is waiting.", face: "˃̵ᴗ˂" }
];


const UI = {
    dialogue: document.getElementById("dialogue"),
    choices: document.getElementById("choices"),
    floating: document.getElementById("floatingMessage"),
    chapter: document.querySelector(".chapter-tag"),
    face: document.getElementById("bunFace"),
    music: document.getElementById("bgMusic"),
    achievement: document.getElementById("achievement"),
    confetti: document.getElementById("confettiContainer"),
    startScreen: document.getElementById("startScreen")
};

const state = {
    typing: false,
    introIndex: 0,
    chapter: 0,
    frogs: 0,
    frogUnlocked: false,
    musicStarted: false
};

function typeText(text, callback) {

    if (state.typing) return;
    state.typing = true;

    UI.dialogue.innerHTML = "";

    let i = 0;

    const interval = setInterval(() => {

        UI.dialogue.innerHTML +=
            text[i] === "\n" ? "<br>" : text[i];

        i++;

        if (i >= text.length) {
            clearInterval(interval);
            state.typing = false;
            callback?.();
        }

    }, 22);
}

function setFace(face) {
    UI.face.textContent = face;
}

function bunbunThought(text) {
    UI.floating.innerHTML = text;
}

function showAchievement(text) {
    UI.achievement.innerHTML = text;
    UI.achievement.classList.add("show");

    setTimeout(() => {
        UI.achievement.classList.remove("show");
    }, 2500);
}

function createConfetti() {

    for (let i = 0; i < 30; i++) {

        const c = document.createElement("div");
        c.className = "confetti";

        c.style.left = Math.random() * 100 + "vw";
        c.style.top = "-20px";

        c.style.background =
            ["#ffd7ef","#ffe8a3","#d6c4ff","#ffb7b7"][Math.floor(Math.random()*4)];

        UI.confetti.appendChild(c);

        setTimeout(() => c.remove(), 3000);
    }
}


function runIntro() {
    const line = intro[state.introIndex];
    if (!line) return;

    setFace(line.face);
    typeText(line.text);

    state.introIndex++;

    UI.choices.innerHTML = `
        <button onclick="nextIntro()">✨ Continue</button>
    `;
}


function nextIntro() {
    if (state.typing) return;

    if (state.introIndex < intro.length) {
        runIntro();
    } else {
        UI.choices.innerHTML = `
            <button onclick="startAdventure()">🚀 Start Adventure</button>
        `;
    }
}

function startAdventure() {

    if (!state.musicStarted) {
        UI.music.volume = 0.2;
        UI.music.play().catch(() => {});
        state.musicStarted = true;
    }

    showAchievement("🏆 Passenger Princess");
    bunbunThought("🪄 The carpet is waking up...");

    typeText("The adventure begins now.", () => {
        go(1);
    });
}

function go(n) {
    state.chapter = n;
    chapters[n]();
}

const chapters = {

1() {
    UI.chapter.innerHTML = "Chapter 1";
    setFace("˵•̀ ᴗ •́ ˵");

    bunbunThought("🪄 Carpet is inspecting you...");

    typeText("What is your current mood?", () => {

        UI.choices.innerHTML = `
            <button onclick="go(2)">Continue Investigation</button>
        `;
    });
},

2() {
    UI.chapter.innerHTML = "Chapter 2";
    setFace("╭ರ_•́");

    bunbunThought("🕵️ Something is missing...");

    typeText("The birthday appears to be missing.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(3)">Search Clues</button>
        `;
    });
},

3() {
    UI.chapter.innerHTML = "Chapter 3";
    setFace("•̀ - •");

    typeText("Suspicious gift boxes detected.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(4)">Open Box</button>
        `;
    });
},

4() {
    UI.chapter.innerHTML = "Chapter 4";
    setFace("◉_◉");

    bunbunThought("🎂 baking questionable cake...");

    typeText("Time to bake something dangerous.", () => {

        UI.choices.innerHTML = `
            <button onclick="go(5)">Continue</button>
        `;
    });
}

};

function findFrog(location) {

    state.frogs++;

    showAchievement(`🐸 Frog Found (${state.frogs}/5)`);

    const comments = [
        "Interesting frog.",
        "Second frog detected.",
        "Pattern forming.",
        "Concern rising.",
        "Frog Council aware."
    ];

    bunbunThought(
        `🐸 Found in ${location}. ${comments[state.frogs - 1] || "Too many frogs."}`
    );

    if (state.frogs >= 5 && !state.frogUnlocked) {
        unlockFrogCouncil();
    }
}

function unlockFrogCouncil() {

    state.frogUnlocked = true;

    setTimeout(() => {

     UI.choices.insertAdjacentHTML("beforeend", `
    <button onclick="frogCouncil()">🐸 Frog Council</button>
`);
    }, 800);
}


function chapter1() {

    UI.chapter.innerHTML = "Chapter 1";
    setFace("˵•̀ ᴗ •́ ˵");

    bunbunThought("🪄 Passenger inspection in progress...");

    typeText(
        "Before we continue, the carpet requires a quick passenger check. What's your current mood?",
        () => {

            UI.choices.innerHTML = `
                <button onclick="chooseMood('🫠 Existing')">🫠 Just existing</button>
                <button onclick="chooseMood('😴 Sleepy')">😴 Sleepy</button>
                <button onclick="chooseMood('🍕 Hungry')">🍕 Hungry</button>
                <button onclick="chooseMood('✨ Running on vibes')">✨ Running on vibes</button>
                <button onclick="chooseMood('🌙 Mysterious')">🌙 Mysterious</button>
            `;
        }
    );
}

function chooseMood(mood) {

    showAchievement("🏆 Passenger Alive");

    bunbunThought(`Mood recorded: ${mood}`);

    setFace("◕ᴗ◕");
    
    typeText(
        `Current status detected:

${mood}

Wonderful.

You have successfully met the minimum requirements for today's adventure.

Which, surprisingly, were very low.`,
        () => {

            UI.choices.innerHTML = `
                <button onclick="chapter2()">Continue Journey</button>
            `;
        }
    );
}

let cluesFound = 0;

function chapter2() {

    UI.chapter.innerHTML = "Chapter 2";
    setFace("╭ರ_•́");

    cluesFound = 0;

    bunbunThought("🕵️ Investigation mode activated.");

    typeText(
        `Uh oh.

I have received reports that your birthday has gone missing.

This is deeply concerning.

We must investigate immediately.`,
        () => {

            UI.choices.innerHTML = `
                <button onclick="collectClue('Multiple witnesses claim today is somehow important.')">
                    ✨ Clue 1
                </button>

                <button onclick="collectClue('Several birthday-related messages have been spotted in the area.')">
                    ✨ Clue 2
                </button>

                <button onclick="collectClue('A mysterious individual appears to have prepared something special.')">
                    ✨ Clue 3
                </button>

                <button onclick="collectClue('The suspect is currently participating in a birthday-themed adventure.')">
                    ✨ Clue 4
                </button>
            `;
        }
    );
}

function collectClue(text) {

    // prevent spam-click weirdness
    if (state.typing) return;

    cluesFound++;

    bunbunThought(`🔎 Clue recorded (${cluesFound}/4)`);

    typeText(text, () => {

        if (cluesFound >= 4) {

            UI.choices.innerHTML = `
                <button onclick="solveMystery()">
                    🕵️ Review Evidence
                </button>
            `;
        }
    });
}

function solveMystery() {

    showAchievement("🏆 Birthday Investigator");

    bunbunThought("📁 Case file updated.");

    typeText(
        `Hmm.

Let's review the evidence.

Multiple witnesses remembered today.
Birthday wishes have been spotted everywhere.
Someone may or may not have spent an alarming amount of time creating an entire birthday adventure.

The suspect is currently standing in the middle of said adventure.

And yet...
you continue to insist that today is just another ordinary day.

A fascinating argument.

Unfortunately...

The evidence is stacking up.

After a very serious investigation...
and several completely unnecessary meetings...

The Birthday Investigation Team has reached a conclusion.

The birthday was never actually missing.
It was simply buried.

Under responsibilities. Overthinking. Tired days.

And all the little things life threw at you lately.

But despite all that...
it was still here. Waiting for someone to notice it.

Case status:

Birthday located.
Suspect identified.
Celebration recommended.

Case closed.`,
        () => {

            UI.choices.innerHTML = `
                <button onclick="chapter3()">
                    Continue Journey
                </button>
            `;
        }
    );
}



