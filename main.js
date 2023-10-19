function urnaEletronica() {
    let candidato1 = "",
        candidato2 = "",
        candidato3 = "",
        fim = "",
        ganhador = "",
        senha = "";

    let votoC1 = 0,
        votoC2 = 0,
        votoC3 = 0,
        votoBranco = 0,
        votoGanhador = 0,
        votoNulo = 0;

    let condicaoCandidato = false;

    candidato1 = prompt("Digite o nome do candidato n° 1: ");
    candidato2 = prompt("Digite o nome do candidato n° 2: ");
    candidato3 = prompt("Digite o nome do candidato n° 3: ");

    while (!condicaoCandidato) {
        condicaoCandidato = confirm(`Você confirma o nome dos candidatos abaixo?\n1 - ${candidato1}\n2 - ${candidato2}\n3 - ${candidato3}`);
        if (!condicaoCandidato) {
            let redefinir = parseInt(prompt(`Qual candidato gostaria de redefinir?\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}`));
            if (redefinir >= 1 && redefinir <= 3) {
                if (redefinir === 1) {
                    candidato1 = prompt("Escreva o nome do candidato n° 1: ");
                } else if (redefinir === 2) {
                    candidato2 = prompt("Escreva o nome do candidato n° 2: ");
                } else if (redefinir === 3) {
                    candidato3 = prompt("Escreva o nome do candidato n° 3: ");
                }
            } else {
                alert("Valor inválido, tente novamente!");
                return;
            }
        }
    }

    senha = prompt("Digite a senha necessária para encerrar a operação: ");

    do {
        let operacao = prompt(`Digite o número correspondente ao seu voto:\n\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}\n[5] Branco`);
        
        if (operacao === "5") {
            votoBranco++;
            alert('Voto em branco registrado com sucesso!');
        } else if (operacao === senha) {
            fim = confirm("Você tem certeza que deseja encerrar a operação?");
        } else {
            let voto = parseInt(operacao);
            if (!isNaN(voto) && voto >= 1 && voto <= 3) {
                switch (voto) {
                    case 1:
                        votoC1++;
                        alert(`Candidato ${candidato1} votado com sucesso!`);
                        break;
                    case 2:
                        votoC2++;
                        alert(`Candidato ${candidato2} votado com sucesso!`);
                        break;
                    case 3:
                        votoC3++;
                        alert(`Candidato ${candidato3} votado com sucesso!`);
                        break;
                    default:
                        alert("Opção inválida, tente novamente!");
                        break;
                }
            } else {
                let confirmacao = confirm("Seu voto será anulado. Gostaria de prosseguir?");
                if (confirmacao) {
                    alert("Voto nulo registrado com sucesso!");
                    votoNulo++;
                } else {
                    return;
                }
            }
        }
    } while (!fim);

    if (votoC1 > votoC2 && votoC1 > votoC3) {
        ganhador = candidato1;
        votoGanhador = votoC1 + votoBranco;
    } else if (votoC2 > votoC1 && votoC2 > votoC3) {
        ganhador = candidato2;
        votoGanhador = votoC2 + votoBranco;
    } else if (votoC3 > votoC1 && votoC3 > votoC2) {
        ganhador = candidato3;
        votoGanhador = votoC3 + votoBranco;
    } else {
        alert(`Empate! Sem ganhadores.\nA quantidade de votos brancos e nulos foram de: ${(votoBranco / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoBranco} votos brancos no total e ${(votoNulo / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoNulo} votos nulos no total.`);
    }

    let totalVotos = votoC1 + votoC2 + votoC3 + votoBranco + votoNulo;
    let porcentagemC1 = (votoC1 / totalVotos) * 100;
    let porcentagemC2 = (votoC2 / totalVotos) * 100;
    let porcentagemC3 = (votoC3 / totalVotos) * 100;
    let porcentagem = (votoGanhador / totalVotos) * 100;
    let porcentagemBranco = (votoBranco / totalVotos) * 100;
    let porcentagemNulo = (votoNulo / totalVotos) * 100;

    if (ganhador !== "") {
        alert(`O total de voto de todos os candidatos e seus percentuais foram:\n${candidato1}, ${votoC1} e ${porcentagemC1.toFixed(2)}%\n${candidato2}, ${votoC2} e ${porcentagemC2.toFixed(2)}%\n${candidato3}, ${votoC3} e ${porcentagemC3.toFixed(2)}%`);
        alert(`A quantidade de votos brancos e nulos foram de:\n${porcentagemBranco.toFixed(2)}% e ${votoBranco} de votos brancos no total\n${porcentagemNulo.toFixed(2)}`);
        alert(`O ganhador foi ${ganhador} com ${porcentagem.toFixed(2)}% dos votos e ${votoGanhador} votos com acréscimo de votos brancos.`);
    }
}