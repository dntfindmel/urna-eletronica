// Estrutura switch-case

// const opcao = 3;

// switch(opcao) {
 //    case 1:
 //        console.log("A opção é 1");
 //        break;
 //    case 2:
 //        console.log("A opção é 2");
 //        break;
 //    default:
 //        console.log("Não é nenhuma das opções.")
// }

// Equivalente a estrutura switch-case
//if(opcao == 1) {//
//  console.log("A opção é 1");
//} else if(opcao == 2) {//
//    console.log("A opção é 2");
//}else {
//    console.log("Não é nenhuma das opções.")
//}

// Estrutura do-while 

  // let contador = 1;

// do {
//     console.log("Instrução");
//     contador += 1
// } while (contador <= 10);

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

function urnaEletronica(){
    let candidato1 = 0;
    let candidato2 = 0;
    let candidato3 = 0;
    let votoBranco = 0;
    let votoNulo = 0;
    let ganhador = "";

    do{
        operacao = parseInt(prompt("Digite o número correspondente ao seu voto:\n\n[1] Candidato 1 \n[2] Candidato 2\n[3] Candidato 3\n[5] Branco\n[8] Nulo\n[0] Encerrar operação\n"));
        if(operacao === 1){
            candidato1 += 1;
        } else if(operacao === 2){
            candidato2 += 2;
        } else if(operacao === 3){
            candidato3 += 3;
        } else if(operacao === 5){
            votoBranco += 1;
        } else if(operacao === 8){
            votoNulo += 1;
        } else if(operacao === 0) {
            alert("Encerrando a operação");
        } else {
            alert("Operação inválida");
        }
    } while(operacao !== 0);

    if(candidato1 > candidato2 && candidato1 > candidato3){
        ganhador = "Candidato 1";
    } else if(candidato2 > candidato1 && candidato2 > candidato3){
        ganhador = "Candidato 2";
    } else if(candidato3 > candidato1 && candidato3 > candidato2){
        ganhador = "Candidato 3";
    } else {
        alert("Empate! Sem ganhadores.")
    }

    alert(`O ganhador foi: ${ganhador}.\nA quantidade de votos brancos e nulos foram de: ${votoBranco} ${votoNulo}.`);
}