import { useEffect, useRef, useState } from "react";
import { evaluate } from "../functions/test_functions";
import ExpressionInput from "./ExpressionInput";
// @ts-ignore
import MathJax from 'react-mathjax2';
import "./Calculator.css";
// TODO: add other mathematical functions such as cos, sin, tan, etc.
// TODO: add eulers limit ( e = 2.718 )
// TODO: add pi
// TODO: add log and natural log with different bases
// TODO: parse through the expression and change it to a better format like 3^4 should actually have the four above the three using Canvas! We can parse the text and draw certain symbols using canvas.
function Calculator() {
    const [expression, setExp] : [string, any] = useState("");
    const [answer, setAns] : [number, any] = useState(0);
    const [history, setHist] : [Array<any>, any] = useState([]);
    const [displayExp, setDispExp] : [string, any] = useState("");

    const del = (i: number): void => {
        history.splice(i, 1);
        setHist([...history]);
    };

    const changeDisp = (e:any) :void =>{
        setDispExp('$$'+e.target.value+'$$');
    }

  return (
    <div id="calc">
        <div id='display'>
            <MathJax.Context
                input='ascii'
                onError={ (MathJax : any, error : any) => {
                    console.warn(error);
                    console.log("Encountered a MathJax error, re-attempting a typeset!");
                    MathJax.Hub.Queue(
                        MathJax.Hub.Typeset()
                    );
                } }
                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                options={ {
                    asciimath2jax: {
                        useMathMLspacing: true,
                        delimiters: [["$$","$$"]],
                        preview: "none",
                    },
                    styles: {
                        "#MathJax_Message": {
                            display: 'none'
                        }
                    }
                } }
            >
                <MathJax.Text text={ displayExp }/>
            </MathJax.Context>
        </div>
        <div className="type-area">
            <input 
                type="text" 
                className="in" 
                id="math"
                onFocus={changeDisp}
                onChange={(e) => { 
                        setExp(e.target.value); 
                        setAns(evaluate(e.target.value));
                        changeDisp(e);
                    }
                } 
                value={expression} 
                onKeyDown={ 
                    (e) => {
                        if (e.key === "Enter") {
                            let copy: Array<any> = [...history]; 
                            copy.push(expression);
                            setHist(copy);
                        }
                    }
                }
            />
            <div className="answer">{
                expression.length > 0 &&
                !expression.match(/^[A-Za-z]+$/) && 
                answer !== undefined && 
                !isNaN(answer) ? "= " + answer : ""}</div>
        </div>
        <div id="operations">
            <div id="numbers">
                <button onClick={() => { setExp(expression + 7); setAns(evaluate(expression + 7)); }}>7</button>
                <button onClick={() => { setExp(expression + 8); setAns(evaluate(expression + 8)); }}>8</button>
                <button onClick={() => { setExp(expression + 9); setAns(evaluate(expression + 9)); }}>9</button>
                <button onClick={() => { setExp(expression + 4); setAns(evaluate(expression + 4)); }}>4</button>
                <button onClick={() => { setExp(expression + 5); setAns(evaluate(expression + 5)); }}>5</button>
                <button onClick={() => { setExp(expression + 6); setAns(evaluate(expression + 6)); }}>6</button>
                <button onClick={() => { setExp(expression + 1); setAns(evaluate(expression + 1)); }}>1</button>
                <button onClick={() => { setExp(expression + 2); setAns(evaluate(expression + 2)); }}>2</button>
                <button onClick={() => { setExp(expression + 3); setAns(evaluate(expression + 3)); }}>3</button>
                <button onClick={() => { setExp(expression + 0); setAns(evaluate(expression + 0)); }}>0</button>
                <button onClick={() => { setExp(expression + '.'); setAns(evaluate(expression + '.')); }}><b>.</b></button>
                <button onClick={() => { let copy: Array<any> = [...history];copy.push(expression);setHist(copy); }}>Enter</button>
                <button onClick={() => { setExp(expression + " + "); setAns(evaluate(expression + " + ")); }}>&#43;</button>
                <button onClick={() => { setExp(expression + " - "); setAns(evaluate(expression + " - ")); }}>&#8722;</button>
                <button onClick={() => { setExp(expression + " * "); setAns(evaluate(expression + " * ")); }}>&#215;</button>
                <button onClick={() => { setExp(expression + " / "); setAns(evaluate(expression + " / ")); }}>&#247;</button>
            </div>
        </div>
        <div id="history">
            {
                history.map(
                    (x, index) => ( 
                    <ExpressionInput
                    changeDisp={changeDisp}
                    key={index}
                    evaluate={evaluate}
                    del={del}
                    index={index}
                    expr={x}
                    history={history}/>
                ))
            }
        </div>
    </div>
  );
}

export default Calculator;
