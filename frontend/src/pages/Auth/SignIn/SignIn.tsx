import { authService } from '../../../services';

import style from './SignIn.module.css';


const SignIn = () => {

    const onClick = () => {
        authService.signIn()
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
    }

    return (
        <>
            <div>SignIn</div>
            <button onClick={onClick}>Make Request</button>
        </>
    )
};

export default SignIn;
