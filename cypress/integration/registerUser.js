describe("Register new user", () => {

    beforeEach(() => {
        cy.visit("/");
        cy.get("a").contains("Registrera").click();
    });

    it("Can register successfully with valid data", () => {
        cy.get("input[name='username']").type(randomChars(10));
        cy.get("input[name='email']").type(`${randomChars(10)}@domain.com`);
        cy.get("input[name='password']").type(somePassword);
        cy.get("input[name='passwordConfirm']").type(somePassword);
        cy.get("input[value='Register']").click();
        cy.get("marquee").end();
    });

    it("Can't register with a short username", () => {
        cy.get("input[name='username']").type(randomChars(2));
        cy.get("input[name='email']").type(`${randomChars(10)}@domain.com`);
        cy.get("input[name='password']").type(somePassword);
        cy.get("input[name='passwordConfirm']").type(somePassword);
        cy.get("input[value='Register']").click();
        cy.contains("För kort").end();
    });

    it("Can't register with a long username", () => {
        cy.get("input[name='username']").type(randomChars(10)+randomChars(5));
        cy.get("input[name='email']").type(`${randomChars(10)}@domain.com`);
        cy.get("input[name='password']").type(somePassword);
        cy.get("input[name='passwordConfirm']").type(somePassword);
        cy.get("input[value='Register']").click();
        cy.contains("För kort").end();
    });

    it("Can't register with an invalid email adress", () => {
        cy.get("input[name='username']").type(randomChars(10));
        cy.get("input[name='email']").type(`${randomChars(10)}@`);
        cy.get("input[name='password']").type(somePassword);
        cy.get("input[name='passwordConfirm']").type(somePassword);
        cy.get("input[value='Register']").click();
        cy.contains("Felformatterad").end();        
    });

    it("Can't register if passwords don't match", () => {
        cy.get("input[name='username']").type(randomChars(10));
        cy.get("input[name='email']").type(`${randomChars(10)}@domain.com`);
        cy.get("input[name='password']").type(somePassword);
        cy.get("input[name='passwordConfirm']").type(randomChars(10));
        cy.get("input[value='Register']").click();
        cy.contains("Lösenorden överensstämmer inte!").end();
    });

});

function randomChars(length) {
    return Math.random().toString(36).substring(2, length + 2);
};
const somePassword = randomChars(10);