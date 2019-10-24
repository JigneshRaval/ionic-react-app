import React from 'react';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton
} from '@ionic/react';

const Tab2: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab Two</IonTitle>
                    <IonMenuButton slot="start" />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem routerLink="/tab2/details">
                        <IonLabel>
                            <h2>Go to detail</h2>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
