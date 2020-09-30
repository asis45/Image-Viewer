
const gallery = document.querySelector(".gallery");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const auth = "563492ad6f917000010000010256a244006f412a9030e1a678cdcda5";

//563492ad6f917000010000010256a244006f412a9030e1a678cdcda5/
let query; //searchvalue



btn.addEventListener("click", function (e) {
    e.preventDefault();
    query = input.value;
     searchPhoto(query);
    

});

function clear() {
    gallery.innerHTML = "";
    input.value = "";

}


async function fetchApi(api) {
    const dataFetch = await fetch(api, {

        method: 'GET',
        headers: {
            Accept: "application/json()",
            Authorization: auth
        }
    }
    );
    const data = await dataFetch.json();
    return data;
}


function generatePhotos(data) {

    data.photos.forEach((photo) => {
        const img = document.createElement("div");
        img.classList.add("img");
        img.innerHTML = `<img  src="${photo.src.large}"></img>
                         <p>${ photo.photographer} </p>`;
        gallery.appendChild(img);

    });

}


async function curatedPhotos() {
    const data =await fetchApi("https://api.pexels.com/v1/search?query=nature&per_page=1");
    generatePhotos(data);   

};


async function searchPhoto(query) {
    clear();
     const data = await fetchApi(`https://api.pexels.com/v1/search?query=${query}&per_page=1`);
     generatePhotos(data); 
}

curatedPhotos();