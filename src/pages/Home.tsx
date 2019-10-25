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

const HomePage = ({ users, history }: any) => {

    useEffect(() => {
        let isLoggedIn = sessionStorage.getItem('loggedIn');
        console.log('isLoggedIn 1 : ', typeof isLoggedIn);
        if (isLoggedIn === 'false') {
            history.push('/login');
        }
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
