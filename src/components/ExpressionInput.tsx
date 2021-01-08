import { useEffect, useState } from "react";
import "./ExpressionInput.css";

function ExpressionInput(props: any) {
  const [expr, setExpr] = useState("");
  const [answer, setAns] = useState(0);
  useEffect(() => {
    setExpr(props.expr);
    setAns(props.evaluate(props.expr));
  }, [props.expr]);
  return (
    <div className="type-area">
      <input 
            type="text" 
            className="in" 
            onChange={
                    (e) => { 
                        setExpr(e.target.value); 
                        setAns(props.evaluate(e.target.value)); 
                        props.history[props.index] = e.target.value; 
                        props.changeDisp(e);
                    }
            } 
            value={expr}
            onKeyDown={
                    (e) => {
                        if (e.key === "Backspace" && expr.length === 0) {
                            props.del(props.index);
                        }
                    }
            }
            onFocus={props.changeDisp}
        ></input>
      <div className="answer">
        {expr.length > 0 && !expr.match(/^[A-Za-z]+$/) && answer !== undefined && !isNaN(answer)
          ? "= " + answer
          : ""}
      </div>
    </div>
  );
}

export default ExpressionInput;
