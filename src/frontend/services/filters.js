const initialFilters = {
    category: {
        angular: false,
        vue: false,
        svelte: false,
        react: false,
        node: false
    }
};

const handleCategories = (videos,categories) => {
    let currentVideos = [];
    let optionSelectedFlag = false;

    for( let key in categories ) {
        if( categories[key] ) {
            currentVideos = jodo(currentVideos , videos.filter(x => x.categoryName === key));
            optionSelectedFlag = true;
        }
    }
    return optionSelectedFlag ? currentVideos : videos ;
}

const jodo = (...arr) => {
    const concatedVideos = arr.reduce((acc,curr) => acc.concat(curr) );
    return concatedVideos;
}

const handleAllFilters = (videos,state) => {
    let currentFilteredData = videos;
    currentFilteredData = handleCategories(currentFilteredData, state.category);
    return currentFilteredData;
}

export { handleAllFilters , initialFilters };