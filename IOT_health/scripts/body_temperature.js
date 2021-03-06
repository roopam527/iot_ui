const getUrlVars =()=> {
    const vars = {};
    const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
    }

let pause = false;
let animation_duration = 0;
let check_first=0;

const changeTime = (time) =>{
    [hour,minute,sec]=time.split(":");
    minute = (Number(minute)+30);
    if(minute > 60){
        minute = Number(minute) - 60
        hour = Number(hour) + 1
    }
    hour = Number(hour) + 13
    if(hour > 23){
        hour = Number(hour) - 24
    }
    return [hour,minute,sec].join(":")
}



const hash = getUrlVars()["id"];
console.log(hash);
const generateChart = (dataset=[],labels=[])=>{
    var ctx = document.getElementById("myChart").getContext('2d');
    if(check_first == 0){
        check_first = 1;
        animation_duration = 1000

    }
    else{
        animation_duration=0
    }
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Body Tempratures',
            
            data: dataset,
            
            
            borderWidth: 1
        }]
    },
    options: {
        animation: {
            duration: animation_duration, // general animation time
        },
        // elements: {
        //     line: {
        //         tension: 0, // disables bezier curves
        //     }
        // },
        
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        tooltips: {
            cornerRadius: 4,
            caretSize: 4,
            xPadding: 16,
            yPadding: 10,
            backgroundColor: 'rgba(0, 150, 100, 0.9)',
            titleFontStyle: 'normal',
            titleMarginBottom: 15
          }
    }
});

}
 generateChart([90.2,90.1,90.3,90.3,97.2,91.2],["1/2/2019","1/2/2019","2/2/2019","2/2/2019","3/2/2019"]);
            
            document.getElementById("current_temp").innerHTML=91.2+"° F";
            document.getElementById("current_time").innerHTML="at "+"4:00pm";
            document.getElementById("current_date").innerHTML="on "+"3/2/2019";


const getTemperatures = () =>{
    fetch('https://obscure-shore-41041.herokuapp.com/body_temperature/'+hash)
    .then((response)=>{
        //console.log(response)
        return response.json();
    })
    .then((res)=>{
        if(res)
        {
            const labels=res.labels.map((index)=>{
                return changeTime(index.substring(16,24));
            })
           
        }
           
        else
            generateChart();
        console.log(res);
        if(!pause)
            setTimeout(getTemperatures,4000)
        
       
    })
    .catch((err)=>{
        console.log(err)
    })
}




const go_to_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/temperature.html?id="+hash;
}

const go_to_body_temperature_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/body_temperature.html?id="+hash;
}



const go_to_pulse_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui/IOT_health/pulse.html?id="+hash;
}

const go_to_login_page = () =>{
    window.location.href = "https://roopam527.github.io/iot_ui";
}


const pause_graph = () =>{
    if(!pause)
        pause = true;
    else{
        pause = false;
        getTemperatures();
    }

    console.log(pause)
}
