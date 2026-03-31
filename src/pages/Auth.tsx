import { useState, useEffect } from 'react';

interface AuthProps {
  initialMode?: 'login' | 'signup';
  onBack?: () => void;
}

const Auth = ({ initialMode = 'signup', onBack }: AuthProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; background: #000; color: #fff; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    container: { minHeight: '100vh', background: '#000', display: 'flex' },
    leftPane: { width: '45%', background: '#000', padding: '32px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' },
    rightPane: { flex: 1, background: '#050505', padding: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' },
    backBtn: { position: 'absolute', top: 32, left: 32, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', color: '#a8a8a8' },
    formContainer: { maxWidth: 448, width: '100%', margin: '0 auto' },
    title: { fontSize: 36, fontWeight: 700, marginBottom: 16, letterSpacing: -0.5 },
    subtitle: { fontSize: 18, color: '#9ca3af', marginBottom: 40 },
    inputGroup: { marginBottom: 24 },
    label: { display: 'block', fontSize: 14, fontWeight: 500, color: '#d1d5db', marginBottom: 8 },
    input: { width: '100%', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, fontSize: 16, color: '#fff', outline: 'none', transition: 'all 0.2s' },
    passwordWrapper: { position: 'relative' },
    togglePassword: { position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' },
    submitBtn: { width: '100%', padding: 16, background: '#2563eb', border: 'none', borderRadius: 12, fontSize: 18, fontWeight: 700, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 16 },
    switchText: { textAlign: 'center', marginTop: 32, color: '#6b7280', fontSize: 14 },
    switchBtn: { background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer', marginLeft: 4 },
    divider: { margin: '40px 0', position: 'relative' },
    dividerLine: { height: 1, background: 'rgba(255,255,255,0.1)' },
    dividerText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#000', padding: '0 16px', color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em' },
    socialBtns: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    socialBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 500, color: '#fff', cursor: 'pointer', transition: 'all 0.2s' },
    footer: { marginTop: 32, textAlign: 'center', fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.8 },
    footerLink: { color: '#fff', textDecoration: 'underline' },
    previewCard: { width: '100%', maxWidth: 448, background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 32, padding: 40, position: 'relative', overflow: 'hidden' },
    previewStripe: { position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'rgba(37,99,235,0.5)' },
    previewGlow: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 384, height: 384, background: 'rgba(37,99,235,0.1)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth submitted:', { mode, email, password });
  };

  return (
    <div style={styles.container}>
      {/* Left Pane - Form */}
      <div style={styles.leftPane}>
        <div style={styles.backBtn} onClick={onBack}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>Back</span>
        </div>

        <div style={styles.formContainer}>
          <h1 style={styles.title}>
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p style={styles.subtitle}>
            {mode === 'login' 
              ? 'Enter your credentials to access your account.' 
              : 'Join thousands of creators growing their channels.'}
          </p>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email address</label>
              <input 
                style={styles.input} 
                type="email" 
                placeholder="name@work-email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input 
                  style={styles.input} 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" style={styles.togglePassword}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={styles.passwordWrapper}>
                  <input 
                    style={styles.input} 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button type="button" style={styles.togglePassword}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button type="submit" style={styles.submitBtn}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          {mode === 'login' && (
            <div style={{textAlign: 'center', marginTop: 16}}>
              <button style={{background: 'none', border: 'none', color: '#2563eb', fontSize: 14, cursor: 'pointer'}}>Forgot password?</button>
            </div>
          )}

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>Or continue with</span>
          </div>

          <div style={styles.socialBtns}>
            <button style={styles.socialBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button style={styles.socialBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              SSO
            </button>
          </div>

          <p style={styles.switchText}>
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button style={styles.switchBtn} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Create one now' : 'Sign in'}
            </button>
          </p>

          <p style={styles.footer}>
            By continuing, you agree to Algolyra's<br/>
            <a href="#" style={styles.footerLink}>Terms of Service</a> and <a href="#" style={styles.footerLink}>Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Right Pane - Visual Preview */}
      <div style={styles.rightPane}>
        <div style={styles.previewCard}>
          <div style={styles.previewStripe} />
          <div style={styles.previewGlow} />
          
          <div style={{position: 'relative', zIndex: 1}}>
            {mode === 'signup' ? (
              <>
                <div style={{background: '#000', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', padding: 24, marginBottom: 32}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
                    <div style={{width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <div style={{width: 16, height: 16, borderRadius: '50%', background: '#2563eb', animation: 'pulse 2s infinite'}} />
                    </div>
                    <div style={{height: 8, width: 128, background: 'rgba(255,255,255,0.1)', borderRadius: 4}} />
                  </div>
                  <div>
                    <div style={{fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 12}}>Trending niche found:</div>
                    <div style={{fontSize: 24, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8}}>
                      <span style={{color: '#2563eb'}}>"</span>
                      Bodycam
                      <span style={{color: '#2563eb'}}>"</span>
                    </div>
                  </div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <h3 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Discover Viral Niches</h3>
                  <p style={{fontSize: 16, color: '#9ca3af', lineHeight: 1.6}}>
                    Access our database of high-CPM niches and find untapped opportunities instantly.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{background: '#000', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 32}}>
                  <div style={{padding: 16, borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: '#6b7280', textTransform: 'uppercase', fontWeight: 700}}>
                    <span>Similar Roblox Channels</span>
                    <span>Sort: Similarity</span>
                  </div>
                  <div style={{padding: 16}}>
                    {[
                      { name: 'Catfish Blox', subs: '6.4M', match: 98 },
                      { name: 'AmyyRoblox', subs: '4.1M', match: 95 },
                      { name: 'RealBacon', subs: '3.1M', match: 92 },
                    ].map((ch, i) => (
                      <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 16 : 0}}>
                        <div style={{width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}} />
                        <div style={{flex: 1}}>
                          <div style={{fontSize: 12, fontWeight: 700}}>{ch.name}</div>
                          <div style={{fontSize: 10, color: '#6b7280'}}>{ch.subs} Subscribers</div>
                        </div>
                        <div style={{fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 9999, background: i === 0 ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)', color: i === 0 ? '#22c55e' : '#3b82f6'}}>
                          {ch.match}% Match
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{textAlign: 'center'}}>
                  <h3 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Analyze Competition</h3>
                  <p style={{fontSize: 16, color: '#9ca3af', lineHeight: 1.6}}>
                    Spy on top channels and replicate their success strategies.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .right-pane { display: none !important; }
          .left-pane { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default Auth;
