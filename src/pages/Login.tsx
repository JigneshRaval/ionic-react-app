import React, { useState, useEffect, useRef } from 'react';
import {
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from '@ionic/react';
import { IUrlOptions } from '../models/rest-api.model';
import { RemoteService } from '../services/remote.service';

const LoginPage: React.FC = ({ history }: any) => {
    const remoteService = new RemoteService();
    const [error, setError] = useState({ error: false });
    const loginForm = useRef<HTMLFormElement>(null)

    useEffect(() => {
        let token = sessionStorage.getItem('userToken');
        console.log('loginForm :', loginForm);
        if (loginForm && loginForm.current) {
            loginForm.current.reset();
        }
        if (token) {
            history.push('/home');
        } else {
            history.push('/login');
        }
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Syntax : var formData = new FormData(form)
        // Ref : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
        const form = event.target.closest('form');
        const formData = new FormData(form);

        const formDataObj = {
            username: formData.get('txtUsername'),
            password: formData.get('txtPassword')
        };

        const options: IUrlOptions = {
            endPoint: `login`,
            restOfUrl: '',
            isSecure: true,
            contentType: 'application/json'
        };

        remoteService.request('POST', options, formDataObj).then((data) => {
            if (data) {
                sessionStorage.setItem('userToken', data.token);
                history.push('/home');
            }
        });

    }

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <form ref={loginForm} name="formLogin" id="formLogin" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput placeholder="Username" type="text" name="txtUsername" id="txtUsername"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput placeholder="Username" type="text" name="txtPassword" id="txtPassword"></IonInput>
                    </IonItem>
                    <div className="button-wrapper">
                        <IonButton type="submit">Login</IonButton>
                    </div>
                </form>
            </IonContent>

        </IonPage>
    );
};

// export default Details;
export default LoginPage;
