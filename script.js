const atividade = {};

const criatItem = () => {
  return `
    <div>
        <input type="checkbox" />
        <span>Academia em grupo</span>
        <time>Sábado, 18 de abril às 08:00</time>
    </div>    
    `;
};

const section = document.querySelector("section");
section.innerHTML = criatItem();
