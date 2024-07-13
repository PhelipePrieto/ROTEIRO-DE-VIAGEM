const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format("DD"),
      semana: {
        curto: dayjs(data).format("ddd"),
        longo: dayjs(data).format("dddd"),
      },
    },
    mes: {
      curto: dayjs(data).format("MMM"),
      longo: dayjs(data).format("MMMM"),
    },
    hora: dayjs(data).format("HH:mm"),
  };
};
formatador();

const atividade = {
  nome: "Academia",
  data: new Date("2024-07-08 10:00"),
  finalizada: false,
};

let atividades = [
  atividade,
  {
    nome: "Almoço",
    data: new Date("2024-07-08 10:00"),
    finalizada: false,
  },
  {
    nome: "Jantar",
    data: new Date("2024-07-08 10:00"),
    finalizada: false,
  },
  {
    nome: "café",
    data: new Date("2024-07-08 10:00"),
    finalizada: false,
  },
];

const criatItemDeAtividade = (atividade) => {
  let checkbox = `<input onChange="concluirAtividade(event)" value="${atividade.data}" type="checkbox"`;

  if (atividade.finalizada) {
    checkbox += " checked ";
  }

  checkbox += " />";

  const formatar = formatador(atividade.data);

  return `
    <div>
        ${checkbox}
        <span>${atividade.nome}</span>
        <time>${formatar.dia.semana.longo}, dia ${formatar.dia.numerico} de ${formatar.mes.longo}, às ${formatar.hora} horas.</time>
    </div>    
    `;
};

const atualizarListaDeAtividades = () => {
  const section = document.querySelector("section");
  section.innerHTML = "";

  if (atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`;
    return;
  }

  for (let atividade of atividades) {
    section.innerHTML += criatItemDeAtividade(atividade);
  }
};
atualizarListaDeAtividades();

const salvarAtividade = (event) => {
  event.preventDefault();
  const dadosFomulario = new FormData(event.target);

  const nome = dadosFomulario.get("atividade");
  const dia = dadosFomulario.get("dia");
  const hora = dadosFomulario.get("hora");
  const data = `${dia} ${hora}`;

  const novaAtividade = {
    nome,
    data,
    finalizada: false,
  };

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data;
  });

  if (atividadeExiste) {
    return alert("Dia/hora não disponpivel");
  }

  atividades = [novaAtividade, ...atividades];

  atualizarListaDeAtividades();
};

const criarDiasSelecao = () => {
  const dias = ["2024-05-10", "2024-05-11", "2024-05-12"];

  let diaSelecao = "";

  for (let dia of dias) {
    const formatar = formatador(dia);
    const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes.longo}`;
    diaSelecao += `<option value="${formatar.dia.numerico}">${diaFormatado}</option>`;
  }

  document.querySelector("select[name='dia']").innerHTML = diaSelecao;
};
criarDiasSelecao();

const criarHorasSelecao = () => {
  let horariosDisponpiveis = "";

  for (let i = 6; i < 23; i++) {
    horariosDisponpiveis += `<option value="${i}:00">${i}:00</option>`;
    horariosDisponpiveis += `<option value="${i}:30">${i}:30</option>`;
  }

  document.querySelector("select[name='hora']").innerHTML =
    horariosDisponpiveis;
};
criarHorasSelecao();

const concluirAtividade = (event) => {
  const input = event.target;
  const dataInput = input.value;

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataInput;
  });

  if (!atividade) {
    return;
  }

  atividade.finalizada = !atividade.finalizada;
};
