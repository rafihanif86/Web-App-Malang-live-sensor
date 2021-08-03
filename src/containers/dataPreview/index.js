import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase';
import {useParams} from "react-router-dom";
import { Container, Row, Col, CustomInput, Form, FormGroup, Label} from 'reactstrap';

//components
import MapData from "../../components/mapsData";
import Chart from "../../components/chart";
import Loading from '../../components/loading';

const boxStyle = {
    display: "block", 
    marginTop: "20px", 
    borderRadius: "12px", 
    backgroundColor: "#ffffff", 
    margin: "15px", 
    padding : "5px",
    boxShadow : "0 10px 14px 0px rgb(0 0 0 / 15%)"
};

function DataPreview(){

    const [loading, setLoading] = useState(true);
    var [todoList, setTodoList] = useState();
    var [logBook, setLogBook] = useState([]);
    var [point, setPoint] = useState();
    var mapsAdd = "";
    let [sliderValue, setSliderValue] = useState(null);
    var [temp, setTemp] = useState([]);
    var [humidity, setHumidity] = useState([]);
    var [label, setlabel] = useState([]);

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

            //setting marker maps
            setPoint({ lat: logBook[logBook.length-1].longitude, lng: logBook[logBook.length-1].latitude });
            
            setLoading(false);
        });
    }

    //set array data for chart
    function setData(){
        temp = [];
        humidity = [];
        label = [];
        for(let i = sliderValue; i < logBook.length; i++){
            temp.push(logBook[i].temperature);
            humidity.push(logBook[i].humidity);
            label.push(logBook[i].time);
        }
        setTemp(temp);
        setHumidity(humidity);
        setlabel(label);
    }

    useEffect(() => {
      getDataFb();
    }, []);

    if(loading){
        mapsAdd = <h1><center> Loading For Maps.. <br/><Loading /></center></h1>;
    }else{
        mapsAdd = <MapData point={point} sensorId={id.id} key={1}/>;
    }

    function printVal(event){
        setSliderValue(event.currentTarget.value);
    }

    return(
        <div style={{ backgroundColor : "#f2f2f2"}}>
            {!loading ? 
                <>
                    <div style={{ minHeight: "600px"}}>{mapsAdd}</div>
                    <div>
                        <Container>
                            <Row style={boxStyle}>
                                <Col xs="2"></Col>
                                <Col xs="auto">
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
                                </Col>
                                <Col xs="2"></Col>
                            </Row>
                            <Row style={boxStyle}>
                                <Col xs="2"></Col>
                                <Col xs="auto">
                                    <Chart data = {temp} label = {label} chartName = {'Temperature Data'}/>
                                </Col>
                                <Col xs="2"></Col>
                            </Row>
                            <Row style={boxStyle}>
                                <Col xs="2"></Col>
                                <Col xs="auto">
                                    <Chart data = {humidity} label = {label} chartName = {'Humidity Data'}/>
                                </Col>
                                <Col xs="2"></Col>
                            </Row>
                        </Container>
                    </div>
                </>
            : <h1><center> Loading For Data.. <br/><Loading /></center></h1>}
            <br/>
        </div>
    );
}
export default DataPreview;