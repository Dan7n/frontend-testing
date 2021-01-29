describe ('Login from', ()=>{

    
    it('When one can sign in with right credentials', ()=>{
        cy.visit('/');
        cy.get('form');
        cy.get('input[name="username"]').type('CoolUser').should('have.value', 'CoolUser');
        cy.get('input[name="password"]').type('123123123').should('have.value', '123123123');
        cy.get('form').submit();
        cy.url().should('include', 'start').end(); // The test will end when the user successfully logs in and gets routet to another link/site that contains something with start.
    })

    it('Imposter logs in with both a fake username and password', ()=>{
        cy.visit('/');
        cy.get('form');
        cy.get('input[name="username"]').type('IamAnImposter');
        cy.get('input[name="password"]').type('myfakepassword');
        cy.get('form').submit();
        cy.contains('Coola communityt!') & cy.get('h2[id="errorMessage"]').contains('Fel').end(); // Thought it would be fun to combine different elements and so i did. 
    })

    it('Imposter logs in with fake username and correct password', ()=>{
        cy.visit('/');
        cy.get('form');
        cy.get('input[name="username"]').type('IamAnImposter');
        cy.get('input[name="password"]').type('123123123').should('have.value', '123123123');
        cy.get('form').submit();
        cy.contains('Coola communityt!') & cy.get('h2[id="errorMessage"]').contains('Fel').end();
    })
    it('Imposter logs in with right username and false password', ()=>{
        cy.visit('/');
        cy.get('form');
        cy.get('input[name="username"]').type('CoolUser').should('have.value', 'CoolUser');
        cy.get('input[name="password"]').type('myfakepassword');
        cy.get('form').submit();
        cy.contains('Coola communityt!') & cy.get('h2[id="errorMessage"]').contains('Fel').end();
    })
})