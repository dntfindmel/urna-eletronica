function urnaEletronica() {
    // Declaração das variáveis de string
    let candidato1 = "",
        candidato2 = "",
        candidato3 = "",
        ganhador = "",
        senha = "";

    // Declaração das variáveis de int
    let votoC1 = 0,
        votoC2 = 0,
        votoC3 = 0,
        votoBranco = 0,
        votoGanhador = 0,
        votoNulo = 0;
    
    // Declaração das variáveis booleanas
    let 
    condicaoCandidato = false,
    fim = true;

    // Prompt para armazenar o nome dos candidatos
    candidato1 = prompt("Digite o nome do candidato n° 1: ");
    candidato2 = prompt("Digite o nome do candidato n° 2: ");
    candidato3 = prompt("Digite o nome do candidato n° 3: ");

    // Loop criado enquanto o confirm armazenado pela variável condicaoCandidato for diferente de false
    while (!condicaoCandidato) {
        // Variável responsável por armazenar o valor do método confirm()
        condicaoCandidato = confirm(`Você confirma o nome dos candidatos abaixo?\n1 - ${candidato1}\n2 - ${candidato2}\n3 - ${candidato3}`);
        // Se a condição for true
        if (!condicaoCandidato) {
            // Variável criada para armazenar qual candidato gostariam de redefinir, utilizando o parseInt para declarar como número inteiro
            let redefinir = parseInt(prompt(`Qual candidato gostaria de redefinir?\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}`));
            // Criação das condições para redefinição do nome dos candidatos
            if (redefinir >= 1 && redefinir <= 3) {
                if (redefinir === 1) {
                    candidato1 = prompt("Escreva o nome do candidato n° 1: ");
                } else if (redefinir === 2) {
                    candidato2 = prompt("Escreva o nome do candidato n° 2: ");
                } else if (redefinir === 3) {
                    candidato3 = prompt("Escreva o nome do candidato n° 3: ");
                }
            } else {
                // Else criado caso a condição seja true
                alert("Valor inválido, tente novamente!");
                return;
            }
        }
    }

    // Variável para armazenar qual a senha criada para encerrar toda a operação e exibir os votos
    senha = prompt("Digite a senha necessária para encerrar a operação: ");
    // Se a senha estiver vazia, aparecerá um aviso e a operação será quebrada.
    if (senha == ""){
        alert("Digite uma senha.");
        return;
    }

    // Loop para a votação
    do {
        // Variável criada sem o parseInt para que não dê problema ao receber senhas em string
        let operacao = prompt(`Digite o número correspondente ao seu voto:\n\n[1] ${candidato1}\n[2] ${candidato2}\n[3] ${candidato3}\n[5] Branco`);
        
        // Condições para a votação dos candidatos e recebimento da senha
        if (operacao === "5") {
            votoBranco++;
            alert('Voto em branco registrado com sucesso!');
        } else if (operacao === senha) {
            fim = confirm("Você tem certeza que deseja encerrar a operação?");
        } else {
            let voto = parseInt(operacao);
            // Condição para se o prompt for diferente de Not a Number e estiver entre 1 e 3
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
                if (confirmacao == true) {
                    alert("Voto nulo registrado com sucesso!");
                    votoNulo++;
                }
            }
        }
    } while (!fim);

    // Contagem dos votos e definição do ganhador
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

    // Contas para as porcentagens e o total de votos
    let totalVotos = votoC1 + votoC2 + votoC3 + votoBranco + votoNulo;
    let porcentagemC1 = (votoC1 / totalVotos) * 100;
    let porcentagemC2 = (votoC2 / totalVotos) * 100;
    let porcentagemC3 = (votoC3 / totalVotos) * 100;
    let porcentagem = (votoGanhador / totalVotos) * 100;
    let porcentagemBranco = (votoBranco / totalVotos) * 100;
    let porcentagemNulo = (votoNulo / totalVotos) * 100;

    // Se o ganhador for diferente de string vazio
    if (ganhador !== "") {
        alert(`O total de voto de todos os candidatos e seus percentuais foram:\n${candidato1}, ${votoC1} e ${porcentagemC1.toFixed(2)}%\n${candidato2}, ${votoC2} e ${porcentagemC2.toFixed(2)}%\n${candidato3}, ${votoC3} e ${porcentagemC3.toFixed(2)}%`);
        alert(`A quantidade de votos brancos e nulos foram de:\n${porcentagemBranco.toFixed(2)}% e ${votoBranco} de votos brancos no total\n${porcentagemNulo.toFixed(2)}`);
        alert(`O ganhador foi ${ganhador} com ${porcentagem.toFixed(2)}% dos votos e ${votoGanhador} votos com acréscimo de votos brancos.`);
    }
}

async function calcularHash(funcao) {
    const codigoFonte = funcao.toString();
    const buffer = new TextEncoder().encode(codigoFonte);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashString;
}

// Verificar a integridade antes da execução da função
calcularHash(urnaEletronica).then(hashAntes => {
    console.log("Hash antes da execução:", hashAntes);

    // Executar a função urnaEletronica()
    urnaEletronica();

    // Verificar a integridade após a execução da função
    calcularHash(urnaEletronica).then(hashDepois => {
        console.log("Hash depois da execução:", hashDepois);

        // Comparar as hashes antes e depois
        if (hashAntes === hashDepois) {
            console.log("A urna não foi alterada.");
        } else {
            console.log("A urna foi alterada!");
        }
    });
});