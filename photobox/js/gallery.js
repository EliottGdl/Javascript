import { load, serveur_url } from "./photoloader.js";

let urls;
let tablP;
let page;
let titre, desc, pseudo;

export let construct = () => {
  urls = [];
  tablP = [];
  page = 0;
  urls["prev"] = undefined;
  urls["next"] = undefined;
};

export let getDonnees = () => {
  load("/www/canals5/photobox/photos/?offset=8&size=12")
    .then(afficher)
    .then(majBouton);
};

export let suivant = () => {
  if (urls["next"])
    load(urls["next"])
      .then(afficher)
      .then(() => {
        page++;
        majBouton();
      });
};

export let precedent = () => {
  if (urls["prev"]) {
    load(urls["prev"])
      .then(afficher)
      .then(() => {
        page--;
        majBouton();
      });
  }
};

let suiv = e => {
  let id = $(e.target).attr("refer");
  $("#lightbox_close").trigger("click");
  id++;
  if (typeof tablP[id] !== "undefined") {
    $("#" + id).trigger("click");
  } else {
    load(urls["next"])
      .then(afficher)
      .then(() => (id = 0))
      .then(() => $("#" + id).trigger("click"));
  }
};

let prec = e => {
  let id = $(e.target).attr("refer");
  $("#lightbox_close").trigger("click");
  id--;
  if (typeof tablP[id] !== "undefined") {
    $("#" + id).trigger("click");
  } else {
    load(urls["prev"])
      .then(afficher)
      .then(() => (id = tablP.length - 1))
      .then(() => $("#" + id).trigger("click"));
  }
};

let majBouton = () => {
  if (page == 0) {
    $("#previous").attr("disabled", "disabled");
    $("#previous").html("Pas de page précédente")
  } else {
    $("#previous").html("Prev page");
    $("#previous").removeAttr("disabled");
  }
};

let afficher = ({ data }) => {
  let photos = data.photos;

  urls["prev"] = data.links.prev.href;
  urls["next"] = data.links.next.href;

  $("#photobox-gallery").empty();
  tablP = [];
  let idd = 0;
  for (let p of photos) {
    tablP[idd] = p;
    p.id = idd;
    $(`
      <div class="vignette" id="${p.id}">
      <img class="responsive"
      data-img="${serveur_url + p.photo.thumbnail.href}"
      data-uri="${serveur_url + p.links.href}"
      src="${serveur_url + p.photo.thumbnail.href}">
      </br>
      <div>${p.photo.titre}</div>
      </div>
      `)
      .on("click", () => {
        toggleLightBox(p.id, p);
      })
      .appendTo($("#photobox-gallery"));
    idd++;
  }
};

function toggleLightBox(id, p) {
  $(`

        <div id="myModel" class="modal">
          <span id="lightbox_close" class="close cursor">&times;</span>
          <div class="modal-content">

          <div class="lightBox">
            <div class="surCombien"> ${id + 1} / ${tablP.length} </div>
            <img class="responsive" src="${serveur_url +
              p.photo.original.href}" style="width:100%">
            <p style="font-size:20px;text-align:center"> ${p.photo.titre} </p>
          </div>

            <a class="prev" refer="${id}" id="prec"> &#10094; </a>
            <a class="next" refer="${id}" id="suiv"> &#10095; </a>
        </div>

      `)
    .attr("id", "lightbox_container")
    .appendTo($("#gallery"));

  load("/www/canals5/photobox/photos/" + p.photo.id)
    .then(afficherDesc)
    .then(() =>
      load(
        "/www/canals5/photobox/photos/" + p.photo.id + "/comments"
      ).then(data => afficherCommentaires(data, p.photo.id))
    );

  $("#lightbox_close").on("click", () => $("#lightbox_container").remove());
  $("#prec").click(prec);
  $("#suiv").click(suiv);
}

let gerer = (id) => {
  if (titre && pseudo && desc) {
    axios.post(
      serveur_url + "/www/canals5/photobox/photos/" + id + "/comments",
      null,
      {
        withCredentials: true,
        responseType: "json",
        data: {
          titre: titre,
          content: desc,
          pseudo: pseudo
        }
      }
    ).then(() => reload(id));
    titre = undefined;
    desc = undefined;
    pseudo = undefined;

    $("#titre").val("");
    $("#desc").val("");
    $("#pseudo").val("");
  }
};

let reload = (id) => {
  load(
      "/www/canals5/photobox/photos/" + id + "/comments"
  ).then(({data}) => {
    let paragraphe = "";

    for (let com of data.comments) {
      paragraphe += `
      </br>
      <li>Titre : ${com.titre} </br></li>
      <li>Description : ${com.content} </br></li>
      <li>Ecrit par : ${com.pseudo} le ${com.date}</br></li> </br>
      <p> --------------- </p> </br>
      `;
    }
    $("#coms"+id).replaceWith(`
      <div id="coms${id}" style="max-width:900px;color:white;font-size:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;">
        ${paragraphe}
      </div>
    `);


  }).then(() =>  document.getElementById("lightbox_container").scrollTop = 0);


}

let afficherCommentaires = ({ data }, id) => {
  let paragraphe = "";

  for (let com of data.comments) {
    paragraphe += `
    </br>
    <li>Titre : ${com.titre} </br></li>
    <li>Description : ${com.content} </br></li>
    <li>Ecrit par : ${com.pseudo} le ${com.date}</br></li> </br>
    <p> --------------- </p> </br>
    `;
  }

  $(`
    <p style="color:white;font-size:25px;text-align:center"> Commentaires : </p>
    <div id="coms${id}" style="max-width:900px;color:white;font-size:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;">
    ${paragraphe}
    </div>

    <p style="color:white;font-size:25px;text-align:center"> Ajouter un commentaire : </p>
    </br>
    <div style="display:flex;justify-content:center;color:white;font-size:20px;margin-bottom:20px;margin-left:10px;margin-right:10px;">

    <form id="formAj" name="envoieDeDonnees">
        <label>Titre :</label>
        <input id="titre" class="entree" type="text"  name="titre"></input>
        <label>Contenu :</label>
        <input id="desc" class="entree"  type="text" name="desc"></input>
        <label> Pseudo :</label>
        <input id="pseudo" class="entree"  type="text" name="pseudo"></input>
    <input type="button" id="postSmth" value="Poster le commentaire">

</form>
</div>
    `).appendTo($("#lightbox_container"));

  $("#postSmth").click(()=>gerer(id));
  $("#formAj").change(handleChange);
};

let handleChange = event => {
  let val = $("#" + event.target.name).val();
  switch (event.target.name) {
    case "titre":
      titre = val;
      break;
    case "desc":
      desc = val;
      break;
    case "pseudo":
      pseudo = val;
      break;
  }
};

let afficherDesc = ({ data }) => {
  $(`
    <p style="color:white;font-size:25px;text-align:center"> Détail de la photo : </p>
    </br>
    <div style="max-width:900px;color:white;font-size:20px;margin-bottom:20px;margin-left:auto;margin-right:auto;">

    <li>Nom du fichier : ${data.photo.file} </br></li>

    <li>Titre : ${data.photo.titre} </br></li>
    <li>Description : ${data.photo.descr} </br></li>
    <li>Format : ${data.photo.format} </br></li>
    <li>Poids : ${data.photo.size} </br></li>
    <li>Longeur : ${data.photo.width} </br></li>
    <li>Hauteur : ${data.photo.height} </br> </li>
    </div>`).appendTo($("#lightbox_container"));
};
