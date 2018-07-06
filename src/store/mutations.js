const mutations = {
    isLoading: (state) => {
        state.loading = true;
    },
    loadingDone: (state) => {
        state.loading = false
    },
    setData: (state, data) => {
        state.data = data
    },
    txtSearch: (state, txt) => {
        state.txtSearch = txt
    },
    hideModal: (state) => {
        state.show = false;
    },
    showModal: (state) => {
        state.show = true;
    },
    progress: (state, per) => {
        state.percent += per
    },
    reset: (state) => {
        state.percent = 0
    }
}
export default mutations;