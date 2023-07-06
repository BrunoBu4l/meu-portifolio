

// Armazena as cartas da junção em variáveis
const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');
const card3 = document.getElementById('card3');
const card4 = document.getElementById('card4');
const card12 = document.getElementById('card12');

const pesq = document.querySelector('#pegar');


// Adiciona eventos de arrastar e soltar nas cartas
card1.addEventListener('dragstart', dragStart);
card2.addEventListener('dragstart', dragStart);
card12.addEventListener('dragover', dragOver);
card12.addEventListener('drop', drop);

// Função que é chamada quando uma carta é arrastada sobre a carta da junção
function dragOver(event) {
// Previne o comportamento padrão do navegador
event.preventDefault();
}


function allowDrop(event) {
    event.preventDefault();
  }
  
  function dragStart(event) {
    const currentTitle = event.target.querySelector('.card__text').textContent;
    event.dataTransfer.setData('text/plain', currentTitle);
  }
  
  let title1 = "", title2 = "", title3 = "", title4 = "", title12 = ""; 

  function drop(event) {
    event.preventDefault();
    const currentTitle = event.dataTransfer.getData('text/plain');
    const targetCard = event.target.querySelector('.card__text');
    if (targetCard) {
      targetCard.textContent = currentTitle;
        title1 = document.querySelector('#card1 .card__text').textContent;
        title2 = document.querySelector('#card2 .card__text').textContent;
        title3 = document.querySelector('#card3 .card__text').textContent;
        title4 = document.querySelector('#card4 .card__text').textContent;
        title12 = document.querySelector('#card12 .card__text').textContent = title1 + title2 + title3 + title4;
        
        pesq.setAttribute('data-value', title12);

      //console.log("T1: "+ title1 + " |T2: "+ title2 + " |T3: " + title12);
    }

    
  }

