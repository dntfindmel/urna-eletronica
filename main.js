function validarUrna() {
    const hashOriginal = "0ee110c20c3538c2382e738c93f4898075159def016b7b2722f2377971466263";

    const codigoUrna = urnaEletronica.toString();

    const hashObtido = CryptoJS.SHA256(codigoUrna).toString();

    console.log("Hash Original:", hashOriginal);
    console.log("Hash Obtido:", hashObtido);

    if(hashObtido === hashOriginal){
        console.log("A urna não foi alterada! Executando o código para a função...");
    } else {
        console.log("A urna foi alterada. Não é possível executar a função.");
    }
}

function horaVotacao(){
    horaAtual = new Date();
    alert("Hora atual - " + horaAtual.getHours() + ":" + horaAtual.getMinutes() + ":" + horaAtual.getSeconds() + "\nData atual - " + horaAtual.getDate() + "/" + (horaAtual.getMonth()+1) + "/" + horaAtual.getFullYear());
}


function urnaEletronica() {
    // Declaração das variáveis de string
    let 
        ganhador = "",
        senha = "";

    // Declaração das variáveis de int
    let votoC1 = 0,
        votoC2 = 0,
        votoC3 = 0,
        votoC4 = 0,
        votoC5 = 0,
        votoBranco = 0,
        votoGanhador = 0,
        votoNulo = 0;
    
    // Declaração das variáveis booleanas
    let 
    votoConfirmacao = true;

    let candidato = [[13, 19, 24, 25, 30, 5],
                     ["Silvana", "Arthur", "Godofredo", "João", "Marina", "Branco"]];

    let candidatosTag = document.getElementById("candidatos");

    let dataHora;
    let dataHoraFinal;

    for(i = 0; i <= 4; i++){
           candidatosTag.innerHTML += `Candidato ${candidato[0][i]} - ${candidato[1][i]}<br>`;
    }

    // Variável para armazenar qual a senha criada para encerrar toda a operação e exibir os votos
    senha = prompt("Digite a senha necessária para encerrar a operação: ");
    // Se a senha estiver vazia, aparecerá um aviso e a operação será quebrada.
    if (senha == ""){
        alert("Digite uma senha.");
        return;
    }

    // Definir o valor da variável fim para o loop
    let fim = false;

    dataHora = horaVotacao();

    do {
        let operacao = prompt("Digite o número correspondente ao seu voto: ");
        switch (operacao) {
            case "5":
                votoConfirmacao = confirm("Você votou em branco. Deseja confirmar seu voto?");
                if (votoConfirmacao == true) {
                    alert("Voto em branco registrado com sucesso.");
                    votoBranco++;
                } else {
                    // Adicionando opção de corrigir o voto em branco
                    alert("Corrigindo voto em branco.");
                }
                break;
            case senha:
                fim = confirm("Você tem certeza que deseja encerrar a operação?");
                break;
            default:
                let voto = parseInt(operacao);
                if (!isNaN(voto) && candidato[0].includes(voto)) {
                    let confirmacaoVoto = confirm(`Você votou em ${candidato[1][candidato[0].indexOf(voto)]}. Deseja confirmar seu voto?`);
                    if (confirmacaoVoto) {
                        alert(`Voto para ${candidato[1][candidato[0].indexOf(voto)]} registrado com sucesso!`);
                        switch (voto) {
                            case 13:
                                votoC1++;
                                break;
                            case 19:
                                votoC2++;
                                break;
                            case 24:
                                votoC3++;
                                break;
                            case 25:
                                votoC4++;
                                break;
                            case 30:
                                votoC5++;
                                break;
                    }} else {
                        // Adicionando opção de corrigir o voto
                        alert("Corrigindo voto.");
                    }
                } else {
                    let confirmacao = confirm("Seu voto será anulado. Gostaria de prosseguir?");
                    if (confirmacao) {
                        alert("Voto nulo registrado com sucesso!");
                        votoNulo++;
                    } else {
                        // Adicionando opção de corrigir o voto nulo
                        alert("Corrigindo voto nulo.");
                    }
                }
        }
    } while (!fim);
    

    // Contagem dos votos e definição do ganhador
    if (votoC1 > votoC2 && votoC1 > votoC3 && votoC1 > votoC4 && votoC1 > votoC5) {
        ganhador = candidato[1][0];
        votoGanhador = votoC1 + votoBranco;
    } else if (votoC2 > votoC1 && votoC2 > votoC3 && votoC2 > votoC4 && votoC2 > votoC5) {
        ganhador = candidato[1][1];
        votoGanhador = votoC2 + votoBranco;
    } else if (votoC3 > votoC1 && votoC3 > votoC2 && votoC3 > votoC4 && votoC3 > votoC5) {
        ganhador = candidato[1][2];
        votoGanhador = votoC3 + votoBranco;
    } else if (votoC4 > votoC1 && votoC4 > votoC2 && votoC4 > votoC3 && votoC4 > votoC5) {
        ganhador = candidato[1][3];
        votoGanhador = votoC4 + votoBranco;
    } else if(votoC5 > votoC1 && votoC5 > votoC2 && votoC5 > votoC3 && votoC5 > votoC4){
        ganhador = candidato[1][4];
        votoGanhador = votoC5 + votoBranco;
    }else {
        alert(`Empate! Sem ganhadores.\nA quantidade de votos brancos e nulos foram de: ${(votoBranco / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoBranco} votos brancos no total e ${(votoNulo / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoNulo} votos nulos no total.`);
    }

    // Contas para as porcentagens e o total de votos
    let totalVotos = votoC1 + votoC2 + votoC3 + votoC4 + votoC5 + votoBranco + votoNulo;
    let porcentagemC1 = (votoC1 / totalVotos) * 100;
    let porcentagemC2 = (votoC2 / totalVotos) * 100;
    let porcentagemC3 = (votoC3 / totalVotos) * 100;
    let porcentagemC4 = (votoC4 / totalVotos) * 100;
    let porcentagemC5 = (votoC5 / totalVotos) * 100;
    let porcentagem = (votoGanhador / totalVotos) * 100;
    let porcentagemBranco = (votoBranco / totalVotos) * 100;
    let porcentagemNulo = (votoNulo / totalVotos) * 100;

    // Se o ganhador for diferente de string vazio
    if (ganhador !== "") {
        alert(`O total de voto de todos os candidatos e seus percentuais foram:\n${candidato[1][0]}, ${votoC1} e ${porcentagemC1.toFixed(2)}%\n${candidato[1][1]}, ${votoC2} e ${porcentagemC2.toFixed(2)}%\n${candidato[1][2]}, ${votoC3} e ${porcentagemC3.toFixed(2)}%\n${candidato[1][3]}, ${votoC4} e ${porcentagemC4.toFixed(2)}%\n${candidato[1][4]}, ${votoC5} e ${porcentagemC5.toFixed(2)}%`);
        alert(`A quantidade de votos brancos e nulos foram de:\n${votoBranco} votos brancos no total e ${votoNulo} votos nulos.`);
        alert(`O ganhador foi ${ganhador} com ${porcentagem.toFixed(2)}% dos votos e ${votoGanhador} votos com acréscimo de votos brancos.`);
    }

    dataHoraFinal = horaVotacao();
}


validarUrna();