import {init} from "./photoloader.js";
import {getDonnees} from "./gallery.js"

window.onload = () => {
  init("https://webetu.iutnc.univ-lorraine.fr/");
  $("#load_gallery").on("click",getDonnees);
};
