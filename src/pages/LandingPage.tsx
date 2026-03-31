import { useState, useEffect } from 'react';

interface LandingPageProps {
  onNavigate?: (view: 'landing' | 'login' | 'signup') => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', sans-serif; background-color: #000; color: #fff; scroll-behavior: smooth; }
      .reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1); }
      .reveal.active { opacity: 1; transform: translateY(0); }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #0a0a0a; }
      ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
      @keyframes pulse-glow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.3; } }
      .pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
      @keyframes scroll-niches { 0%, 20% { transform: translateY(0); } 25%, 45% { transform: translateY(-32px); } 50%, 70% { transform: translateY(-64px); } 75%, 95% { transform: translateY(-96px); } 100% { transform: translateY(0); } }
      .niche-carousel { animation: scroll-niches 8s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('active');
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        observer.observe(el);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    container: { minHeight: '100vh', background: '#000', color: '#fff' },
    nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, transition: 'all 0.3s', padding: isScrolled ? '16px 0' : '24px 0', background: isScrolled ? 'rgba(0,0,0,0.6)' : 'transparent', backdropFilter: isScrolled ? 'blur(24px)' : 'none', borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none' },
    navInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' },
    logoIcon: { width: 40, height: 40, background: '#fff', borderRadius: 8, padding: 4 },
    logoText: { fontSize: 20, fontWeight: 700, letterSpacing: -0.5 },
    navLinks: { display: 'flex', gap: 32 },
    navLink: { fontSize: 14, fontWeight: 500, color: '#a8a8a8', textDecoration: 'none', transition: 'color 0.2s' },
    navButtons: { display: 'flex', gap: 16 },
    loginBtn: { fontSize: 14, fontWeight: 500, color: '#a8a8a8', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' },
    signupBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 9999, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
    mobileMenuBtn: { display: 'none', padding: 8, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' },
    hero: { paddingTop: 160, paddingBottom: 80, textAlign: 'center', position: 'relative', overflow: 'hidden' },
    heroBg: { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 900, height: 400, background: 'rgba(37,99,235,0.2)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, animation: 'pulse-glow 4s infinite' },
    heroInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 },
    badge: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 40 },
    badgeText: { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '2px 8px', borderRadius: 4 },
    badgeText2: { fontSize: 14, fontWeight: 500, color: '#d1d5db' },
    heroTitle: { fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: -0.5, marginBottom: 24, lineHeight: 1.1 },
    heroSubtitle: { fontSize: 'clamp(16px, 2vw, 20px)', color: '#9ca3af', maxWidth: 672, margin: '0 auto 40px', lineHeight: 1.6 },
    heroButtons: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 },
    ctaBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: 9999, fontSize: 18, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', boxShadow: '0 10px 40px rgba(37,99,235,0.2)' },
    demoBtn: { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 32px', borderRadius: 9999, fontSize: 18, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
    freeText: { fontSize: 12, color: '#9ca3af', marginTop: 16 },
    features: { padding: '120px 0', maxWidth: 1280, margin: '0 auto', paddingLeft: 24, paddingRight: 24 },
    sectionTitle: { fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, marginBottom: 16, textAlign: 'center' },
    sectionSubtitle: { fontSize: 20, color: '#9ca3af', marginBottom: 64, textAlign: 'center' },
    cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 },
    card: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32, transition: 'all 0.3s' },
    cardNumber: { width: 40, height: 40, background: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, marginBottom: 24 },
    cardTitle: { fontSize: 24, fontWeight: 700, marginBottom: 12 },
    cardDesc: { color: '#9ca3af', lineHeight: 1.6, marginBottom: 32 },
    cardPreview: { background: 'rgba(0,0,0,0.4)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', padding: 24 },
    previewRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
    dot: { width: 12, height: 12, borderRadius: '50%', background: '#22c55e' },
    previewText: { fontSize: 12, color: '#6b7280' },
    previewText2: { fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 },
    nicheText: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
    nicheCarousel: { display: 'flex', flexDirection: 1 },
    nicheItem: { height: 32, lineHeight: 32, fontSize: 24, fontWeight: 700 },
    pricing: { padding: '120px 0', background: '#050505' },
    pricingInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
    pricingToggle: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 48 },
    toggleLabel: { fontSize: 14, fontWeight: 700 },
    toggleSwitch: { width: 56, height: 28, background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 2, cursor: 'pointer', position: 'relative' },
    toggleKnob: { width: 24, height: 24, background: '#2563eb', borderRadius: '12', transition: 'transform 0.2s' },
    plansGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 },
    planCard: { background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 40, padding: 40, display: 'flex', flexDirection: 'column' },
    planCardFeatured: { border: '2px solid rgba(37,99,235,0.5)', boxShadow: '0 0 60px rgba(37,99,235,0.1)' },
    planBadge: { position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#fff', padding: '4px 16px', borderRadius: 9999, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' },
    planName: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
    planPrice: { display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 },
    planAmount: { fontSize: 56, fontWeight: 800 },
    planPeriod: { fontSize: 16, color: '#9ca3af' },
    planDesc: { fontSize: 14, color: '#9ca3af', marginBottom: 24 },
    planFeatures: { listStyle: 'none', flex: 1, marginBottom: 32 },
    planFeature: { display: 'flex', gap: 12, fontSize: 14, color: '#d1d5db', marginBottom: 16 },
    planBtn: { width: '100%', padding: 16, borderRadius: 16, fontSize: 16, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
    planBtnPrimary: { background: '#2563eb', border: 'none', color: '#fff' },
    planBtnSecondary: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' },
    footer: { padding: '120px 0 48px', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' },
    footerInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
    footerCTA: { textAlign: 'center', marginBottom: 96 },
    footerTitle: { fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, marginBottom: 32 },
    footerBtn: { background: '#2563eb', color: '#fff', border: 'none', padding: '20px 40px', borderRadius: 9999, fontSize: 20, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 },
    footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 48 },
    footerCol: {},
    footerLink: { display: 'block', fontSize: 14, color: '#6b7280', textDecoration: 'none', marginBottom: 12, transition: 'color 0.2s' },
    footerBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 12, color: '#6b7280' },
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                <path d="M70,20 L30,60 L30,40 L50,20 L70,20 Z M30,80 L70,40 L70,60 L50,80 L30,80 Z" fill="#000"/>
                <rect x="25" y="45" width="10" height="25" fill="#000"/>
                <rect x="65" y="30" width="10" height="25" fill="#000"/>
              </svg>
            </div>
            <span style={styles.logoText}>Algolyra</span>
          </div>
          <div style={styles.navLinks as React.CSSProperties}>
            <a href="#features" style={styles.navLink}>Features</a>
            <a href="#pricing" style={styles.navLink}>Pricing</a>
            <a href="#faq" style={styles.navLink}>FAQ</a>
            <a href="#" style={styles.navLink}>Affiliates</a>
          </div>
          <div style={styles.navButtons}>
            <button style={styles.loginBtn} onClick={() => onNavigate?.('login')}>Login</button>
            <button style={styles.signupBtn} onClick={() => onNavigate?.('signup')}>Get Started</button>
          </div>
          <button style={{...styles.mobileMenuBtn, display: 'none'}} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroInner}>
          <div style={styles.badge}>
            <span style={styles.badgeText}>New</span>
            <span style={styles.badgeText2}>Terminated Channel Tracker Live</span>
          </div>
          <h1 style={styles.heroTitle}>
            The Easiest Way to Research<br/>and Create Viral Videos
          </h1>
          <p style={styles.heroSubtitle}>
            Discover trending niches, analyze winning channels, and create videos in seconds.
            The ultimate toolkit for modern content creators.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.ctaBtn} onClick={() => onNavigate?.('signup')}>
              Try Algolyra Now
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button style={styles.demoBtn}>Watch demo ▷</button>
          </div>
          <p style={styles.freeText}>Free to join · No credit card required</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.features}>
        <h2 style={{...styles.sectionTitle, marginBottom: 8}}>Control your <span style={{color: '#3b82f6'}}>content strategy</span></h2>
        <p style={styles.sectionSubtitle}>Understand how top creators grow and what you can do about it.</p>
        
        <div style={styles.cards}>
          {/* Card 1 */}
          <div style={styles.card}>
            <div style={styles.cardNumber}>1</div>
            <h3 style={styles.cardTitle}>Find Trending Channels</h3>
            <p style={styles.cardDesc}>Track specific niches to discover when channels start blowing up and identify winning patterns.</p>
            <div style={styles.cardPreview}>
              <div style={styles.previewRow}>
                <div style={styles.dot} />
                <span style={styles.previewText}>Live tracking</span>
              </div>
              <div style={styles.nicheText}>Trending niche found:</div>
              <div style={styles.previewText2}>
                <span style={{color: '#3b82f6', fontSize: 32}}>"</span>
                <div style={{overflow: 'hidden', height: 32}}>
                  <div style={styles.nicheCarousel}>
                    <div style={styles.nicheItem}>Minecraft Parkour</div>
                    <div style={styles.nicheItem}>Roblox Rants</div>
                    <div style={styles.nicheItem}>Bodycam Horrors</div>
                    <div style={styles.nicheItem}>Pickpocketing Fails</div>
                  </div>
                </div>
                <span style={{color: '#3b82f6', fontSize: 32}}>"</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={styles.card}>
            <div style={styles.cardNumber}>2</div>
            <h3 style={styles.cardTitle}>Analyze Competition</h3>
            <p style={styles.cardDesc}>Instantly find similar channels and uncover the strategies working in your niche.</p>
            <div style={styles.cardPreview}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 10, color: '#6b7280', textTransform: 'uppercase', fontWeight: 700}}>
                <span>Similar Channels</span>
                <span>Sort: Similarity</span>
              </div>
              {[
                { name: 'Catfish Blox', subs: '6.4M', match: 98 },
                { name: 'AmyyRoblox', subs: '4.1M', match: 95 },
              ].map((ch, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 12, marginBottom: 12}}>
                  <div style={{width: 32, height: 32, borderRadius: '50%', background: 'rgba(59,130,246,0.2)'}} />
                  <div style={{flex: 1}}>
                    <div style={{fontSize: 12, fontWeight: 700}}>{ch.name}</div>
                    <div style={{fontSize: 10, color: '#6b7280'}}>{ch.subs} Subscribers</div>
                  </div>
                  <div style={{fontSize: 10, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '4px 8px', borderRadius: 9999}}>{ch.match}% Match</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div style={styles.card}>
            <div style={styles.cardNumber}>3</div>
            <h3 style={styles.cardTitle}>Create Content</h3>
            <p style={styles.cardDesc}>Use our video creation tools to produce optimized, high-retention videos in seconds.</p>
            <div style={{...styles.cardPreview, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160}}>
              <div style={{width: '100%', height: 80, borderRadius: 12, border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                  <path d="M12 3v6M3 12h6M21 12h-6M12 21v-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={styles.pricing}>
        <div style={styles.pricingInner}>
          <h2 style={styles.sectionTitle}>Simple, <span style={{color: '#3b82f6'}}>Transparent Pricing</span></h2>
          <p style={styles.sectionSubtitle}>Choose the plan that fits your content creation goals.</p>

          <div style={styles.plansGrid}>
            {/* Starter */}
            <div style={styles.planCard}>
              <h3 style={styles.planName}>Starter</h3>
              <div style={styles.planPrice}>
                <span style={styles.planAmount}>$25</span>
                <span style={styles.planPeriod}>/mo</span>
              </div>
              <p style={styles.planDesc}>Perfect for new creators starting their journey.</p>
              <ul style={styles.planFeatures}>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Niche Finder</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Image Generator</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> 5 Screenshot Finder Credits</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> 95 Video Generation Credits</li>
              </ul>
              <button style={{...styles.planBtn, ...styles.planBtnSecondary}} onClick={() => onNavigate?.('signup')}>Get started</button>
            </div>

            {/* Professional */}
            <div style={{...styles.planCard, ...styles.planCardFeatured, position: 'relative'}}>
              <div style={styles.planBadge}>Most Popular</div>
              <h3 style={styles.planName}>Professional</h3>
              <div style={styles.planPrice}>
                <span style={styles.planAmount}>$45</span>
                <span style={styles.planPeriod}>/mo</span>
              </div>
              <p style={styles.planDesc}>Ideal for growing channels seeking deeper insights.</p>
              <ul style={styles.planFeatures}>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Niche Finder</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Image Generator</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Screenshot Finder</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> 175 Video Generation Credits</li>
              </ul>
              <button style={{...styles.planBtn, ...styles.planBtnPrimary}} onClick={() => onNavigate?.('signup')}>Choose Plan</button>
            </div>

            {/* Ultimate */}
            <div style={styles.planCard}>
              <h3 style={styles.planName}>Ultimate</h3>
              <div style={styles.planPrice}>
                <span style={styles.planAmount}>$80</span>
                <span style={styles.planPeriod}>/mo</span>
              </div>
              <p style={styles.planDesc}>The complete toolkit for professional studios.</p>
              <ul style={styles.planFeatures}>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Everything in Pro</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Unlimited Everything</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> 300 Video Generation Credits</li>
                <li style={styles.planFeature}><span style={{color: '#3b82f6'}}>✓</span> Priority Support</li>
              </ul>
              <button style={{...styles.planBtn, ...styles.planBtnSecondary}} onClick={() => onNavigate?.('signup')}>Choose Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerCTA}>
            <h2 style={styles.footerTitle}>Ready to take control<br/>of your channel?</h2>
            <button style={styles.footerBtn} onClick={() => onNavigate?.('signup')}>
              Start Growing Now <span>⚡</span>
            </button>
          </div>

          <div style={styles.footerGrid}>
            <div>
              <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24}}>
                <div style={styles.logoIcon}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                    <path d="M70,20 L30,60 L30,40 L50,20 L70,20 Z M30,80 L70,40 L70,60 L50,80 L30,80 Z" fill="#000"/>
                  </svg>
                </div>
                <span style={{fontSize: 20, fontWeight: 700}}>Algolyra</span>
              </div>
              <p style={{fontSize: 14, color: '#6b7280', maxWidth: 200}}>Empowering the next generation of content creators with AI-driven research.</p>
            </div>
            <div>
              <h4 style={{fontWeight: 700, marginBottom: 16}}>Product</h4>
              <a href="#" style={styles.footerLink}>Niche Finder</a>
              <a href="#" style={styles.footerLink}>Channel Tracker</a>
              <a href="#" style={styles.footerLink}>AI Video Gen</a>
            </div>
            <div>
              <h4 style={{fontWeight: 700, marginBottom: 16}}>Resources</h4>
              <a href="#" style={styles.footerLink}>Success Stories</a>
              <a href="#" style={styles.footerLink}>Blog</a>
              <a href="#" style={styles.footerLink}>Documentation</a>
            </div>
            <div>
              <h4 style={{fontWeight: 700, marginBottom: 16}}>Company</h4>
              <a href="#" style={styles.footerLink}>About Us</a>
              <a href="#" style={styles.footerLink}>Affiliates</a>
              <a href="#" style={styles.footerLink}>Terms</a>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <span>© 2025 Algolyra. All rights reserved.</span>
            <span>Designed for Creators · Powered by AI</span>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .hero-buttons { flex-direction: column; align-items: center; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
