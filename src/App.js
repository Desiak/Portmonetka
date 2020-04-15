import React from "react";
import "./css/style.css";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Balance from "./components/Balance";

class App extends React.Component {
  date = new Date().toLocaleDateString();
  state = {
    langPL: true,
    lang: {
      header: "Stan konta: ",
      income: "Przychód",
      expenses: "Wydatki",
      totalIncome: "Suma przychodu: ",
      totalExpenses: "Suma wydatków: ",
      textInput: "Wpisz tytuł",
      numberInput: "Podaj kwotę",
      buttonTxt: "Dodaj",
      helperTxt: "Od 3 do 20 znaków",
      helperNum: "Wartość minimalna to 1zł",
    },

    income: [],
    expenses: [],
    incomeTotal: 0,
    expensesTotal: 0,
    incomeName: "",
    expenseName: "",
    valueInc: "",
    valueExp: "",
    date: this.date,
    key: 0,
    errorET: false,
    errorEV: false,
    errorIT: false,
    errorIV: false,
  };
  //handle input name change
  handleTitleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //handle input number change
  handleValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.valueAsNumber || e.target.value, //   The || e.target.value is a fallback in case the valueAsNumber is NaN.
    });
  };

  //handle click event of input button
  handleIncomeButtonClick = (e) => {
    //check if input names length is between 3-20
    if (this.state.incomeName.length < 3 || this.state.incomeName.length > 21) {
      this.setState({
        errorIT: true,
      });
      this.resetErrors();
    }

    //check if number input is at least 1(zł)
    else if (this.state.valueInc < 1) {
      this.setState({
        errorIV: true,
      });
      this.resetErrors();
    }

    //if above requirements are passed:
    else {
      const item = {
        title: this.state.incomeName,
        value: Math.round(this.state.valueInc * 100) / 100,
        date: this.state.date,
        key: this.state.key,
      };

      this.setState({
        [e]: [...this.state.income, item],
        incomeName: "",
        valueInc: "",
        key: this.state.key + 1,
        errorIT: false,
        errorIV: false,
      });
    }
  };
  resetErrors = () => {
    setTimeout(() => {
      this.setState({
        errorET: false,
        errorEV: false,
        errorIT: false,
        errorIV: false,
      });
    }, 2000);
  };

  //handle click event of expenses button

  handleExpensesButtonClick = () => {
    if (
      this.state.expenseName.length < 3 ||
      this.state.expenseName.length > 21
    ) {
      this.setState({
        errorET: true,
      });
      this.resetErrors();
    } else if (this.state.valueExp < 1) {
      this.setState({
        errorEV: true,
      });
      this.resetErrors();
    } else {
      const item = {
        title: this.state.expenseName,
        value: Math.round(this.state.valueExp * 100) / 100,
        date: this.state.date,
        key: this.state.key,
      };

      this.setState({
        expenses: [...this.state.expenses, item],
        expenseName: "",
        valueExp: "",
        key: this.state.key + 1,
        errorET: false,
        errorEV: false,
      });
    }
  };

  // remove item from the list
  removeElement = (selector, key) => {
    let items = this.state[selector].filter((item) => item.key !== key);
    this.setState({
      [selector]: items,
    });
  };
  // switch language Eng/PL
  onSwitchLanguage = () => {
    //selectors
    const balance = document.querySelector(".infoArea__balance");
    const expenses = document.querySelector(".expenses__wrapper");
    const income = document.querySelector(".income__wrapper");

    //transition
    balance.classList.add("transition");
    expenses.classList.add("transition");
    income.classList.add("transition");

    setTimeout(() => {
      this.setState({
        langPL: !this.state.langPL,
      });

      if (this.state.langPL) {
        this.setState({
          lang: {
            header: "Stan konta: ",
            income: "Przychód",
            expenses: "Wydatki",
            totalIncome: "Suma przychodu: ",
            totalExpenses: "Suma wydatków: ",
            textInput: "Wpisz tytuł",
            numberInput: "Podaj kwotę",
            buttonTxt: "Dodaj",
            helperTxt: "Od 3 do 20 znaków",
            helperNum: "Wartość minimalna to 1zł",
          },
        });
      } else {
        this.setState({
          lang: {
            header: "Balance: ",
            income: "Income",
            expenses: "Expenses",
            totalIncome: "Total income: ",
            totalExpenses: "Total expenses: ",
            textInput: "Enter title",
            numberInput: "Enter value",
            buttonTxt: "Add",
            helperTxt: "Between 3 to 20 characters",
            helperNum: "At least 1zł",
          },
        });
      }
    }, 500);

    //removing transition class so it can be added back on next click
    setTimeout(() => {
      balance.classList.remove("transition");
      expenses.classList.remove("transition");
      income.classList.remove("transition");
    }, 1000);
  };

  render() {
    let income = 0;
    let expenses = 0;
    this.state.income.forEach((element) => {
      income = income + element.value;
    });
    this.state.expenses.forEach((element) => {
      expenses = expenses + element.value;
    });
    return (
      <div className="main">
        <Balance
          income={income}
          expenses={expenses}
          header={this.state.lang.header}
          switchLang={this.onSwitchLanguage}
          lang={this.state.langPL}
        ></Balance>
        <div className="container">
          <Income
            header={this.state.lang.income}
            total={this.state.lang.totalIncome}
            txtInput={this.state.lang.textInput}
            numInput={this.state.lang.numberInput}
            buttonTxt={this.state.lang.buttonTxt}
            incArray={this.state.income}
            remove={this.removeElement}
            incomeTitle={this.state.incomeName}
            handleTitleChange={this.handleTitleChange}
            incomeValue={this.state.valueInc}
            handleValueChange={this.handleValueChange}
            handleAddToList={this.handleIncomeButtonClick}
            id={this.state.id}
            income={income}
            errNum={this.state.errorIV}
            errTxt={this.state.errorIT}
            helperTxt={this.state.lang.helperTxt}
            helperNum={this.state.lang.helperNum}
          />
          <Expenses
            header={this.state.lang.expenses}
            total={this.state.lang.totalExpenses}
            txtInput={this.state.lang.textInput}
            numInput={this.state.lang.numberInput}
            buttonTxt={this.state.lang.buttonTxt}
            expensesList={this.state.expenses}
            removeElement={this.removeElement}
            title={this.state.expenseName}
            changeTitle={this.handleTitleChange}
            value={this.state.valueExp}
            changeValue={this.handleValueChange}
            addElement={this.handleExpensesButtonClick}
            id={this.state.id}
            expenses={expenses}
            errNum={this.state.errorEV}
            errTxt={this.state.errorET}
            helperTxt={this.state.lang.helperTxt}
            helperNum={this.state.lang.helperNum}
          />
        </div>
      </div>
    );
  }
}
export default App;
