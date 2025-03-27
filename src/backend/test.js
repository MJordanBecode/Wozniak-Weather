import controllerInputUser from "./controller/inputCityController/inputUserController";

export default async function main() {
    const data =  controllerInputUser();
    console.log("Voici les data du controller "+data);
}   