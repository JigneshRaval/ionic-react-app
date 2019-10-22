import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';
import React from 'react';
import './Tab1.css';

import { CardExample } from '../components/CardComponent';
import { MenuExample } from '../components/MenuExample';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>Tab One</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CardExample />

                <MenuExample />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
