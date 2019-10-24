import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonSplitPane,
    IonPage
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, home, send } from 'ionicons/icons';

import HomePage from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import './vendor';

import { MainMenu } from './components/MainMenu';
import LeaveDetails from './components/LeaveDetails';
import Details from './components/Details';

const App: React.FC = (props) => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonSplitPane contentId="myMenuOutlet">
                    <MainMenu disabled={false} />

                    <IonPage id="myMenuOutlet">

                        <IonTabs>
                            <IonRouterOutlet>
                                <Route path="/home" component={HomePage} exact={true} />
                                <Route path="/tab2" component={Tab2} exact={true} />
                                <Route path="/details/:leaveType/apply" component={Details} />
                                <Route path="/details/:leaveType" component={LeaveDetails} />

                                {/* <Route path="/tab2/details" component={Details} /> */}
                                <Route path="/tab3" component={Tab3} />
                                <Route exact path="/" render={() => <Redirect to="/home" />} />
                            </IonRouterOutlet>

                            <IonTabBar slot="bottom">
                                <IonTabButton tab="tab1" href="/home">
                                    <IonIcon icon={home} />
                                    <IonLabel>Home</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="tab2" href="/tab2">
                                    <IonIcon icon={apps} />
                                    <IonLabel>Tab Two</IonLabel>
                                </IonTabButton>
                                <IonTabButton tab="tab3" href="/tab3">
                                    <IonIcon icon={send} />
                                    <IonLabel>Tab Three</IonLabel>
                                </IonTabButton>
                            </IonTabBar>
                        </IonTabs>

                    </IonPage>

                </IonSplitPane>
            </IonReactRouter>
        </IonApp>
    )
};

export default App;
