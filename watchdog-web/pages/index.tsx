import Link from 'next/link'
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {indexProps, indexState} from '../interfaces/index'

import React, { Component } from 'react';

class index extends Component<indexProps, indexState> {
  constructor(props: indexProps){
    super(props)
  }
  render() {
    return (
      <div >
        <h1>Hello Next.js 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
      </div>
    )
  }
}
export default index
