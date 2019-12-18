import React, { Component } from 'react'
import { Form, Input, Icon, Checkbox, Button, Card } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { loginAction } from '../../actions/login'
import './login.less'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log(values)
            this.props.loginAction(values)
          }
        });
      };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin
            ?
            <Redirect to='/admin' />
            :            
            <Card title="ts-admin" bordered={false} className="ts-form-card">
                <Form 
                    className="login-form"    
                    onSubmit={this.handleSubmit} 
                    wrapperCol={{
                        span: 12,
                        offset: 6
                    }}
                >
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isLoading}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
const mapState= state=>({
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading
})
export default connect(mapState,{ loginAction })(Form.create()(Login))
