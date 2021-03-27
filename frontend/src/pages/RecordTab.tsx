import { IonContent, IonHeader, IonPage, IonTitle, 
  IonToolbar, IonModal, IonButton, IonProgressBar, IonText } from '@ionic/react';
import './RecordTab.css';
import { useState } from 'react';
import 'react-voice-recorder/dist/index.css';

const {Recorder} = require('react-voice-recorder');

const reset = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h: 0,
    m: 0,
    s: 0
  }
};

const RecordTab: React.FC = () => {
  const [audioDetails, setAudioDetails]  = useState(reset);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (data: any) => {
    setIsUploading(true);

  }

  const handleCancelUpload = ()  => {
    setIsUploading(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonModal isOpen={isUploading} cssClass='upload-modal'>
        <IonToolbar>
          <IonTitle size="large">Processing voice...</IonTitle>
        </IonToolbar>
        <h2 className='modal-status'>Uploading...</h2>
        <IonProgressBar type="indeterminate"/>
        <IonButton onClick={handleCancelUpload}>Cancel</IonButton>
      </IonModal>
      <IonButton onClick={() => setIsUploading(true)}>Show Modal</IonButton>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Recorder
          record={true}
          title={"New recording"}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data: any) => setAudioDetails(data)}
          handleAudioUpload={handleUpload}
          handleRest={() => setAudioDetails(reset)}
        />
      </IonContent>
    </IonPage>
  );
};

export default RecordTab;
