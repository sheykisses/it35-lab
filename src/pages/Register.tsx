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
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const doRegister = () => {
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill out all fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      // Registration logic (e.g., API call) would go here
      alert('Registration successful!');
      navigation.push('/it35-lab/app', 'forward', 'replace');
    };
  
    const goToLogin = () => {
      navigation.push('/Login', 'back', 'replace');
    };
  
    return (
      <IonPage>
        <IonContent fullscreen className="login-content">
          <style>
            {`
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
  
              .login-content {
                background: linear-gradient(-45deg, #ff758c, #ff7eb3, #57c1eb, #7a77ff);
                background-size: 400% 400%;
                animation: gradientMove 8s ease infinite;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                text-align: center;
              }
  
              .login-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 90%;
                max-width: 400px;
                background: rgba(255, 255, 255, 0.2);
                padding: 40px;
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
                text-align: center;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: fadeIn 1s ease-in-out;
              }
  
              @keyframes fadeIn {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                100% { opacity: 1; transform: translate(-50%, -50%); }
              }
  
              .avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
                animation: bounce 2s infinite;
              }
  
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}
          </style>
  
          <div className="login-box">
            <IonAvatar className="avatar">
              <img
                alt="User Avatar"
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                style={{ width: '100%', height: '100%' }}
              />
            </IonAvatar>
  
            <h1 style={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>USER REGISTRATION</h1>
  
            <IonItem style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}>
              <IonInput
                label="Name"
                placeholder="Enter your name"
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>
  
            <IonItem style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}>
              <IonInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>
  
            <IonItem style={{ width: '100%', marginBottom: '10px', borderRadius: '10px' }}>
              <IonInput
                type="password"
                label="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
  
            <IonItem style={{ width: '100%', marginBottom: '20px', borderRadius: '10px' }}>
              <IonInput
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
  
            <IonButton onClick={doRegister} expand="full" style={{ width: '100%', marginBottom: '10px' }}>
              REGISTER
            </IonButton>
            <IonButton onClick={goToLogin} expand="full" color="secondary" style={{ width: '100%' }}>
              BACK TO LOGIN
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  