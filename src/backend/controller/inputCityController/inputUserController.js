import selectInputCity from "../../utils/selectInputUser.js";
// import isValidString from "../../utils/regex.js";
export default async function controllerInputUser(){
    try {
        const INPUT = selectInputCity();
        //Verification of the validity of the city name => if they are only letters
    } catch (error) {
        console.log(error);
    }
}