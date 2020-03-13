import {load,serveur_url} from "./photoloader.js"

let identifiants;
let urls;
let tablP;

export let construct = () => {
  urls = [];
  tablP = [];
  urls["prev"] = undefined;
  urls["next"] = undefined;
}

export let getDonnees = () => {
  load("/www/canals5/photobox/photos/?offset=8&size=12").then(afficher);
}

export let suivant = () => {
  if(urls["next"]) load(urls["next"]).then(afficher)
}

export let precedent = () => {
  if(urls["prev"]) {
    load(urls["prev"]).then(afficher)
  }
}

let suiv = (e) => {
  let id = $(e.target).attr("refer");
  $("#lightbox_close").trigger("click");
  id++;
  if(typeof tablP[id] !== 'undefined') {
    $("#"+id).trigger("click");
  } else {
    load(urls["next"]).then(afficher).then(id = 0);
    $("#"+id).trigger("click");

  }
}

let prec = (e) => {
  let id = $(e.target).attr("refer");
  $("#lightbox_close").trigger("click");
  id--;
  if(typeof tablP[id] !== 'undefined') {
    $("#"+id).trigger("click");
  } else {
    load(urls["prev"]).then(afficher).then(id = tablP.length - 1);
    $("#"+id).trigger("click");

  }
}


let afficher = ({data}) => {
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
      `).on("click",() => {
        toggleLightBox(p.id,p)
      }).appendTo($("#photobox-gallery"));
      idd++;

  }
}

function toggleLightBox (id,p) {

      $(`

        <div id="myModel" class="modal">
          <span id="lightbox_close" class="close cursor">&times;</span>
          <div class="modal-content">

          <div class="mySlides">
            <div class="numbertext"> ${id + 1} / ${tablP.length} </div>
            <img src="${serveur_url + p.photo.original.href}" style="width:100%">
            <p style="font-size:20px;text-align:center"> ${p.photo.titre} </p>
          </div>

            <a class="prev" refer="${id}" id="prec"> &#10094; </a>
            <a class="next" refer="${id}" id="suiv"> &#10095; </a>
        </div>

      `).attr("id","lightbox_container").appendTo($("#gallery"));

      load("/www/canals5/photobox/photos/"+ p.photo.id).then(afficherDesc).then(() => load("/www/canals5/photobox/photos/"+ p.photo.id + "/comments").then((data)=>afficherCommentaires(data,p.photo.id)));

      $('#lightbox_close').on("click",() => $("#lightbox_container").remove());
      $('#prec').click(prec);
      $('#suiv').click(suiv);

}

let gerer = (pe) => {

  let entrees = $("input.entree");

  for(let ent of entrees) {


  }

}

let afficherCommentaires = ({data},id) => {

  let paragraphe = "";

  for(let com of data.comments) {
    paragraphe += `
    </br>
    <li>Titre : ${com.titre} </br></li>
    <li>Description : ${com.content} </br></li>
    <li>Ecrit par : ${com.pseudo} le ${com.date}</br></li> </br>
    `;
  }

  $(`
    <p style="color:white;font-size:25px;text-align:center"> Commentaires : </p>
    <div style="color:white;font-size:20px;width:70%;margin-bottom:20px;">
    ${paragraphe}

    <form id="formAj" name="envoieDeDonnees">
        <label>Titre :</label>
        <input class="entree" type="text"  name="titre"></input>
        <label>Contenu :</label>
        <input class="entree"  type="text" name="desc"></input>
        <label> Pseudo :</label>
        <input class="entree"  type="text" name="pseudo"></input>
    <input type="button" id="postSmth" value="Poster le commentaire">

</form>
</div>

    `).appendTo($("#lightbox_container"));

    $("#postSmth").click(gerer)
}

let afficherDesc = ({data}) => {
  $(`
    <p style="color:white;font-size:25px;text-align:center"> Détail de la photo : </p>
    <div style="color:white;font-size:20px;width:70%;margin-bottom:20px;">

    <li>Nom du fichier : ${data.photo.file} </br></li>

    <li>Titre : ${data.photo.titre} </br></li>
    <li>Description : ${data.photo.descr} </br></li>
    <li>Format : ${data.photo.format} </br></li>
    <li>Poids : ${data.photo.size} </br></li>
    <li>Longeur : ${data.photo.width} </br></li>
    <li>Hauteur : ${data.photo.height} </br> </li>
    </div>`).appendTo($("#lightbox_container"));
}
