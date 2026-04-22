function openAdivinhacao() {
    const secretNumber = Math.floor(Math.random() * 10) + 1;
    let tentativas = 5;
    const html = `
        <div class="game-container">
            <p>Tente adivinhar o número entre 1 e 10!</p>
            <p id="tentativas-msg">Tentativas restantes: <strong>5</strong></p>
            <input type="number" id="guess-input" style="padding: 10px; border-radius: 5px; width: 60px;">
            <button id="guess-btn" class="btn-primary">Chutar</button>
            <p id="game-feedback" style="margin-top: 15px;"></p>
        </div>
    `;
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('modal-title').textContent = 'Jogo da Adivinhação';
    const feedback = document.getElementById('game-feedback');
    const tentativasMsg = document.getElementById('tentativas-msg');
    document.getElementById('guess-btn').onclick = () => {
        const guess = document.getElementById('guess-input').value;

        if (!guess) return;
        tentativas--;
        if (guess == secretNumber) {
            feedback.innerHTML = '✨ <strong>Acertou!</strong> Parabéns!';
            feedback.style.color = '#10b981';
            document.getElementById('guess-btn').disabled = true;
        } else if (tentativas === 0) {
            feedback.innerHTML = `❌ <strong>Fim de jogo!</strong> O número era ${secretNumber}.`;
            feedback.style.color = '#ef4444';
            tentativasMsg.textContent = "Tentativas esgotadas!";
            document.getElementById('guess-btn').disabled = true;
        } else {
            const dica = guess < secretNumber ? 'MAIOR' : 'MENOR';
            feedback.textContent = `Errou! O número secreto é ${dica} que ${guess}.`;
            feedback.style.color = '#f59e0b';
            tentativasMsg.innerHTML = `Tentativas restantes: <strong>${tentativas}</strong>`;
        }
        document.getElementById('guess-input').value = '';
        document.getElementById('guess-input').focus();
    };
    document.getElementById('close-modal').onclick = () => {
        document.getElementById('modal-overlay').classList.remove('active');
    };
}

document.querySelector('[data-project="adivinhacao"]').onclick = openAdivinhacao;

function openCalculadora() {
    const html = `
        <div class="calc-container">
            <input type="text" id="calc-input" style="grid-column: 1 / -1; padding: 10px; border-radius: 5px; text-align: right; margin-bottom: 10px;" readonly>
            <button class="btn-primary" onclick="calc('AC')">AC</button>
            <button class="btn-primary" onclick="calc('()')">()</button>
            <button class="btn-primary" onclick="calc('%')">%</button>
            <button class="btn-primary" onclick="calc('/')">/</button>

            <button class="btn-primary" onclick="calc('7')">7</button>
            <button class="btn-primary" onclick="calc('8')">8</button>
            <button class="btn-primary" onclick="calc('9')">9</button>
            <button class="btn-primary" onclick="calc('*')">*</button>

            <button class="btn-primary" onclick="calc('4')">4</button>
            <button class="btn-primary" onclick="calc('5')">5</button>
            <button class="btn-primary" onclick="calc('6')">6</button>
            <button class="btn-primary" onclick="calc('-')">-</button>

            <button class="btn-primary" onclick="calc('1')">1</button>
            <button class="btn-primary" onclick="calc('2')">2</button>
            <button class="btn-primary" onclick="calc('3')">3</button>
            <button class="btn-primary" onclick="calc('+')">+</button>

            <button class="btn-primary" style="grid-column: span 2;" onclick="calc('0')">0</button>
            <button class="btn-primary" onclick="calc('.')">.</button>
            <button class="btn-primary" onclick="calc('=')">=</button>
        </div>
    `;

    window.calc = function (value) {
        const input = document.getElementById('calc-input');
        if (value === '=') {
            try {
                let resultado = eval(input.value);
                // Tratando divisão por zero
                input.value = (resultado === Infinity || isNaN(resultado)) ? "Erro: Div por 0" : resultado;
            } catch (e) {
                input.value = 'Erro';
            }
        } else if (value === 'AC') {
            input.value = ''; // Limpa tudo
        } else {
            if (input.value === "Erro" || input.value === "Erro: Div por 0") input.value = "";
            input.value += value;
        }
    }

    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal-overlay').classList.add('active');
    document.getElementById('modal-title').textContent = 'Calculadora';

    document.getElementById('close-modal').onclick = () => {
        document.getElementById('modal-overlay').classList.remove('active');
    };
}

document.querySelector('[data-project="calculadora"]').onclick = openCalculadora;

document.querySelectorAll('button[data-cert="true"]').forEach(btn => {
    btn.onclick = () => {
        const card = btn.closest('.certificado-card');
        const img = card.querySelector('img');
        const iframe = card.querySelector('iframe');
        const title = card.querySelector('h3').textContent;
        const pdfSrc = btn.getAttribute('data-pdf');

        let contentHtml = '';
        if (pdfSrc) {
            contentHtml = `<iframe src="${pdfSrc}" style="width: 100%; height: 75vh; border: none; border-radius: 10px;"></iframe>`;
        } else if (img) {
            contentHtml = `<img src="${img.src}" alt="${title}" style="width: 100%; border-radius: 10px; max-height: 75vh; object-fit: contain;">`;
        } else if (iframe) {
            contentHtml = `<iframe src="${iframe.src}" style="width: 100%; height: 75vh; border: none; border-radius: 10px;"></iframe>`;
        }

        document.getElementById('modal-body').innerHTML = contentHtml;
        document.getElementById('modal-overlay').classList.add('active');
        document.getElementById('modal-title').textContent = title;

        document.getElementById('close-modal').onclick = () => {
            document.getElementById('modal-overlay').classList.remove('active');
        };
    };
});
