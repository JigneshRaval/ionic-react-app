
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenu,
    IonList,
    IonItem,
    IonIcon,
    IonRouterOutlet
} from '@ionic/react';
import { home, person, chatbubbles, settings } from 'ionicons/icons';
import React from 'react';

export const MainMenu = () => {
    return (
        <React.Fragment>
            <IonMenu type="reveal" side="start" menuId="first" contentId="myMenuOutlet">
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>My Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem routerLink="/tab2">
                            <IonIcon icon={home} slot="start" />
                            Home
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={person} slot="start" />
                            Profile
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={chatbubbles} slot="start" />
                            Messages
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={settings} slot="start" />
                            Settings
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonRouterOutlet id="myMenuOutlet"></IonRouterOutlet>
        </React.Fragment>
    )
}
