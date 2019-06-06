import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Slider from "./components/Slider/Slider";


const images = [
    './img/landscape-4254269_1920.jpg',
    './img/blushing-4213963_1920.jpg',
    './img/puppies-4233378_1920.jpg',
]
ReactDOM.render(<div className="con">
    <Slider images={images} />
</div>, document.getElementById('root'));


