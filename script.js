const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");

const intro = [

"HELLO.",

"I have been informed that today is your birthday.",

"I have also been informed that you don't feel like celebrating.",

"Which is a bold thing to say while opening a birthday website made specifically for you.",

"That's like walking into a bakery and saying you're not thinking about cake.",

"Suspicious behavior.",

"Very suspicious behavior.",

"So after careful consideration...",

"I have decided to ignore that information.",

"Welcome to your birthday.",

"Please remain calm during the ride.",

"Or don't.",

"Either way, we're doing this.",

"Brace yourself...",

"Because our magic carpet is waiting."

];

let index = 0;

function typeText(text, callback){

    dialogue.innerHTML = "";

    let i = 0;

    const interval = setInterval(()=>{

        dialogue.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(interval);

            if(callback) callback();

        }

    },25);

}

function nextDialogue(){

    if(index < intro.length){

        typeText(intro[index]);

        index++;

    }

    else{

        choices.innerHTML = `
        <button onclick="startAdventure()">
        ✨ CLIMB ABOARD THE MAGIC CARPET
        </button>
        `;
    }
}

function startAdventure(){

    showAchievement(
    "🏆 Opened The Birthday Adventure"
    );

    typeText(
    "Excellent. The carpet appears to be functioning. This is surprising."
    );

    choices.innerHTML = "";
}
function showAchievement(text){

    const a =
    document.getElementById(
    "achievement"
    );

    a.innerHTML = text;

    a.classList.add("show");

    setTimeout(()=>{

        a.classList.remove(
        "show"
        );

    },3000);
}

choices.innerHTML =
`
<button onclick="nextDialogue()">
Continue
</button>
`;
