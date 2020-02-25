import {load,serveur_url} from "./photoloader.js"

let identifiants;

export let init = (id) => {
  identifiants = id;
}

export let getDonnees = () => {
  $("#load_gallery").on("click",() => load("www/canals5/photobox/photos/?offset=8&size=12").then(afficher));
}

let afficher = ({data}) => {
   let photos = data.photos;
   for (let p of photos) {
     $(`

       <div class="vignette" >
           <img id="responsive"
           ata-img="${p.photo.thumbnail.href}"
            data-uri="${p.links.href}"
           src="${serveur_url + p.photo.original.href}">
           <div>${p.photo.titre}</div>

       </div>

       `).appendTo($("#photobox-gallery"));
   }

}
