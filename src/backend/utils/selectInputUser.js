
export default  async function selectInputCity (){
    const SELECT_INPUT_CITY = document.querySelector('#select-city');
    const SELECT_BUTTON_CITY = document.querySelector('.submit-city');
    SELECT_BUTTON_CITY.addEventListener('click',  (event) => {
        event.preventDefault();
        console.log( SELECT_INPUT_CITY.value);
        SELECT_INPUT_CITY.value = '';
       console.log("tu as cliqué sur moi");
    });
    return SELECT_INPUT_CITY;
}