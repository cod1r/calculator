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

test("3333333333333", ()=>{
    expect(evaluate("3333333333333")).toBe(3333333333333);
});

test("9007199254740992", ()=>{
    expect(evaluate("9007199254740992")).toBe(9007199254740992);
});

test("2^53", ()=>{
    expect(evaluate("9007199254740992")).toBe(9007199254740992);
});

test("1-(-1)-(-1)", ()=>{
    expect(evaluate("1-(-1)-(-1)")).toBe(3);
});

test("1-(-1)", ()=>{
    expect(evaluate("1-(-1)")).toBe(2);
});

test("-2+(-1)", ()=>{
    expect(evaluate("-2+(-1)")).toBe(-3);
});

test("(1)+(1)", ()=>{
    expect(evaluate("(1)+(1)")).toBe(2);
});

test("sin(4)", ()=>{
    expect(evaluate("sin(4)")).toBe(Math.sin(4));
});

test("cos(4)", ()=>{
    expect(evaluate("cos(4)")).toBe(Math.cos(4));
});

test("tan(4)", ()=>{
    expect(evaluate("tan(4)")).toBe(Math.tan(4));
});

test("1+tan(4)", ()=>{
    expect(evaluate("1+tan(4)")).toBe(1+Math.tan(4));
});

test("(tan(4))^2", ()=>{
    expect(evaluate("(tan(4))^2")).toBe(Math.pow(Math.tan(4), 2));
});

test("30(30)", () => {
    expect(evaluate("30(30)")).toBe(30*30);
})
