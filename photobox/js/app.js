import {init} from "./photoloader.js";
import {construct,getDonnees,suivant,precedent} from "./gallery.js"

window.onload = () => {
  init("https://webetu.iutnc.univ-lorraine.fr");
  construct();
  $("#load_gallery").on("click",getDonnees);
  $("#previous").click(precedent);
  $("#next").click(suivant);
};
