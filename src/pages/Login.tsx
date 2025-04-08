import {
  IonAvatar,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonPage,
  useIonRouter
} from '@ionic/react';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }
    router.push('/it35-lab/app', 'forward', 'replace');
  };

  const goToSignup = () => {
    router.push('/Register', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <style>
          {`
            .login-content {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .login-box {
              width: 90%;
              max-width: 400px;
              padding: 40px;
              border-radius: 15px;
              text-align: center;
              background: rgba(255, 255, 255, 0.2);
            }
            h1 {
              color: white;
              margin-bottom: 20px;
            }
          `}
        </style>

        <div className="login-box">
          <IonAvatar style={{ margin: '0 auto 20px' }}>
            <img
              alt="User Avatar"
              src="https://i.pinimg.com/236x/e5/55/40/e555402af290cd801befb31f56adfa79.jpg"
              style={{ width: '100%', height: '100%' }}
            />
          </IonAvatar>

          <h1>USER LOGIN</h1>

          <IonItem lines="none">
            <IonInput
              type="email"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>

          <IonItem lines="none">
            <IonInput
              type="password"
              value={password}
              placeholder="Enter your password"
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
          </IonItem>

          <IonButton onClick={handleLogin} expand="full" style={{ marginTop: '20px' }}>
            LOGIN
          </IonButton>
          <IonButton onClick={goToSignup} expand="full" color="secondary" style={{ marginTop: '10px' }}>
            SIGNUP
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
