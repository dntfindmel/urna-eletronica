
function urnaEletronica(){
    let 
    candidato1 = "",
    candidato2 = "",
    candidato3 = "",
    fim = "",
    ganhador = "";

    let 
    votoC1 = 0,
    votoC2 = 0,
    votoC3 = 0,
    votoBranco = 0,
    votoGanhador = 0,
    porcentagem = 0,
    votoNulo = 0;

    let condicao = true

    candidato1 = prompt("Digite o nome do candidato n° 1: ");
    candidato2 = prompt("Digite o nome do candidato n° 2: ");
    candidato3 = prompt("Digite o nome do candidato n° 3: ");

    do {
        operacao = parseInt(prompt(`Digite o número correspondente ao seu voto:\n\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}\n[5] Branco\n[8] Nulo`));
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
        } else if(operacao === 150714) {
            fim = prompt("Você tem certeza que deseja encerrar a operação? [S/N]")
                if (fim === "S" || fim === "s") {
                    alert("Encerrando a operação!");
                    condicao = false;
                }
        } else {
            alert("Operação inválida");
        }
    } while(condicao);

    if(votoC1 > votoC2 && votoC1 > votoC3){
        ganhador = candidato1;
        votoGanhador = votoC1 + votoBranco;
    } else if(votoC2 > votoC1 && votoC2 > votoC3){
        ganhador = candidato2;
        votoGanhador = votoC2 + votoBranco;
    } else if(votoC3 > votoC1 && votoC3 > votoC2){
        ganhador = candidato3;
        votoGanhador = votoC3 + votoBranco;
    } else {
        alert(`Empate! Sem ganhadores.\nA quantidade de votos brancos e nulos foram de: ${votoBranco} e ${votoNulo}`);
    }

    porcentagem = (votoGanhador / (votoC1 + votoC2 + votoC3 + votoNulo)) * 100;

    if(ganhador !== ""){
        alert(`O ganhador foi: ${ganhador} com ${porcentagem.toFixed(2)}% dos votos.\nA quantidade de votos brancos e nulos foram de: ${votoBranco} e ${votoNulo}.`);
    }
    
}