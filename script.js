const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const floatingMessage = document.getElementById("floatingMessage");
const chapterTag = document.querySelector(".chapter-tag");
const bgMusic = document.getElementById("bgMusic");
let bgMusicStarted = false;

let typing = false;
let frogsCollected = 0;
let frogUnlocked = false;

const frogLocations = [
"Gift Valley",
"Cake Disaster",
"Mirror of Truth",
"Jar of Tiny Good Things",
"Secret Files"
];

const bunFace = document.getElementById("bunFace");
function setFace(face){
    bunFace.textContent = face;
}

const intro = [

{
    text: "Hellooooooooo.",
    face: "˶◕‿◕˵"
},

{
    text: "I have been informed that today is your birthday.",
    face: "˶ᵔ ᵕ ᵔ˶"
},

{
    text: "I have also been informed that you don't feel like celebrating.",
    face: "╥﹏╥"
},

{
    text: "Which is a bold thing to say while opening a birthday website made specifically for you.",
    face: "ಠᴗಠ"
},

{
    text: "That's like walking into a bakery and saying you're not thinking about cake.",
    face: "•᷄⌓•᷅ "
},

{
    text: "Suspicious behavior.",
    face: "¬_¬"
},

{
    text: "Very suspicious behavior.",
    face: "ಠ_ಠ"
},

{
    text: "So after careful consideration...",
    face: "˵•̀ ᴗ •́ ˵"
},

{
    text: "I have decided to ignore that information.",
    face: "~⩊~"
},

{
    text: "Welcome to your birthday.",
    face: "✦‿✦"
},

{
    text: "Please remain calm during the ride.",
    face: "◕ᴗ◕"
},

{
    text: "Or don't.",
    face: " ◔_◔ "
},

{
    text: "Either way, we're doing this.",
    face: " ✧⩊✧ "
},

{
    text: "Brace yourself...",
    face: "◉_◉"
},

{
    text: "Because our magic carpet is waiting.",
    face: "˃̵ᴗ˂"
        }

];

let introIndex = 0;


function typeText(text, callback){

    if(typing) return;

    typing = true;

    dialogue.innerHTML = "";

    let i = 0;

    const interval = setInterval(()=>{

       if (text.charAt(i) === "\n") {
    dialogue.innerHTML += "<br>";
} else {
    dialogue.innerHTML += text.charAt(i);
}
        
        i++;

        if(i >= text.length){

            clearInterval(interval);

            typing = false;

            if(callback) callback();

        }

    },25);

}

function bunbunThought(text){

    floatingMessage.innerHTML = text;
}


function nextDialogue(){

    if(typing) return;

    if(introIndex < intro.length){

        setFace(intro[introIndex].face);

        typeText(intro[introIndex].text);

        introIndex++;
    }
    else{

        choices.innerHTML = `
        <button onclick="startAdventure()">
        ✨ CLIMB ABOARD THE MAGIC CARPET
        </button>
        `;
    }
}

function showAchievement(text){

    const achievement =
    document.getElementById("achievement");

    achievement.innerHTML = text;

    achievement.classList.add("show");

    setTimeout(()=>{

        achievement.classList.remove("show");

    },3000);
}

function createConfetti(){

    const container =
    document.getElementById(
    "confettiContainer"
    );

    for(let i=0;i<30;i++){

        const piece =
        document.createElement("div");

        piece.classList.add(
        "confetti"
        );

        piece.style.left =
        Math.random()*100 + "vw";

        piece.style.top =
        "-20px";

        piece.style.background =
        ["#ffd7ef","#ffe8a3","#d6c4ff","#ffb7b7"][Math.floor(Math.random()*4)];

        container.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },3000);
    }
}

function startAdventure(){

    if(!bgMusicStarted){
        bgMusic.volume = 0.2;
        bgMusic.play().catch((err) => {
            console.log("Music blocked:", err);
        });
        bgMusicStarted = true;
    }

    showAchievement(
    "🏆  Passenger Princess "
    );

    bunbunThought(
    "🪄 The carpet is warming up..."
    );

    typeText(
    "Excellent.The carpet appears to be functioning.This is surprising.",
    ()=>{

        choices.innerHTML = `
        <button onclick="chapter1()">
        Continue
        </button>
        `;

    });

}

function chapter1(){

    chapterTag.innerHTML =
    "Chapter 1";
 setFace("˵•̀ ᴗ •́ ˵"); 
    
    bunbunThought(
    "🪄 Passenger inspection in progress..."
    );

    typeText(
    "Before we continue, the carpet requires a quick passenger check. What's your current mood? "
    );

    choices.innerHTML = `

    <button onclick="chooseMood('🫠 Just existing')">
    🫠 Existing
    </button>

    <button onclick="chooseMood('😴 Sleepy')">
    😴 Sleepy
    </button>

    <button onclick="chooseMood('🍕 Hungry')">
    🍕 Hungry
    </button>

    <button onclick="chooseMood('✨ Running on vibes')">
    ✨ Running on vibes
    </button>

    <button onclick="chooseMood('🌙 Mysterious')">
    🌙 Mysterious
    </button>

    `;
}

function chooseMood(mood){

    showAchievement(
    "🏆 Passenger Alive"
    );

    typeText(

`Current status detected:

${mood}

Wonderful.

You have successfully met the minimum requirements for today's adventure.

Which, surprisingly, were very low.`

    );

    choices.innerHTML = `
    <button onclick="chapter2()">
    Continue
    </button>
    `;
}

let cluesFound = 0;

function chapter2(){

    chapterTag.innerHTML =
    "Chapter 2";

    setFace(" ╭ರ_•́ ");

    cluesFound = 0;

    bunbunThought(
    "🕵️ Investigation mode activated."
    );

    typeText(

`Uh oh.

I have received reports that your birthday has gone missing.

This is deeply concerning.

We must investigate immediately.`

    );

    choices.innerHTML = `

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

function collectClue(text){

    cluesFound++;

    typeText(text);

    if(cluesFound >= 4){

        choices.innerHTML = `
        <button onclick="solveMystery()">
        🕵️ Review Evidence
        </button>
        `;
    }
}

function solveMystery(){

    showAchievement(
    "🏆 Birthday Investigator "
    );

    typeText(

` Hmm.

Let's review the evidence.

Multiple witnesses remembered today.

Birthday wishes have been spotted everywhere.

Someone may or may not have spent an alarming amount of time creating an entire birthday adventure.

The suspect is currently standing in the middle of said adventure.

And yet...

You continue to insist that today is just another ordinary day.

A fascinating argument.

Unfortunately...

The evidence is stacking up.

After a very serious investigation...

And several completely unnecessary meetings...

The Birthday Investigation Team has reached a conclusion.

The birthday was never actually missing.

It was simply buried.

Under responsibilities. Overthinking. Tired days.

And all the little things life threw at you lately.

But despite all that...

It was still here.

Waiting for someone to notice it.

Case status:

Birthday located.

Suspect identified.

Celebration recommended.

Case closed. `

    );

    choices.innerHTML = `
    <button onclick="chapter3()">
    Continue Journey
    </button>
    `;
}

function chapter3(){

    chapterTag.innerHTML =
    "Chapter 3";

    bunbunThought(
    "🎁 These boxes look suspicious."
    );

    typeText(

`Welcome to the Valley of Suspicious Gift Boxes.

Please choose wisely.

Or don't.

They all seem suspicious.`

    );

   choices.innerHTML = `

<button onclick="openGift()">
🎁 Box A
</button>

<button onclick="openGift()">
🎁 Box B
</button>

<button onclick="openGift()">
🎁 Box C
</button>

<button onclick="giftFrog()">
🐸 Suspicious Frog
</button>

`;
}


function giftFrog(){

    findFrog(
    "Gift Valley"
    );

    typeText(

`You found a frog hiding behind one of the gift boxes.

It claims it was helping organize presents.

The evidence is... inconclusive.

The frog seems very proud of itself regardless.`

    );

    choices.innerHTML = `

    <button onclick="chapter4()">
    Continue Journey
    </button>

    `;
}

function openGift(){

    const gifts = [

        "🎂 Virtual Cake",

        "🦆 Emotional Support Duck",

        "🐸 Frog",

        "🧠 Bunbun's Last Braincell",

        "✨ Extra Luck",

        "🌟 Good Vibes"

    ];

    const reward =
    gifts[
    Math.floor(Math.random()*gifts.length)
    ];

    typeText(

`Congratulations.

You received:

${reward}

Please use it responsibly.

Or irresponsibly.

I am not your supervisor.`

    );

    choices.innerHTML = `
    <button onclick="chapter4()">
    Continue
    </button>
    `;
}

function chapter4(){

    chapterTag.innerHTML =
    "Chapter 4";

    bunbunThought(
    "🎂 This can only go well."
    );

    typeText(

`Welcome to the Great Cake Disaster.

Please build a cake.

What could possibly go wrong?`

    );

    choices.innerHTML = `

    <button onclick="finishCake()">
    🔺 Triangle Cake
    </button>

    <button onclick="finishCake()">
    🌈 Excessive Sprinkles
    </button>

    <button onclick="finishCake()">
    🧸 Bunbun Decoration
    </button>

    <button onclick="cakeFrog()">
🐸 Cake Frog
</button>

    `;
}

function cakeFrog(){

    findFrog(
    "Cake Disaster"
    );

    typeText(

`You discovered a frog hiding inside the cake ingredients.

This raises several questions.

The frog refuses to answer any of them.`

    );

    choices.innerHTML = `

    <button onclick="finishCake()">
    Continue Cake Construction
    </button>

    `;
}

function finishCake(){

    showAchievement(
    "🏆 Chaos Baker"
    );

    createConfetti();

    typeText(

`Hmm.

Let's have a look...

Interesting choice.

Very interesting choice.

This is, without a doubt...

The worst cake I have ever seen.

The frosting is questionable.

The decorations are concerning.

And I'm not entirely sure that's how cakes are supposed to work.

...

It still tastes good.

So I love it.`

    );

choices.innerHTML = `

<button onclick="chapter5()">
🪞 Continue Journey
</button>

`;
}

// =========================
// CHAPTER 5
// MIRROR OF TRUTH
// =========================

function chapter5(){

    chapterTag.innerHTML =
    "Chapter 5";

    bunbunThought(
    "🪞 Mirrors are weird."
    );

    typeText(

`We have arrived at the Mirror of Truth.

Don't worry.

This one only reveals nice things.

Mostly.`

    );

    choices.innerHTML = `
    <button onclick="useMirror()">
    🪞 Look Into Mirror
    </button>

<button onclick="mirrorFrog()">
🐸 Mirror Frog
</button>
    `;
}

function mirrorFrog(){

    findFrog(
    "Mirror of Truth"
    );

    typeText(

`You found a frog staring into the mirror.

It appears extremely pleased with its reflection.

Honestly?

Fair enough.`

    );

    choices.innerHTML = `

    <button onclick="useMirror()">
    Continue
    </button>

    `;
}

function useMirror(){

    const truths = [

        "You are someone's favourite notification.",

        "You make conversations more fun.",

        "You deserve kindness too.",

        "You have survived 100% of your bad days so far.",

        "You matter more than you realize.",

        "You make the world a little brighter."
    ];

    const truth =
    truths[
    Math.floor(Math.random()*truths.length)
    ];

    typeText(

`The Mirror of Truth says:

"${truth}"`

    );

    choices.innerHTML = `
    <button onclick="chapter6()">
    Continue
    </button>
    `;
}

// =========================
// CHAPTER 6
// WHEEL OF CHAOS
// =========================

function chapter6(){

    chapterTag.innerHTML =
    "Chapter 6";

    bunbunThought(
    "🎡 This feels unsafe."
    );

    typeText(

`Welcome to the Wheel of Chaos.

I have absolutely no idea what happens next.

Good luck.`

    );

    choices.innerHTML = `
    <button onclick="spinWheel()">
    🎡 SPIN
    </button>
    `;
}

function spinWheel(){

    const outcomes = [

        "🎂 Virtual Cake",

        "🦆 Emotional Support Duck",

        "🐸 Frog",

        "✨ Extra Luck",

        "🧠 Bunbun's Last Braincell",

        "🧠 Bunbun's Spare Braincell",

        "🌟 Good Vibes",

        "🎁 Mystery Gift"
    ];

    const reward =
    outcomes[
    Math.floor(Math.random()*outcomes.length)
    ];

    if(reward.includes("Braincell")){

        showAchievement(
        "🧠 Braincell Owner "
        );
    }

    typeText(

`The wheel has decided.

You received:

${reward}

Please do not ask me how this works.

I barely understand it myself.`

    );

    choices.innerHTML = `
    <button onclick="chapter7()">
    Continue
    </button>
    `;
}

// =========================
// CHAPTER 7
// JAR OF TINY GOOD THINGS
// =========================

function chapter7(){

    chapterTag.innerHTML =
    "Chapter 7";

    bunbunThought(
    "🫙 Tiny things matter too."
    );

    typeText(

`Sometimes a whole happy day feels difficult.

So let's aim smaller.

Welcome to the Jar of Tiny Good Things.`

    );

    choices.innerHTML = `
    <button onclick="openJar()">
    🫙 Open Jar
    </button>

<button onclick="jarFrog()">
🐸 Jar Frog
</button>
    `;
}

 function jarFrog(){

    findFrog(
    "Jar of Tiny Good Things"
    );

    typeText(

`You found a frog folded inside the jar.

How it got in there remains unknown.

The frog refuses further comment.`

    );

    choices.innerHTML = `

    <button onclick="openJar()">
    Continue
    </button>

    `;
}
    

function openJar(){

    const notes = [

        "Your favourite snack exists.",

        "Blankets exist.",

        "Someone made you a whole website.",

        "The sky has looked pretty at least once.",

        "Tomorrow hasn't happened yet.",

        "You are allowed to rest.",

        "Cake still exists."
    ];

    const note =
    notes[
    Math.floor(Math.random()*notes.length)
    ];

    typeText(

`You unfold a tiny note.

"${note}"`

    );

    choices.innerHTML = `
    <button onclick="chapter8()">
    Continue
    </button>
    `;
}

// =========================
// CHAPTER 8
// SECRET FILES
// =========================

function chapter8(){

    chapterTag.innerHTML =
    "Chapter 8";

    bunbunThought(
    "📁 Highly classified."
    );

    typeText(

`You have discovered the Secret Files.

Please do not tell the carpet.`

    );

    choices.innerHTML = `
    <button onclick="openSecretFile()">
    📁 Open File
    </button>

<button onclick="fileFrog()">
🐸 Classified Frog
</button>

    `;
}

function fileFrog(){

    findFrog(
    "Secret Files"
    );

    typeText(

`You discovered a highly classified frog.

It possesses security clearance.

You are not authorized to ask why.`

    );

    choices.innerHTML = `

    <button onclick="openSecretFile()">
    Continue
    </button>

    `;
}
    

function openSecretFile(){

    const files = [

        "I'm glad we met.",

        "I hope something makes you smile today.",

        "You deserve gentle days.",

        "Take things one day at a time.",

        "You are appreciated more than you know."
    ];

    const file =
    files[
    Math.floor(Math.random()*files.length)
    ];

    typeText(

`Secret Message:

"${file}"`

    );

    choices.innerHTML = `
    <button onclick="chapter9()">
    Continue
    </button>
    `;
}

// =========================
// CHAPTER 9
// BIG RED BUTTON
// =========================

function chapter9(){

    chapterTag.innerHTML =
    "Chapter 9";

    bunbunThought(
    "🔴 Do not press it."
    );

    typeText(

`This is the Big Red Button.

Please do not press it.

Seriously.

Do not press it.`

    );

    choices.innerHTML = `
    <button onclick="pressButton()">
    🔴 PRESS
    </button>
    `;
}

function pressButton(){

    showAchievement(
    "🏆 Lack Of Self Control"
    );

    createConfetti();

    typeText(

`WHY WOULD YOU DO THAT.

IT LITERALLY SAID NOT TO.

I EVEN ASKED NICELY.

Unbelievable.`

    );

    choices.innerHTML = `
    <button onclick="chapter10()">
    Continue
    </button>
    `;
}

// =========================
// FINAL CHAPTER
// =========================

function chapter10(){

    chapterTag.innerHTML =
    "Final Chapter";

    bunbunThought(
    "🪄 The carpet is landing..."
    );

    createConfetti();

    typeText(

`
I know you weren't planning on celebrating.

In fact, I'm pretty sure you made that very clear at the beginning.

But the carpet insisted.

The investigation insisted.

The gift boxes insisted.

The frogs definitely insisted.

And honestly...

I'm glad they did.

Mission Status:

✨ Birthday Recovered

✨ Smiles Generated

✨ Gifts Opened

✨ Braincells Acquired

✨ Carpet Slightly Lost

✨ Frog Council Satisfied

Before we go, there's just one last thing.

Birthdays can feel strange sometimes.

Some years they're loud and exciting.

Some years they're quiet.

Some years arrive while you're busy thinking about a hundred other things.

Not because it has to be perfect.

Not because every birthday needs balloons, cake, and a grand celebration.

The people who care about you know it.

The people who remembered today know it.

The person who made this website definitely knows it.

And after spending this entire adventure with you...

I think Bun Bun knows it too.

So whether today was amazing...

Or messy...

Or ordinary...

Or somewhere in between...

I hope you found at least one thing that made you smile.

One thing that made the day feel a little lighter.

One tiny reminder that even on the busiest days, you deserve moments of happiness too.

So here's your final achievement:

🏆 Birthday Successfully Recovered

Congratulations.

You did it.

You completed the adventure.

The carpet can finally retire.

The frogs can return to their mysterious frog business.

And Bun Bun can finally take a nap.

So whether you celebrated a lot, a little, or accidentally got dragged into a magical carpet adventure...

I hope today reminded you that you're appreciated more than you know.

Happy Birthday, Shreya.

Thank you for coming on this very serious, extremely professional, and definitely not ridiculous adventure.

Now go enjoy the rest of your day.

Go eat some cake.

Or at least think about cake.

— BunBun 🐰`

    );

    choices.innerHTML = `
    <button onclick="location.reload()">
    🌙 Start Adventure Again
    </button>
    `;
}

function findFrog(location){

    frogsCollected++;

    showAchievement(
    `🐸 Frog Found (${frogsCollected}/5)`
    );

    let frogComment = "";

    if(frogsCollected === 1)
        frogComment = "Interesting. A frog.";

    if(frogsCollected === 2)
        frogComment = "There appears to be a second frog.";

    if(frogsCollected === 3)
        frogComment = "This is becoming a pattern.";

    if(frogsCollected === 4)
        frogComment = "I am becoming concerned.";

    if(frogsCollected === 5)
        frogComment = "The Frog Council knows.";

    bunbunThought(
    `🐸 Frog discovered in ${location}. ${frogComment}`
    );

    if(frogsCollected >= 5){

        unlockFrogCouncil();
    }
}
    
function unlockFrogCouncil(){

    if(frogUnlocked) return;

    frogUnlocked = true;

    showAchievement(
    "🐸 Frog Royalty "
    );

    setTimeout(()=>{

        choices.innerHTML += `

        <button onclick="frogCouncil()">
        🐸 Visit Frog Council
        </button>

        `;

    },1000);
}

function frogCouncil(){

    chapterTag.innerHTML =
    "Secret Chapter";

    createConfetti();

    typeText(

`You have been summoned.

The Frog Council has been observing you.

Quietly.

From various locations.

Mostly ponds.

After careful consideration...

The council has reached a decision.

You are officially Frog Approved.

This is considered a great honor.

Please do not let it go to your head.

The frogs are proud of you.

Even the judgmental one.`

    );

    choices.innerHTML = `

    <button onclick="returnFromCouncil()">
    🐸 Thank The Council
    </button>

    `;
}

function returnFromCouncil(){

    typeText(

`The council nods.

A tiny frog hands you a sticker.

It simply says:

"Certified Cool Human."

The meeting has concluded.`

    );

    choices.innerHTML = `
    <button onclick="chapter10()">
    Continue Adventure
    </button>
    `;
}



choices.innerHTML = `
<button onclick="nextDialogue()">
Continue
</button>
`;
