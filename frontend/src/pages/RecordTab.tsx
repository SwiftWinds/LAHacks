import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './RecordTab.css';

const RecordTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Record page" />
      </IonContent>
    </IonPage>
  );
};

export default RecordTab;
