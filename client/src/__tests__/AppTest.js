import React from 'react'
import App from "../App.jsx"
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App test", () => {
    let wrapper;

    const dummyData = {
        address : "1234 Appleseed Lane",
        zip: "56789",
        beds : "3",
        baths : "3.5",
        price : "600000",
        sqFt : "2000",
        priceSqFt : "500",
        type: "House",
        url : "http://www.redfin.com/buy-a-home/comparative-market-analysis",
    }

    beforeAll(() => {
        wrapper =shallow(<App />)
    });

it("Properly enders all html elements", () => {
    expect(wrapper.find("h1").length).toBe(1);
    expect(wrapper.find("input").length).toBe(1)
})
})
