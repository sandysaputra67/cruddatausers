import Vue from "vue";
import Vuex from "vuex";
import users from "./models/users";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: users,
  },
  mutations: {
    remove_customer(state, index) {
      if (index > -1) {
        state.users.splice(index, 1);
      }
    },
    add_customer(state, payload) {
      state.users.push(payload);
    },
    edit_customer(state, payload) {
      state.users = state.users.map((i) => {
        if (i.id == payload.id) {
          return payload;
        }
        return i;
      });
    },
  },
  actions: {
    removeCustomer({ state, commit }, id) {
      try {
        var index = state.users
          .map((i) => {
            if (id == i.id) return true;
            return false;
          })
          .indexOf(true);

        if (index != -1) {
          commit("remove_customer", index);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    addCustomer({ commit }, payload) {
      commit("add_customer", payload);
    },
    editCustomer({ commit }, payload) {
      commit("edit_customer", {
        id: payload.id,
        first_name: payload.first_name,
        last_name: payload.last_name,
        date: payload.date,
        gender: payload.gender,
      });
    },
  },
});

export default store;
