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
    let 
    candidato1 = "",
    candidato2 = "",
    candidato3 = "",
    ganhador = "";

    let 
    votoC1 = 0,
    votoC2 = 0,
    votoC3 = 0,
    votoBranco = 0,
    votoGanhador = 0,
    votoNulo = 0;

    candidato1 = prompt("Digite o nome do candidato n° 1: ");
    candidato2 = prompt("Digite o nome do candidato n° 2: ");
    candidato3 = prompt("Digite o nome do candidato n° 3: ");

    do{
        operacao = parseInt(prompt(`Digite o número correspondente ao seu voto:\n\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}\n[5] Branco\n[8] Nulo\n[0] Encerrar operação\n`));
        if(operacao === 1){
            votoC1 += 1;
            alert(`Candidato ${candidato1} votado com sucesso!`)
        } else if(operacao === 2){
            votoC2 += 1;
            alert(`Candidato ${candidato2} votado com sucesso!`)
        } else if(operacao === 3){
            votoC3 += 1;
            alert(`Candidato ${candidato3} votado com sucesso!`)
        } else if(operacao === 5){
            votoBranco += 1;
            alert('Voto em branco registrado com sucesso!')
        } else if(operacao === 8){
            votoNulo += 1;
            alert('Voto nulo registrado com sucesso!')
        } else if(operacao === 0) {
            alert("Encerrando a operação");
        } else {
            alert("Operação inválida");
        }
    } while(operacao !== 0);

    if(votoC1 > votoC2 && votoC1 > votoC3){
        ganhador = candidato1;
        votoGanhador = votoC1;
    } else if(votoC2 > votoC1 && votoC2 > votoC3){
        ganhador = candidato2;
        votoGanhador = votoC2;
    } else if(votoC3 > votoC1 && votoC3 > votoC2){
        ganhador = candidato3;
        votoGanhador = votoC3;
    } else {
        alert(`Empate! Sem ganhadores.\nA quantidade de votos brancos e nulos foram de: ${votoBranco} e ${votoNulo}`);
    }
    
    if(ganhador !== ""){
        alert(`O ganhador foi: ${ganhador} com ${votoGanhador} votos.\nA quantidade de votos brancos e nulos foram de: ${votoBranco} e ${votoNulo}.`);
    }
}