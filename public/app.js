const data = {
  "produtos": [
    { "id": 1, "nome": "smartphone galaxy s23", "preco": 3499.90, "categoria": "celulares", "imagem": "https://picsum.photos/200/200?random=1", "descricao": "celular com 128gb e camera boa.", "emestoque": true },
    { "id": 2, "nome": "notebook dell inspiron", "preco": 4599.00, "categoria": "notebooks", "imagem": "https://picsum.photos/200/200?random=2", "descricao": "notebook para trabalho e estudos.", "emestoque": false },
    { "id": 3, "nome": "mouse logitech g502", "preco": 299.90, "categoria": "acessórios", "imagem": "https://picsum.photos/200/200?random=3", "descricao": "mouse gamer com sensor preciso.", "emestoque": true },
    { "id": 4, "nome": "teclado razer", "preco": 899.00, "categoria": "games", "imagem": "https://picsum.photos/200/200?random=4", "descricao": "teclado mecanico barulhento.", "emestoque": true },
    { "id": 5, "nome": "monitor lg 29", "preco": 1200.00, "categoria": "acessórios", "imagem": "https://picsum.photos/200/200?random=5", "descricao": "monitor largo para ver tudo.", "emestoque": true },
    { "id": 6, "nome": "headset cloud ii", "preco": 549.00, "categoria": "games", "imagem": "https://picsum.photos/200/200?random=6", "descricao": "fone de ouvido para jogar.", "emestoque": true },
    { "id": 7, "nome": "macbook air m2", "preco": 8500.00, "categoria": "notebooks", "imagem": "https://picsum.photos/200/200?random=7", "descricao": "computador muito fino e rapido.", "emestoque": true },
    { "id": 8, "nome": "iphone 15 pro", "preco": 7200.00, "categoria": "celulares", "imagem": "https://picsum.photos/200/200?random=8", "descricao": "celular da apple de titanio.", "emestoque": true }
  ]
};

function formatprice(valor) {
  return "r$ " + valor.toFixed(2);
}

const listaprodutos = document.getElementById("product-list");

if (listaprodutos) {
  const campobusca = document.querySelector("#search");
  const selecaocat = document.querySelector("#category");
  const botaorender = document.getElementById("btnrender");

  function createproductcard(p) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-id", p.id);
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.margin = "10px";
    div.innerHTML = `
      <img src="${p.imagem}" width="150">
      <h3>${p.nome}</h3>
      <p>${formatprice(p.preco)}</p>
      <p><b>${p.categoria}</b></p>
      <a href="detalhes.html?id=${p.id}" class="btn-ver" style="display:inline-block; margin-bottom:5px; text-decoration:none; background:#007bff; color:white; padding:5px 10px; border-radius:3px;">ver detalhes</a>
      <button class="btn-cor">destacar</button>
    `;
    div.querySelector(".btn-cor").addEventListener("click", function() {
      div.classList.add("highlight");
    });
    return div;
  }

  function renderproducts(lista) {
    listaprodutos.innerHTML = "";
    lista.forEach(function(p) {
      const card = createproductcard(p);
      listaprodutos.appendChild(card);
    });
  }

  function rendercategories() {
    const cats = ["todas", "celulares", "notebooks", "acessórios", "games"];
    selecaocat.innerHTML = "";
    cats.forEach(function(nome) {
      const opt = document.createElement("option");
      opt.value = nome;
      opt.textContent = nome;
      selecaocat.appendChild(opt);
    });
  }

  function filterproducts() {
    const texto = campobusca.value.toLowerCase();
    const categoria = selecaocat.value;
    const filtrados = data.produtos.filter(function(p) {
      const nomeok = p.nome.toLowerCase().includes(texto);
      const catok = (categoria === "todas" || p.categoria === categoria);
      return nomeok && catok;
    });
    renderproducts(filtrados);
  }

  botaorender.addEventListener("click", function() {
    renderproducts(data.produtos);
  });
  campobusca.addEventListener("input", filterproducts);
  selecaocat.addEventListener("change", filterproducts);

  rendercategories();
  renderproducts(data.produtos);
}

const areadetalheproduto = document.getElementById("detalhe-produto");

if (areadetalheproduto) {
  const urlparams = new URLSearchParams(window.location.search);
  const iddoproduto = parseInt(urlparams.get("id"));
  const produtoencontrado = data.produtos.find(function(p) {
    return p.id === iddoproduto;
  });

  if (produtoencontrado) {
    let estoque = produtoencontrado.emestoque ? "disponível em estoque" : "fora de estoque";
    areadetalheproduto.innerHTML = `
      <h2>${produtoencontrado.nome}</h2>
      <img src="${produtoencontrado.imagem}" width="250" style="margin-bottom: 15px;">
      <p><strong>preço:</strong> ${formatprice(produtoencontrado.preco)}</p>
      <p><strong>categoria:</strong> ${produtoencontrado.categoria}</p>
      <p><strong>status:</strong> ${estoque}</p>
      <p><strong>descrição completa:</strong> ${produtoencontrado.descricao}</p>
    `;
  } else {
    areadetalheproduto.innerHTML = `<p>erro: produto não encontrado ou id inválido.</p>`;
  }
}