const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const typingAreaContainer = document.getElementById("typingArea");
const typedTextElement = document.getElementById("typedText");
const cartaPergamino = document.getElementById("cartaPergamino");
const finalLetterContent = document.getElementById("finalLetterContent");

const backgroundMusic = document.getElementById("backgroundMusic"); // ¡Nueva línea para el audio!

let noClickCount = 0;
const messages = [
    "¿Segura? 🥺",
    "Vamos... no seas así 😢",
    "Si me dices que no, lloraré 😭",
    "El 'Sí' es más bonito ✨",
    "Mira cómo crece el botón verde 😏",
    "Última oportunidad... 😉",
    "Si le das a 'Sí' te espera una sorpresa 🎁"
];

// Contenido de la carta ampliado para el efecto de máquina de escribir
const fullLetterText = `Sé que a veces, en el torbellino del día a día, puedo parecer despistado/a y puede que se me escapen algunas fechas importantes. Y por eso, de verdad lo siento.
<br><br>
Pero quiero que sepas que esos despistes jamás, ni por un instante, significan que me olvide de lo mucho que te valoro, de lo increíble que eres, o de todo el amor y la admiración que siento por ti. Cada recuerdo contigo es un tesoro que guardo con cariño, y aunque mi memoria para los días no sea perfecta, mi corazón nunca olvida lo especial que eres en mi vida.
<br><br>
Lamento profundamente si alguna vez te hice sentir que no eras mi prioridad, o que tus momentos importantes no lo eran también para mí. Nada podría estar más lejos de la verdad. Eres y siempre serás una de las personas más fundamentales y queridas en mi existencia, mi ancla y mi alegría.
<br><br>
Te quiero un montón, con cada fibra de mi ser, y quiero que sepas que estoy aquí para ti, incondicionalmente. Para escucharte, para apoyarte, para celebrar tus triunfos y acompañarte en tus desafíos. Cuenta conmigo para todo lo que necesites, hoy, mañana y siempre. Eres mi mundo entero.`;


// Función para simular el efecto de máquina de escribir
function typeWriter(textElement, text, i = 0, speed = 100) { 
    if (i < text.length) {
        if (text.substring(i, i + 4) === '<br>') {
            textElement.innerHTML += '<br>';
            i += 4;
        } else {
            textElement.innerHTML += text.charAt(i);
            i++;
        }
        setTimeout(() => typeWriter(textElement, text, i, speed), speed);
    } else {
        // Cuando termina de escribir, removemos el cursor
        textElement.style.animation = 'none';
        textElement.style.borderRight = 'none';

        // Una vez que el typing ha terminado, mostramos el pergamino
        setTimeout(() => {
            typingAreaContainer.classList.remove('visible'); // Oculta el área de typing
            cartaPergamino.classList.add('visible'); // Muestra el pergamino
            finalLetterContent.innerHTML = fullLetterText; // Pone todo el texto de golpe en el pergamino
        }, 1500); // Pequeño retraso antes de que aparezca el pergamino para que se aprecie la transición
    }
}


// Event listener para el botón "No"
noBtn.addEventListener("click", () => {
    noClickCount++;
    const scaleYes = 1 + noClickCount * 0.2;
    const scaleNo = Math.max(1 - noClickCount * 0.15, 0.1);

    yesBtn.style.transform = `scale(${scaleYes})`;
    noBtn.style.transform = `scale(${scaleNo})`;

    message.textContent = messages[Math.min(noClickCount - 1, messages.length - 1)];
});

// Event listener para el botón "Sí"
yesBtn.addEventListener("click", () => {
    // Oculta los elementos originales de la página
    document.querySelector('h1').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    message.style.display = 'none';
    
    // El fondo ya está oscuro por el typingAreaContainer, pero se mantiene la transición en el body
    document.body.style.background = 'rgba(0,0,0,0.85)'; 
    document.body.style.backgroundColor = 'rgba(0,0,0,0.85)';

    // Muestra el área de máquina de escribir
    typingAreaContainer.classList.add('visible');

    // Inicia la música aquí
    if (backgroundMusic) {
        backgroundMusic.volume = 0.4; // Puedes ajustar este valor (0.0 a 1.0)
        backgroundMusic.play().catch(e => console.error("Error al reproducir la música:", e));
    }

    // Inicia el efecto de máquina de escribir
    typeWriter(typedTextElement, fullLetterText, 0, 100); 
});