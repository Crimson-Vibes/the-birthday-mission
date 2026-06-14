const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const floatingMessage = document.getElementById("floatingMessage");
const chapterTag = document.querySelector(".chapter-tag");
const bgMusic = document.getElementById("bgMusic");
const heartContainer = document.getElementById("hearts");
const balloonArea = document.getElementById("balloons");

let chapter8Completed = false;
let bgMusicStarted = false;

let typing = false;
let typingInterval = null;

let inputLocked = false;

function lockInput() {
    inputLocked = true;
    choices.style.pointerEvents = "none";
    choices.style.opacity = "0.6";
}

function unlockInput() {
    inputLocked = false;
    choices.style.pointerEvents = "auto";
    choices.style.opacity = "1";
}

function returnToMainStory() {
    chapter9();
}

let frogsCollected = 0;
let frogUnlocked = false;

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

    if (typing) return;

    typing = true;
    lockInput();   // always block clicks

    dialogue.innerHTML = "";

    let i = 0;

    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }

    typingInterval = setInterval(() => {

        if (text.charAt(i) === "\n") {
            dialogue.innerHTML += "<br>";
        } else {
            dialogue.innerHTML += text.charAt(i);
        }

        i++;

        if (i >= text.length) {

            clearInterval(typingInterval);
            typingInterval = null;

            typing = false;
            unlockInput();

            if (callback) callback();
        }

    }, 25);
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

// ================== HEARTS & BALLOONS ==================
function startHeartsAndBalloons() {
  setInterval(() => {
    // HEART
    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);

    // BALLOON
    const b = document.createElement('span');
    b.textContent = '🎈';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.fontSize = Math.random() * 30 + 30 + 'px';
    b.style.animationDuration = Math.random() * 5 + 6 + 's';
    balloonArea.appendChild(b);
    setTimeout(() => b.remove(), 13000);

  }, 500);
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
"Excellent. The carpet appears to be functioning. This is really surprising.",
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

let clueSet = new Set();
let cluesFound = 0;

function chapter2(){

chapterTag.innerHTML =
"Chapter 2";

setFace(" ╭ರ_•́ ");
    
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
    if (clueSet.has(text)) return;

    clueSet.add(text);
    cluesFound++;

    typeText(text);

    if (cluesFound >= 4){
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

` ---
Hmm.
You still insist it’s just another day. Interesting claim.
After a careful investigation (and a few unnecessary dramatic pauses), the conclusion is simple:
The birthday was never missing.
Just a little buried under tired days, overthinking, and everything life kept tossing in.
But it didn’t leave.
It stayed. Quietly. Patiently. Waiting to be noticed.

Case status: found.
Suspect: already inside the celebration.
Verdict: overdue joy.

Case closed. 🎂
 `

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

setFace(" •̀ - •"); 
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
setFace("⊙.☉");
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
        "🧸 Pocket-Sized Comfort Bun",
        "🌸 Tiny Bouquet",
        "🧠 Bunbun's Last Braincell",
       "🍟 One Stolen French Fry",
       "🍪 Half-Eaten Cookie From Bunbun"

];

const reward =
gifts[
Math.floor(Math.random()*gifts.length)
];

setFace("•́⩊•̀");
    
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

setFace("˵•́ ᴗ •̀˵");
    
typeText(

`To celebrate your birthday being officially recovered… I thought I’d bake you a cake.
Important detail: I have no experience baking cakes. At all. This may or may not be a crime.
But we’re committed now.
So please choose a cake.
And let’s make slightly questionable decisions together. 🎂`
);

choices.innerHTML = `

   <button onclick="finishCake()">
    ☁️ Cloudberry Cake
   </button>

   <button onclick="finishCake()">
   🍫 Triple Chocolate Catastrophe
   </button>

   <button onclick="finishCake()">
   🌙 Moonlight Vanilla Cake
   </button>

   <button onclick="cakeFrog()">
🐸 Ask The Frog
</button>

   `;
}

function cakeFrog(){

findFrog(
"Cake Disaster"
);

setFace("ಠ‿ಠ");
typeText(
`You have chosen to consult the frog.
An interesting decision.

This raises several questions.
The frog stared into the distance for several seconds.
Then he offered exactly one piece of advice:

"ribbit."
...

Thank you, frog.
That was completely unhelpful.
Bunbun has decided to interpret this as approval.`

);

choices.innerHTML = `

   <button onclick="finishCake()">
    🐸 Follow The Frog's Wisdom
   </button>

   `;
}

function finishCake(){

showAchievement(
"🏆 Chaos Baker"
);

createConfetti();

setFace("≧◡≦");
    
typeText(

`The cake is finished.
Technically.
It leans slightly to the left.
One layer appears to be floating.
Also...
I may have eaten half of the frosting during construction.
In my defense,
quality control is important.

But...
it was made especially for you.
So despite several structural concerns...
I think it's perfect.
After all, birthdays aren't about perfect cakes.
They're about celebrating wonderful people.
Now hurry and blow out the candles before the frosting starts doing anything suspicious.✨`

);

  choices.innerHTML = `
        <button onclick="chapter5()">🪞 Continue Journey</button>
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

setFace("˃̵ᴗ˂");
typeText(

`We have arrived at the Mirror of Truth.
Don't worry.
A very rare magical artifact.
Most mirrors show your reflection.
This one shows the things that make you special.
Which is considerably more useful.
So let's see what it has to say.`

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
setFace("ᗜ_ᗜ");
typeText(

`You found a frog staring into the Mirror of Truth.
The mirror displayed:
"Absolutely magnificent."
The frog nodded.
The mirror nodded.
This feels suspiciously biased.
But nobody seems interested in my opinion.`

);

choices.innerHTML = `

   <button onclick="useMirror()">
   Continue
   </button>

   `;
}

function useMirror(){

const truths = [
"You are someone's favorite person to talk to.",
"You have made more people smile than you'll ever know.",
"You make ordinary days better without even trying.",
"You have a kindness people remember.",
"You are part of many happy memories.",
"You make people feel seen, heard, and appreciated.",
"You bring warmth wherever you go.",
"You are loved for reasons you don't even realize.",
"You have made the world brighter simply by being yourself.",
"The day you were born became one of the luckiest days for the people who know you."
];

const truth = truths[Math.floor(Math.random()*truths.length)];

setFace("¬‿¬");
typeText(
`The Mirror of Truth says:
...
Loading...
Please wait.
...
*Bunbun squints suspiciously.*
*Bunbun taps the mirror.*
Nothing.
*Bunbun taps it harder.*
Nothing.
*Bunbun smacks it.*
🪞💥

The mirror flickers to life.
*Bunbun nods.*
"Yep. That usually works."

The mirror says:

"${truth}"

*Bunbun looks at the mirror, then at you.*
"Yeah… I approve this message." `
, () => {

choices.innerHTML = `
   <button onclick="chapter6()">
    Continue the chaos ✨
   </button>
`;
});
}

// =========================
// CHAPTER 6
// WHEEL OF CHAOS
// =========================

function chapter6(){

chapterTag.innerHTML =
"Chapter 6";

bunbunThought(
    "🎡 This feels... legally unstable."
);

setFace("◕‿◕");
    
typeText(

`Welcome to the Wheel of Chaos.

I have absolutely no idea what happens next.

If anything goes wrong,
please pretend it was intentional.

Good luck.`

);

choices.innerHTML = `
   <button onclick="spinWheel()">
    🎡 SPIN (bad idea)
   </button>
   `;
}

function spinWheel(){

    const outcomes = [
        "🎂 Cake That Slightly Moves When Unwatched",
        "✨ Borrowed Luck (expires in 24 hours)",
        "🌙 Moonlight Shortcut (skips one bad moment)",
        "🪞 Mirror Echo (it repeats your last thought... loudly)",
        "🎡 Wheel Speed Upgrade (this is a mistake)",
        "📜 Unwritten Plot Twist (you’ll find out later)",
        "🌈 Reality Gets a Minor Color Correction",
        "🕰️ Perfect Timing (once, never again)",
        "🎭 Temporary Main Character Energy",
        "🧠 Bunbun's Last Braincell"
    ];

    const reward = outcomes[Math.floor(Math.random() * outcomes.length)];

    if (reward.includes("Braincell")) {
        showAchievement("🧠 Braincell Owner ");
    }

setFace("⊙_☉");
    
        typeText(
`Bunbun approaches the Wheel of Chaos.
He reads the warning label.
He ignores it.
He spins it anyway. 🎡

The wheel stops.
You received:
👉 ${reward}

Bunbun squints at it.
"...I don't remember agreeing to this result."
So please do not ask me how this works.
I barely understand it myself.`,
        () => {

            choices.innerHTML = `
                <button onclick="chapter7()">
                    Continue
                </button>
            `;
        });
}

// =========================
// CHAPTER 7
// JAR OF TINY GOOD THINGS
// =========================

function chapter7(){

chapterTag.innerHTML = "Chapter 7";

bunbunThought("🫙 Tiny things are suspiciously powerful.");

setFace("◡‿◡✿");
    
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

findFrog("Jar of Tiny Good Things");

setFace("ಠಿ_ಠ");
typeText(
`You found a frog inside the jar.
It appears to have been living there comfortably.
The frog refuses to explain it's rent situation.
Instead, it stares at you.
Judgmentally.`
);

choices.innerHTML = `
   <button onclick="openJar()">
    Proceed anyway
   </button>
`;
}

function openJar(){

const notes = [
    "Your favourite snack exists somewhere in the world.",
    "Blankets are still real, still warm, still available.",
    "Someone, somewhere, is smiling because of you.",
    "The sky has been beautiful before—and will be again.",
    "Tomorrow hasn’t arrived yet. It’s still being written.",
    "You are allowed to rest. No permission needed.",
    "Cake still exists. This is scientifically reassuring.",
    "You have already survived your hardest unknown day.",
    "Small joys are waiting for you quietly.",
    "You are not behind. You are just arriving in your own time."
];

const note = notes[Math.floor(Math.random() * notes.length)];
setFace("•᷄ࡇ•᷅");

typeText(
`You try to open the jar.
It refuses.
It simply vibrates slightly.

*Bunbun stares at it.*
"...this is personal now."
He pauses.
He very respectfully smashes the jar. 🫙💥
A tiny note falls out.`
);

setTimeout(() => {
    const btn = document.createElement("button");
    btn.textContent = "📜 Read Note";
    btn.onclick = () => readNote(note);

    choices.innerHTML = "";
    choices.appendChild(btn);
}, 1200);
}

function readNote(note){

setFace("¬‿¬");
    
typeText(
`You unfold the tiny note.
It is soft. Slightly wrinkled. Like it survived something.
It says:
"${note}"
...
The jar has now accepted defeat.`
);

choices.innerHTML = `
   <button onclick="chapter8()">
   Continue the journey
   </button>
`;
}
// =========================
// CHAPTER 8
// Highly classified
// =========================


function chapter8(){

chapterTag.innerHTML = "Chapter 8";

bunbunThought("📁 No. Don’t open that.");
    
setFace("⊙﹏⊙");
    
typeText(

`You have discovered the Secret Files.

Bunbun is standing very still.
That is never a good sign.
"...don’t open it."
"...why is it even here?"
Bunbun takes a step closer.
The air feels heavier.
"I am not emotionally prepared for what is inside that file."
"...and I definitely did NOT approve its placement here !! "
He pauses.
Slowly turns his head.
"...I am going to have a very serious conversation with the carpet after this."`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
   📁 Open it anyway
   </button>

   <button onclick="fileFrog()">
   🐸 Ask the frog
   </button>
`;

}


function fileFrog(){

findFrog("Secret Files");

setFace("◉_◉");
    
typeText(
`You ask the frog if you should open the file.
The frog examines the Secret File carefully.
It does not blink.
This is unsettling.
After a long silence...
the frog shrugs.`

);

choices.innerHTML = `
   <button onclick="openSecretFile()">
  📁 Take that as permission
   </button>
`;

}

function openSecretFile(){
setFace("°□°");
typeText(
`Bunbun suddenly appears in front of the file.
"Wait."
"No no no no."
He points at it like it personally offended him.
"...why is this still here?"
Bunbun looks at you.
"I know what you're going to do."
"You’re going to ignore me."
He sighs.
"...fine."
He steps aside very dramatically.`,
() => {
    choices.innerHTML = `
        <button onclick="revealLetter()">
        📖 Open File
        </button>
    `;
}
);
}

function revealLetter(){

setFace(" ¬_¬' ");

typeText(
`You open the file.
Bunbun is not watching.
He is absolutely watching.
He just doesn’t want to admit it.
...
It says:

“Hey.”

So you opened it. I’m not even surprised. Honestly, I’d be more worried if you didn’t. That would’ve been suspicious.

Anyways, I’m not great at serious letters, so if this gets a bit weird, that’s just me trying my best.

This whole thing we’ve been doing, the chaos, the choices, the frogs showing up where they absolutely shouldn’t, yeah… that wasn’t all accidental. Some of it was, yes. A concerning amount, actually. But it became something anyway.

I thought I was just building something fun. And it was. But somewhere between all the nonsense, it turned into something else too. Not big. Not dramatic. Just something that exists now because you went through it.

And I don’t think I planned for that part. That you’d actually be here. Reading this. Not skipping it. Just here.

So I’ll say it properly, once.

I’m glad you made it this far. That’s it. Just that.

Also, I’m kind of glad I got “appointed” for this task. I’m never doing this again. I only did it because… you’re special. Don’t make me regret saying that.

Okay. Now please stop opening classified things. I’m running out of files.

— Bunbun 🐰 `,
() => {

chapter8Completed = true;

if (frogUnlocked) {

    choices.innerHTML = `
        <button onclick="chapter9()">
        Continue Adventure 
        </button>

        <button onclick="frogCouncil()">
        🐸 Visit Frog Council
        </button>
    `;

}
else {

    choices.innerHTML = `
        <button onclick="chapter9()">
        Continue Adventure
        </button>
    `;

}
}
);

}
// =========================
// CHAPTER 9
// BIG RED BUTTON
// =========================

function chapter9(){

chapterTag.innerHTML =
"Chapter 9";

bunbunThought(
    "🔴 Do not press it. (This will not go well)"
);

setFace("ಠ_ಠ");
    
typeText(

` This is the Big Red Button.
Please do not press it.
It has been labeled very clearly.
With emotional emphasis.
Seriously.
"Please Do Not Press It."
...
Bunbun is watching.
This is important.
"Don't do it ! "`

);

choices.innerHTML = `
   <button onclick="pressButton()">
    🔴 PRESS IT [You don't have a choice]
   </button>
   `;
}

function pressButton(){

showAchievement("🏆 Self-Control? Never Heard Of It ");
createConfetti();

setFace("ಥ_ಥ");
    
typeText(
`...
You pressed it.
Of course you did.
Bunbun is staring at you in silence.
This is worse than shouting.
"...why."
"I specifically said not to do that.."
It literally said NOT to !!
"... I even asked you nicely."
*Takes a breath.*
"... you know what?"
"Enough.."
"No more buttons for you."`
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
    "🪄 The carpet is… landing? This is your fault, isn’t it."
);

createConfetti();

setFace("˶ᵔ ᵕ ᵔ˶");
    
typeText(

`I know you didn’t think this would turn into anything like this.

But the carpet has finally landed. 
So I guess… this is where it ends.

And honestly…
I think that’s okay.
Somewhere along the way, things stopped being just buttons and choices.

The carpet showed up like it had something to say.
The investigation kept insisting on answers nobody asked for.
The gift boxes appeared even when they weren’t invited.
And the frogs… well, they were just there. As always.

Somehow, all of it happened anyway.
But before we go, there's just one last thing.
Birthdays can feel strange sometimes.
Some years they're loud and exciting. Some years they're quiet.
Some years arrive while you're busy thinking about a hundred other things.
Not because it has to be perfect.
Not because every birthday needs balloons, cake, and a grand celebration.
The people who care about you know it.
The people who remembered today know it.
The person who made this website definitely knows it.
And after spending this entire adventure with you...
I think you know it too.

So whether today was amazing...
Or messy... Or ordinary...
Or somewhere in between...

I hope you found at least one thing that made you smile.
One tiny reminder that even on the busiest days, you deserve moments of happiness too.

So here's your final achievement:
🏆 Birthday Successfully Recovered
Congratulations.

You did it,
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
— Crimmiii 🐰`

);

choices.innerHTML = `
   <button onclick="location.reload()">
   🌙 Start Adventure Again
   </button>
   `;
}


function findFrog(location){

frogsCollected++;
checkFrogCouncil();

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
`🐸${frogComment}`
);
    
}

// =========================
// FROG COUNCIL SYSTEM
// =========================

function checkFrogCouncil() {
    if (frogsCollected >= 5 && !frogUnlocked) {
        frogUnlocked = true;

        showAchievement("🐸 Frog Royalty");

        const btn = document.createElement("button");
        btn.textContent = "🐸 Visit Frog Council";
        btn.onclick = frogCouncil;

        choices.appendChild(btn);
    }
}
// =========================
// FROG COUNCIL ENTRY
// =========================

function frogCouncil() {

    chapterTag.innerHTML = "Secret Chapter";

    createConfetti();
setFace("⊙﹏⊙");
    typeText(
        `Bunbun is staring at the screen.
"...why is this happening again."

A group of frogs appears.
They are holding something.
It looks like a message.

Bunbun leans closer.
"...I did not approve frog delivery services."
The frogs ignore him.
They wait silently.`,
        () => {
            choices.innerHTML = `
                <button onclick="frogMessage()">
                    📜 Read Frog Message
                </button>
            `;
        }
    );
}

// =========================
// FROG MESSAGE
// =========================

function frogMessage() {
setFace("ಠಿ_ಠ");
    
    typeText(
        `🐸 OFFICIAL FROG MESSAGE:

Ribbit.
We have arrived.
Ribbit ribbit.

We are watching your journey from a respectful distance.
(One frog is too close. Please ignore him.)

The Frog Council has been observing you.
Quietly.
From various locations.
Mostly ponds.

After careful consideration...

The council has reached a decision.

We are proud.
Not because everything made sense.
But because you did it anyway.

Ribbit ribbit.

This is important frog philosophy.
We learned it yesterday.

You are officially Frog Approved.

IMPORTANT ANNOUNCEMENTS:
- Do not trust shiny objects.
- Do not trust frogs who say “trust me”.
- Do not trust Bunbun when he says “this is normal”.
He is lying.
Ribbit.

FINAL NOTE:
If confusion increases, remain calm.
Frogs are handling it.
(We are not handling it.)

Ribbit ribbit ribbit.

— The Frogs 🐸`,
        () => {
            choices.innerHTML = `
                <button onclick="bunbunReact()">
                    🐰 Ask Bunbun why frogs are like this
                </button>
            `;
        }
    );
}

// =========================
// BUNBUN REACTION
// =========================

function bunbunReact() {
setFace("ಠ益ಠ");
    typeText(
        `Bunbun is staring at the message.

"...what did I just read."

He scrolls back.
"...why is there ribbiting in official documents."

Pause.
Long pause.

"...who allowed this council to function unsupervised?"

He looks around like the frogs might still be listening.
They probably are.

"...I need a different job."`,
        () => {
            choices.innerHTML = `
                <button onclick="returnFromCouncil()">
                    🐰 Continue
                </button>
            `;
        }
    );
}

// =========================
// RETURN SCENE
// =========================

function returnFromCouncil() {
setFace("-_-");
    typeText(
        `The council nods in agreement.
One frog immediately falls off the table.
This is considered a formal conclusion.

A tiny frog approaches you.
It hands you a sticker.
It is slightly damp.
No one explains why.

It simply says:
"Certified Cool Human."

The ink is questionable.
It may or may not still be moving.

The meeting has officially concluded.
A frog whispers something about snacks.
The council ignores him.
As usual.`,
        () => {
           choices.innerHTML = `
  <button onclick="returnToMainStory()">
    Return to Journey
  </button>
`;
        }
    );
}

window.addEventListener("load", () => {
    startHeartsAndBalloons();
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("choices").innerHTML = `
        <button onclick="nextDialogue()">
            Continue
        </button>
    `;
});
