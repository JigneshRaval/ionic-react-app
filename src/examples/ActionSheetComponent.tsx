import React, { useState } from 'react';
import {
    IonActionSheet,
    IonButton,
    IonModal,
    IonAlert
} from '@ionic/react';

export const ActionSheetExample: React.FC = () => {

    const [showActionSheet, setShowActionSheet] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [showAlert1, setShowAlert1] = useState(false);

    return (
        <React.Fragment>
            <IonButton onClick={() => setShowActionSheet(true)} expand="block">Show Action Sheet</IonButton>

            <IonActionSheet
                isOpen={showActionSheet}
                onDidDismiss={() => setShowActionSheet(false)}
                buttons={[{
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                }, {
                    text: 'Share',
                    icon: 'share',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Play (open modal)',
                    icon: 'arrow-dropright-circle',
                    handler: () => {
                        console.log('Play clicked');
                        setShowModal(true);
                    }
                }, {
                    text: 'Favorite',
                    icon: 'heart',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                }, {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]}
            >
            </IonActionSheet>

            {/* Ion Modal Example */}
            <IonModal isOpen={showModal} showBackdrop={true}>
                <p>This is modal content</p>
                <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            </IonModal>
            <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>

            {/* Ion Alert Example */}
            <IonButton onClick={() => setShowAlert1(true)} expand="block">Show Alert 1</IonButton>

            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                header={'Alert'}
                subHeader={'Subtitle'}
                message={'This is an alert message.'}
                buttons={['Cancel', 'Open Modal', 'Delete']}
            />
        </React.Fragment>

    );

}
