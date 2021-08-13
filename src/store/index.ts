import Vue from "vue";
import Vuex, {ActionContext} from "vuex";
import { isEmpty } from "lodash";

Vue.use(Vuex);
interface sellerPointInterface {
  id: string;
  points: number;
}
type State = {
  sellersPoints: sellerPointInterface[];
};

export default new Vuex.Store({
  state: {
    sellersPoints: []
  },
  getters:{
    checkForWinner: (state) => {
      return state.sellersPoints.find((seller) => seller.points >= 20)
    },
    raceHasEnded: (state, getters) => {
      return !isEmpty(getters.checkForWinner)
    }
  },
  mutations: {
    assignPoints(state: State, payload): void {
      const seller = state.sellersPoints.find(seller => seller.id === payload.seller.id)
      if(seller) {
        seller.points += payload.seller.points
        return
      }
      state.sellersPoints.push(payload.seller)
    }
  },
  actions: {
    addSellerPoints({commit}: ActionContext<State, State>, payload): void {
      commit("assignPoints", payload)
    }
  },
  modules: {},
});
