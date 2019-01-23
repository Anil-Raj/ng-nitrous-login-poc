import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { environment } from '../../../environments/environment';

@Injectable()
export class MSALService {
    // private applicationConfig: any = {
    //     clientID: 'df7cc9df-8073-4017-a108-390c4ca170f0',
    //     graphScopes: ['user.read']
    // };

    private applicationConfig: any = {
        // clientID: 'ddc68d0a-7f70-4233-b295-5e676fa403e2',
        // authority: 'https://login.microsoftonline.com/tfp/demob2ccompany.onmicrosoft.com/B2C_1_Signup1',
        // b2cScopes: ['https://demob2ccompany.onmicrosoft.com/user.read'],
        // redirectUrl: 'http://localhost:4200',
        // extraQueryParameter: 'p=B2C_1_signin&scope=openid&nux=1'

        clientID: '3527c3fd-ae76-4ff7-bd1f-27da69f11bb9', //This is your client ID
        defaultAuthority: "https://login.microsoftonline.com/common",  //Default authority value is https://login.microsoftonline.com/common
        b2cScopes: ["user.read"],
        authority: "https://login.microsoftonline.com/tfp/neutimu.onmicrosoft.com/B2C_1_gmailsignin",
        signUpAuthority: "https://login.microsoftonline.com/tfp/neutimu.onmicrosoft.com/B2C_1_signupsignin2",

        redirectUrl: 'http://localhost:30662'
        
    };

    private app: any;
    public user: any;
    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        // this.app.redirectUri=this.applicationConfig.redirectUrl;
    }
    public login() {
        let tokenData = '';
        this.app.loginRedirect(["profile"]).then(data => { tokenData = data; });
    }
    public adlogin() {
        let tokenData = '';
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.defaultAuthority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => { tokenData = data; });
    }
    public signUpSignIn() {
        let tokenData = '';
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.signUpAuthority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => { tokenData = data; });
    }

    public getUser() {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.b2cScopes)
            .then(accessToken => {
                // console.log(accessToken);
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.b2cScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        //  console.error(err);
                    });
            });
    }
}
