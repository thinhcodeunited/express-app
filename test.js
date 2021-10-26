function baz() {
    console.log('baz');
}

function me() {
    console.log('me');
}

const  aasync =  function () {
    setTimeout(function () {
        console.log(1);
    }, 0);
}
async function foo() {

     me();
    setTimeout(baz, 0);

    new Promise(function (resolve, reject) {
        resolve('Hello');
    }).then(function (res) {
        console.log(res);
    });
    new Promise((resolve, reject) =>
        resolve('I am a Promise after Promise!')
    ).then(resolve => console.log(resolve));

    await aasync();

    console.log('foo');


}

foo();