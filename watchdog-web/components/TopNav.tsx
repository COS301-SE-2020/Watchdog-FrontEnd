import React, { Component } from 'react';
import { propsTopNav, stateTopNav } from '../interfaces'
import { Menubar } from 'primereact/menubar'


class TopNav extends Component<propsTopNav, stateTopNav> {
    constructor(props: propsTopNav) {
        super(props)

        this.state = {
            opacity: 1
        }
    }
    render() {
        const items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                command : ()=>{this.props.changeScreen(1)}
            },
            {
                label: 'Recordings',
                icon: 'pi pi-fw pi-camera',
                command : ()=>{this.props.changeScreen(2)}
            },
            {
                label: 'System Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Identity Settings',
                        icon: 'pi pi-fw pi-users',
                        command : ()=>this.props.toggle_identites(true)

                    },
                    {
                        label: 'Detected Images',
                        icon: 'pi pi-fw pi-exclamation-triangle',
                        command : ()=>this.props.toggle_detected_images(true)

                    },
                    {
                        label: 'Notification Settings',
                        icon: 'pi pi-fw pi-bell',
                        command : ()=> this.props.toggle_notifications_modal(true)

                    },
                    {
                        separator:true
                     },
                    {
                        label: 'Logs',
                        icon: 'pi pi-fw pi-info-circle',

                    },
                    {
                        label: 'Downloads',
                        icon: 'pi pi-fw pi-download',

                    }
                ]
            },
            {
                label: 'Account Settings',
                icon: 'pi pi-fw pi-user-edit',
                items: [
                    {
                        label: 'Account Information',
                        icon: 'pi pi-fw pi-user',

                    },
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-key',
                        command : () => this.props.toggle_password_modal(true)

                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        command : ()=> this.props.toggle_logout_modal(true)

                    }
                ]
            }
        ]
        const logo = <img alt="logo" src="logo1.png" height="40" className="p-mr-2"></img>
        return (
            <div style={{padding: 0}}>
                <Menubar style={{borderRadius: 0, border: 0, margin: 0}} className="p-shadow-4" model={items} start={logo}>
                    
                </Menubar>
            </div>
        );
    }
}

export default TopNav;