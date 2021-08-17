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
});
