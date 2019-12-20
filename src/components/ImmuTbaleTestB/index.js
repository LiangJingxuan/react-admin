import React, { Component } from 'react'
import { connect } from 'react-redux'

class ImmuTableTestB extends Component {
    render() {
        return (
            <div>
                <span>{this.props.num}</span>
            </div>
        )
    }
}
const mapState = state=>({
    num: state.immu.num 
    // num: state.getIn(['immu','num']) // immutable练习
})
export default connect(mapState)(ImmuTableTestB)
