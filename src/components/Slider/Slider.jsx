import React from "react";
import css from "./Slider.module.css";
import Button from "../Button/Button";
import { CSSTransition } from "react-transition-group";
import { composeClasses } from "../../util/composeClassNames";
import effectSlideLeft from "./slideLeft.module.css";
import effectSlideRight from "./slideRight.module.css";
import btnHideLeft from "./btnHideLeft.module.css";
import btnHideRight from "./btnHideRight.module.css";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.maxSlides = this.props.images.length;
  }

  state = {
    index: 0,
    isMoveLeft: true,
    isButtonShow: true
  };

  setNextIndex = (index, move) => {
    this.setState(state => ({
      index,
      isMoveLeft: move
    }));
  };
  handleClickPrevSlide = () => {
    let { index } = this.state;

    index -= 1;

    if (index < 0) {
      index = this.maxSlides - 1;
    }

    this.setNextIndex(index, false);
  };
  handleClickNextSlide = () => {
    let index = (this.state.index + 1) % this.maxSlides;
    this.setNextIndex(index, true);
  };

  handleEnter = () => {
    console.log("enter");
    this.setState({ isButtonShow: false });
  };
  handleExit = () => {
    console.log("exit");
    this.setState({ isButtonShow: true });
  };
  render() {
    const { index, isMoveLeft, isButtonShow } = this.state;
    const { images } = this.props;
    const slideEffect = isMoveLeft ? effectSlideLeft : effectSlideRight;
    return (
      <div className={css.container}>
        {images.map((img, i) => {
          return (
            <CSSTransition
              in={index === i}
              timeout={1000}
              classNames={slideEffect}
              unmountOnExit
              onEnter={this.handleEnter}
            >
              <div>
                <img src={img} alt="" />
              </div>
            </CSSTransition>
          );
        })}
        <ButtonLeft
          isIn={isButtonShow}
          onExited={this.handleExit}
          onClick={this.handleClickPrevSlide}
        >
          Left
        </ButtonLeft>
        <ButtonRight
          isIn={isButtonShow}
          onExited={this.handleExit}
          onClick={this.handleClickNextSlide}
        >
          Right
        </ButtonRight>
      </div>
    );
  }
}

const AnimButton = Component => opt => {
  const { timeout, classAnim, classesBtn } = opt;
  return class extends React.Component {
    render() {
      const { isIn, onExited, onClick, children } = this.props;
      return (
        <CSSTransition
          in={isIn}
          timeout={timeout}
          classNames={classAnim}
          onExited={onExited}
        >
          <Component onClick={onClick} className={classesBtn}>
            {children}
          </Component>
        </CSSTransition>
      );
    }
  };
};
const ButtonLeft = AnimButton(Button)({
  timeout: 500,
  classAnim: btnHideLeft,
  classesBtn: composeClasses(css.btn, css.btnLeft)
});
const ButtonRight = AnimButton(Button)({
  timeout: 500,
  classAnim: btnHideRight,
  classesBtn: composeClasses(css.btn, css.btnRight)
});
export default Slider;
