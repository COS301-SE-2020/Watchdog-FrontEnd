import React, { Component } from 'react';
import { propsTopNav, stateTopNav } from '../interfaces'
import { Menubar } from 'primereact/menubar'
import AccountInformationModal from './AccountInformationModal'

class TopNav extends Component<propsTopNav, stateTopNav> {
    constructor(props: propsTopNav) {
        super(props)

        this.state = {
            opacity: 1,
            account_info : false
        }

        this.toggleAccount = this.toggleAccount.bind(this)
    }

    toggleAccount(val){
        this.setState({account_info : val})
    }
    render() {
        const items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                command: () => { this.props.changeScreen(1) }
            },
            {
                label: 'Recordings',
                icon: 'pi pi-fw pi-camera',
                command: () => { this.props.changeScreen(2) }
            },
            {
                label: 'Profiles',
                icon: 'pi pi-fw pi-users',
                command: () => { this.props.changeScreen(3) }
            },
            {
                label: 'System Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    // {
                    //     label: 'Identity Settings',
                    //     icon: 'pi pi-fw pi-users',
                    //     command : ()=>this.props.toggle_identites(true)

                    // },
                    {
                        label: 'Detected Images',
                        icon: 'pi pi-fw pi-exclamation-triangle',
                        command: () => this.props.toggle_detected_images(true)

                    },
                    {
                        label: 'Notification Settings',
                        icon: 'pi pi-fw pi-bell',
                        command: () => this.props.toggle_notifications_modal(true)

                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Downloads',
                        icon: 'pi pi-fw pi-download',
                        items: [
                            {
                                label: 'Windows HCP',
                                icon: 'pi pi-fw pi-microsoft', 
                                command : ()=> this.props.download_win()
                            }, 

                            {
                                label: 'MacOS HCP',
                                icon: 'pi pi-fw pi-apple'
                            },

                            {
                                label: 'Linux HCP',
                                icon: 'pi pi-fw pi-download',
                                command : ()=> this.props.download_linux()
                            },

                            
                        ]
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
                        command: () => this.toggleAccount(true)

                    },
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-key',
                        command: () => this.props.toggle_password_modal(true)

                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        command: () => this.props.toggle_logout_modal(true)

                    }
                ]
            }
        ]
        const logo = <img alt="logo" src="logo1.png" height="40" className="p-mr-2"></img>
        return (
            <div style={{ padding: 0 }}>
                 <AccountInformationModal show_modal={this.state.account_info} hide_modal={this.toggleAccount} />
                <Menubar style={{ borderRadius: 0, border: 0, margin: 0, zIndex: 1000 }} elevation={5} className="p-shadow-8" model={items} start={logo}>
                    <a href='www.google.com'  ref={(el) => this.windows = el}  ></a>
                   
                </Menubar>
            </div>
        );
    }
}

export default TopNav;