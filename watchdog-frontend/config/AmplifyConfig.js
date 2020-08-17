import Amplify from 'aws-amplify'

Amplify.configure({
    Auth: {
  
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
  
        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1',
  
        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'eu-west-1',
  
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_cp2XrEqt0',
  
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '2v5galoruclkp5retd37so0dmu',
  
        
        
    }
  });