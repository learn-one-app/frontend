import React, { useEffect } from 'react';
import { Field, Form, Input, NumberPicker } from '@alicloud/console-components';
import SlidePanel from '@alicloud/console-components-slide-panel';
import request from '../utils/request';
import { noop } from 'lodash';

interface AddOptions {
  reload?: Function;
  field: Field;
}

interface RecordItem {
  name: string;
  age: number;
  _id: number;
}

function Add(options: AddOptions) {
  const { reload = noop, field } = options;
  const { setValue, getValue, init, validate } = field;
  useEffect(() => {
    if (getValue('isShowing') && getValue('type') === 'edit') {
      const record: RecordItem = getValue('record');
      setValue('name', record.name);
      setValue('age', record.age);
    }
  }, [getValue('type'), getValue('isShowing')]);

  const handleConfirm = () => {
    validate(async (errors, values) => {
      setValue('isProcessing', true);
      const record: RecordItem = getValue('record');
      try {
        await request({
          url: '/api/user',
          method: getValue('type') === 'edit' ? 'put' : 'post',
          data: {
            name: getValue('name'),
            age: getValue('age'),
            id: record?._id,
          },
        });
        setValue('isShowing', false);
        reload();
        setValue('isProcessing', false);
      } catch (error) {
        setValue('isProcessing', false);
      }
    });
  };

  return (
    <SlidePanel
      title={getValue('title')}
      isShowing={getValue('isShowing')}
      width="medium"
      onClose={() => setValue('isShowing', false)}
      onCancel={() => setValue('isShowing', false)}
      onOk={handleConfirm}
      isProcessing={getValue('isProcessing')}
    >
      <Form field={field}>
        <Form.Item label="姓名" required>
          <Input
            {...init('name', {
              rules: {
                required: true,
                message: '请输入姓名',
              },
            })}
          />
        </Form.Item>
        <Form.Item label="年龄" required>
          <NumberPicker
            style={{ width: '100%' }}
            {...init('age', {
              rules: {
                required: true,
                message: '请输入年龄',
              },
            })}
          />
        </Form.Item>
      </Form>
    </SlidePanel>
  );
}

export default Add;
