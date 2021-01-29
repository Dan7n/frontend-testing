+
describe("Logged-in user sub-pages", () => {

    beforeEach(() => {
        cy.visit("/start.html")
        cy.get("li").should(($li) => expect($li).to.have.length(3))
    });

    it("Can log in", () => {
        cy.get("ul li:contains('Gästbok')").click();
        cy.url().should("include", "/guestbook.html");
        cy.get("textarea").type(someString);
        cy.get("input[type='submit']").click();
        cy.get("div#entries > p").should("to.contain", someString).end()
    });

    it("Can remove posts from guest book and go back to start.html", () => {
        cy.get("ul li:contains('Gästbok')").click();
        cy.get("textarea").type(someString);
        cy.get("input[type='submit']").click();
        cy.get("div#entries > p").should("to.contain", someString);
        cy.get("a").contains("Ta bort").click();
        cy.get("div#entries").should("not.contain", someString);
        cy.get("a[href='start.html']").click();
        cy.url().should("include", "start.html").end()
    });

    it("Can't post with an empty textarea", () => {
        cy.get("ul li:contains('Gästbok')").click();
        cy.get("textarea").invoke("val", "");
        cy.get("input[type='submit']").click();
        cy.get("form").should("contain", "För kort").end();
    })

    it("Can view presentation sub-page and return to start.html", () => {
        cy.get("ul li:contains('Presentation')").click();
        cy.get("center").contains("Välkommen till min sida")
        cy.get("a[href='start.html']").click();
        cy.url().should("include", "start.html").end()
    })

    it ("Can log out", () => {
        cy.get("ul li:contains('Logga ut')").click();
        cy.url().should("eq", Cypress.config().baseUrl).end();
    })
})


let someString; //will be re-defined as a random string later
function randomChars(length) {
    someString = Math.random().toString(36).substring(2, length + 2);
}; randomChars(10)