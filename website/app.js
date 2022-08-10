/* Global Variables */
const zipApi = 'https://api.openweathermap.org/data/2.5/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//button click 
const generate= document.getElementById('generate');
generate.addEventListener('click',clickListener);
function clickListener(){
    console.log("button clicked");
    allData().then(function(){
        getTemp();
    });
}

//get all data 
const allData = async()=>{
 const request = await fetch('/dataGet');
 try{
 //variable
 const content = document.getElementById('feelings').value;
 //show data in most resent entry 
 document.getElementById('date').innerHTML = `Today’s Date is : ${newDate}.`;
 document.getElementById('content').innerHTML = `I Feel : ${content}.`;

 }catch(error){
   console.log("ERORR",error);
 }
}


//zip code url 
const getTemp = async()=>{
    const zip = document.getElementById('zip').value;
    const req = await fetch(zipApi+`?zip=${zip}&appid=eed70049a39b2d835a12e1a8366525aa`);
    try{
        const response = await req.json();
        console.log(response);
        document.getElementById('temp').innerHTML = `Today’s temperature is : ${response.main.temp} degree.`;
        
    }catch(error){
        console.log("ERORR",error);
    }
}


const postData = async(url='',data={})=>{
    console.log(data);
    const response = await fetch(url,{
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data), 
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("ERROR",error);
    }
}