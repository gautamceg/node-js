console.log("Before");
notifyCustomer(1);
console.log("After");

// getCustomer
async function notifyCustomer(id){
    try {
        const customer = await getCustomer(id);
        console.log('Customer: ', customer);
        if(customer.isGold){
            const topMovies = await getTopMovies();
            console.log('TopMovies: ', topMovies);
            await sendEmail(customer.email, topMovies);
            console.log('Email sent.');
        }
    } catch (error) {
        console.log("!!Error-",error.message, error);
    }
}

function getCustomer(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("Fetching Customer details..");
            const customer = {id:id, name:"Gautam", isGold:true, email:"gautam.ceg@gmail.com"};
            resolve(customer);
        }, 2000);
    });
}
function getTopMovies(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log("Fetching Top Movies..")
            resolve(['TopMovie1','TopMovie2','TopMovie3']);
        }, 2000);
    });
}
function sendEmail(email, movies){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Sending email To: ',email,movies);
        }, 2000);
    });
}