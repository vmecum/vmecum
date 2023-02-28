  /*
    Monta o html da página
  */  
  if (window.location.search.includes("pagina")) {
  const leiUrl = new URLSearchParams(window.location.search).get("lei");
  const iframeWrapper = document.createElement("div");
  iframeWrapper.classList.add("iframe-wrapper");
  const iframe = document.createElement("iframe");
  iframe.style.backgroundColor = "white";
  iframe.id="estilish";
  iframe.name="container";
  iframe.src = leiUrl;
  iframeWrapper.appendChild(iframe);
  document.body.appendChild(iframeWrapper);
} else {
  const introDiv = document.createElement("div");
  introDiv.id = "intro";
  introDiv.classList.add("bg-image", "shadow-2-strong");
  const maskDiv = document.createElement("div");
  maskDiv.classList.add("mask");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container", "d-flex", "align-items-center", "justify-content-center", "text-center", "h-100");
  const textDiv = document.createElement("div");
  textDiv.classList.add("text-white");
  const h1 = document.createElement("h1");
  h1.classList.add("mb-3");
  h1.textContent = "Bem-vindo ao VMecum";
  const h5 = document.createElement("h5");
  h5.classList.add("mb-4");
  h5.textContent = "Coleção de leis para estudos e consulta.";
  const p1 = document.createElement("p");
  p1.textContent = "Esta é uma coleção de Leis baseada nos livros Vade Mecum encontrados em livrarias. Acesse o menu no canto superior direito para visualizar a listagem de leis e acessá-las. Caso a lei que você procure não conste na lista, é possível solicitar sua inclusão através do botão abaixo.";
  const a1 = document.createElement("a");
  a1.classList.add("btn", "btn-outline-light", "btn-lg", "m-2");
  a1.href = "https://docs.google.com/forms/d/e/1FAIpQLSfna_tUnw7i3dWvQil_iUd6SPiJiuTNzGVywh0JrGtku_1JcA/viewform";
  a1.target = "_blank";
  a1.rel = "nofollow";
  a1.textContent = "Sugira a inclusão de Leis";
  const p2 = document.createElement("p");
  p2.textContent = "Bons estudos!";
  textDiv.appendChild(h1);
  textDiv.appendChild(h5);
  textDiv.appendChild(p1);
  textDiv.appendChild(a1);
  textDiv.appendChild(p2);
  containerDiv.appendChild(textDiv);
  maskDiv.appendChild(containerDiv);
  introDiv.appendChild(maskDiv);
  document.body.appendChild(introDiv);
}


/*
    Monta o menu
*/
fetch('./assets/menu.json')
  .then(response => response.json())
  .then(menuData => {
    const menuList = document.createElement('ul');
    menuList.style.listStyleType = 'none';
    menuList.className = 'sumario';

    menuData.menu.items.forEach(item => {
      const menuItem = document.createElement('li');
      const menuItemLink = document.createElement('a');
      const menuItemLabel = document.createElement('h5');
      const menuItemSubList = document.createElement('ul');

      menuItem.appendChild(menuItemLabel);

      if (item.submenu) {
        menuItemLabel.innerText = item.label;
        menuItemSubList.style.listStyle = 'disclosure-closed';
        menuItemSubList.style.color = 'red';
        item.submenu.forEach(subitem => {
          const subMenuItem = document.createElement('li');
          const subMenuItemLink = document.createElement('a');

          subMenuItemLink.href = `index.html?pagina=${subitem.label}&lei=${subitem.url}`;
          subMenuItemLink.innerText = subitem.label;

          subMenuItem.appendChild(subMenuItemLink);
          menuItemSubList.appendChild(subMenuItem);
        });
        menuItem.appendChild(menuItemSubList);
      } else {
        menuItemLink.href = `index.html?pagina=${item.label}&lei=${item.url}`;
        menuItemLink.innerText = item.label;
        menuItemLink.addEventListener('click', function(event) {
          const currentUrl = new URL(event.currentTarget.href);
          const currentPagina = currentUrl.searchParams.get("pagina");
          const currentLei = currentUrl.searchParams.get("lei");
          const match = menuData.menu.items.find(item => {
            if (item.submenu) {
              return item.submenu.find(subitem => subitem.label === currentPagina && subitem.url === currentLei);
            } else {
              return item.label === currentPagina && item.url === currentLei;
            }
          });
          if (!match) {
            event.preventDefault();
            location.href = "./";
          }
        });
        menuItem.appendChild(menuItemLink);
      }

      menuList.appendChild(menuItem);
    });
    //document.body.appendChild(menuList);
    const elementoPai = document.querySelector('.offcanvas-body');
    elementoPai.appendChild(menuList);
  });

/*
    Inclui a data
*/
const year = new Date().getFullYear();
document.getElementById('year').textContent = year;