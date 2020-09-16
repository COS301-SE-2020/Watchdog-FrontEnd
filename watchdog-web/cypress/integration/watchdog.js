const { createPublicKey } = require("crypto")

describe('Accessing Watchdog System test', function(){
    it('Visits the Deployed Watchdog System', function(){
        cy.visit('https://lynksolutions.watchdog.thematthew.me')
    })
    it('Visits the About us Page', function(){
        cy.contains('About us').click()
    })
})
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
        // cy.wait(2000
    })
 })
 describe('Recordings',function(){
     it('Plays a Recorded video',function(){
         cy.contains('Recordings').click()
        //  cy.wait(3000)
         cy.contains('12:55:18').click()
     })
 })
 describe('Profile',function(){
    it('Tests Profile Page visit',function(){
        cy.contains('Profiles').click()
        
        cy.contains('Dashboard').click()
        cy.wait(3000)
    })
})

describe('Notifications',function(){
    it('Opens Notification Modal',function(){
        cy.contains('System Settings').click()
        cy.contains('Notification Settings').click()
    })
    it('Update from Email to SMS',function(){
        
        cy.get('.p-dropdown').click()
        cy.contains('SMS').click()
        
    })
    it('Close notification Modal',function(){
        cy.contains('Close').click()
        cy.wait(2000)
        cy.contains('Dashboard').click({force: true})
    })
})

describe('Log out',function(){
    it('Tests to Log out sucessfully',function(){
        cy.contains('Account Settings').click({force: true})
        cy.contains('Logout').click({force: true})
        cy.contains('YES').click()
    })
})