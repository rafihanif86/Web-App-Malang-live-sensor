import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import {useParams} from "react-router-dom";
import { Container, Row, Col, CustomInput, Form, FormGroup, Label} from 'reactstrap';

//components
import MapData from "../../components/mapsData";
import Chart from "../../components/chart";
import Loading from '../../components/loading';
import TimeCard from '../../components/timeCard';


const boxStyle = {
    display: "block", 
    marginTop: "20px", 
    padding : "20px",
    borderRadius: "12px", 
    backgroundColor: "#ffffff", 
    boxShadow : "0 10px 14px 0px rgb(0 0 0 / 15%)",
    justifyContent: 'center',
    aligment : 'center'
};

function DataPreview(){

    const [loading, setLoading] = useState(true);
    var [todoList, setTodoList] = useState();
    var [logBook, setLogBook] = useState([]);
    var [point, setPoint] = useState();
    var mapsAdd = "";
    let [sliderValue, setSliderValue] = useState(null);
    var [temp, setTemp] = useState([]);
    var [thi, setThi] = useState([]);
    var [humidity, setHumidity] = useState([]);
    var [label, setlabel] = useState([]);
    var [dataRata, setDataRata] = useState([]);
    var [dtTime,setDtTime] = useState([]);

    //mengambil id link
    let id  = useParams();
    
    const todoRef = firebase.database().ref('Log');

    const getDataFb = () => {
        setLoading(true);
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList1 = [];
            while (logBook.length > 0) {
                logBook.pop();
            } 

            for (let id in todos) {
                todoList1.push({ id, ...todos[id] });
            }
            todoList = todoList1;
            setTodoList(todoList);

            //logbook user
            var logUser = [];
            todoList.forEach(function(item){
                if(item.user === id.id){
                    logUser.push(item);
                }
            });
            logBook = logUser;
            setLogBook(logBook);
            
            //setting slider value            
            if(sliderValue === null || sliderValue === ''){
                sliderValue = Math.ceil(logBook.length - (logBook.length * 0.1))
                setSliderValue(sliderValue);
            }
            setData();
            dataOnHour();

            //setting marker maps
            setPoint({ lat: logBook[logBook.length-1].longitude, lng: logBook[logBook.length-1].latitude });
            
            setLoading(false);
        });
    }

    // console.log('logbook ', logBook);

    function dataOnHour(){
        let sumHum = 0;
        let sumTemp = 0;
        let count = 0;
        var ket = '';

        function setDataHour(keterangan){
            var hum = sumHum/count;
            var temp = sumTemp/count;
            const sameData = dtTime.includes(keterangan);
            if(!sameData){
                dtTime.push(keterangan);
                dataRata.push({ket:keterangan, data:[temp,hum]});
            }
        }

        function setCount(hum,temp){
            sumHum += hum;
            sumTemp += temp;
            count++;
        }

        for(let i = logBook.length-1 ; i >= 0; i--){
            var splitDate = logBook[i].time.split(/\s+/);
            if(splitDate[1] >= "06:00:00" && splitDate[1] < "12:00:00"){
                if(ket === '' || ket === 'Pagi'){
                    ket = 'Pagi';
                    setCount(logBook[i].humidity,logBook[i].temperature);
                }else{
                    setDataHour(ket);
                    ket='Pagi';
                }
            }else if(splitDate[1] >= "12:00:00" && splitDate[1] < "15:00:00"){
                if(ket === '' || ket === 'Siang'){
                    ket = 'Siang';
                    setCount(logBook[i].humidity,logBook[i].temperature);
                }else{
                    setDataHour(ket);
                    ket='Siang';
                }
            }else if(splitDate[1] >= "15:00:00" && splitDate[1] < "18:00:00"){
                if(ket === '' || ket === 'Sore'){
                    ket = 'Sore';
                    setCount(logBook[i].humidity,logBook[i].temperature);
                }else{
                    setDataHour(ket);
                    ket='Sore';
                }
            }else{
                if(ket === '' || ket === 'Malam'){
                    ket = 'Malam';
                    setCount(logBook[i].humidity,logBook[i].temperature);
                }else{
                    setDataHour(ket);
                    ket='Malam';
                }
            }
        }
        setDataRata(dataRata);
        setDtTime(dtTime);
    }
    
    

    //set array data for chart
    function setData(){
        temp = [];
        humidity = [];
        label = [];
        thi = [];
        for(let i = sliderValue; i < logBook.length; i++){
            temp.push(logBook[i].temperature);
            humidity.push(logBook[i].humidity);
            label.push(logBook[i].time);
            thi.push(0.8 * logBook[i].temperature +((logBook[i].humidity*logBook[i].temperature)/500))
        }
        setTemp(temp);
        setHumidity(humidity);
        setlabel(label);
        setThi(thi);
    }

    useEffect(() => {
      getDataFb();
    }, []);

    if(loading){
        mapsAdd = <h1><center> Loading For Maps.. <br/><Loading /></center></h1>;
    }else{
        mapsAdd = <MapData point={point} thi = {String(thi[thi.length-1]).substr(0,5)+' ('+labelTHI(thi[thi.length-1])+')'} sensorId={id.id} key={1}/>;
    }

    function printVal(event){
        setSliderValue(event.currentTarget.value);
    }

    var parmTHI = "< 21 (Tidak Nyaman), 21-24 (Nyaman), 25-27 (Cukup Nyaman), >27 (Tidak Nyaman).";

    function labelTHI(thi) {  
        var thiLabel = null;
        if(thi >= 21 && thi <= 24){
            thiLabel = 'Nyaman';
        }else if(thi >= 25 && thi <= 27){
            thiLabel = 'Cukup Nyaman';
        }else{
            thiLabel = 'Tidak Nyaman';
        }
        return thiLabel;
    }

    return(
        <div style={{ backgroundColor : "#f2f2f2"}}>
            {!loading ? 
                <>
                    <div style={{ minHeight: "600px"}}>{mapsAdd}</div>
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <Container className="themed-container" style={boxStyle}>
                                        <TimeCard 
                                            label = {'Pagi'} 
                                            kelembaban = {dtTime.indexOf('Pagi')+1 ? String(dataRata[dtTime.indexOf('Pagi')].data[1]).substr(0,5) + '%': "-"}
                                            suhu = {dtTime.indexOf('Pagi')+1 ? String(dataRata[dtTime.indexOf('Pagi')].data[0]).substr(0,5) + '°C': "-"}
                                            thi = {dtTime.indexOf('Pagi')+1 ? labelTHI(0.8 * dataRata[dtTime.indexOf('Pagi')].data[0] + ((dataRata[dtTime.indexOf('Pagi')].data[1]*dataRata[dtTime.indexOf('Pagi')].data[0])/500)): "-"}
                                        />
                                    </Container>
                                </Col>
                                <Col>
                                    <Container className="themed-container" style={boxStyle}>
                                        <TimeCard 
                                            label = {'Siang'} 
                                            kelembaban = {dtTime.indexOf('Siang')+1 ? String(dataRata[dtTime.indexOf('Siang')].data[1]).substr(0,5) + '%': "-"}
                                            suhu = {dtTime.indexOf('Siang')+1 ? String(dataRata[dtTime.indexOf('Siang')].data[0]).substr(0,5) + '°C': "-"}
                                            thi = {dtTime.indexOf('Siang')+1 ? labelTHI(0.8 * dataRata[dtTime.indexOf('Siang')].data[0] + ((dataRata[dtTime.indexOf('Siang')].data[1]*dataRata[dtTime.indexOf('Siang')].data[0])/500)): "-"}
                                        />
                                    </Container>
                                </Col>
                                <Col>
                                    <Container className="themed-container" style={boxStyle}>
                                        <TimeCard 
                                            label = {'Sore'} 
                                            kelembaban = {dtTime.indexOf('Sore')+1 ? String(dataRata[dtTime.indexOf('Sore')].data[1]).substr(0,5) + '%': "-"}
                                            suhu = {dtTime.indexOf('Sore')+1 ? String(dataRata[dtTime.indexOf('Sore')].data[0]).substr(0,5) + '°C': "-"}
                                            thi = {dtTime.indexOf('Sore')+1 ? labelTHI(0.8 * dataRata[dtTime.indexOf('Sore')].data[0] + ((dataRata[dtTime.indexOf('Sore')].data[1]*dataRata[dtTime.indexOf('Sore')].data[0])/500)): "-"}
                                        />
                                    </Container>
                                </Col>
                                <Col>
                                    <Container className="themed-container" style={boxStyle}>
                                        <TimeCard 
                                            label = {'Malam'} 
                                            kelembaban = {dtTime.indexOf('Malam')+1 ? String(dataRata[dtTime.indexOf('Malam')].data[1]).substr(0,5) + '%': "-"}
                                            suhu = {dtTime.indexOf('Malam')+1 ? String(dataRata[dtTime.indexOf('Malam')].data[0]).substr(0,5) + '°C': "-"}
                                            thi = {dtTime.indexOf('Malam')+1 ? labelTHI(0.8 * dataRata[dtTime.indexOf('Malam')].data[0] + ((dataRata[dtTime.indexOf('Malam')].data[1]*dataRata[dtTime.indexOf('Malam')].data[0])/500)): "-"}
                                        />
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="themed-container" style={boxStyle}>
                            <Form>
                                <FormGroup>
                                    <h3><center>Choose the Range: </center></h3>
                                    <CustomInput 
                                        type="range" 
                                        min={0} 
                                        max={logBook.length} 
                                        value={sliderValue} 
                                        id="customRange" 
                                        name="customRange" 
                                        onInput={(event) => printVal(event)} 
                                        onChange={(event) => setData(event)}/>
                                    <p><center>{label[0]} - {label[label.length-1]} | ( {logBook.length - sliderValue} data / {(logBook.length-sliderValue) / logBook.length * 100}% ) </center></p>
                                </FormGroup>
                            </Form>
                        </Container>
                        <Container className="themed-container" style={boxStyle}>
                            <Chart data = {thi} label = {label} chartName = {'Temperature Humidity Index'}/>
                            <br/>
                            <p><i>Live Temperature Humidity Index</i>  : {labelTHI(thi[thi.length-1])}</p>
                            <p>*<i>Temperature Humidity Index</i> (THI) : {parmTHI}</p>
                            
                        </Container>
                        <Container className="themed-container" style={boxStyle}>
                            <Chart data = {temp} label = {label} chartName = {'Temperature Data'}/>
                            <br/>
                        </Container>
                        <Container className="themed-container" style={boxStyle}>
                            <Chart data = {humidity} label = {label} chartName = {'Humidity Data'}/>  
                            <br/>
                        </Container>
                    </div>
                </>
            : <h1><center> Loading For Data.. <br/><Loading /></center></h1>}
            <br/>
        </div>
    );
}
export default DataPreview;