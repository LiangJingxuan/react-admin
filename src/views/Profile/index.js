import React, { Component } from 'react'
import { Card, Upload, Button, Icon, Spin } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'

import { avatarChange } from '../../actions/login'

class Profile extends Component {
    constructor(){
        super();
        this.state={
            isUploading: false
        }
    }
    // 自定义上传
    handleUploadAvatar = ({file})=>{
        const data = new FormData();
        data.append('Token', '98e6fe5e73d3ed12f04b063e3f25c0d6ab3ec99f:O-xp49Z4V3lVlenPBCcTLjVfBWI=:eyJkZWFkbGluZSI6MTU3NjcyMDI3OCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA2MjEyIiwiYWlkIjoiMTY1Mzc4MCIsImZyb20iOiJmaWxlIn0=');
        data.append('file', file);
        this.setState({
            isUploading: true
        })
        axios.post('http://up.imgapi.com/', data)
            .then(res=>{
                console.log(res)
                if(res.status===200){
                    this.props.avatarChange(res.data.linkurl)
                }
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                this.setState({
                    isUploading: false
                })
            })
    }
    render() {
        return (
            <Card title="个人设置" bordered={false}>
                <Upload
                    showUploadList={false}
                    customRequest={this.handleUploadAvatar}
                >
                    <Spin spinning={this.state.isUploading}>
                        {
                            this.props.avatarUrl 
                            ? 
                            <img src={this.props.avatarUrl} /> 
                            : 
                            <Button>
                                <Icon type="upload" /> 点击上传
                            </Button>
                        }
                    </Spin>
                </Upload>
            </Card>
        )
    }
}
const mapState = state=>({
    avatarUrl: state.user.avatar
})
export default connect(mapState,{avatarChange})(Profile)
