// Variáveis globais para armazenar informações
let hashUrnaAtual = '';
let hashValido = '';
let candidatos = [];
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
};

function horaVotacao() {
  horaAtual = new Date();
  alert(
    'Hora atual - ' +
      horaAtual.getHours() +
      ':' +
      horaAtual.getMinutes() +
      ':' +
      horaAtual.getSeconds() +
      '\nData atual - ' +
      horaAtual.getDate() +
      '/' +
      (horaAtual.getMonth() + 1) +
      '/' +
      horaAtual.getFullYear()
  );
}

async function audioVotacao() {
  return new Promise(resolve => {
    const audio = new Audio('./confirmacao.mp3');
    audio.onended = resolve;
    audio.play();
  });
}

async function carregarCandidatos() {
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

  let candidatosTag = document.getElementById('candidatos');

  if (!candidatos.length) {
    candidatos = await carregarCandidatos();

    for (let i = 0; i < candidatos.length; i++) {
      candidatosTag.innerHTML += `Candidato ${candidatos[i].numero} - ${candidatos[i].nome}<br>`;
    }
  }

  // Declaração das variáveis de string
  let ganhador = null,
    senha = '';

  // Declaração das variáveis de int
  let votoBranco = 0,
    votoGanhador = 0,
    votoNulo = 0;

  // Declaração das variáveis booleanas
  let votoConfirmacao = true;

  let dataHora;
  let dataHoraFinal;

  console.log('Ínicio do programa');
  console.log('CONFIGURAÇÃO DA URNA');

  await validarUrna();

  // Definir o valor da variável fim para o loop
  let fim = false;

  dataHora = horaVotacao();

  do {
    let operacao = prompt('Digite o número correspondente ao seu voto: ');
    operacao = parseInt(operacao);

    if (isNaN(operacao)) return;

    switch (operacao) {
      case 5:
        votoConfirmacao = confirm(
          'Você votou em branco. Deseja confirmar seu voto?'
        );
        if (votoConfirmacao == true) {
          alert('Voto em branco registrado com sucesso.');
          votoBranco++;
          await audioVotacao();
        } else {
          // Adicionando opção de corrigir o voto em branco
          alert('Corrigindo voto em branco.');
          continue;
        }
        break;
      case senhaMesario:
        fim = confirm('Você tem certeza que deseja encerrar a operação?');
        if (!fim) {
          return;
        }
        break;
      default:
        let voto = parseInt(operacao);
        // BUSCANDO O CANDIDATO REFERENTE AO VOTO SELECIONADO \\ O indexCandidatoEscolhido VAI RETORNAR O INDEX DO CANDIDATO ESCOLHIDO.
        let indexCandidatoEscolhido = candidatos.findIndex(
          candidato => candidato.numero === voto
        );
        let candidatoEscolhido = candidatos[indexCandidatoEscolhido];

        // SE indexCandidatoEscolhido FOR MENOR QUE -1 ENTÃO O VOTO NÃO FOI ACHADO.

        if (!isNaN(voto) && indexCandidatoEscolhido > -1) {
          let confirmacaoVoto = confirm(
            `Você votou em ${candidatoEscolhido.nome}. Deseja confirmar seu voto?`
          );
          if (confirmacaoVoto) {
            alert(
              `Voto para ${candidatoEscolhido.nome} registrado com sucesso!`
            );
            await audioVotacao();

            // AGORA É HORA DE DEFINIR O VOTO, AGORA O VOTO DE CADA CANDIDATO FICARÁ NO OBJETO DELE.
            // VERIFICANDO SE O CHAVE "votos" EXISTE NO OBJETO DO CANDIDATO, SE NÃO EXISTIR, SERÁ CRIADA UMA
            if (isNaN(candidatoEscolhido.votos))
              candidatos[indexCandidatoEscolhido].votos = 0;

            // COMPUTANDO O VOTO PARA O CANDIDATO
            candidatos[indexCandidatoEscolhido].votos++;
          } else {
            // Adicionando opção de corrigir o voto
            alert('Corrigindo voto.');
            continue;
          }
        } else {
          let confirmacao = confirm(
            'Seu voto será anulado. Gostaria de prosseguir?'
          );
          if (confirmacao) {
            alert('Voto nulo registrado com sucesso!');
            votoNulo++;
            await audioVotacao();
          } else {
            // Adicionando opção de corrigir o voto nulo
            alert('Corrigindo voto nulo.');
            continue;
          }
        }
    }
  } while (!fim);

  // Contagem dos votos e definição do ganhador

  // Loop para percorrer o array de candidatos
  for (let i = 0; i < candidatos.length; i++) {
    // Se o candidato atual tem mais votos que o votoGanhador atual
    if (candidatos[i].votos > votoGanhador) {
      // Atualiza o ganhador e votoGanhador para o candidato atual
      ganhador = candidatos[i];
      votoGanhador = candidatos[i].votos;
      // Se o candidato atual tem a mesma quantidade de votos que o votoGanhador atual
    } else if (candidatos[i].votos === votoGanhador) {
      // Define ganhador como null, indicando que há um empate
      ganhador = null;
    }
  }

  // Se ganhador é null, significa que não temos um ganhador
  if (!ganhador) {
    alert(
      `Empate! Sem ganhadores.\nA quantidade de voto(s) branco(s) e nulo(s) foram de: ${(
        (votoBranco / (votoBranco + votoNulo)) *
        100
      ).toFixed(2)}% e ${votoBranco} voto(s) branco(s) no total e ${(
        (votoNulo / (votoBranco + votoNulo)) *
        100
      ).toFixed(2)}% e ${votoNulo} voto(s) nulo(s) no total.`
    );
  } else {
    // Calcula o total de votos
    let totalVotos = 0;

    for (let i = 0; i < candidatos.length; i++) {
      totalVotos += candidatos[i].votos || 0;
    }

    // Adicionando os votos nulos
    totalVotos += votoNulo;

    // Calcula a porcentagem de votos para cada candidato e para votos brancos e nulos
    for (let i = 0; i < candidatos.length; i++) {
      totalVotos += candidatos[i].votos || 0;
      candidatos[i].porcentagem = (candidatos[i].votos || 0 / totalVotos) * 100;
    }

    // Exibe o total de votos, porcentagem de votos para cada candidato
    let resultadoCandidatos = '';

    for (let i = 0; i < candidatos.length; i++) {
      resultadoCandidatos += `${candidatos[i].nome}, ${
        candidatos[i].votos || 0
      } e ${candidatos[i].porcentagem.toFixed(2)}%\n`;
    }

    alert(
      `O total de voto de todos os candidatos e seus percentuais foram:\n${resultadoCandidatos}`
    );

    const porcentagemVotosBranco =
      (votoBranco / (votoBranco + votoNulo)) * 100 || 0;
    const porcentagemVotosNulo =
      (votoNulo / (votoBranco + votoNulo)) * 100 || 0;

    // Exibe a quantidade de votos brancos e nulos
    alert(`
        A quantidade de voto(s) branco(s) e nulo(s) foram de: 
        ${porcentagemVotosBranco.toFixed(
          2
        )}% e ${votoBranco} voto(s) branco(s) no total e 
        ${porcentagemVotosNulo.toFixed(
          2
        )}% e ${votoNulo} voto(s) nulo(s) no total.
    `);

    // Exibe o ganhador, porcentagem de votos e quantidade de votos
    alert(
      `O ganhador foi ${ganhador.nome} com ${(
        (votoGanhador / totalVotos) *
        100
      ).toFixed(
        2
      )}% dos votos e ${votoGanhador} voto(s), com acréscimo de voto(s) branco(s).`
    );
  }
  candidatosImpressos = true;
  dataHoraFinal = horaVotacao();
  validarUrna();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
