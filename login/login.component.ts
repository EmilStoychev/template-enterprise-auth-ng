import { Component } from "@angular/core";
import { Button } from "ui/button";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    public isLoading: Boolean;

    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.isLoading = false;
        this.page.actionBarHidden = true;
    }

    public login() {
        this.isLoading = true;
        if (Kinvey.User.getActiveUser() == null) {
            Kinvey.User.loginWithMIC('http://example.com', Kinvey.AuthorizationGrant.AuthorizationCodeLoginPage, { version: 'v2' })
                .then((user: Kinvey.User) => {
                    this.navigateHome();
                    console.log("user: " + JSON.stringify(user));
                })
                .catch((error: Kinvey.BaseError) => {
                    this.isLoading = false;
                    alert("Error!");
                    console.log("error: " + error);
                });
        } else {
            this.navigateHome();
        }
    }

    public getLoginPageVisibility() {
        return this.isLoading ? 'collapsed' : 'visible';
    }

    private navigateHome() {
        this.zone.run(() => {
            this._routerExtensions.navigate(["home"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }
}
