import Vue from 'vue'
import Vuex,{ createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"


let modulesFiles = require.context('./modules', true, /\.js$/);
let modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const value = modulesFiles(modulePath)
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	modules[moduleName] = value.default;
	return modules
}, {})

const store = createStore({
	plugins: [createPersistedState({
		reducer(val) {
			return {
				user: val.user,
			}
		},
		storage: {
			getItem: key => localStorage.getItem(key),
			setItem: (key, value) => localStorage.setItem(key, value),
			removeItem: key => localStorage.removeItem(key),
		},
		key:'wxStorage'
	})],
	modules,
})

export default store
