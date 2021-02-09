
const searchButton = document.getElementById("search-button")



searchButton.addEventListener("click", () => {
    const inputText = document.getElementById("input-text").value;
    getSongs(inputText);
    const lyricsHolder = document.querySelector(".single-lyrics");
    lyricsHolder.style.display = "none";
    document.getElementById("input-text").value = '';
})



const getSongs = async (inputText) => {
    const response = await fetch(`https://api.lyrics.ovh/suggest/${inputText}`);
    const data = await response.json();
    songsItem(data.data);
}

const songsItem = (data) => {
    const itemHolder = document.querySelector(".item-holder");
    itemHolder.innerHTML = "";
    data.map(item => {

        const card = `
    <div class="search-result col-md-3 mx-auto py-4">
                    <div class="single-result align-items-center my-3 p-3">

                        <div class="album-cover d-flex justify-content-center">
                            <img class="album-image p-3 " src="${item.album.cover}" alt="...">
                        </div>
                        <div class="">
                            <h4 class="lyrics-name">${item.title}</h4>
                            <p class="author lead">By <span>${item.artist.name}</span></p>
                        </div>
                        <div class=" text-md-right text-center">
                        <a href="#top-box"><button id="get-button" onclick="getLyric('${item.artist.name}','${item.title}')" class="btn btn-success">Get Lyrics</button></a>
                            
                        </div>
                    </div>
                </div>
    `
        itemHolder.innerHTML += card;

    })
}

const getLyric = async (artist, title) => {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    const data = await response.json();
    const lyricsHolder = document.querySelector(".single-lyrics");
    lyricsHolder.style.display = "block";
    lyricsHolder.innerText = data.lyrics;
}