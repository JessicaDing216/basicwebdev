//process incoming data for the main-page
function WeatherDataTable(timeInd, objectWeather, dataID) {
    const objLen = objectWeather.length;
    let htmlCont = '<table class="center"><tr>';
    if (myChart != null) {
        myChart.destroy();
    }
    //instant data
    if (timeInd === 'now') {
        htmlCont += '<th>No.</th><th>Device Id</th><th>Date</th><th>Time</th>';
        if (dataID === 'main') {
            htmlCont += '<th>Measurment Type</th><th>Value</th></tr>';
            for (let i = 0; i < 30; i++) {
                const dataObject = objectWeather[i];
                const dataInData = dataObject.data;
                let str = dataObject.date_time;
                let str1 = str.substring(0, 10);
                let str2 = str.substring(11, 23);
                htmlCont += `
                <tr>
                <td style="text-align:center;">${i + 1}</td>
                  <td style="text-align:center;">${dataObject.device_id}</td>
                  <td style="text-align:center;">${str1}</td>
                  <td style="text-align:center;">${str2}</td>
                  <td style="text-align:left;">${Object.keys(dataInData)}</td>
                  <td style="text-align:center;">${Object.values(dataInData)}</td>
                </tr>
              `
            }

            htmlCont += '</table>';
        }
        else {
            htmlCont += '<th>Value</th></tr>';
            let xValues = new Array();
            let yValues = new Array();
            let x = 0;
            for (let i = 0; i < objLen; i++) {
                const dataObject = objectWeather[i];
                const dataInData = dataObject.data;
                if (x > 19) { break; }
                if (Object.keys(dataInData) == dataID) {
                    x++;
                    let str = dataObject.date_time;
                    let str1 = str.substring(0, 10);
                    let str2 = str.substring(11, 23);
                    htmlCont += `
                    <tr>
                    <td style="text-align:center;">${x}</td>
                      <td style="text-align:center;">${dataObject.device_id}</td>
                      <td style="text-align:center;">${str1}</td>
                      <td style="text-align:center;">${str2}</td>
                      <td style="text-align:center;">${dataInData[dataID]}</td>
                    </tr>
                  `
                    xValues[x - 1] = str2;
                    yValues[x - 1] = dataInData[dataID];
                }
            }
            //reverse the values so that when used in a graph, time increase towards the right
            //this part will not be needed for the average since it's ordered in a acending way.
            xValues = xValues.reverse();
            yValues = yValues.reverse();
            htmlCont += '</table>';
            if (myChart != null) {
                myChart.destroy();
            }
            CreatChart(xValues, yValues, dataID, timeInd, 'bar');
        }
    }
    //for the hourly average data, which only have datetime and category value
    else {
        htmlCont += '<th>No.</th><th>Date</th><th>Time</th><th>Hourly Average</th></tr>';
        let xValues = new Array();
        let yValues = new Array();
        for (let i = 0; i < objLen; i++) {
            const dataObject = objectWeather[i];
            let str = dataObject.date_time;
            let str1 = str.substring(0, 10);
            let str2 = str.substring(11, 23);
            htmlCont += `
            <tr>
            <td style="text-align:center;">${i + 1}</td>
              <td style="text-align:center;">${str1}</td>
              <td style="text-align:center;">${str2}</td>
              <td style="text-align:center;">${dataObject[dataID]}</td>
            </tr>
          `
            xValues[i] = str2;
            yValues[i] = dataObject[dataID];
        }
        htmlCont += '</table>';
        if (myChart != null) {
            myChart.destroy();
        }
        CreatChart(xValues, yValues, dataID, timeInd, 'bar');
    }
    return htmlCont;
}

//process data for the sub-page1 (choose data type from drop list)
function WeatherDataTable2(timeInd, objectWeather, dataID) {
    const objLen = objectWeather.length;
    let htmlCont = '<table class="center"><tr>';
    if (myChart != null) {
        myChart.destroy();
    }
    //instant data
    if (timeInd === 'now') {
        htmlCont += '<th>No.</th><th>Device Id</th><th>Date</th><th>Time</th><th>Value</th></tr>';
        let xValues = new Array();
        let yValues = new Array();
        let x = 0;
        for (let i = 0; i < objLen; i++) {
            const dataObject = objectWeather[i];
            const dataInData = dataObject.data;
            if (x > 24) { break; }
            if (Object.keys(dataInData) == dataID) {
                x++;
                let str = dataObject.date_time;
                let str1 = str.substring(0, 10);
                let str2 = str.substring(11, 23);
                htmlCont += `
                    <tr>
                    <td style="text-align:center;">${x}</td>
                      <td style="text-align:center;">${dataObject.device_id}</td>
                      <td style="text-align:center;">${str1}</td>
                      <td style="text-align:center;">${str2}</td>
                      <td style="text-align:center;">${dataInData[dataID]}</td>
                    </tr>
                  `
                xValues[x - 1] = str2;
                yValues[x - 1] = dataInData[dataID];
            }
        }
        //reverse the values so that when used in a graph, time increase towards the right
        //this part will not be needed for the average since it's ordered in a acending way.
        xValues = xValues.reverse();
        yValues = yValues.reverse();
        htmlCont += '</table>';
        if (myChart != null) {
            myChart.destroy();
        }
        CreatChart(xValues, yValues, dataID, timeInd, 'line');
    }
    //for the hourly average data, which only have datetime and category value
    else {
        htmlCont += '<th>No.</th><th>Date</th><th>Time</th><th>Hourly Average</th></tr>';
        let xValues = new Array();
        let yValues = new Array();
        for (let i = 0; i < objLen; i++) {
            const dataObject = objectWeather[i];
            let str = dataObject.date_time;
            let str1 = str.substring(0, 10);
            let str2 = str.substring(11, 23);
            htmlCont += `
            <tr>
            <td style="text-align:center;">${i + 1}</td>
              <td style="text-align:center;">${str1}</td>
              <td style="text-align:center;">${str2}</td>
              <td style="text-align:center;">${dataObject[dataID]}</td>
            </tr>
          `
            xValues[i] = str2;
            yValues[i] = dataObject[dataID];
        }
        htmlCont += '</table>';
        if (myChart != null) {
            myChart.destroy();
        }
        CreatChart(xValues, yValues, dataID, timeInd, 'line');
    }
    return htmlCont;
}

//process data for the sub-page2 (user input)
function WeatherDataTable3(timeInd, objectWeather, dataID) {
    const objLen = objectWeather.length;
    let htmlCont = '<table class="center"><tr>';
    if (myChart != null) {
        myChart.destroy();
    }

    htmlCont += '<th>No.</th><th>Date</th><th>Time</th><th>Hourly Average</th></tr>';
    let xValues = new Array();
    let yValues = new Array();
    for (let i = 0; i < objLen; i++) {
        const dataObject = objectWeather[i];
        let str = dataObject.date_time;
        let str1 = str.substring(0, 10);
        let str2 = str.substring(11, 23);
        htmlCont += `
            <tr>
            <td style="text-align:center;">${i + 1}</td>
              <td style="text-align:center;">${str1}</td>
              <td style="text-align:center;">${str2}</td>
              <td style="text-align:center;">${dataObject[dataID]}</td>
            </tr>
          `
        xValues[i] = str2;
        yValues[i] = dataObject[dataID];
    }
    htmlCont += '</table>';
    if (myChart != null) {
        myChart.destroy();
    }
    CreatChart(xValues, yValues, dataID, timeInd, 'line');

    return htmlCont;
}

const DATA_DONE = 4;
const DATA_SUCCESS = 200;

//deciding the data source (switching from hourly average and instant)
function source_decider(timeInd, dataID) {
    let DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/measure_type';
    switch (timeInd) {
        case 'now':
            DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';
            break;
        case '24':
            DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataID + '/23';
            break;
        case '48':
            DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataID + '/47';
            break;
        case '72':
            DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataID + '/71';
            break;
        case '168':
            DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataID + '/167';
            break;
    }
    return DATA_SOURCE;
}
//for changing the data source via user input
function source_decider2(timeInd, dataID) {
    let DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataID + '/' + timeInd;
    return DATA_SOURCE;
}
//obtain weather data (main)
function getWeatherData(timeInd, dataID) {
    const WeatherData = new XMLHttpRequest();
    DATA_SOURCE = source_decider(timeInd, dataID);
    WeatherData.open("GET", DATA_SOURCE)
    WeatherData.onreadystatechange = function () {
        if (this.readyState == DATA_DONE) {
            if (this.status == DATA_SUCCESS) {
                const weather = document.getElementById(dataID);
                const objectWeather = JSON.parse(this.responseText);
                weather.innerHTML = WeatherDataTable(timeInd, objectWeather, dataID);
            }
            else {
                console.log('Error! ' + WeatherData.status);
            }
        }
    };
    WeatherData.send();
}

//obtain weather data for sub-page (drop down list)
function getWeatherData2(timeInd, dataID) {
    const WeatherData = new XMLHttpRequest();
    DATA_SOURCE = source_decider(timeInd, dataID);
    WeatherData.open("GET", DATA_SOURCE)
    WeatherData.onreadystatechange = function () {
        if (this.readyState == DATA_DONE) {
            if (this.status == DATA_SUCCESS) {
                const weather = document.getElementById(dataID);
                const objectWeather = JSON.parse(this.responseText);
                weather.innerHTML = WeatherDataTable2(timeInd, objectWeather, dataID);
            }
            else {
                console.log('Error! ' + WeatherData.status);
            }
        }
    };
    WeatherData.send();
}
//obtain weather data for sub-page (user input)
function getWeatherData3(timeInd, dataID) {
    const WeatherData = new XMLHttpRequest();
    DATA_SOURCE = source_decider2(timeInd, dataID);
    WeatherData.open("GET", DATA_SOURCE)
    WeatherData.onreadystatechange = function () {
        if (this.readyState == DATA_DONE) {
            if (this.status == DATA_SUCCESS) {
                const weather = document.getElementById(dataID);
                const objectWeather = JSON.parse(this.responseText);
                weather.innerHTML = WeatherDataTable3(timeInd, objectWeather, dataID);
            }
            else {
                console.log('Error! ' + WeatherData.status);
            }
        }
    };
    WeatherData.send();
}
//tab controllers
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
//for taking user input value as the time interval
function userIn1(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP1").value;
    console.log(timeTemp);
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message1").innerHTML = text;
}
function userIn2(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP2").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message2").innerHTML = text;
}
function userIn3(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP3").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message3").innerHTML = text;
}
function userIn4(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP4").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message4").innerHTML = text;
}
function userIn5(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP5").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message5").innerHTML = text;
}
function userIn6(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP6").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message6").innerHTML = text;
}
function userIn7(dataID) {
    let text;
    let timeTemp = document.getElementById("userInP7").value;
    if (timeTemp === "" || timeTemp <= 0) {
        text = "Input not valid!";
    }
    else {
        timeDay = timeTemp * 24 - 1;
        getWeatherData3(timeDay, dataID);
        text = "Here are the " + timeTemp * 24 + " hours of data you requested!";
    }
    document.getElementById("message7").innerHTML = text;
}
let myChart = null;
//create chart
function CreatChart(x, y, dataID, timeInd, typeID) {
    if (myChart != null) {
        myChart.destroy();
    };
    switch (timeInd) {
        case 'now':
            labelTitle = 'The most recent 20 sets of ' + dataID+' data value';
            break;
        case '24':
            labelTitle = 'The hourly average of ' + dataID + ' data value in 24 hours';
            break;
        case '48':
            labelTitle = 'The hourly average of ' + dataID + ' data value in 48 hours';
            break;
        case '72':
            labelTitle = 'The hourly average of ' + dataID + ' data value in 72 hours';
            break;
        case '168':
            labelTitle = 'The hourly average of ' + dataID + ' data value in 1 week';
            break;
        default:
            labelTitle = 'The hourly average of ' + dataID+' data value' ;
            break;
    };
    const data = {
        labels: x,
        datasets: [{
            label: labelTitle,
            data: y,
            backgroundColor: '#594a4e',
            borderColor: '#594a4e',
            borderWidth: 2,

        }]
    };
    const config = {
        type: typeID,
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#594a4e',
                    },
                },
            },

            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: labelTitle,
                        color: '#594a4e',
                        font: {
                            family: 'courier',
                            size: 15,
                            weight: 'bold',
                            lineHeight: 1.2,
                        },

                        padding: { top: 10, left: 0, right: 0, bottom: 0 }
                    },
                    grid: {
                        color: '#ff8ba7',
                    },
                    ticks: {
                        color: '#594a4e',
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value',
                        color: '#594a4e',
                        font: {
                            family: 'courier',
                            size: 15,
                            weight: 'bold',
                            lineHeight: 1.2
                        },

                        padding: { top: 30, left: 0, right: 5, bottom: 0 }
                    },
                    grid: {
                        color: '#ff8ba7',
                    },
                    ticks: {
                        color: '#594a4e',
                    },
                }
            }
        },
    };
    let charID = dataID + 'Char'
    myChart = new Chart(document.getElementById(charID), config);
}