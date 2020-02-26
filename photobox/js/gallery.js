import {load,serveur_url} from "./photoloader.js"

let identifiants;

export let init = (id) => {
  identifiants = id;
}

export let getDonnees = () => {
  load("www/canals5/photobox/photos/?offset=8&size=12").then(afficher);
}

let afficher = ({data}) => {
   let photos = data.photos;
   for (let p of photos) {
     $(`
       <div class="vignette" >
          <a href="#?w=500" rel="lightBox${p.photo.titre}" class="poplight">
           <img id="responsive"
           ata-img="${serveur_url + p.photo.thumbnail.href}"
            data-uri="${serveur_url + p.links.href}"
           src="${serveur_url + p.photo.original.href}">
           </a>

           <div>${p.photo.titre}</div>
       </div>
       `).appendTo($("#photobox-gallery"));

   $($(`
   <div id="lightbox_container">
        <div id="lightbox">
            <div id="lightbox-head">
                <p id="lightbox_close">-X-</p>
                <h1 id="lightbox_title">${p.photo.titre}</h1>
            </div>

            <div id="lightbox-img">
                <img id="lightbox_full_img" src="${serveur_url + p.links.href}">
            </div>
        </div>

    </div>
    `).attr("id","lightbox_container")).appendTo($("#gallery"));

    }

}
