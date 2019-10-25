import React, { useState } from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonRadioGroup,
    IonRadio,
    IonList,
    IonListHeader,
    IonDatetime,
    IonTextarea,
    IonButton
} from '@ionic/react';
import { withRouter } from 'react-router-dom'

const ApplyLeaveForm: React.FC = ({ match, history }: any) => {

    const [isHalfDay, setIsHalfDay] = useState(false);

    console.log('Details :', match, history);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Syntax : var formData = new FormData(form)
        // Ref : https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
        const form = event.target.closest('form');
        const formData = new FormData(form);

        const formDataObj = {
            leaveType: formData.get('selLeaveType'),
            isHalfDay: isHalfDay,
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            comment: formData.get('txtComment'),
        };

        console.log(formData, formDataObj);
    }

    const SampleFunc = (event: any) => {
        console.log('Selected Radio button value : ', event.detail)
    }

    return (
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={`/details/${match.params.leaveType}`} />
                    </IonButtons>
                    <IonTitle>Apply for leave</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <form name="formLeaveRequest" id="formLeaveRequest" method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    <IonItem>
                        <IonLabel position="floating">Leave Type</IonLabel>
                        <IonSelect value={match.params.leaveType} okText="Okay" cancelText="Dismiss" name="selLeaveType" id="selLeaveType">
                            <IonSelectOption value="gl">GL</IonSelectOption>
                            <IonSelectOption value="pl">PL</IonSelectOption>
                            <IonSelectOption value="floater">Floater</IonSelectOption>
                            <IonSelectOption value="compOff">Comp Off</IonSelectOption>
                            <IonSelectOption value="PML">Paternity/Maternity Leave</IonSelectOption>
                            <IonSelectOption value="LWP">Leave without pay</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonList>
                        <IonRadioGroup onIonChange={(event) => SampleFunc(event)}>
                            <IonListHeader>Mark As Halfday</IonListHeader>

                            <IonItem>
                                <IonLabel>Yes</IonLabel>
                                <IonRadio value="yes" name="radioIsHalfDay" id="radioIsHalfDay1" onIonSelect={() => setIsHalfDay(true)} />
                            </IonItem>

                            <IonItem>
                                <IonLabel>No</IonLabel>
                                <IonRadio value="no" name="radioIsHalfDay" id="radioIsHalfDay2" onIonSelect={() => setIsHalfDay(false)} checked />
                            </IonItem>

                        </IonRadioGroup>
                    </IonList>
                    <IonItem>
                        <IonLabel>Start Date</IonLabel>
                        <IonDatetime placeholder="Select Start Date" name="startDate"></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel>End Date</IonLabel>
                        <IonDatetime placeholder="Select End Date" name="endDate"></IonDatetime>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Comment</IonLabel>
                        <IonTextarea rows={6} cols={20} placeholder="Enter any notes here..." name="txtComment"></IonTextarea>
                    </IonItem>
                    <div className="button-wrapper">
                        <IonButton type="submit">Create</IonButton>
                    </div>
                </form>
            </IonContent>

        </IonPage>
    );
};

// export default Details;
export default withRouter(ApplyLeaveForm);
