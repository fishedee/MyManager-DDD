import DefaultLayout from './default';
import { useModel, history, Redirect } from 'umi';

export default (props) => {
    const { login, checkLogin } = useModel('login');
    if (history.location.pathname == '/login') {
        return <>{props.children}</>;
    } else if (!login) {
        return <Redirect to="/login" />;
    } else {
        return <DefaultLayout {...props} />;
    }
};
