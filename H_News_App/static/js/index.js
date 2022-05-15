var token= document.cookie.split('=')[1]
// function for filtering news
const filterFunction= ()=>{
    // get the needed element from frontend, including the filter icon; and other one to update the data with
    let filterSelection = document.querySelectorAll("#filter")
    var [parentDiv,newsTitle, newsStory, newsType] = [document.querySelectorAll('.latest-news'), document.querySelectorAll('.news-title'), document.querySelectorAll('.news-story'), document.querySelectorAll('.news-type')]
    console.log(newsTitle[0])
    // loop through the filter icons to get both mobile and large screen, for their values
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
                console.log(data[0].fields.title)
            // loop through the returned data, and update DOM accordingly
            for (let info=0; info<data.length;info++){
                newsTitle[info].innerHTML= data[info].fields.title
                newsStory[info].innerHTML= data[info].fields.text
                newsType[info].innerHTML= data[info].fields.type
                parentDiv[info]+=`${newsTitle}\n
                ${newsStory}\n
                ${newsType}\n
                `
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