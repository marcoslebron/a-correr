import { mount, Wrapper } from "@vue/test-utils";
import SellerImage from "@/components/SellerImage.vue";
import { state, getters, mutations, actions } from "@/store";
import { SellerPointInterface } from "@/types";
import Vuex from "vuex";
import { localVue } from "./test_util";

describe("SellerImage.vue", () => {
  let wrapper: Wrapper<Vue>;
  const name = "Jhon Doe";
  const seller = { name, id: 1, image: {} };

  function checkArrayOfSeller(sellers: SellerPointInterface[]) {
    return (
      sellers.filter((e: SellerPointInterface) => e.name === name).length > 0
    );
  }

  beforeEach(() => {
    const store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions,
    });
    wrapper = mount(SellerImage, {
      localVue,
      store,
      propsData: { seller, liked: false },
    });
  });

  it("renders props.seller when passed", () => {
    expect(wrapper.text()).toMatch(name);
  });

  it("send seller data to store", async () => {
    wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();

    expect(checkArrayOfSeller(wrapper.vm.$store.state.sellersPoints)).toBe(
      true
    );
  });

  it("it hide the like button when clicked ", async () => {
    wrapper.find("button").trigger("click");

    await wrapper.vm.$nextTick();
    console.log(wrapper.vm);
    expect(wrapper.find("button")).toBe(false);
  });
});
