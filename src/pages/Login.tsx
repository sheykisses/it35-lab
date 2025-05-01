import { 
  IonAlert,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter,
  IonLoading
} from '@ionic/react';
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
      cssClass="alert-box"
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
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const doLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setAlertMessage('Please fill in both email and password.');
      setShowAlert(true);
      return;
    }

    if (!validateEmail(email)) {
      setAlertMessage('Please enter a valid email address.');
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertMessage('Password must be at least 6 characters long.');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    setIsButtonLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);
    setIsButtonLoading(false);

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
      <IonContent className="login-content" style={{ backgroundColor: '#f5f7fa', padding: '20px' }}>
        <div className="login-container" style={{
          maxWidth: '450px',
          margin: 'auto',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: 'black',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          marginTop: '50px', // Added margin at the top
        }}>
          <h1 className="login-title" style={{
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: '700',
            color: '#4CAF50',
            marginBottom: '30px',
          }}>Welcome Back</h1>

          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter your email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            className="login-input"
            style={{ marginBottom: '20px' }}
          />

          <IonInput
            fill="outline"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            className="login-input"
            style={{ marginBottom: '20px' }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            onClick={doLogin}
            expand="full"
            shape="round"
            disabled={isButtonLoading}
            className="login-btn"
            style={{
              marginTop: '20px',
              backgroundColor: '#007BFF',
              color: 'white',
              fontWeight: '600',
              boxShadow: '0px 5px 20px rgba(0, 123, 255, 0.3)',
              textTransform: 'uppercase',
            }}
          >
            {isButtonLoading ? 'Logging in...' : 'Login'}
          </IonButton>

          <IonButton
            routerLink="/it35-lab/Register"
            expand="full"
            fill="clear"
            shape="round"
            className="register-link"
            style={{
              marginTop: '15px',
              color: '#007BFF',
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            Don’t have an account? Register here
          </IonButton>

          {/* Reusable AlertBox Component */}
          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

          {/* IonToast for success message */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />

          {/* IonLoading for loading state */}
          <IonLoading
            isOpen={isLoading}
            message={'Logging in...'}
            duration={0}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
