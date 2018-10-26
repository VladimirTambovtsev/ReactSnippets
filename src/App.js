import React, { Component } from 'react';
import { Element } from 'react-scroll'
import './resources/styles.css'

import Header from './components/header_footer/Header'
import Footer from './components/header_footer/Footer'
import Featured from './components/featured'
import Info from './components/info'
import Pricing from './components/pricing'
import Location from './components/location'
import Highlight from './components/highlight'

class App extends Component {
  render() {
    return (
      <div style={{height: "1500px"}}>
        <Header />
        
        <Element name="time">
        	<Featured />
        </Element>
        
        <Info />

        <Element name="info">
        	<Highlight />
        </Element>

        <Element name="price">
        	<Pricing />
        </Element>

        <Element name="location">
        	<Location />
        </Element>

        <Footer />
      </div>
    );
  }
}

export default App;
