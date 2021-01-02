import { useEffect, useRef, useState } from "react";
import ExpressionInput from "./ExpressionInput";
import "./Calculator.css";

function Calculator() {
  const [expression, setExp] : [string, any] = useState("");
  const [answer, setAns] : [number, any] = useState(0);
  const [history, setHist] : [Array<any>, any] = useState([]);
  // TODO: improve evaluate function and test it for any bugs. Need to add exponents and parenthesis
  const evaluate = (expr: string): number => {
    let exp: string = "";
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === " ") {
        continue;
      }
      exp += expr[i];
    }
    let expression: Array<string> = [],
        operators: Array<string> = [],
        temp: string = "";
    //console.log("Expression: ", exp);
    for (let i = 0; i < exp.length; i++){
        console.log("Temp: ", temp);
        if ((exp[i] === '*' || exp[i] === '/' || exp[i] === '+' || exp[i] === '-') && temp.length > 0){
            console.log("operator", temp);
            expression.push(temp);
            temp = "";
            if (expression.length >= 2){
                if (operators.length > 0 && (operators[operators.length-1] === '*' || operators[operators.length-1] === '/')){
                    let one : string | undefined = expression.pop();
                    let two : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined && two !== undefined && op !== undefined){
                        expression.push(one + " " + two + op);
                    }
                }
                if (operators.length > 0 && 
                    (operators[operators.length-1] === '+' || operators[operators.length-1] === '-') && 
                    exp[i] !== '*' && exp[i] !== '/') {
                    let one : string | undefined = expression.pop();
                    let two : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined && two !== undefined && op !== undefined){
                        expression.push(two + " " + one + op);
                    }
                }
            }
            operators.push(exp[i]);
        }
        else {
            temp += exp[i];
        }
    }
    if (temp.length > 0){
        console.log("done loop: ", temp);
        expression.push(temp);
    }
    console.log("before while: " , expression, operators);
    let counter = 0;
    while (operators.length > 0 && expression.length >= 2){
        counter++;
        if (counter >= 3000) {
            throw new Error("inf loop");
        } 
        if (operators.length > 0 && (operators[operators.length-1] === '*' || operators[operators.length-1] === '/')){
            let one : string | undefined = expression.pop();
            let two : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined && two !== undefined && op !== undefined){
                expression.push(one + " " + two + op);
            }
        }
        if (operators.length > 0 && (operators[operators.length-1] === '+' || operators[operators.length-1] === '-')) {
            let one : string | undefined = expression.pop();
            let two : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined && two !== undefined && op !== undefined){
                expression.push(two + " " + one + op);
            }
        }
    }
    // after here, just need the postfix expression
    console.log("after while: ", expression, operators);
    let postfix: string | undefined = expression.pop();
    let values: Array<number> = [],
      tmp: string = "";
        if (postfix !== undefined) {
        for (let i = 0; i < postfix.length; i++) {
            console.log("values: ", values);
            if (values.length > 0 && (postfix[i] === "+" || (postfix[i] === "-" && tmp.length > 0) || postfix[i] === "*" || postfix[i] === "/")) {
                if (tmp.length > 0) {
                    values.push(parseFloat(tmp));
                    tmp = "";
                }
                let v1: number | undefined = values.pop();
                let v2: number | undefined = values.pop();
                console.log("inside", v1, v2);
                if (v1 !== undefined && v2 !== undefined) {
                    switch (postfix[i]) {
                        case "+":
                            values.push(v2 + v1);
                            break;
                        case "-":
                            values.push(v2 - v1);
                            break;
                        case "*":
                            values.push(v1 * v2);
                            break;
                        case "/":
                            values.push(v1 / v2);
                            break;
                        default:
                            break;
                    }
                }
            } 
            else if (postfix[i] == "-" && tmp.length == 0){
                let v1: number | undefined = values.pop();
                let v2: number | undefined = values.pop();
                console.log("inside2", v1, v2);
                if (v1 !== undefined && v2 !== undefined) {
                    switch (postfix[i]) {
                        case "+":
                            values.push(v2 + v1);
                            break;
                        case "-":
                            values.push(v2 - v1);
                            break;
                        case "*":
                            values.push(v1 * v2);
                            break;
                        case "/":
                            values.push(v1 / v2);
                            break;
                        default:
                            break;
                    }
                }
                tmp = "";
            }
            else if (postfix[i] === " " && tmp.length > 0) {
                values.push(parseFloat(tmp));
                tmp = "";
            } else {
                tmp += postfix[i];
            }
        }

    }
    return values[0];
  };

  const del = (i: number): void => {
    history.splice(i, 1);
    setHist([...history]);
  };

  return (
    <div id="calc">
      <div id="type-area">
        <input
          type="text"
          id="in"
          onChange={(e) => {
            setExp(e.target.value);
            setAns(evaluate(e.target.value));
          }}
          value={expression}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              let copy: Array<any> = [...history];
              copy.push(expression);
              setHist(copy);
            }
          }}
        ></input>
        <div id="answer">
          {expression.length > 0 &&
          !expression.match(/^[A-Za-z]+$/) &&
          answer !== undefined
            ? "= " + answer
            : ""}
        </div>
      </div>
      <div id="operations">
        <div id="numbers">
          <button
            onClick={() => {
              setExp(expression + 1);
              setAns(evaluate(expression + 1));
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              setExp(expression + 2);
              setAns(evaluate(expression + 2));
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              setExp(expression + 3);
              setAns(evaluate(expression + 3));
            }}
          >
            3
          </button>
          <button
            onClick={() => {
              setExp(expression + 4);
              setAns(evaluate(expression + 4));
            }}
          >
            4
          </button>
          <button
            onClick={() => {
              setExp(expression + 5);
              setAns(evaluate(expression + 5));
            }}
          >
            5
          </button>
          <button
            onClick={() => {
              setExp(expression + 6);
              setAns(evaluate(expression + 6));
            }}
          >
            6
          </button>
          <button
            onClick={() => {
              setExp(expression + 7);
              setAns(evaluate(expression + 7));
            }}
          >
            7
          </button>
          <button
            onClick={() => {
              setExp(expression + 8);
              setAns(evaluate(expression + 8));
            }}
          >
            8
          </button>
          <button
            onClick={() => {
              setExp(expression + 9);
              setAns(evaluate(expression + 9));
            }}
          >
            9
          </button>
        </div>
        <div id="basic">
          <button
            onClick={() => {
              setExp(expression + " + ");
              setAns(evaluate(expression + " + "));
            }}
          >
            &#43;
          </button>
          <button
            onClick={() => {
              setExp(expression + " - ");
              setAns(evaluate(expression + " - "));
            }}
          >
            &#8722;
          </button>
          <button
            onClick={() => {
              setExp(expression + " * ");
              setAns(evaluate(expression + " * "));
            }}
          >
            &#215;
          </button>
          <button
            onClick={() => {
              setExp(expression + " / ");
              setAns(evaluate(expression + " / "));
            }}
          >
            &#247;
          </button>
        </div>
      </div>
      <div id="history">
        {history.map((x, index) => (
          <ExpressionInput
            key={index}
            evaluate={evaluate}
            del={del}
            index={index}
            expr={x}
            history={history}
          ></ExpressionInput>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
