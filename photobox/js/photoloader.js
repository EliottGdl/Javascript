
export let serveur_url;

export let init = (adresse) => {
  serveur_url = adresse;
}

export let load = (url) => {
  return axios.get(serveur_url + url,{
      withCredentials: true,
      responseType: 'json',
  }).catch(()=>console.log("Url non joignable"));
}
