import React from 'react'
import SearchResult from "../components/SearchResult.jsx"
import { configure, shallow, ElementClass } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("SearchResult test", () => {
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

    const {address, zip, beds, baths, price, sqFt, priceSqFt, type} = dummyData

    beforeAll(() => {
        wrapper = shallow(<SearchResult listing={dummyData}/>)
    });

    it("Properly renders a row", () => {
        expect(wrapper.find("tr").length).toBe(1);
        expect(wrapper.find("td").length).toBe(8);
    })

    it("Properly passes in the text from the listing data", () => {
        expect(wrapper.find("td").at(0).text()).toBe(address)
        expect(wrapper.find("td").at(1).text()).toBe(zip)
        expect(wrapper.find("td").at(2).text()).toBe(beds)
        expect(wrapper.find("td").at(3).text()).toBe(baths)
        expect(wrapper.find("td").at(4).text()).toBe(`$${price}`)
        expect(wrapper.find("td").at(5).text()).toBe(sqFt)
        expect(wrapper.find("td").at(6).text()).toBe(`$${priceSqFt}`)
        expect(wrapper.find("td").at(7).text()).toBe(type)
    })

})
