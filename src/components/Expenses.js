import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { StylesProvider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleBarReact from "simplebar-react";
import { useSpring, animated } from "react-spring";

const Expenses = props => {
  const totalValue = useSpring({
    to: { number: props.expenses },
    from: { number: 0 }
  });
  const listSelector = "expenses";
  const expensesList = props.expensesList.map((item, index) => {
    return (
      <li key={index} className="list-element">
        <p className="list-element__date">{item.date}</p>
        <DeleteIcon
          className="list-element__bin"
          onClick={() => props.removeElement(listSelector, item.key)}
        ></DeleteIcon>
        <p className="list-element__title">{item.title}</p>
        <p className="list-element__value">{item.value} zł</p>
      </li>
    );
  });
  return (
    <StylesProvider injectFirst>
      <div className="expenses">
        <h1 className="expenses__styledHeader">{props.header}</h1>
        <p className="income__summedValue">
          {props.total}
          <animated.span>
            {totalValue.number.interpolate(number =>
              number
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            )}
          </animated.span>{" "}
          zł
        </p>
        <div className="expenses__container">
          <TextField
            error={props.errTxt}
            className="expenses__textfield"
            type="text"
            name="expenseName"
            value={props.title}
            onChange={(event, error) => props.changeTitle(event, error)}
            id="standard-basic"
            label={props.txtInput}
            helperText={props.helperTxt}
          />

          <TextField
            error={props.errNum}
            className="expenses__number"
            type="number"
            value={props.value}
            name="valueExp"
            onChange={event => props.changeValue(event)}
            id="standard-basic"
            label={props.numInput}
            helperText={props.helperNum}
          />
          <br></br>
          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={() => props.addElement()}
          >
            {props.buttonTxt}
          </Button>
          <div className="list">
            <SimpleBarReact
              style={{ maxHeight: 300 }}
              data-simplebar-auto-hide="false"
            >
              {expensesList.reverse()}
            </SimpleBarReact>
          </div>
        </div>
      </div>
    </StylesProvider>
  );
};

export default Expenses;
