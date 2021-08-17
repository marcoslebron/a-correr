import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { isEmpty } from "lodash";

Vue.use(Vuex);
interface sellerPointInterface {
  id: string;
  name: string;
  points: number;
}

type State = {
  sellersPoints: sellerPointInterface[];
  pointsReward: number;
  winnerPoints: number;
};

export default new Vuex.Store({
  state: {
    sellersPoints: [],
    pointsReward: 3,
    winnerPoints: 20,
  },
  getters: {
    sellerWinner: (state: State): sellerPointInterface | undefined => {
      return state.sellersPoints.find(
        (seller) => seller.points >= state.winnerPoints
      );
    },
    raceHasEnded: (state, getters): boolean => {
      return !isEmpty(getters.sellerWinner);
    },
    totalPoints: (state: State): number => {
      let total = 0;
      state.sellersPoints.forEach((seller) => {
        total += seller.points;
      });
      return total;
    },
  },
  mutations: {
    assignPoints(state: State, payload): void {
      const seller = state.sellersPoints.find(
        (seller) => seller.id === payload.seller.id
      );
      if (seller) {
        seller.points += state.pointsReward;
        return;
      }

      state.sellersPoints.push(payload.seller);
    },
  },
  actions: {
    addSellerPoints({ commit }: ActionContext<State, State>, payload): void {
      commit("assignPoints", payload);
    },
  },
});
