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
        userPoolId: 'eu-west-1_mQ0D78123',
  
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'lcrgnjetqoieui4dmg7m5h8t4',
  
        
        
    }
  });