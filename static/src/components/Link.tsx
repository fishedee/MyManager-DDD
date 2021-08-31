import React from 'react';
import { observer, useField } from '@formily/react';
import { useHistory } from 'umi';
import { Popconfirm } from 'antd';

type LinkProps = {
    to?: string;
    onClick?: () => void;
    danger?: boolean;
    dangerTitle?: string;
};

const MyLink: React.FC<LinkProps> = observer((props) => {
    const field = useField();
    const history = useHistory();
    let onClick = props.onClick
        ? props.onClick
        : () => {
              history.push(props.to!);
          };
    if (props.danger === true) {
        return (
            <Popconfirm title={props.dangerTitle} onConfirm={onClick}>
                <a style={{ color: 'red' }}>{field.title}</a>
            </Popconfirm>
        );
    } else {
        return <a onClick={onClick}>{field.title}</a>;
    }
});

export default MyLink;
