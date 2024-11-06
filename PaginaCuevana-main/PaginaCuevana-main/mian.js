document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("miInput");
  const lista = document.getElementById("miListado");
  const archivos = "peliculas.json";
  const movieCard = document.getElementById("movieCard");
  const cardImg = document.getElementById("cardImg");
  const cardTitle = document.getElementById("cardTitle");
  const cardText = document.getElementById("cardText");
  const cardLink = document.getElementById("cardLink");
  const closeCard = document.getElementById("closeCard");
  const peliculas = document.querySelectorAll(".pelicula"); // Asegúrate de que cada película tenga la clase "pelicula"

  function moverCarrusel(id, direccion) {
    const cartelera = document.getElementById(id);
    const desplazamiento = 200; // Ajusta el valor para cambiar la cantidad de desplazamiento
    cartelera.scrollBy({
      left: direccion * desplazamiento,
      behavior: "smooth",
    });
  }

  // Función para buscar películas en el archivo JSON
  input.addEventListener("input", buscar);

  function buscar() {
    lista.innerHTML = "";

    if (input.value.trim() === "") {
      lista.style.display = "none";
      return;
    }

    fetch(archivos)
      .then((respuesta) => respuesta.json())
      .then(function (salida) {
        let encontrado = false;
        for (let item of salida.data) {
          if (item.nombre.startsWith(input.value.toUpperCase())) {
            let li = document.createElement("li");
            li.innerHTML = item.nombre;
            li.dataset.img = item.img; // Imagen específica de la película
            li.dataset.title = item.nombre;
            li.dataset.text = item.descripcion;
            li.dataset.link = item.link;

            li.addEventListener("click", function () {
              // Muestra la tarjeta con los datos de la película
              mostrarCard(
                this.dataset.img,
                this.dataset.title,
                this.dataset.text,
                this.dataset.link
              );
            });

            lista.appendChild(li);
            encontrado = true;
          }
        }

        if (encontrado) {
          lista.style.display = "block";
        } else {
          lista.style.display = "none";
        }
      })
      .catch(function (error) {
        console.log("Error al cargar los datos: ", error);
      });
  }

  // Función para mostrar la tarjeta (card) con los datos de la película
  function mostrarCard(imgSrc, title, text, link) {
    cardImg.src = imgSrc;
    cardTitle.textContent = title;
    cardText.textContent = text;
    cardLink.href = link;

    movieCard.style.display = "block";
  }

  // Cerrar la tarjeta al hacer clic en el botón de cerrar
  closeCard.addEventListener("click", function () {
    movieCard.style.display = "none";
  });

  // Muestra la tarjeta al hacer clic en una película existente (no en la lista de búsqueda)
  peliculas.forEach((pelicula) => {
    pelicula.addEventListener("click", function () {
      const imgSrc = this.getAttribute("data-img");
      const title = this.getAttribute("data-title");
      const text = this.getAttribute("data-text");
      const link = this.getAttribute("data-link");

      mostrarCard(imgSrc, title, text, link);
    });
  });

  // Exponer la función globalmente para las flechas
  window.moverCarrusel = moverCarrusel;
});
