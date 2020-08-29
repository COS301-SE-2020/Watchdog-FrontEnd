import React, { Component } from 'react'
import {propsIdentities, stateIdentities} from '../interfaces'
const test_users = [
    {
        id: 1,
        name: "Luqmaan Badat",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    },
    {
        id: 2,
        name: "Some Name 2",
        img: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
    }
]

class Identities extends Component <propsIdentities, stateIdentities> {
    constructor(props : propsIdentities){
        super(props)
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Identities;