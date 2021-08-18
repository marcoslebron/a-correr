import { shallowMount, Wrapper } from "@vue/test-utils";
import SellerProgressBar from "@/components/SellerProgressBar.vue";
import Vuex from "vuex";
import { localVue } from "./test_util";

describe("SellerProgressBar.vue", () => {
  let wrapper: Wrapper<Vue>;
  const name = "Jhon Doe";

  beforeEach(() => {
    const store = new Vuex.Store({
      state: {
        winnerPoints: 20,
      },
    });
    wrapper = shallowMount(SellerProgressBar, {
      localVue,
      store,
      propsData: { sellerPoints: 0, sellerName: name },
    });
  });

  it("renders props.seller when passed", () => {
    expect(wrapper.text()).toMatch(name);
  });

  it("shows seller remaining point to win", async () => {
    wrapper.setProps({ sellerPoints: 6 });

    const expectedRemainingPoints = wrapper.vm.$store.state.winnerPoints - 6;

    await wrapper.vm.$nextTick();
    expect(wrapper.find(".seller-progress-points-win").text()).toBe(
      `Puntos para Ganar ${expectedRemainingPoints}`
    );
  });

  it("shows winner seller text", async () => {
    wrapper.setProps({ sellerPoints: 20 });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".seller-progress-winner").text()).toMatch(
      "¡¡Ganador!!"
    );
  });

  it("shows seller points", () => {
    expect(wrapper.text()).toMatch(`${wrapper.vm.$props.sellerPoints} Puntos`);
  });
});
