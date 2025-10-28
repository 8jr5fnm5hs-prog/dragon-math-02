const dragons = [
  {name:"Chimuelo"},
  {name:"Tormenta"},
  {name:"Furia Luminosa"},
  {name:"Furia Solar"} // Bonus
];

let level = 0;
let points = 0;
let lives = 3;
let difficulty = "Fácil";
let soundOn = true;
const music = document.getElementById('battle-music');
const roar = document.getElementById('dragon-roar');

// Nivel aleatorio para dragón bonus
let bonusLevel = Math.floor(Math.random() * 2) + 1;

function showInstructions(){document.getElementById('instructions').style.display='block';}
function hideInstructions(){document.getElementById('instructions').style.display='none';}

function startGame(selectedDifficulty){
  difficulty = selectedDifficulty;
  document.getElementById('start-screen').style.display='none';
  document.getElementById('game-container').style.display='block';
  if(soundOn) music.play();
  nextLevel();
}

function toggleSound(){
  soundOn = !soundOn;
  if(soundOn){ music.play(); } else { music.pause(); }
}

function generateEquation(diff){
  let a,b,c,x1,x2;
  if(diff==="Fácil"){a=1;b=-5;c=6;x1=2;x2=3;}
  else if(diff==="Medio"){a=1;b=-3;c=2;x1=1;x2=2;}
  else if(diff==="Difícil"){a=1;b=-1;c=-6;x1=3;x2=-2;}

  const options = [`${x1}, ${x2}`, `${x1+1}, ${x2+1}`, `${x1-1}, ${x2-1}`].sort(()=>Math.random()-0.5);
  currentEquation = {answer:`${x1}, ${x2}`};

  document.getElementById("equation").textContent = `${a}x² + ${b}x + ${c} = 0`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach(opt=>{
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected){
  if(selected===currentEquation.answer){
    points+=100;
    document.getElementById("message").textContent="🔥 ¡Ataque exitoso!";
    document.getElementById("points").textContent=points;
    if(soundOn) roar.play();
    nextLevel();
  } else {
    lives-=1;
    document.getElementById("message").textContent="💀 Fallaste. El dragón te lanzó fuego.";
    document.getElementById("lives").textContent=lives;
    if(lives<=0){alert("Juego terminado 🐉\\nPuntos: "+points); location.reload();}
  }
}

function nextLevel(){
  if(level>=dragons.length){alert("🎉 ¡Has vencido a todos los dragones!"); location.reload(); return;}

  let dragon;
  if(level === bonusLevel){dragon={name:"Furia Solar - Bonus"};}
  else{dragon = dragons[level];}

  document.getElementById("level-title").textContent="Nivel "+(level+1);
  document.getElementById("dragon").textContent=dragon.name+" - Dificultad: "+difficulty;
  generateEquation(difficulty);
  level++;
}
