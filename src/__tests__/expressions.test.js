const { evaluate } = require('../functions/test_functions');

test("adds -3 and -3", ()=>{
    expect(evaluate("-3+-3")).toBe(-6);
});

test("3 to the power of 2", ()=>{
    expect(evaluate("3^2")).toBe(9);
});

test("3^(3/3)", ()=>{
    expect(evaluate("3^(3/3)")).toBe(3);
});

test("-3*-3", ()=>{
    expect(evaluate("-3*-3")).toBe(9);
});

test("(4)", ()=>{
    expect(evaluate("(4)")).toBe(4);
});

test("(4)+(1^3+4)", ()=>{
    expect(evaluate("(4)+(1^3+4)")).toBe(9);
});

test("4-4-4+4", ()=>{
    expect(evaluate("4-4-4+4")).toBe(0);
});

test("3^(-3)", ()=>{
    expect(evaluate("3^(-3)")).toBe(1/27);
});

test("3^10", ()=>{
    expect(evaluate("3^10")).toBe(59049);
});