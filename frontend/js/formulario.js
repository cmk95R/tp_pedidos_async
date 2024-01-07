window.onload = async () => {
    let query = new URLSearchParams(location.search);
  
    try {
      const response = await fetch(
        `http://localhost:3031/api/movies/${query.get("movie")}`
      );
      const { meta, data } = await response.json();
      let title = document.getElementById("title");
      title.value = data ? data.title : null;
      let rating = document.getElementById("rating");
      rating.value = data ? data.rating : null;
      let awards = document.getElementById("awards");
      awards.value = data ? data.awards : null;
      let release_date = document.getElementById("release_date");
      release_date.value = data ? data.release_date.split("T")[0] : null;
      let length = document.getElementById("length");
      length.value = data && data.length ? data.length : null;
      let titleMovie = document.getElementById("peliculatitulo");
      if (data) {
        titleMovie.innerText = "Editar pelicula: " + data.title;
      }
    } catch (error) {
      console.log(error);
    }
  
    let botonCrear = document.getElementById("botonCrear");
    let botonEditar = document.getElementById("botonEditar");
    let botonEliminar = document.getElementById("botonEliminar");
    if (!query.get("movie")) {
      botonCrear.hidden = false;
    } else {
      botonEditar.hidden = false;
      botonEliminar.hidden = false;
    }
  
    botonCrear.addEventListener("click", async function (event) {
      event.preventDefault();
      var form = document.querySelector("form");
      var data = new FormData(form);
      var jsonData = {};
      data.forEach((value, key) => {
        jsonData[key] = value;
      });
      jsonData = JSON.stringify(jsonData);
      await fetch("http://localhost:3031/api/movies/create", {
        method: "POST",
        body: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al agregar la película");
          }
          console.log("Agregada con éxito");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      window.location.href = "http://localhost:5500/home.html";
    });
    botonEditar.addEventListener("click", async function (event) {
      event.preventDefault();
      var form = document.querySelector("form");
      var data = new FormData(form);
      var jsonData = {};
      data.forEach((value, key) => {
        jsonData[key] = value;
      });
      jsonData = JSON.stringify(jsonData);
      await fetch(
        `http://localhost:3031/api/movies/update/${query.get("movie")}`,
        {
          method: "PUT",
          body: jsonData,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al editar");
          }
          console.log("Editada con éxito");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      location.reload();
    });
  
    botonEliminar.addEventListener("click", async function (event) {
      event.preventDefault();
      await fetch(
        `http://localhost:3031/api/movies/delete/${query.get("movie")}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar");
          }
          console.log("Eliminada con éxito");
        })
        .catch((error) => {
          console.log(error);
        });
      window.location.href = "http://localhost:5500/home.html";
    });
  };