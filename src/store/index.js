import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    request(state,data){
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(data.method, data.url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data.data?JSON.stringify(data.data):'')
        xhr.onload=()=>{
          resolve(JSON.parse(xhr.response))
        }
        xhr.onerror=()=>{
          reject(null)
        }
      })
   }
  },
  modules: {
  }
})
