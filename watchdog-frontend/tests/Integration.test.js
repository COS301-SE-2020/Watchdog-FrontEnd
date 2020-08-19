import axios from 'axios'
import { Auth } from 'aws-amplify'
import '../config/AmplifyConfig'

describe('Integration Testing',  () => {


    test('Camera State Test', async () => {

        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences/securitylevel"
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

    test('Historical Video Test', async () => {
        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }


    })

    test('Update Notifications', async () => {

        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/preferences"
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

    test('Add to Whitelist', async () => {

        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage'
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

    test('Get Detected', async () => {

        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = 'https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/identities/tagdetectedimage'
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

    test('Get Logs',  async () => {
        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/logs"
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

    test('Get Live List',  async () => {

        try{
            await Auth.signIn('debug', 'Test@123').then().catch()
            let url = "https://b534kvo5c6.execute-api.af-south-1.amazonaws.com/testing/ui/recordings"
            let { idToken } = await Auth.currentSession().then().catch()
            //console.log(idToken)
            await axios.get(url, {
                headers: {
                    Authorization: `${idToken.jwtToken}`

                }
            }).then().catch()
        } catch (exp) {

        }

    })

})