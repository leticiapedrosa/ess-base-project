const { Given, When, Then, And } = require("cypress-cucumber-preprocessor");

Given("o usuário está na página de recuperação", () => {
cy.visit("/recovery");
});
When("o usuário digita seu e-mail", () => {
cy.get("#email").type("sherlockoliveira@gmail.com");
});
And("clica no botão \"Login\"", () => {
cy.get("#submitButton").click();
});
Then("o usuário é direcionado para a página de alteração de senha", () => {
cy.url().should("include", "/changepass");
cy.get("#successMessage").should("exist");
});