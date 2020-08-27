import { Form, Select, Card, Input, Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const tailLayout = {
  wrapperCol: { offset: 7, span: 16 },
};

import { detailData } from './data.d';

export interface FormValueType extends Partial<detailData> {
  name?: string;
  type?: string;
}

interface BlogProps {
  dispatch: Dispatch;
  submitting?: boolean;
}

const Detail: React.FC<BlogProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    name: ''
  });
  const [form] = Form.useForm()
  const { submitting } = props

  const submit = async () => {
    try {
      const fieldsValue = await form.validateFields();
      console.log(submitting)
      const { dispatch } = props;
      dispatch({
        type: 'blog/addBlog',
        payload: { ...fieldsValue },
        callback: (res) => {
          console.log(res)
          if(res.code === 200) {
            message.success(res.message)
          } else {
            message.error(res.message)
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
    // setFormVals({ ...formVals, ...fieldsValue });
  };

  return (
    <PageContainer>
      <Card>
        <Form
          {...formLayout}
          form={form}
          initialValues={{
            name: formVals.name,
            type: formVals.type,
          }}
        >
          <FormItem name="type" label="主题" rules={[
            {
              required: true,
              message: '请选择主题!',
            },
          ]}>
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          </FormItem>
          <FormItem name="name" label="名称" rules={[
            {
              required: true,
              message: '请输入名称!',
            },
          ]}>
            <Input type="text" />
          </FormItem>
          <FormItem name="url" label="链接" rules={[
            {
              required: true,
              message: '请输入链接!',
            },
          ]}>
            <Input type="text" />
          </FormItem>
          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={submit} loading={submitting}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </PageContainer >
  );
};

export default connect(({ blog, loading }: ConnectState) => ({
  blog: blog,
  submitting: loading.effects['blog/addBlog'],
}))(Detail);