const btnSurprise = document.getElementById("btnSurprise");
const openLetter = document.getElementById("openLetter");
const envelopeBtn = document.querySelector(".envelope");
const letterCard = document.getElementById("letterCard");
const moreHearts = document.getElementById("moreHearts");
const copyLink = document.getElementById("copyLink");
const music = document.getElementById("music");
const floating = document.querySelector(".floating");

function tryPlayMusic(){
  // Por políticas del navegador, solo suena si el usuario tocó algo.
  if (!music) return;
  music.volume = 0.5;
  music.play().catch(()=>{ /* silencioso */ });
}

btnSurprise.addEventListener("click", () => {
  tryPlayMusic();
  document.getElementById("letter").scrollIntoView({behavior:"smooth"});
});

openLetter.addEventListener("click", () => {
  tryPlayMusic();
  envelopeBtn.classList.toggle("open");
  letterCard.classList.toggle("show");
  burst(18);
});

moreHearts.addEventListener("click", () => burst(28));

copyLink.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    copyLink.textContent = "¡Copiado! ✅";
    setTimeout(()=> copyLink.textContent = "Copiar link", 1400);
  } catch {
    alert("No se pudo copiar. Copia manualmente la URL del navegador.");
  }
});

// Generar items flotantes (corazones/rosas)
const emojis = ["💗","💖","🌹","💘","💝","🌸","💞"];

function spawnOne(){
  const el = document.createElement("div");
  el.className = "floatItem";
  el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  const x = Math.random()*100;
  const size = 18 + Math.random()*22; // 18-40px
  const t = 6 + Math.random()*8;      // 6-14s

  el.style.setProperty("--x", `${x}vw`);
  el.style.setProperty("--size", `${size}px`);
  el.style.setProperty("--t", `${t}s`);

  floating.appendChild(el);
  setTimeout(()=> el.remove(), t*1000);
}

function burst(n=14){
  for(let i=0;i<n;i++){
    setTimeout(spawnOne, i*60);
  }
}

// lluvia suave constante
setInterval(()=> spawnOne(), 550);
