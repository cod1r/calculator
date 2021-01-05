import { useEffect, useRef, useState } from "react";
import ExpressionInput from "./ExpressionInput";
import "./Calculator.css";
/*
expression playground

3*(3+4)

4 3 + 3 *

3*(3+4*3)

3 3 4 3
* ( + * )

3*(3*4+3)

3 ,3 4 *, 3
* ( + )


3*(3-3*6+15)

3,3 3 6 *-, 15
* ( + )
*/

function Calculator() {
    const [expression, setExp] : [string, any] = useState("");
    const [answer, setAns] : [number, any] = useState(0);
    const [history, setHist] : [Array<any>, any] = useState([]);
    // TODO: improve evaluate function and test it for any bugs. Need to add exponents and parenthesis
    // TODO: account for postfix not evaluating right because of negative numbers ( we did but i just checked the next index to see if it was a number )
    // TODO: adding parenthesis - I think I am done. (maybe need to test)
    // TODO: adding exponents - I think I am done. (maybe need to test)
    // TODO: need to polish things up ( like when an operator is missing one of its parameters )
    const evaluate = (expr: string): number => {
    let exp: string = "";
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === " ") {
            continue;
        }
        exp += expr[i];
    }
    // if the expression isn't finished yet then return NaN
    switch(exp[exp.length-1]){
        case'.':
        case'^':
        case'*':
        case'/':
        case'+':
        case'-': return NaN;
        default: break;
    }
    // just in case there are parentheses that don't match up.
    let opening_p : Array<string> = [];
    for (let i = 0; i < exp.length; i++){
        if (exp[i] === '('){
            opening_p.push(exp[i]);
        }
        else if (exp[i] === ')' && opening_p.length > 0 && opening_p[opening_p.length-1] === '('){
            opening_p.pop();
        }
    }
    // if there aren't matching parentheses, then return NaN.
    if (opening_p.length > 0) return NaN;

    let expression: Array<string> = [], operators: Array<string> = [], temp: string = "";
    //console.log("Expression: ", exp);
    // ---------------------------------------------------------- BEGINNING OF POSTFIX CONVERSION
    for (let i = 0; i < exp.length; i++){
        console.log("Temp: ", temp);
        if (exp[i] === '('){
            operators.push(exp[i]);
            continue;
        }
        if (exp[i] === ')'){
            if (temp.length > 0){
                expression.push(temp);
                temp = "";
            }
            while (operators[operators.length-1] !== '('){
                let one : string | undefined = expression.pop();
                let two : string | undefined = expression.pop();
                let op : string | undefined = operators.pop();
                if (one !== undefined && two !== undefined && op !== undefined){
                    switch(op){
                        case '^':
                        case '+':
                        case '-': expression.push(two + " " + one + op); break;
                        case '*':
                        case '/': expression.push(one + " " + two + op); break;
                        default: break;
                    }
                }
            }
            // if statement is here for when the first if that checks if the top operator is not an opening parentheses
            if (operators[operators.length-1] === '('){
                operators.pop();
            }
            continue;
        }
        if (exp[i] === '*' || exp[i] === '/' || exp[i] === '+' || (exp[i] === '-' && temp.length > 0) || exp[i] === '^'){
            console.log("operator", exp[i]);
            if (temp.length > 0){
                expression.push(temp);
                temp = "";
            }
            if (expression.length >= 2){
                // same code over and over again but easier to read and understand because less things cluttered into boolean conditions
                if (operators.length > 0 && operators[operators.length-1] === '^'){
                    let one : string | undefined = expression.pop();
                    let two : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined && two !== undefined && op !== undefined){
                        expression.push(two + " " + one + op);
                    }
                }
                if (operators.length > 0 && (operators[operators.length-1] === '*' || operators[operators.length-1] === '/') && exp[i] !== '^'){
                    let one : string | undefined = expression.pop();
                    let two : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined && two !== undefined && op !== undefined){
                        expression.push(one + " " + two + op);
                    }
                }
                if (operators.length > 0 && (operators[operators.length-1] === '+' || operators[operators.length-1] === '-') && exp[i] !== '*' && exp[i] !== '/' && exp[i] !== '^') {
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
        if (operators.length > 0 && operators[operators.length-1] === '^') {
            let one : string | undefined = expression.pop();
            let two : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined && two !== undefined && op !== undefined){
                expression.push(two + " " + one + op);
            }
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
    // ---------------------------------------------------------------------------------------------------------------- END OF POSTFIX CONVERSION
    // after here, just need the postfix expression
    console.log("after while: ", expression, operators);
    let postfix: string | undefined = expression.pop();
    let values: Array<number> = [], tmp: string = "";
    if (postfix !== undefined) {
        for (let i = 0; i < postfix.length; i++) {
            console.log("values: ", values, postfix[i], tmp.length > 0, isNaN(parseInt(postfix[i+1])), i+1===postfix.length, tmp.charCodeAt(0), tmp.length);
            if (values.length > 0 && (postfix[i] === "+" || (postfix[i] === "-" && (tmp.length > 0 || isNaN(parseInt(postfix[i+1])) || i + 1 === postfix.length)) || postfix[i] === "*" || postfix[i] === "/" || postfix[i] === '^')) {
                if (tmp.length > 0) {
                    values.push(parseFloat(tmp));
                    tmp = "";
                }
                let v1: number | undefined = values.pop();
                let v2: number | undefined = values.pop();
                console.log("inside", v1, v2, postfix[i], parseInt(postfix[i+1]), postfix[i+1], isNaN(parseInt(postfix[i+1])), i + 1 === postfix.length);
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
                        case '^':
                            values.push(Math.pow(v2, v1));
                            break;
                        default:
                            break;
                    }
                }
            }
            else if (postfix[i] === " ") {
                if (tmp.length > 0){
                    values.push(parseFloat(tmp));
                    tmp = "";
                }
            } else {
                tmp += postfix[i];
            }
        }
    }
    if (values.length === 0 && postfix !== undefined){
        values.push(parseFloat(postfix));
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
                answer !== undefined && !isNaN(answer)
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
