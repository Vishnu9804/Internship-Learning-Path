const button = document.getElementById("btn");
const output = document.getElementById("output");

function orderPizza ()
{
    return new Promise((resolve, reject) => {
        output.innerHTML = "Response is being Prepared!!!!";

        setTimeout(() => {
            resolve("Response: Hello World");
        }, 2000);
    });
}

button.addEventListener("click",() => {
    orderPizza().then((message) => {
        output.innerHTML = message;
    })
})