import React, { Component } from 'react';
import { propsTopNav, stateTopNav } from '../interfaces'
import { Menubar } from 'primereact/menubar'


class TopNav extends Component<propsTopNav, stateTopNav> {
    constructor(props: propsTopNav) {
        super(props)
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

                    },
                    {
                        label: 'Detected Images',
                        icon: 'pi pi-fw pi-exclamation-triangle',

                    },
                    {
                        label: 'Notification Settings',
                        icon: 'pi pi-fw pi-bell',

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
                        label: 'Password Settings',
                        icon: 'pi pi-fw pi-key',

                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',

                    }
                ]
            }
        ]
        const logo = <img alt="logo" src="logo1.png" height="40" className="p-mr-2"></img>
        return (

            <div>
                <Menubar model={items} start={logo}>
                    
                </Menubar>
            </div>
        );
    }
}

export default TopNav;