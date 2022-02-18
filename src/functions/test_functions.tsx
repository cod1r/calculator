export const evaluate = (expr : string) : number => {
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
        // console.log("Temp: ", temp);
        let trig : string = exp[i-2] + exp[i-1] + exp[i];
        if (i - 2 >= 0 && 
            (
                trig === 'sin' ||
                trig === 'cos' ||
                trig === 'tan'
            )){
            operators.push(trig);
            temp = "";
            continue;
        }
        if (exp[i] === '('){
            operators.push(exp[i]);
            continue;
        }
        if (exp[i] === ')'){
            if (temp.length > 0){
                expression.push(temp);
                temp = "";
            }
            if (operators[operators.length-1] !== '('){
                let counter = 0;
                while (
                        operators.length > 0 && 
                        operators[operators.length-1] !== '('
                    ){
                        if (++counter > 10) throw Error("inf loop");
                        if (
                            operators[operators.length-1] !== 'sin' &&
                            operators[operators.length-1] !== 'cos' &&
                            operators[operators.length-1] !== 'tan'
                        ){
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
                        else {
                            let one : string | undefined = expression.pop();
                            let op : string | undefined = operators.pop();
                            if (one !== undefined && op !== undefined){
                                expression.push(one + " " + op);
                            }
                        }
                    }
            }
            else {
                let t : string | undefined = expression.pop();
                if (t !== undefined){
                    temp = t;
                }
            }
            // if statement is here for when the first if that checks if the top operator is not an opening parentheses
            if (operators[operators.length-1] === '('){
                operators.pop();
            }
            // console.log("after: expression", expression, "operators", operators);
            continue;
        }
        if (exp[i] === '*' || exp[i] === '/' || exp[i] === '+' || (exp[i] === '-' && (temp.length > 0 || exp[i-1] === ')')) || exp[i] === '^'){
            // console.log("operator", exp[i]);
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
                if (operators.length > 0 && operators[operators.length-1] === 'sin'){
                    // trig functions only need one value
                    let one : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined &&op !== undefined){
                        expression.push(one + " " + op);
                    }
                }
                if (operators.length > 0 && operators[operators.length-1] === 'cos'){
                    // trig functions only need one value
                    let one : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined &&op !== undefined){
                        expression.push(one + " " + op);
                    }
                }
                if (operators.length > 0 && operators[operators.length-1] === 'tan'){
                    // trig functions only need one value
                    let one : string | undefined = expression.pop();
                    let op : string | undefined = operators.pop();
                    if (one !== undefined &&op !== undefined){
                        expression.push(one + " " + op);
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
        // console.log("done loop: ", temp);
        expression.push(temp);
    }
    //console.log("before while: " , expression, operators);
    let counter = 0;
    while (operators.length > 0 && expression.length >= 0){
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
        if (operators.length > 0 && operators[operators.length-1] === 'sin'){
            // trig functions only need one value
            let one : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined &&op !== undefined){
                expression.push(one + " " + op);
            }
        }
        if (operators.length > 0 && operators[operators.length-1] === 'cos'){
            // trig functions only need one value
            let one : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined &&op !== undefined){
                expression.push(one + " " + op);
            }
        }
        if (operators.length > 0 && operators[operators.length-1] === 'tan'){
            // trig functions only need one value
            let one : string | undefined = expression.pop();
            let op : string | undefined = operators.pop();
            if (one !== undefined &&op !== undefined){
                expression.push(one + " " + op);
            }
        }
    }
    // ---------------------------------------------------------------------------------------------------------------- END OF POSTFIX CONVERSION
    // after here, just need the postfix expression
    //console.log("after while: ", expression, operators);
    let postfix: string | undefined = expression.pop();
    let values: Array<number> = [], tmp: string = "";
    // console.log("postfix:", postfix);
    if (postfix !== undefined) {
        for (let i = 0; i < postfix.length; i++) {
            // console.log("values: ", values, postfix[i], tmp.length > 0, isNaN(parseInt(postfix[i+1])), i+1===postfix.length, tmp.charCodeAt(0), tmp.length);
            if (postfix[i] === " ") {
                // console.log("pushin:", tmp);
                if (tmp.length > 0){
                    values.push(parseFloat(tmp));
                    tmp = "";
                }
            } else {
                tmp += postfix[i];
            }
            if (values.length > 0 && 
                (
                    postfix[i] === "+" || 
                    (
                        postfix[i] === "-" && 
                        (
                            isNaN(parseInt(postfix[i+1])) || 
                            i + 1 === postfix.length
                        )
                    ) || 
                    postfix[i] === "*" || 
                    postfix[i] === "/" || 
                    postfix[i] === '^' ||
                    (
                        tmp === 'sin' ||
                        tmp === 'cos' ||
                        tmp === 'tan'
                    )
                )
                ) {
                
                if (tmp !== 'sin' && tmp !== 'cos' && tmp !== 'tan'){
                    // console.log("tmp:", tmp);
                    if (tmp.length > 0 && !isNaN(parseFloat(tmp))) {
                        values.push(parseFloat(tmp));
                        tmp = "";
                    }
                    // console.log("values before:", values);
                    let v1: number | undefined = values.pop();
                    let v2: number | undefined = values.pop();
                    // console.log("inside", v1, v2, postfix[i], parseInt(postfix[i+1]), postfix[i+1], isNaN(parseInt(postfix[i+1])), i + 1 === postfix.length);
                    if (v1 !== undefined && v2 !== undefined) {
                        // console.log("v1:", v1, "v2:", v2, "op:", postfix[i]);
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
                    // console.log("values after:", values);
                }
                else {
                    let v1 : number | undefined = values.pop();
                    if (v1 !== undefined){
                        switch(tmp){
                            case 'sin': values.push(Math.sin(v1)); break;
                            case 'cos': values.push(Math.cos(v1)); break;
                            case 'tan': values.push(Math.tan(v1)); break;
                            default: break;
                        }
                    }
                    tmp = "";
                }
            }
        }
    }
    // console.log("values", values);
    if (values.length === 0 && postfix !== undefined){
        values.push(parseFloat(postfix));
    }
    return values[0];
  };
