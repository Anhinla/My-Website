const accessKey = "Cj4eIbMLFUWzswmRF6hzURmOX9QjTsV66w7qv_DiiQI"

const formEle = document.querySelector("form");
const inputEle = document.querySelector(".search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.querySelector(".show-more-button")

let inputData = "";
let page = 1;

async function searchImages(){
  inputData = inputEle.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url)
  const data = await response.json()
  const res = data.results
  if(page===1){
    searchResults.innerHTML = "";
  }
  res.map((result)=>{
    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add("search-result")
    const img = document.createElement('img')
    img.src = result.urls.small
    img.alt = result.alt_description
    const imgLink = document.createElement('a')
    imgLink.href = result.links.html
    imgLink.target = '_blank'
    imgLink.textContent = result.alt_description
    
    imgWrapper.appendChild(img);
    imgWrapper.appendChild(imgLink);
    
    searchResults.appendChild(imgWrapper)
  });
  page++;
  
  if(page>1){
    showMore.style.display = "block"
  }

}
formEle.addEventListener("submit",(event)=>{
  event.preventDefault()
  page = 1;
  searchImages();
  
})
showMore.addEventListener("click",(event)=>{
  searchImages();
})