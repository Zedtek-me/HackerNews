var token= document.cookie.split('=')[1]
// function for filtering news
const filterFunction= ()=>{
    let filterSelection = document.querySelectorAll("#filter")
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
        }).then((response)=>{console.log(response)})
    })}//for loop ends here
}

filterFunction()

// search functionality
const search= ()=>{
    searchFields= document.querySelectorAll('[name=search_query]')
    searchIcons= document.querySelectorAll('.search')
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