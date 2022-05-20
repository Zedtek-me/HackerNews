var token= document.cookie.split('=')[1]

// getting all news from the database
const getNewsFromDb=(url)=>{
    let listContainer= document.querySelector('#list-container')
    let readMoreBtn= document.querySelector('.read-more')

    fetch(url)
    .then((response)=>{return response.json()})
    .then((allData)=>{
        // the two intervals below help to track the stop and start intervals of the sliced data
        staticInterval= 20
        growingInterval= 20
        // slice the data to display the first 20 items
        data= allData.slice(0,growingInterval)
        // loop through the data, to dynamically create elements needed and pass in their respective attributes and contents
        for(let count= 0; count<data.length;count++){
            // create elements
            let orderedList= document.createElement('li')
            let newsParentContainer= document.createElement('div')
            let newsTitle= document.createElement('p')
            let itemDetails= document.createElement('div')
            let newsStory= document.createElement('a')
            let newsType=  document.createElement('p')

            // set the element's respective attributes below
            orderedList.setAttribute('id', 'list')
            newsParentContainer.setAttribute('class','latest-news')
            newsTitle.setAttribute('class', 'news-title')
            itemDetails.setAttribute('class', 'item-details')
            newsStory.setAttribute('class', 'news-story')
            newsStory.setAttribute('id', 'story-url')
            newsType.setAttribute('class', 'news-type')
            
            // now pass in data from the api
            newsTitle.textContent= data[count].title;
            newsStory.url= data[count].url;
            newsType.textContent= data[count].type;
            // append to their respective parents
            newsParentContainer.appendChild(newsTitle)
            itemDetails.appendChild(newsStory)
            itemDetails.appendChild(newsType)
            newsParentContainer.appendChild(itemDetails)
            orderedList.appendChild(newsParentContainer)
            listContainer.appendChild(orderedList)
        }//end of initial loop

        // for the click more button: 1. create an inital interval set to zero; 2. when read-more is clicked, increase both initial interval and growing interval by the static interval-- 20; 3. slice allData by the initial and the growing interval
        initialInterval=0
        readMoreBtn.addEventListener('click', (e)=>{
            initialInterval+= staticInterval
            growingInterval+=staticInterval
            let newData=allData.slice(initialInterval, growingInterval)

            // looping through to display, just as the initial items
            for(let newCount= 0; newCount<newData.length;newCount++){
            // create elements
            let orderedList= document.createElement('li')
            let newsParentContainer= document.createElement('div')
            let newsTitle= document.createElement('p')
            let itemDetails= document.createElement('div')
            let newsStory= document.createElement('a')
            let newsType=  document.createElement('p')

            // set the element's respective attributes below
            orderedList.setAttribute('id', 'list')
            newsParentContainer.setAttribute('class','latest-news')
            newsTitle.setAttribute('class', 'news-title')
            itemDetails.setAttribute('class', 'item-details')
            newsStory.setAttribute('class', 'news-story')
            newsStory.setAttribute('id', 'story-url')
            newsType.setAttribute('class', 'news-type')
            
            // now pass in data from the sliced data
            newsTitle.textContent= newData[newCount].title;
            newsStory.url= newData[newCount].url;
            newsType.textContent= newData[newCount].type;
            // append to their respective parents
            newsParentContainer.appendChild(newsTitle)
            itemDetails.appendChild(newsStory)
            itemDetails.appendChild(newsType)
            newsParentContainer.appendChild(itemDetails)
            orderedList.appendChild(newsParentContainer)
            listContainer.appendChild(orderedList)
            }
            if(newData.length<20){
                readMoreBtn.textContent= 'End of Items.'
            }
        })
    })
    
}

getNewsFromDb("/api")
// function for filtering news
const filterFunction= ()=>{
    // get the filter and read-more elements from frontend
    let filterSelection = document.querySelectorAll("#filter")
    let readMoreBtn= document.querySelector('.read-more')
    // loop through the filter widgets to get both mobile and large screen, for their values
    for (let elem of filterSelection){
        elem.addEventListener('change', (e)=>{
        filteredBy=e.target.value//gets the filtered item value
        
        fetch('/filter',{// makes a request to the server to filter by the value
            method: 'POST',
            body:JSON.stringify(filteredBy),
            'headers': {
                'X-CSRFToken':token,
            },
            'Content-Type': 'application/json',
        }).then((response)=>{return response.json()})
          .then(
            (data)=>{
            var [listContainer, orderedList, parentDiv, newsTitle, newsStory, newsType] = [document.querySelector('#list-container'), document.querySelectorAll('#list'), document.querySelectorAll('.latest-news'), document.querySelectorAll('.news-title'), document.querySelectorAll('.news-story'), document.querySelectorAll('.news-type')]
            
            // removing other elements if the present element number is greater than the filtered data
            if(orderedList.length > data.length){
                console.log(orderedList.length)
                orderedList=Array.from(orderedList)//converts the entire NodeList to an Array for slicing
                var slicedFilter= orderedList.slice(data.length)
                for(item of slicedFilter){//loops through the remaining items after the slice, to remove them from their parent.
                    listContainer.removeChild(item)
                    console.log(`${item} removed from the list.`)
                }
                
                // get the current list items and insert the data accordingly
                let currentListItems= document.querySelectorAll('#list')
                console.log(currentListItems.length)
            }

            // creating elements if the data sent is larger than current elements
            else if (data.length > orderedList.length){
                for(item of orderedList){//loops through the list elements to remove them from their parent, before inserting a the new data.
                    listContainer.removeChild(item)
                    console.log(`${item} removed from the Dom.`)
                }
                // creates the required elements belows
                for(let count= 0; count<data.length;count++){

                    let orderedList= document.createElement('li')
                    let newsParentContainer= document.createElement('div')
                    let newsTitle= document.createElement('p')
                    let itemDetails= document.createElement('div')
                    let newsStory= document.createElement('a')
                    let newsType=  document.createElement('p')

                    // set the element's respective attributes below
                    orderedList.setAttribute('id', 'list')
                    newsParentContainer.setAttribute('class','latest-news')
                    newsTitle.setAttribute('class', 'news-title')
                    itemDetails.setAttribute('class', 'item-details')
                    newsStory.setAttribute('class', 'news-story')
                    newsStory.setAttribute('id', 'story-url')
                    newsType.setAttribute('class', 'news-type')
                    
                    // now pass in data from the api
                    newsTitle.textContent= data[count].fields.title;
                    newsStory.url= data[count].fields.url;
                    newsType.textContent= data[count].fields.type;
                    // append to their respective parents
                    newsParentContainer.appendChild(newsTitle)
                    itemDetails.appendChild(newsStory)
                    itemDetails.appendChild(newsType)
                    newsParentContainer.appendChild(itemDetails)
                    orderedList.appendChild(newsParentContainer)
                    listContainer.appendChild(orderedList)
                    }
                }
            
            // remove the read more button after a filter.
            readMoreBtn.style.display= 'none'
            // loop through the returned data, and update DOM accordingly
            for (let info=0; info<data.length;info++){
                newsTitle[info].textContent= data[info].fields.title
                if(!data[info].fields.url){newsStory[info].url=''}
                else{newsStory[info].url= data[info].fields.url}//do this to set empty link for none available urls, for now
                newsType[info].textContent= 'Type: ' + data[info].fields.type;
                parentDiv[info]+=`${newsTitle}\n
                ${newsStory}\n
                ${newsType}\n
                `
            }//loop for the filtered data insertion ends here.
        })
    })}//for-loop for the fiflter buttons ends here
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
