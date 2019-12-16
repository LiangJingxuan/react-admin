import React, { Component, createRef } from 'react'
import { Card, Button, Form, Input, DatePicker, Spin, message } from 'antd'
import E from 'wangeditor'
import moment from 'moment'

import { getArticlesById, editArticlesById } from '../../requests'
import './edit.less'

class NewsEdit extends Component {
    constructor(){
        super();
        this.state = {
            userStatus: '',
            userHellp: '',
            isLoading: false
        }
        this.refEdit = createRef();
    }
    handleSubmit = (e)=>{
        console.log(e)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    isLoading: true
                })
                // console.log('Received values of form: ', values);
                console.log(values.addtime.valueOf())

                const data = Object.assign({}, values, {addtime: values.addtime.valueOf()})

                editArticlesById(this.props.match.params.id, data)
                    .then(res=>{
                        console.log(res);
                        message.success(res.msg);
                        // 跳转
                        // this.props.history.push('/admin/newslist')
                        this.props.history.goBack()
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    .finally(()=>{
                        this.setState({
                            isLoading: false
                        })
                    })
            }
        });
    }
    initEditor = ()=>{
        this.editor = new E(this.refEdit.current);
        this.editor.customConfig.onchange = (html)=>{
            this.props.form.setFieldsValue({
                content: html
            })
        }
        this.editor.create();
    }
    componentDidMount(){
        // 富文本
        this.initEditor();
        // 查询公告详情
        this.setState({
            isLoading: true
        })
        getArticlesById(this.props.match.params.id)
            .then(res=>{
                // console.log(res);
                this.props.form.setFieldsValue({
                    title: res.title,
                    author: res.author,
                    amount: res.amount,
                    content: res.content,
                    addtime: moment(res.addtime)
                });
                this.editor.txt.html(res.content);
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="编辑" bordered={false} extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
                <Spin spinning={this.state.isLoading}>
                    <Form 
                        labelCol={{
                            span: 2
                        }}
                        wrapperCol={{
                            span: 22
                        }}
                        onSubmit={this.handleSubmit} 
                        className="login-form"
                    >
                        <Form.Item 
                            label='标题:'
                            validateStatus={this.state.userStatus} 
                            help={this.state.userHellp}
                        >
                            {getFieldDecorator('title', {
                                rules: [
                                    { required: true, message: '请输入标题!' },
                                    // { min: 4, message: '最少4个字符!' },
                                    // {
                                    //     validator: (rule, value, callback)=>{
                                    //         console.log({rule, value, callback})
                                    //         if(value !=='1234'){
                                    //             this.setState({
                                    //                 userStatus: 'error',
                                    //                 userHellp: '请输入规定字符!'
                                    //             })
                                    //         }else{
                                    //             this.setState({
                                    //                 userStatus: '',
                                    //                 userHellp: ''
                                    //             })
                                    //         }
                                    //         callback()
                                    //     }
                                    // }
                                ],
                                initialValue: ''
                            })(
                                <Input placeholder="标题" />,
                            )}
                        </Form.Item>
                        <Form.Item label='作者:' >
                            {getFieldDecorator('author', {
                                rules: [
                                    { required: true, message: '请输入作者!' },
                                ],
                            })(
                                <Input placeholder="作者" />,
                            )}
                        </Form.Item>
                        <Form.Item label='阅读量:' >
                            {getFieldDecorator('amount', {
                                rules: [
                                    { required: true, message: '请输入阅读量!' },
                                ],
                            })(
                                <Input placeholder="阅读量" />,
                            )}
                        </Form.Item>
                        <Form.Item label='内容:' >
                            {getFieldDecorator('content', {
                                rules: [
                                    { required: true, message: '请输入内容!' },
                                ],
                            })(
                                <div ref={this.refEdit} className="ts-editor" />
                            )}
                        </Form.Item>
                        <Form.Item label='创建时间:' >
                            {getFieldDecorator('addtime', {
                                rules: [
                                    { required: true, message: '请选择创建时间!' },
                                ],
                            })(
                                <DatePicker showTime placeholder="请选择创建时间" />
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
                            <Button type="primary" htmlType="submit">
                                修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        )
    }
    
}
export default Form.create()(NewsEdit)