import React, { useRef } from 'react';
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonButton,
    IonIcon,
    IonMenuButton
} from '@ionic/react';
import { home, person, chatbubbles, settings } from 'ionicons/icons';

export const MenuExample = (props: any) => {

    const menuRef = useRef<any>(null);

    const openMenu = () => {
        if (menuRef && menuRef.current) {
            // menuRef.current.open();
            menuRef.current.toggle();
        }
    }

    return (
        <React.Fragment>
            <IonMenu type="push" side="start" menuId="first" contentId="myMenuOutlet" ref={menuRef}>
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

            <IonHeader>
                <IonToolbar>
                    <IonMenuButton slot="start"></IonMenuButton>
                    <IonTitle>My Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton expand="block" onClick={() => openMenu()}>Open Menu</IonButton>
            </IonContent>

        </React.Fragment>
    );
};
