const arrCarrello = [];
const localStorageKey = "carrello";

fetch("https://striveschool-api.herokuapp.com/books")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  })
  .then(userData => {
    console.log("USERDATA", userData);

    userData.forEach(element => {
      const row = document.querySelector(".row");
      const col = document.createElement("div");
      col.classList.add("col-6");
      col.classList.add("col-sm-4");
      col.classList.add("col-md-3");
      col.classList.add("col-xl-2");

      const card = document.createElement("div");
      card.classList.add("card");
      card.style = "margin-block-end: 20px; height: 600px";

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = element.img;
      img.alt = element.asin;
      img.style = "height: 230px; object-fit: cover";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.classList.add("position-relative");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerText = element.title;

      const price = document.createElement("p");
      price.classList.add("card-text");
      price.innerText = `${element.price}$`;

      const divBtn = document.createElement("div");
      divBtn.classList.add("position-absolute");
      divBtn.classList.add("start-0");
      divBtn.classList.add("bottom-0");
      divBtn.classList.add("ms-3");
      divBtn.classList.add("mb-4");

      const scartaBtn = document.createElement("button");
      scartaBtn.type = "button";
      scartaBtn.classList.add("btn");
      scartaBtn.classList.add("btn-primary");
      scartaBtn.classList.add("bg-danger");
      scartaBtn.classList.add("border");
      scartaBtn.innerText = "Scarta";

      const compraBtn = document.createElement("button");
      compraBtn.type = "button";
      compraBtn.classList.add("btn");
      compraBtn.classList.add("btn-primary");
      compraBtn.classList.add("bg-success");
      compraBtn.classList.add("border");
      compraBtn.innerText = "Compra Ora";

      divBtn.appendChild(scartaBtn);
      divBtn.appendChild(compraBtn);

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(price);
      cardBody.appendChild(divBtn);

      card.appendChild(img);
      card.appendChild(cardBody);

      col.appendChild(card);
      row.appendChild(col);

      scartaBtn.addEventListener("click", e => {
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
      });

      compraBtn.addEventListener("click", e => {
        const divCarrello = document.querySelector(".carrello");
        const ul = document.querySelector(".carrello ul");

        const li = document.createElement("li");
        const divLi = document.createElement("div");
        divLi.classList.add("position-relative");
        divLi.style = "height: 400px; width:200px; margin-block-end: 20px; border: 1px solid black";

        const imgCarrello = document.createElement("img");
        imgCarrello.src = element.img;
        imgCarrello.style = "width: 100%; height:60%; object-fit: cover";

        const titleCarrello = document.createElement("h5");
        titleCarrello.innerText = element.title;

        const priceCarrello = document.createElement("p");
        priceCarrello.innerText = `${element.price}$`;

        const eliminaBtn = document.createElement("button");
        eliminaBtn.type = "button";
        eliminaBtn.classList.add("btn");
        eliminaBtn.classList.add("btn-primary");
        eliminaBtn.classList.add("bg-danger");
        eliminaBtn.classList.add("border");
        eliminaBtn.classList.add("position-absolute");
        eliminaBtn.classList.add("start-0");
        eliminaBtn.classList.add("bottom-0");
        eliminaBtn.classList.add("ms-0");
        eliminaBtn.classList.add("mb-0");
        eliminaBtn.innerText = "Elimina";

        divLi.appendChild(imgCarrello);
        divLi.appendChild(titleCarrello);
        divLi.appendChild(priceCarrello);
        divLi.appendChild(eliminaBtn);

        li.appendChild(divLi);
        ul.appendChild(li);

        arrCarrello.push(element);
        localStorage.setItem(localStorageKey, JSON.stringify(arrCarrello));
        console.log(arrCarrello);

        // let totalPrice = 0;
        // for (let i = 0; i < arrCarrello.length; i++) {
        //   let price = arrCarrello[i].price;
        //   totalPrice += price;
        // }
        // const h4 = document.querySelector("h4");
        // h4.innerText = totalPrice;
        // console.log(totalPrice);

        eliminaBtn.addEventListener("click", e => {
          e.target.parentNode.parentNode.remove();

          for (let i = 0; i < arrCarrello.length; i++) {
            if (arrCarrello[i].asin === element.asin) {
              arrCarrello.splice(i, 1);
            }
          }
          localStorage.setItem(localStorageKey, JSON.stringify(arrCarrello));
          console.log(arrCarrello);
        });
      });
    });
  })
  .catch(error => console.log(error));
