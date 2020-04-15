import React from "react";
import TextField from "@material-ui/core/TextField";
import { StylesProvider, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleBarReact from "simplebar-react";
import { useSpring, animated } from "react-spring";

const Income = (props) => {
  const totalValue = useSpring({
    to: { number: props.income },
    from: { number: 0 },
  });
  const list = "income";

  //create new item
  const incomeList = props.incArray.map((item, index) => {
    return (
      <li key={index} className="list-element">
        <p className="list-element__date">{item.date}</p>
        <DeleteIcon
          className="list-element__bin"
          onClick={() => props.remove(list, item.key)}
        ></DeleteIcon>{" "}
        <h4 className="list-element__title">{item.title}</h4>
        <p className="list-element__value">{item.value} zł</p>
      </li>
    );
  });

  return (
    <StylesProvider injectFirst>
      <div className="income">
        <div className="income__wrapper">
          <h1 className="income__styledHeader">{props.header}</h1>
          <p className="income__summedValue">
            {props.total}
            <animated.span>
              {totalValue.number.interpolate((number) =>
                number
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              )}
            </animated.span>{" "}
            zł
          </p>

          <div className="income__container">
            <TextField
              error={props.errTxt}
              className="income__textfield"
              type="text"
              value={props.incomeTitle}
              name="incomeName"
              onChange={(event) => props.handleTitleChange(event)}
              label={props.txtInput}
              helperText={props.helperTxt}
            ></TextField>

            <TextField
              error={props.errNum}
              className="income__number"
              type="number"
              value={props.incomeValue}
              name="valueInc"
              onChange={(event) => props.handleValueChange(event)}
              label={props.numInput}
              helperText={props.helperNum}
            />

            <br></br>
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={() => props.handleAddToList(list)}
            >
              {props.buttonTxt}
            </Button>
          </div>
        </div>
        <div className="list">
          <SimpleBarReact style={{ maxHeight: 300 }} autoHide="false">
            {incomeList.reverse()}
          </SimpleBarReact>
        </div>
      </div>
    </StylesProvider>
  );
};

export default Income;
