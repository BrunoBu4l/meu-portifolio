document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    const card0 = document.getElementById("card12");

    // Função para carregar o JSON
    async function loadWords() {
        const response = await fetch('../js/jsonMemoryGame.json');
        const words = await response.json();
        return words;
    }

    async function loadPairs() {
        const response = await fetch('../js/jsonMemoryGamePair.json');
        const pairs = await response.json();
        return pairs;
    }

    // Função para criar as cartas
    function createCard(word, image) {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.innerHTML = `
            <img src="${image}" alt="${word}">
            <p>${word}</p>
        `;
        cardContainer.appendChild(card);

        // Eventos de arrastar
        card.addEventListener('dragstart', dragStart);
    }

    // Funções de arrastar e soltar
    function dragStart(event) {
        event.dataTransfer.setData('text', event.target.querySelector('p').textContent);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event, cardElement) {
        event.preventDefault();
        const draggedWord = event.dataTransfer.getData('text');

        // Atualiza a carta na área de junção
        cardElement.querySelector('.card__text').textContent = draggedWord;
        cardElement.dataset.value = draggedWord; // Armazena a palavra arrastada para futura verificação

        // Verifica se ambas as cartas de junção têm palavras
        const card1Word = card1.querySelector('.card__text').textContent;
        const card2Word = card2.querySelector('.card__text').textContent;

        if (card1Word && card2Word) {
            checkCombination(card1Word, card2Word);
        }
    }

    // Verifica se a junção das palavras forma uma palavra do JSON de pares
    async function checkCombination(word1, word2) {
        const pairs = await loadPairs();
        const combinedWord = word1 + word2;

        // Verifica se a junção ou a junção reversa existe no JSON de pares
        const pair = pairs.find(p => p.word === combinedWord);

        if (pair) {
            // Exibe a palavra composta e a imagem
            card0.innerHTML = `
                <h3>${pair.word}</h3>
                <img src="${pair.image}" alt="${pair.word}">
            `;
        } else {
            // Se a combinação estiver errada, limpa a área da terceira carta
            card0.innerHTML = '';
        }
    }

    // Carrega as palavras e inicializa o jogo
    let words = [];
    loadWords().then(data => {
        words = data;
        words.forEach(word => {
            createCard(word.word, word.image);
        });
    });

    // Adiciona eventos de arrastar para as cartas de junção
    card1.addEventListener('dragover', dragOver);
    card2.addEventListener('dragover', dragOver);
    card1.addEventListener('drop', (event) => drop(event, card1));
    card2.addEventListener('drop', (event) => drop(event, card2));
});
