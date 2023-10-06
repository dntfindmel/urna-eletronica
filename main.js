// Estrutura switch-case

const opcao = 3;

switch(opcao) {
    case 1:
        console.log("A opção é 1");
        break;
    case 2:
        console.log("A opção é 2");
        break;
    default:
        console.log("Não é nenhuma das opções.")
}

// Equivalente a estrutura switch-case
if(opcao == 1) {
    console.log("A opção é 1");
} else if(opcao == 2) {
    console.log("A opção é 2");
} else {
    console.log("Não é nenhuma das opções.")
}

// Estrutura do-while 

  let contador = 1;

do {
    console.log("Instrução");
    contador += 1
} while (contador <= 10);

// Estrutura while

// while (opcao !== 0) {
//     console.log("Instrução 1");
//     console.log("Instrução 2");
//     console.log("Instrução 3");
//     console.log("Instrução 4");
//     console.log("Instrução 5");
//     console.log("Instrução 6");
//     console.log("Instrução 7");
// }