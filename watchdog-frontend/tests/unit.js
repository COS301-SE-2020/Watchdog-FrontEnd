import { describe } from 'riteway'
import render from 'riteway/render-component'
import React from 'react'

import Loading from '../components/Loading'

describe('Loading Component', async assert => {
    const userName = 'Spiderman';
    const $ = render(<Loading />);  
    console.log("hello")
  });