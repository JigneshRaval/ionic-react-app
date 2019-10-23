import React from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    IonBadge,
    IonButton
} from '@ionic/react';

const LeaveDetails: React.FC = ({ match }: any) => {

    const leaveDetail = [
        {
            id: 1, title: 'GL', type: 'gl', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 2, title: 'PL', type: 'pl', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 3, title: 'Floater', type: 'floater', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        },
        {
            id: 4, title: 'Comp Off', type: 'compOff', balance: [
                { title: 'Opening Balance', balance: 7 },
                { title: 'Applied', balance: 4 },
                { title: 'Approved', balance: 3 },
                { title: 'Pending Approval', balance: 1 },
                { title: 'Total Balance Till Date', balance: 0.5 }
            ]
        }
    ];

    const getDetail = leaveDetail[match.params.leaveType];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tab2" />
                    </IonButtons>
                    <IonTitle>Leave Detail: {match.params.leaveType}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>Leave Details for</IonCardSubtitle>
                        <IonCardTitle>{match.params.leaveType}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        {leaveDetail.map((detail: any) => (
                            detail.type === match.params.leaveType ? (
                                <IonList>
                                    {detail.balance.map((item: any) => (

                                        <IonItem key={item.id}>
                                            <IonLabel>{item.title}</IonLabel>
                                            <IonBadge slot="end">{item.balance}</IonBadge>
                                        </IonItem>

                                    ))}
                                </IonList>
                            ) : null
                        ))}
                    </IonCardContent>
                </IonCard>

                <IonButton color="primary" expand="block">Apply for leave</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LeaveDetails;
