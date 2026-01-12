// ===== Utilidades para estilos con fallback =====
function supportsConstructableStylesheets(targetShadowRoot) {
  try {
    return !!targetShadowRoot && "adoptedStyleSheets" in targetShadowRoot;
  } catch (e) {
    return false;
  }
}

function makeSheet(cssText) {
  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  } catch {
    return null;
  }
}

function applyStyles(shadowRoot, cssTexts) {
  if (!shadowRoot) return;

  const canAdopt = supportsConstructableStylesheets(shadowRoot);
  if (canAdopt) {
    const newsheets = cssTexts
      .map(txt => makeSheet(txt))
      .filter(Boolean);
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, ...newsheets];
  } else {
    const style = document.createElement("style");
    style.textContent = cssTexts.join("\n");
    shadowRoot.appendChild(style);
  }
}

// ===== Función principal de personalización =====
function customizeDialogflow() {
  console.log("🔧 Iniciando personalización del chatbot...");

  const r1 = document.querySelector("df-messenger");
  if (!r1 || !r1.shadowRoot) {
    console.warn("⚠️ df-messenger no encontrado, reintentando...");
    return false;
  }

  const r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  if (!r2 || !r2.shadowRoot) {
    console.warn("⚠️ df-messenger-chat no encontrado, reintentando...");
    return false;
  }

  const r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  const r4 = r2.shadowRoot.querySelector("df-messenger-user-input");
  const r5 = r2.shadowRoot.querySelector("df-message-list");

  if (!r3 || !r3.shadowRoot || !r4 || !r4.shadowRoot || !r5 || !r5.shadowRoot) {
    console.warn("⚠️ Elementos internos no disponibles, reintentando...");
    return false;
  }

  console.log("✅ Todos los elementos encontrados, aplicando estilos...");

  const r6 = r3.shadowRoot.querySelector("#dfTitlebar");
  const r7 = r4.shadowRoot.querySelector(".input-container");
  const r8 = r4.shadowRoot.querySelector(".input-container .input-box-wrapper");
  const r9 = r4.shadowRoot.querySelector(".input-container .input-box-wrapper input");

  // ===== ESTILOS MEJORADOS Y RESPONSIVE =====
  
  // 1. Altura responsive del chat
  {
    const style = document.createElement("style");
    style.textContent = `
      .chat-wrapper { 
        max-height: 85vh !important;
        height: 600px !important;
     2. Estilos del titlebar - Barra de título con gradiente
  applyStyles(
    r3.shadowRoot,
    [`
      .title-wrapper {
        background: linear-gradient(135deg, rgb(28, 68, 100) 0%, rgb(38, 78, 110) 100%) !important;
        background-size: 200% 200% !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        color: #fff !important;
        font-size: 20px !important;
        font-weight: 700 !important;
        text-align: center !important;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.4) !important;
        padding: 18px 16px !important;
        border-radius: 12px 12px 0 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 12px !important;
      }
      .title {
        font-family: 'Roboto', sans-serif !important;
        letter-spacing: 0.5px !important;
      }
    `]
  );

  // 3. Estilos del botón de envío
  applyStyles(
    r4.shadowRoot,
    [
      `#sendIcon { 
        background: linear-gradient(135deg, rgb(37,71,106) 0%, rgb(20,105,126) 100%) !important; 
        border-radius: 4px !important; 
        box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
        transition: all 0.3s ease !important;
        padding: 8px !important;
      }`,
      `#sendIcon:hover { 
        fill: white !important; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
        transform: scale(1.05) !important;
      }`,
      `.input-box-wrapper {
        border: 2px solid #e0e0e0 !important;
        border-radius: 24px !important;
        transition: all 0.3s ease !important;
      }`,
      `.input-box-wrapper.valid {
        border-color: rgb(28, 68, 100) !important;
      }`,
      `.input-box-wrapper input {
        padding: 12px 16px !important;
        font-size: 14px !important;
      }`
    ]
  );5. Logo animado en el titlebar
  if (r6) {
    const imagen_bot = document.createElement("img");
    imagen_bot.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/ogechatbot.png?alt=media&token=d3846f07-18d8-49f6-a29b-0a84ba64674d";
    imagen_bot.width = 45;
    imagen_bot.height = 45;
    imagen_bot.style.cssText = "transition: all 0.5s ease; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2);";
    r6.insertAdjacentElement("beforebegin", imagen_bot);

    let angle = 0;
    let direction = 1;

    function rotateImage() {
      angle += direction * 0.008;
      if (angle > 0.15 || angle < -0.15) direction *= -1;
      imagen_bot.style.transform = `rotate(${angle}rad)`;
      requestAnimationFrame(rotateImage);
    }
    rotateImage();

    imagen_bot.addEventListener("mouseover", () => {
      imagen_bot.style.transform = `scale(1.15) rotate(${angle}rad)`;
      imagen_bot.style.boxShadow = "0 4px 16px rgba(28, 68, 100, 0.4)";
    });
    imagen_bot.addEventListener("mouseout", () => {
      imagen_bot.style.transform = `scale(1) rotate(${angle}rad)`;
      imagen_bot.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"
        padding: 12px 16px !important;
     6. Animaciones del widgetIcon (botón flotante)
  applyStyles(
    r1.shadowRoot,
    [`
      @keyframes blink {
        0%, 100% { 
          box-shadow: 0 0 20px rgba(28,68,100, 0.6), 
                      0 0 40px rgba(28,68,100, 0.4), 
                      0 0 60px rgba(28,68,100, 0.2);
        }
        50% { 
          box-shadow: 0 0 10px rgba(28,68,100, 0.4), 
                      0 0 20px rgba(28,68,100, 0.2), 
                      0 0 30px rgba(28,68,100, 0.1);
        }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotateY(0deg); }
        25% { transform: translateY(-5px) rotateY(90deg); }
        50% { transform: translateY(0px) rotateY(180deg); }
        75% { transform: translateY(-5px) rotateY(270deg); }
      }
      button#widgetIcon {
        background: linear-gradient(135deg, rgb(28,68,100) 0%, rgb(38,78,110) 100%) !important;
        border: none !important;
        box-shadow: 0 8px 24px rgba(28,68,100, 0.4) !important;
        animation: blink 4s ease-in-out infinite, float 20s linear infinite !important;
        width: 64px !important;
        height: 64px !important;
        transition: all 0.3s ease !important;
      }
      button#widgetIcon:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 12px 32px rgba(28,68,100, 0.6) !important;
      }
      button#widgetIcon img {
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)) !important
        transition: all 0.3s ease !important;
        cursor: pointer !important;
      }`,
      `.chip:hover {
        background: rgb(28, 68, 100) !important;
        color: white !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 8px rgba(28, 68, 100, 0.3) !important;
     
        text-align: center;
        text-shadow: rgba(0,0,0,0.5) 2px 2px;
      }
    `]
  );

  applyStyles(
    r4.shadowRoot,
    [
      `#sendIcon { background: linear-gradient(135deg, rgb(37,71,106) 0%, rgb(20,105,126) 100%); border-radius: 3px; box-shadow: .5px .5px 1.5px 1.5px #ddd; }`,
      `#sendIcon:hover { fill: white; }`,
      `#sendIcon:hover { box-shadow: 1px 1px 2px 2px #ddd; transition: 400ms; border: .8px solid transparent; }`
    ]
  );

  applyStyles(
    r5.shadowRoot,
    [
      `#messageList { background: white; }`,
      `#messageList .message.user-message { color: white; background: linear-gradient(135deg, rgb(37,71,106), rgb(20,105,126)) !important; }`,
      `#messageList .message.bot-message { color: rgb(6,19,43); background: rgb(240,242,247); }`
    ]
  );

  // ===== Logo animado en el titlebar (antes del título) =====
  if (r6) {
    const imagen_bot = document.createElement("img");
    imagen_bot.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/ogechatbot.png?alt=media&token=d3846f07-18d8-49f6-a29b-0a84ba64674d";
    imagen_bot.width = 40;
    imagen_bot.height = 40;
    imagen_bot.style.transition = "all .5s ease";
    r6.insertAdjacentElement("beforebegin", imagen_bot);

    let angle = 0;
    let direction = 1;

    function rotateImage() {
      angle += direction * 0.01;
      if (angle > 0.2 || angle < -0.2) direction *= -1;
      imagen_bot.style.transform = `rotate(${angle}rad)`;
      requestAnimationFrame(rotateImage);
    }
    rotateImage();

    imagen_bot.addEventListener("mouseover", () => {
      imagen_bot.style.transform = `scale(1.2) rotate(${angle}rad)`;
    });
    imagen_bot.addEventListener("mouseout", () => {
      imagen_bot.style.transform = `scale(1) rotate(${angle}rad)`;
    });
  }

  // ===== Animaciones del widgetIcon (burbuja) en el root (r1) =====
  app7. Footer personalizado: "Chat online OGE-UNASAM" + micrófono
  if (r7 && r8 && r9) {
    const div_microphone = document.createElement("div");
    div_microphone.style.cssText = `
      background: linear-gradient(180deg, #f0f2f7 0%, #e8eaed 100%);
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-top: 1px solid #d0d0d0;
      font-size: 13px;
      color: #555;
      font-weight: 500;
    `;
    r7.insertAdjacentElement("afterend", div_microphone);

    const span_text_bot = document.createElement("span");
    span_text_bot.textContent = "Chat online";
    span_text_bot.style.cssText = "color: #666; font-weight: 600;";

    const enlace_oge = document.createElement("a");
    enlace_oge.href = "https://www.facebook.com/ogeunasamoficial/";
    enlace_oge.target = "_blank";
    enlace_oge.textContent = "OGE-UNASAM";
    enlace_oge.style.cssText = `
      text-decoration: none;
      color: rgb(28, 68, 100 mejorado
    btn_microphone.addEventListener("click", function () {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("⚠️ Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o Edge.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "es-PE";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.addEventListener("result", e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");

        r9.value = transcript;
        r8.className = "input-box-wrapper valid";
        r9.focus();
      });

      recognition.start();
      
      // Efecto visual al grabar
      btn_microphone.style.cssText = `
        display: block;
        height: 42px;
        width: 42px;
        border-radius: 50%;
        border: 2px solid rgb(20, 105, 126);
        margin: 0;
        background: linear-gradient(135deg, rgba(37,71,106,0.8) 0%, rgba(20,105,126,0.8) 100%);
        cursor: pointer;
        animation: pulse 1s infinite;
        box-shadow: 0 4px 16px rgba(20, 105, 126, 0.5);
      `;

      // Añadir animación de pulso
      const style = document.createElement("style");
      style.textContent = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
     8. TTS: Ícono de audio mejorado por cada mensaje del bot
  (function attachTTSForBotMessages() {
    const sr = r5.shadowRoot;
    if (!sr) return;

    function addIconToMessage(msgEl) {
      if (!msgEl || !msgEl.classList || !msgEl.classList.contains("bot-message")) return;
      if (msgEl.dataset.ttsAttached === "1") return;

      const audioIcon = document.createElement("img");
      audioIcon.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/voz%2Fbot_voz.png?alt=media&token=80f770a9-3bc5-4a45-814e-f1d3a0b42463";
      audioIcon.width = 20;
      audioIcon.height = 20;
      audioIcon.style.cssText = `
        cursor: pointer;
        margin-left: 8px;
        vertical-align: middle;
        opacity: 0.7;
        transition: all 0.3s ease;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
      `;
      audioIcon.title = "🔊 Escuchar mensaje";

      audioIcon.addEventListener("mouseover", () => {
        audioIcon.style.opacity = "1";
        audioIcon.style.transform = "scale(1.2)";
      });

      audioIcon.addEventListener("mouseout", () => {
        audioIcon.style.opacity = "0.7";
        audioIcon.style.transform = "scale(1)";
      });

      audioIcon.addEventListener("click", () => {
        const messageText = (msgEl.textContent || "").trim();
        if (!messageText) return;
        
        // Detener cualquier lectura previa
        window.speechSynthesis.cancel();
        
        const utter = new SpeechSynthesisUtterance(messageText);
        utter.lang = "es-PE";
        utter.rate = 1.0;
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        // Efecto visual mientras habla
        audioIcon.style.animation = "pulse 0.5s infinite";
        
        utter.onend = () => {
          audioIcon.style.animation = "none";
        };
        
        window.speechSynthesis.speak(utter);
      });

      msgEl.appendChild(audioIcon);
      msgEl.dataset.ttsAttached = "1";
    }

    // Procesar mensajes existentes
    sr.querySelectorAll(".message.bot-message").forEach(addIconToMessage);

    // Observar nuevos mensajes
    const observer = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;

          if (node.classList && node.classList.contains("bot-message")) {
            addIconToMessage(node);
          }

          background: white;
          border: 2px solid rgb(28, 68, 100);
          margin: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        `cssText = "padding: 0; vertical-align: middle;ce + botón micrófono =====
  if (r7 && r8 && r9) {
    const div_microphone = document.createElement("div");
    div_microphone.style = "background: rgb(240,242,247); margin: 0 auto; display:flex; justify-content:center; align-items:center; gap:8px;";
    r7.insertAdjacentElement("afterend", div_microphone);

    const span_text_bot = document.createElement("span");
    span_text_bot.textContent = "Chat online";

    const enlace_oge = document.createElement("a");
    enlace_oge.href = "https://www.facebook.com/ogeunasamoficial/";
    enlace_oge.textContent = "OGE-UNASAM";
    enlace_oge.style = "text-decoration:none";

    const btn_microphone = document.createElement("button");
    btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin:5px; cursor:pointer;";

    const imagen_microphone = document.createElement("img");
    imagen_microphone.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/microphone.png?alt=media&token=0992cc33-0b7e-4b53-8bf8-8d53fad0157a";
    imagen_microphone.width = 26;
    imagen_microphone.height = 26;
    imagen_microphone.style = "padding-top:0px";
    btn_microphone.appendChild(imagen_microphone);

    div_microphone.appendChild(span_text_bot);
    div_microphone.appendChild(enlace_oge);
    div_microphone.appendChild(btn_microphone);

    // Reconocimiento de voz
    btn_microphone.addEventListener("click", function () {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "es-PE";
      recognition.interimResults = true;

      recognition.addEventListener("result", e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");

        r9.value = transcript;
        r8.className = "input-box-wrapper valid";
        r9.focus();
        // console.log("voz:", transcript);
      });

      recognition.start();
      btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; border:0; margin:5px; background: linear-gradient(135deg, rgba(37,71,106,.7) 0%, rgba(20,105,126,.7) 100%);";

      recognition.onend = () => {
        btn_microphone.style = "display:block; height: 40px; width: 40px; border-radius: 50px; background: white; border: 0; margin:5px;";

        // Simular Enter para enviar
        const ev = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          which: 13
        });
        r9.dispatchEvent(ev);
      };
    });
  }

  // ===== TTS: Ícono de audio por cada mensaje del bot =====
  (function attachTTSForBotMessages() {
    const sr = r5.shadowRoot;
    if (!sr) return;

    function addIconToMessage(msgEl) {
      if (!msgEl || !msgEl.classList || !msgEl.classList.contains("bot-message")) return;
      if (msgEl.dataset.ttsAttached === "1") return; // evitar duplicados

      const audioIcon = document.createElement("img");
      audioIcon.src = "https://firebasestorage.googleapis.com/v0/b/chatbotoge.appspot.com/o/voz%2Fbot_voz.png?alt=media&token=80f770a9-3bc5-4a45-814e-f1d3a0b42463";
      audioIcon.style.cssText = "cursor:pointer; margin-left:6px; vertical-align:middle;";
      audioIcon.title = "Escuchar mensaje";

      audioIcon.addEventListener("click", () => {
        const messageText = (msgEl.textContent || "").trim();
        if (!messageText) return;
        const utter = new SpeechSynthesisUtterance(messageText);
        utter.lang = "es-PE";
        window.speechSynthesis.cancel(); // cortar cualquier lectura previa
        window.speechSynthesis.speak(utter);
      });

      // Insertar al final del contenido del mensaje
      msgEl.appendChild(audioIcon);
      msgEl.dataset.ttsAttached = "1";
    }

    // Procesar existentes
    sr.querySelectorAll(".message.bot-message").forEach(addIconToMessage);

    // Observar nuevos mensajes
    const observer = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;

          // si agregan directamente un .bot-message
          if (node.classList && node.classList.contains("bot-message")) {
            addIconToMessage(node);
          }

          // si agregan contenedores, buscar dentro
          node.querySelectorAll && node.querySelectorAll(".message.bot-message").forEach(addIconToMessage);
        });
      }
    });

    observer.observe(sr, { childList: true, subtree: true });
  })();

  console.log("🎉 Personalización completada exitosamente!");
  return true;
}

// ===== Inicializar con múltiples intentos =====
let intentos = 0;
const maxIntentos = 20;

function intentarPersonalizar() {
  intentos++;
  console.log(`🔄 Intento ${intentos}/${maxIntentos}`);
  
  if (customizeDialogflow()) {
    console.log("✅ Personalización aplicada correctamente");
    return;
  }
  
  if (intentos < maxIntentos) {
    setTimeout(intentarPersonalizar, 300);
  } else {
    console.error("❌ No se pudo personalizar el chatbot después de " + maxIntentos + " intentos");
  }
}

// Escuchar el evento dfMessengerLoaded
if (window.dfMessengerLoaded) {
  console.log("🚀 dfMessenger ya estaba cargado, personalizando ahora...");
  intentarPersonalizar();
} else {
  window.addEventListener("dfMessengerLoaded", function () {
    console.log("🚀 Evento dfMessengerLoaded recibido");
    intentarPersonalizar();
  });
}

// Fallback: Intentar después de que el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(intentarPersonalizar, 1000);
  });
} else {
  setTimeout(intentarPersonalizar, 1000);
}
