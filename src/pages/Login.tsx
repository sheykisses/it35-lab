import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
  <IonContent className="ion-padding">
    <div
      className="login-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '10vh',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderRadius: '12px',
        backgroundColor: '#fff',
        gap: '20px',
      }}
    >
      <IonAvatar
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#f1f1f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IonIcon
          icon={logoIonic}
          color="primary"
          style={{ fontSize: '80px', color: '#6c757d' }}
        />
      </IonAvatar>

      <h1 style={{ textAlign: 'center', margin: 0 }}>Welcome</h1>

      <IonInput
        label="Email"
        labelPlacement="floating"
        fill="outline"
        type="email"
        placeholder="Enter Email"
        value={email}
        onIonChange={e => setEmail(e.detail.value!)}
        style={{ width: '100%' }}
      />

      <IonInput
        fill="outline"
        type="password"
        placeholder="Password"
        value={password}
        onIonChange={e => setPassword(e.detail.value!)}
        style={{ width: '100%' }}
      >
        <IonInputPasswordToggle slot="end" />
      </IonInput>

      <IonButton onClick={doLogin} expand="block" shape="round" style={{ width: '100%' }}>
        Login
      </IonButton>

      <IonButton
  routerLink="/it35-lab/register"
  expand="block"
  fill="clear"
  shape="round"
  style={{ width: '100%', color: '#007bff' }} 
>
  Don't have an account? Register here
</IonButton>

    </div>

    <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message="Login successful! Redirecting..."
      duration={1500}
      position="top"
      color="primary"
    />
  </IonContent>
</IonPage>


  );
};

export default Login;