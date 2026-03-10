const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Informe o primeiro número: ', (num1) => {
  rl.question('Informe a operação: ', (op) => {
    rl.question('Informe o segundo número: ', (num2) => {
      let resultado;
      switch (op) {
        case '+':
          resultado = parseFloat(num1) + parseFloat(num2);
          break;
        case '-':
          resultado = parseFloat(num1) - parseFloat(num2);
          break;
        case '*':
          resultado = parseFloat(num1) * parseFloat(num2);
          break;
        case '/':
            if (parseFloat(num2) === 0) {
                console.log('Division by zero is undefined.');
                rl.close();
                return;
                }
          resultado = parseFloat(num1) / parseFloat(num2);
          break;
        default:
          console.log('Operação inválida');
          rl.close();
          return;
      }
      console.log(`${num1} ${op} ${num2} = ${resultado}`);
      rl.close();
    });
  });
});