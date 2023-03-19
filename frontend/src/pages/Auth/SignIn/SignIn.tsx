import { authService } from '../../../services';

import style from './SignIn.module.css';


const SignIn = () => {

    const onClick = () => {
        authService.signIn('test@test.com', '15')
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
        // authService.signIn('email', 'password')
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(e => console.log(e));
    };

    const onClick1 = () => {
        authService.signUp({name: "Жопа", email: 'email', password: 'password'})
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
    };

    const onClick2 = () => {
        authService.test({username: "username", email: 'email', password: 'password', role: "ROLE_GUEST"})
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
    };


    const onClick3 = () => {
        authService.me()
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e));
    };

    return (
        <>
            <div>SignIn</div>
            <button onClick={onClick}>Make Request</button>
            <button onClick={onClick1}>Make Request</button>
            <button onClick={onClick2}>Make Request Test</button>
            <button onClick={onClick3}>Me</button>
        </>
    )
};

export default SignIn;
