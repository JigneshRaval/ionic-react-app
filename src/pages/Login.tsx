import React, { useState, useEffect } from 'react';
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

const API_URL = 'http://localhost:3001/api';

const LoginPage: React.FC = ({ history }: any) => {

    const [error, setError] = useState({ error: false })

    useEffect(() => {
        let isLoggedIn = sessionStorage.getItem('loggedIn');
        console.log('isLoggedIn : ', isLoggedIn);
        if (isLoggedIn) {
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

        fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            mode: 'cors',
            // redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    sessionStorage.removeItem('userToken')
                    return;
                }

                // Examine the text in the response
                return response.json();
            }).then(data => {
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
                <form name="formLogin" id="formLogin" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
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
