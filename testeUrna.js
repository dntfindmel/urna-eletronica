// Variáveis globais para armazenar informações
let hashUrnaAtual = '';
let hashValido = '';
let candidatosImpressos = false;

// Função para validar a urna

// TROQUEI PARA CONST PARA QUE NINGUEM REMOVA A FUNÇÃO DE VALIDAÇÃO :D
const validarUrna = async () => {
    const responseMain = await fetch('testeUrna.js');
    const responseHash = await responseMain.text();
    hashUrnaAtual = CryptoJS.SHA256(responseHash).toString();

    const responseConfig = await fetch('config.json');
    const configData = await responseConfig.json();
    hashValido = configData.hashValido;
    senhaMesario = configData.senhaMesario;

    if (hashUrnaAtual === hashValido) {
        console.log('Urna verificada. Código íntegro.');
    } else {
        console.log('[ERRO] URNA ADULTERADA. NÃO CONFEREM!');
        console.log(`HASH DA URNA: ${hashUrnaAtual}`);
        console.log(`HASH ESPERADO: ${hashValido}`);
    }
}


function horaVotacao(){
    horaAtual = new Date();
    alert("Hora atual - " + horaAtual.getHours() + ":" + horaAtual.getMinutes() + ":" + horaAtual.getSeconds() + "\nData atual - " + horaAtual.getDate() + "/" + (horaAtual.getMonth()+1) + "/" + horaAtual.getFullYear());
}

async function audioVotacao() {
    return new Promise((resolve) => {
        const audio = new Audio('./confirmacao.mp3');
        audio.onended = resolve;
        audio.play();
    });
}

async function carregarCandidatos(){
    const resolve = await fetch('candidatos.json');
    const data = resolve.json();
    
    // SEGUINDO A MODIFICAÇÃO DO JSON, AGORA NÃO PRECISAR MAIS ACESSAR O .candidatos, AGORA RETORNA A LISTA DIRETAMENTE.
    // O PROBLEMA DESSA FUNÇÃO TAMBÉM, É QUE FALTA O RETURN DELA, PARA RETORNAR OS VALORES.

    return data;
}

async function testeUrnaEletronica() {
    if (candidatosImpressos) {
        return;
    }

    let candidatos = await carregarCandidatos();
    console.log('CANDIDATOS', candidatos)
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

    let candidatosTag = document.getElementById("candidatos");

    let dataHora;
    let dataHoraFinal;

    console.log("Ínicio do programa");
    console.log("CONFIGURAÇÃO DA URNA");

    for (let i = 0; i < candidatos.length ; i++) {
        candidatosTag.innerHTML += `Candidato ${candidatos[i].numero} - ${candidatos[i].nome}<br>`
    }

    await validarUrna();

    // Definir o valor da variável fim para o loop
    let fim = false;

    dataHora = horaVotacao();

    do {
        let operacao = prompt("Digite o número correspondente ao seu voto: ");
        if(operacao == null){
            return;
        }
        switch (operacao) {
            case "5":
                votoConfirmacao = confirm("Você votou em branco. Deseja confirmar seu voto?");
                if (votoConfirmacao == true) {
                    alert("Voto em branco registrado com sucesso.");
                    votoBranco++;
                    await audioVotacao();
                } else {
                    // Adicionando opção de corrigir o voto em branco
                    alert("Corrigindo voto em branco.");
                    continue;
                }
                break;
            case senhaMesario:
                fim = confirm("Você tem certeza que deseja encerrar a operação?");
                if(!fim){
                    return;
                }
                break;
            default:
                let voto = parseInt(operacao);
                if (!isNaN(voto) && candidatos[0].includes(voto)) {
                    let confirmacaoVoto = confirm(`Você votou em ${candidatos[1][candidato[0].indexOf(voto)]}. Deseja confirmar seu voto?`);
                    if (confirmacaoVoto) {
                        alert(`Voto para ${candidato[1][candidato[0].indexOf(voto)]} registrado com sucesso!`);
                        await audioVotacao();
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
                        continue;
                    }
                } else {
                    let confirmacao = confirm("Seu voto será anulado. Gostaria de prosseguir?");
                    if (confirmacao) {
                        alert("Voto nulo registrado com sucesso!");
                        votoNulo++;
                        await audioVotacao();
                    } else {
                        // Adicionando opção de corrigir o voto nulo
                        alert("Corrigindo voto nulo.");
                        continue;
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
        alert(`Empate! Sem ganhadores.\nA quantidade de voto(s) branco(s) e nulo(s) foram de: ${(votoBranco / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoBranco} voto(s) branco(s) no total e ${(votoNulo / (votoBranco + votoNulo) * 100).toFixed(2)}% e ${votoNulo} voto(s) nulo(s) no total.`);
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
        alert(`A quantidade de voto(s) branco(s) e nulo(s) foram de:\n${votoBranco} voto(s) branco(s) no total e ${votoNulo} voto(s) nulo(s).`);
        alert(`O ganhador foi ${ganhador} com ${porcentagem.toFixed(2)}% dos votos e ${votoGanhador} voto(s) com acréscimo de voto(s) branco(s).`);
    }

    candidatosImpressos = true;
    dataHoraFinal = horaVotacao();
    validarUrna();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
