const getters = {
    set_loading: state => state.loading,
    filter_data: state => {
        return state.data.filter(item => { return item.name.toLowerCase().includes(state.txtSearch.toLowerCase()) })
    },
    progress: state => state.percent
}


export default getters;