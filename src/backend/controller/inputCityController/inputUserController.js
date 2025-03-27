import selectInputCity from "../../utils/selectInputUser.js";

export default async function controllerInputUser(){
    try {
        const INPUT = await selectInputCity();

    } catch (error) {
        console.log(error);
    }
}