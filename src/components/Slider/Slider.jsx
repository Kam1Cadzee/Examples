import React from 'react';
import css from './Slider.module.css'
import Button from "../Button/Button";
import {composeClasses} from "../../util/composeClassNames";

class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.maxSlides = this.props.images.length;
    }

    state = {
        index: 0
    };

    setNextIndex = index => this.setState({index});
    handleClickPrevSlide = () => {
        let {index} = this.state;

        index -= 1;

        if(index < 0) {
            index = this.maxSlides - 1;
        }

        this.setNextIndex(index);
    };
    handleClickNextSlide = () => {
        let index = (this.state.index + 1) % this.maxSlides ;
        this.setNextIndex(index);
    }
    render() {
        const {index} = this.state;

        return (
            <div className={css.container}>
               <img src={this.props.images[index]} alt=""/>
               
               <Button
                   className={composeClasses(css.btn, css.btnLeft)}
                    onClick={this.handleClickPrevSlide}>
                   Left</Button>
               <Button className={composeClasses(css.btn, css.btnRight)}
                       onClick={this.handleClickNextSlide}>Right</Button>
            </div>
        )
    }
}


export default Slider;