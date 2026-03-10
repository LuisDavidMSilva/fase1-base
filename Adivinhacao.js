console.log('Bem-vindo ao jogo de adivinhação!');
console.log('Tente adivinhar o número que estou pensando entre 1 e 10.');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const numeroSecreto = Math.floor(Math.random() * 10) + 1;

function perguntarPalpite(palpiteNumero, tentativasRestantes) {
    rl.question('Qual é o seu palpite? ', (palpite) => {
        const novoPalpiteNumero = parseInt(palpite, 10);

        if (isNaN(novoPalpiteNumero)) {
            console.log('Por favor, insira um número válido.');
            rl.close();
            return;
        }

        if (novoPalpiteNumero === numeroSecreto) {
            console.log('Parabéns! Você adivinhou o número secreto!');
            rl.close();
            return;
        } else {
            if (tentativasRestantes - 1 > 0) {
                console.log(`Seu palpite é muito ${novoPalpiteNumero < numeroSecreto ? 'baixo' : 'alto'}.`);
                console.log(`Você tem ${tentativasRestantes - 1} tentativas restantes.`);
                perguntarPalpite(novoPalpiteNumero, tentativasRestantes - 1);
            }
            else {
                console.log(`Suas tentativas acabaram! O número secreto era ${numeroSecreto}.`);
                rl.close();
            }
        }
    });
}
perguntarPalpite(null, 5);