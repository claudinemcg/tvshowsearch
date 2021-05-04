const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // clear images from previous search
    container.innerHTML = '';
    // find text typed in using console.dir(form) elements -> query
    // console.dir(form);
    // need to give input name="query" in HTML for below to work
    const searchTerm = form.elements.query.value;
    //const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const config = { params: { q: searchTerm } }
    const res = await axios.get('http://api.tvmaze.com/search/shows', config)
    // console.log(res.data);
    // console.log(res.data[0].show.image.medium); // all are in the data address
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows) {
        // some shows don't have images so get the images from shows that do so the code doesn't stop
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            //document.body.append(img)
            container.append(img)
        }
    }
}