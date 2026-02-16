const button = document.getElementById("btn");
const output = document.getElementById("output");

function tossCoin(){
    return new Promise((resolve,reject) => {
        output.innerText = "Flipping a Coin...."
        setTimeout(() => {
            const isHead = Math.random() > 0.5;

            if(isHead)
            {
                resolve("It's Head");
            }
            else
            {
                reject("It's Tail")
            }
        },1000)
    })
}

button.addEventListener("click", async () => {
    await tossCoin().then((message)=>{
        output.innerText = message;
    })
    .catch((message) => {
        output.innerText = message;
    })
})