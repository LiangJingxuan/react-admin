import React, { Component } from 'react'
import { connect } from 'react-redux'

import ImmuTableTestB from '../ImmuTbaleTestB'
import { add, div } from '../../actions/immutabletest'

class ImmuTableTestA extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.div}>-</button>
                    <ImmuTableTestB />
                <button onClick={this.props.add}>+</button>
            </div>
        )
    }
}
export default connect(null,{add,div})(ImmuTableTestA)
