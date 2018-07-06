const ipc = window.require("electron").ipcRenderer
const actions = {
    send_link({ commit }, credentials) {
        ipc.send('send-link-to-electron', credentials);
        commit('isLoading');
        ipc.on('electron-send-list', (e, args) => {
            commit('setData', args);
            commit('loadingDone');
        })
    },
    download({ commit, state }, credentials) {
        let result = [];
        credentials.forEach((e, i) => {
            result.push(state.data[e]);
        });
        ipc.send('send-data-to-electron', result);
        ipc.on('downloading', (e, args) => {
            commit('showModal')
        })
    },
    search({ commit }, credentials) {
        commit('txtSearch', credentials)
    },
    hide_modal({ commit }) {
        commit('hideModal');
        commit('reset');
    },
    pro_gress({ commit }, credentials) {
        commit('progress', credentials)
    }
}

export default actions;