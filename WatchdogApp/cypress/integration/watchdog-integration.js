describe('Signing in to the watchdog system',function(){
    it('Visit Web App Sign in page', function(){
        cy.visit('https://app.watchdog.thematthew.me')
        cy.clearLocalStorage()
        cy.wait(3000)
        
        
        
    })
    it('Type in correct credentials',function(){
        cy.get('.p-username').type('Test')
        cy.get('.p-password').type('Test@123')
    })
    it('Submits Credentials', function(){
        cy.contains('Login').click()
        cy.wait(2000)
    })
 })
describe('Integration Testing',function(){
    it('Tests the call to Recordings Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to Control Panel Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/controlpanel',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to Detect Inruder Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/detectintruder',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to Logs Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/logs',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to System State Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to Preferences Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
    it('Tests the call to Detected Images Endpoint', function(){
        cy.request(
            {
                url: 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage',
                headers : {
                    Authorization: Cypress.config('jwtToken')
                }
            }
        ).then((response) => {
            expect(response.body).to.have.property('status', 'OK')
        })
    })
})