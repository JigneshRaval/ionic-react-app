import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';
import React, { useEffect } from 'react';
import './Home.css';

import { LeavesSummary } from '../components/Leaves';

const API_URL = 'http://localhost:3001/api';

const HomePage = ({ users, history }: any) => {

    const getRecordById = (recordId: string) => {
        let token = sessionStorage.getItem('userToken');

        return fetch(`${API_URL}/`, {
            method: "GET",
            // credentials: 'include',
            // credentials: 'same-origin',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Error : Access to fetch at 'http://localhost:3001/api/' from origin 'http://localhost:8100' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.
                // 'Authorization': `Bearer ${token}`,
                'token': `${token}`,
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
                console.log('Response : ', response)
                return response.json();
            });
    }

    useEffect(() => {
        let isLoggedIn = sessionStorage.getItem('userToken');
        if (!isLoggedIn) {
            history.push('/login');
        }
        getRecordById('2').then(data => {
            if (data) {
                console.log('data 2 : ', data);
            }
        });
    }, []);

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent class="ion-padding">
                <LeavesSummary users={users} />
            </IonContent>

        </IonPage>
    );
};

export default HomePage;
