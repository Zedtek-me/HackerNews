var token= document.cookie.split('=')[1]
// function for filtering news
const filterFunction= ()=>{
    // get the needed element from frontend, including the filter icon; and other one to update the data with
    let filterSelection = document.querySelectorAll("#filter")
    let [parentDiv,newsTitle, newsStory, newsType] = [document.querySelector('.latest-news'),document.querySelector('.news-title'), document.querySelector('.news-story'), document.querySelector('.news-type')]
    for (let elem of filterSelection){
        elem.addEventListener('change', (e)=>{
        filteredBy=e.target.value
        fetch('/filter',{
            method: 'POST',
            body:JSON.stringify(filteredBy),
            'headers': {
                'X-CSRFToken':token,
            },
            'Content-Type': 'application/json',
        }).then((response)=>{return response.json()})
          .then(
            (data)=>{
            for (let info of data){
                newsTitle.innerHTML= info.title
                newsStory.innerHTML= info.text
                newsType.innerHTML= info.type
                parentDiv.appendChild(newsTitle);
                parentDiv.appendChild(newsStory)
                parentDiv.appendChild(newsType)
            }
        })
    })}//for loop ends here
}

filterFunction()

// search functionality
const search= ()=>{
    let searchFields= document.querySelectorAll('[name=search_query]')
    let searchIcons= document.querySelectorAll('.search')
    for(let item=0; item< searchIcons.length; item++){
        searchIcons[item].addEventListener('click', (e)=>{
            let searchContent= searchFields[item].value
            searchFields[item].value= ''
            fetch('/search', {
                method:'POST',
                body: JSON.stringify(searchContent),
                'headers':{
                    'X-CSRFToken': token,
                    'Content-Type': 'application/json'
                }
            })//end of fetch
        })//end of listener
    }
}
search()