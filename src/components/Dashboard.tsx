import { useState, useEffect } from 'react';

interface DashboardProps {
  onLogout?: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-void: #080b0f;
        --bg-panel: #0d1117;
        --bg-card: #111720;
        --bg-card-hover: #161e2e;
        --border: rgba(99,179,237,0.12);
        --border-bright: rgba(99,179,237,0.35);
        --cyan: #38bdf8;
        --cyan-dim: rgba(56,189,248,0.15);
        --green: #4ade80;
        --green-dim: rgba(74,222,128,0.12);
        --amber: #fbbf24;
        --amber-dim: rgba(251,191,36,0.12);
        --red: #f87171;
        --red-dim: rgba(248,113,113,0.12);
        --purple: #a78bfa;
        --purple-dim: rgba(167,139,250,0.12);
        --text-primary: #e2e8f0;
        --text-secondary: #64748b;
        --text-dim: #334155;
        --glow-cyan: 0 0 30px rgba(56,189,248,0.15);
        --glow-green: 0 0 20px rgba(74,222,128,0.15);
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      @keyframes pulse-green { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      @keyframes slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes grow-bar { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }
      @keyframes fade-in { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--text-dim); border-radius: 2px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M2 4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm10 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V4zM2 14a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4zm10 0a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z' },
    { id: 'analytics', label: 'Analytics', icon: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' },
    { id: 'routing', label: 'Routing Log', icon: 'M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z', badge: 'Live' },
    { id: 'api', label: 'API Keys', icon: 'M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z' },
    { id: 'rules', label: 'Routing Rules', icon: 'M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z' },
    { id: 'budget', label: 'Budget Alerts', icon: 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z' },
    { id: 'models', label: 'Models', icon: 'M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z', badge: '100+' },
    { id: 'billing', label: 'Billing', icon: 'M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' },
    { id: 'docs', label: 'Docs', icon: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' },
  ];

  const navGroups = [
    { label: 'Overview', items: ['dashboard', 'analytics', 'routing'] },
    { label: 'Configuration', items: ['api', 'rules', 'budget', 'models'] },
    { label: 'Account', items: ['billing', 'docs'] },
  ];

  const routingLog = [
    { type: 'simple', prompt: 'What is the capital of France?', model: 'gemma-3', cost: '$0.00' },
    { type: 'complex', prompt: 'Explain how transformers work in detail...', model: 'llama-3.1', cost: '$0.00' },
    { type: 'simple', prompt: 'What is 2 + 2?', model: 'gemma-3', cost: '$0.00' },
    { type: 'complex', prompt: 'Write a Python script to parse JSON files...', model: 'gpt-4o', cost: '$0.002' },
    { type: 'simple', prompt: 'Translate "hello" to Spanish', model: 'gemma-3', cost: '$0.00' },
    { type: 'complex', prompt: 'Analyze and compare these two algorithms...', model: 'llama-3.1', cost: '$0.00' },
  ];

  const apiKeys = [
    { name: '🚀 Production App', key: 'ra_prod_f55a...e8c2', mode: 'Auto', requests: '42,100', tokens: '8.4M', cost: '$31.20', status: 'Active' },
    { name: '🧪 Staging', key: 'ra_stg_a12b...f441', mode: 'Manual', requests: '18,340', tokens: '3.2M', cost: '$22.80', status: 'Active' },
    { name: '🔬 Dev / Testing', key: 'ra_dev_9c3d...b221', mode: 'Auto', requests: '23,851', tokens: '4.1M', cost: '$12.20', status: 'Paused' },
  ];

  const styles: Record<string, React.CSSProperties> = {
    sidebar: { position: 'fixed' as const, left: 0, top: 0, bottom: 0, width: 240, background: 'var(--bg-panel)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' as const, zIndex: 100 },
    logoArea: { padding: '28px 24px 24px', borderBottom: '1px solid var(--border)' },
    logo: { display: 'flex', alignItems: 'center', gap: 10 },
    logoIcon: { width: 34, height: 34, background: 'linear-gradient(135deg, var(--cyan), var(--purple))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, boxShadow: 'var(--glow-cyan)' },
    logoText: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', letterSpacing: -0.5 },
    planBadge: { marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 4, padding: '3px 8px', fontSize: 10, color: 'var(--green)', letterSpacing: 0.5, textTransform: 'uppercase' },
    nav: { flex: 1, padding: '20px 0', overflowY: 'auto' as const },
    navSection: { padding: '0 16px', marginBottom: 8 },
    navLabel: { fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase' as const, color: 'var(--text-dim)', padding: '0 8px', marginBottom: 6 },
    navItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s ease', color: 'var(--text-secondary)', fontSize: 13, position: 'relative' as const, border: '1px solid transparent', marginBottom: 2, textDecoration: 'none' },
    navItemActive: { background: 'var(--cyan-dim)', color: 'var(--cyan)', borderColor: 'var(--border-bright)' },
    navBadge: { marginLeft: 'auto', background: 'var(--cyan-dim)', color: 'var(--cyan)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: 3, fontSize: 9, padding: '1px 5px' },
    sidebarFooter: { padding: 16, borderTop: '1px solid var(--border)' },
    userInfo: { display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 6, background: 'var(--bg-card)', border: '1px solid var(--border)', cursor: 'pointer' },
    avatar: { width: 30, height: 30, background: 'linear-gradient(135deg, var(--purple), var(--cyan))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700 },
    userName: { fontSize: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
    userEmail: { fontSize: 10, color: 'var(--text-secondary)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
    main: { marginLeft: 240, minHeight: '100vh', position: 'relative', zIndex: 1 },
    topbar: { position: 'sticky' as const, top: 0, zIndex: 50, background: 'rgba(8,11,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    pageTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', letterSpacing: -0.5 },
    topbarRight: { display: 'flex', alignItems: 'center', gap: 12 },
    statusDot: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--green)' },
    topbarBtn: { display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, cursor: 'pointer', transition: 'all 0.15s' },
    topbarBtnPrimary: { background: 'var(--cyan)', borderColor: 'var(--cyan)', color: '#000', fontWeight: 600 },
    content: { padding: 32 },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 },
    statCard: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, position: 'relative', overflow: 'hidden', transition: 'all 0.2s ease', cursor: 'default' },
    statLabel: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' as const, color: 'var(--text-secondary)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 },
    statValue: { fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8, letterSpacing: -1 },
    statChange: { fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 },
    statIcon: { position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 },
    sparkline: { marginTop: 12, height: 28, display: 'flex', alignItems: 'flex-end', gap: 2 },
    sparkBar: { flex: 1, borderRadius: '2px 2px 0 0', opacity: 0.6, transition: 'opacity 0.2s' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 24 },
    panel: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' },
    panelHeader: { padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    panelTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 },
    panelBody: { padding: 20 },
    chartArea: { height: 180, position: 'relative', marginBottom: 16 },
    logEntry: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 12, animation: 'fade-in 0.4s ease' },
    logBadge: { padding: '2px 7px', borderRadius: 3, fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' as const, flexShrink: 0 },
    logPrompt: { flex: 1, color: 'var(--text-secondary)', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 11 },
    logModel: { color: 'var(--cyan)', fontSize: 10, flexShrink: 0, whiteSpace: 'nowrap' as const },
    logCost: { color: 'var(--text-secondary)', fontSize: 10, flexShrink: 0 },
    budgetMeter: { height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: 8, position: 'relative' as const },
    budgetFill: { height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, var(--green), var(--amber))', width: '68%', transition: 'width 1s ease' },
    budgetTicks: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
    budgetTick: { fontSize: 9, color: 'var(--text-dim)' },
    alertItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--amber-dim)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 6, marginBottom: 8 },
    alertItemSafe: { background: 'var(--green-dim)', borderColor: 'rgba(74,222,128,0.2)' },
    alertIcon: { fontSize: 14, flexShrink: 0 },
    alertText: { fontSize: 11, color: 'var(--text-secondary)', flex: 1 },
    alertPct: { fontSize: 11, fontWeight: 600, color: 'var(--amber)' },
    tableWrap: { overflowX: 'auto' as const },
    keysTable: { width: '100%', borderCollapse: 'collapse' },
    keysTableTh: { fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' as const, color: 'var(--text-dim)', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' as const },
    keysTableTd: { padding: '13px 16px', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '1px solid rgba(99,179,237,0.05)', whiteSpace: 'nowrap' as const },
    keyName: { fontFamily: "'Syne', sans-serif", fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 },
    keyValue: { fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-panel)', padding: '3px 8px', borderRadius: 4, border: '1px solid var(--border)', fontFamily: "'JetBrains Mono', monospace" },
    statusPill: { display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 20, fontSize: 10, fontWeight: 500 },
    actionBtn: { padding: '5px 10px', borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, cursor: 'pointer', transition: 'all 0.15s', marginRight: 4 },
    modelItem: { marginBottom: 14 },
    modelRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 },
    modelName: { fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 },
    modelPct: { fontSize: 11, color: 'var(--text-primary)', fontWeight: 500 },
    progressBar: { height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 2, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' },
    liveTag: { display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 3, padding: '2px 7px', fontSize: 9, color: 'var(--green)', letterSpacing: 0.5, textTransform: 'uppercase' as const },
    classifierDemo: { marginBottom: 24 },
    classifierInputRow: { display: 'flex', gap: 8, marginBottom: 16 },
    classifierInput: { flex: 1, background: 'var(--bg-void)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px', color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, outline: 'none', transition: 'border-color 0.15s' },
    classifyBtn: { padding: '10px 20px', background: 'var(--cyan)', border: 'none', borderRadius: 6, color: '#000', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' as const },
    classifierResult: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 },
    resultBox: { padding: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-panel)', textAlign: 'center' },
    resultLabel: { fontSize: 9, letterSpacing: 1, textTransform: 'uppercase' as const, color: 'var(--text-dim)', marginBottom: 6 },
    resultValue: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' },
    mobileMenuBtn: { display: 'none', padding: 8, cursor: 'pointer', position: 'fixed' as const, top: 16, left: 16, zIndex: 101 },
  };

  const renderSparkline = (heights: number[], color: string) => (
    <div style={styles.sparkline}>
      {heights.map((h, i) => (
        <div key={i} style={{ ...styles.sparkBar, height: `${h}%`, background: color, animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );

  const navItemStyle = (id: string): React.CSSProperties => ({
    ...styles.navItem,
    ...(activeNav === id ? styles.navItemActive : {}),
  });

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Mobile Menu Button */}
      <button style={{ ...styles.mobileMenuBtn, display: isMobileMenuOpen ? 'none' : 'block' }} onClick={() => setIsMobileMenuOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(0)', transition: 'transform 0.3s ease' }}>
        <div style={styles.logoArea}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>⚡</div>
            <div style={styles.logoText}>Route<span style={{ color: 'var(--cyan)' }}>AI</span></div>
          </div>
          <div style={styles.planBadge}>Pro Plan · Active</div>
        </div>

        <nav style={styles.nav}>
          {navGroups.map((group) => (
            <div key={group.label} style={styles.navSection}>
              <div style={styles.navLabel}>{group.label}</div>
              {group.items.map((itemId) => {
                const item = navItems.find(n => n.id === itemId);
                if (!item) return null;
                return (
                  <a
                    key={itemId}
                    style={navItemStyle(itemId)}
                    onClick={() => { setActiveNav(itemId); setIsMobileMenuOpen(false); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" style={{ opacity: 0.7 }}>
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                    {item.badge && <span style={styles.navBadge}>{item.badge}</span>}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>AK</div>
            <div>
              <div style={styles.userName}>Arjun Kumar</div>
              <div style={styles.userEmail}>arjun@startup.dev</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Topbar */}
        <div style={styles.topbar}>
          <div style={styles.pageTitle}>Dashboard</div>
          <div style={styles.topbarRight}>
            <div style={styles.statusDot}>All systems operational</div>
            <button style={styles.topbarBtn}>📋 Copy API Key</button>
            <button style={{ ...styles.topbarBtn, ...styles.topbarBtnPrimary }}>+ New Project</button>
          </div>
        </div>

        <div style={styles.content}>
          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={{ ...styles.statCard, animation: 'slide-up 0.4s ease backwards', animationDelay: '0.05s' }}>
              <div style={{ ...styles.statIcon, background: 'var(--cyan-dim)', color: 'var(--cyan)' }}>📨</div>
              <div style={styles.statLabel}>Total Requests</div>
              <div style={styles.statValue}>84,291 <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>this month</span></div>
              <div style={{ ...styles.statChange, color: 'var(--green)' }}>↑ 12.4% vs last month</div>
              {renderSparkline([40, 55, 35, 70, 60, 85, 75, 90, 100], 'var(--cyan)')}
            </div>

            <div style={{ ...styles.statCard, animation: 'slide-up 0.4s ease backwards', animationDelay: '0.1s' }}>
              <div style={{ ...styles.statIcon, background: 'var(--green-dim)', color: 'var(--green)' }}>💰</div>
              <div style={styles.statLabel}>Total Saved</div>
              <div style={styles.statValue}>$247.80 <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>vs GPT-4o</span></div>
              <div style={{ ...styles.statChange, color: 'var(--green)' }}>↑ You saved 79% this month</div>
              {renderSparkline([30, 45, 50, 65, 70, 75, 80, 88, 100], 'var(--green)')}
            </div>

            <div style={{ ...styles.statCard, animation: 'slide-up 0.4s ease backwards', animationDelay: '0.15s' }}>
              <div style={{ ...styles.statIcon, background: 'var(--amber-dim)', color: 'var(--amber)' }}>⚡</div>
              <div style={styles.statLabel}>Actual Spend</div>
              <div style={styles.statValue}>$66.20 <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>of $100 limit</span></div>
              <div style={{ ...styles.statChange, color: 'var(--red)' }}>⚠ 68% of budget used</div>
              {renderSparkline([20, 30, 40, 50, 55, 62, 70, 75, 68], 'var(--amber)')}
            </div>

            <div style={{ ...styles.statCard, animation: 'slide-up 0.4s ease backwards', animationDelay: '0.2s' }}>
              <div style={{ ...styles.statIcon, background: 'var(--purple-dim)', color: 'var(--purple)' }}>🧠</div>
              <div style={styles.statLabel}>Avg Routing Time</div>
              <div style={styles.statValue}>14 <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-secondary)' }}>ms / request</span></div>
              <div style={{ ...styles.statChange, color: 'var(--green)' }}>↑ Real-time classification</div>
              {renderSparkline([80, 60, 90, 50, 70, 40, 55, 65, 45], 'var(--purple)')}
            </div>
          </div>

          {/* Main Grid */}
          <div style={styles.mainGrid}>
            {/* Usage Chart */}
            <div style={{ ...styles.panel, animation: 'slide-up 0.4s ease backwards', animationDelay: '0.25s' }}>
              <div style={styles.panelHeader}>
                <div style={styles.panelTitle}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
                  Token Usage — Last 14 Days
                </div>
                <span style={styles.liveTag}>Live</span>
              </div>
              <div style={styles.panelBody}>
                <div style={styles.chartArea}>
                  <svg viewBox="0 0 600 160" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <path fill="url(#gradPurple)" d="M0,120 L44,105 L88,115 L132,90 L176,100 L220,85 L264,95 L308,75 L352,80 L396,65 L440,70 L484,55 L528,60 L572,45 L600,50 L600,160 L0,160 Z" />
                    <path fill="url(#gradCyan)" d="M0,80 L44,65 L88,75 L132,50 L176,60 L220,40 L264,55 L308,35 L352,42 L396,28 L440,35 L484,20 L528,25 L572,18 L600,22 L600,160 L0,160 Z" />
                    <path fill="none" stroke="#a78bfa" strokeWidth={2} d="M0,120 L44,105 L88,115 L132,90 L176,100 L220,85 L264,95 L308,75 L352,80 L396,65 L440,70 L484,55 L528,60 L572,45" />
                    <path fill="none" stroke="#38bdf8" strokeWidth={2} d="M0,80 L44,65 L88,75 L132,50 L176,60 L220,40 L264,55 L308,35 L352,42 L396,28 L440,35 L484,20 L528,25 L572,18" />
                  </svg>
                </div>
                <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <div style={{ width: 16, height: 2, background: 'var(--cyan)', borderRadius: 1 }} />
                    Simple prompts (gemma-3-4b)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <div style={{ width: 16, height: 2, background: 'var(--purple)', borderRadius: 1 }} />
                    Complex prompts (llama-3.1-8b)
                  </div>
                </div>

                {/* Model Breakdown */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 14 }}>Model Distribution</div>
                  {[
                    { name: 'google/gemma-3-4b-it:free', pct: 61, color: 'var(--cyan)' },
                    { name: 'meta-llama/llama-3.1-8b:free', pct: 28, color: 'var(--purple)' },
                    { name: 'openai/gpt-4o (manual)', pct: 11, color: 'var(--amber)' },
                  ].map((model, i) => (
                    <div key={i} style={styles.modelItem}>
                      <div style={styles.modelRow}>
                        <div style={{ ...styles.modelName, color: model.color }}>{model.name}</div>
                        <div style={styles.modelPct}>{model.pct}%</div>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${model.pct}%`, background: model.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Live Routing Log */}
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <div style={styles.panelTitle}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
                    Live Routing Log
                  </div>
                  <span style={styles.liveTag}>Real-time</span>
                </div>
                <div style={{ ...styles.panelBody, padding: '0 20px' }}>
                  {routingLog.map((log, i) => (
                    <div key={i} style={styles.logEntry}>
                      <span style={{ ...styles.logBadge, background: log.type === 'simple' ? 'var(--green-dim)' : 'var(--purple-dim)', color: log.type === 'simple' ? 'var(--green)' : 'var(--purple)', border: `1px solid ${log.type === 'simple' ? 'rgba(74,222,128,0.25)' : 'rgba(167,139,250,0.25)'}` }}>
                        {log.type.toUpperCase()}
                      </span>
                      <span style={styles.logPrompt}>{log.prompt}</span>
                      <span style={styles.logModel}>{log.model}</span>
                      <span style={styles.logCost}>{log.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Alerts */}
              <div style={styles.panel}>
                <div style={styles.panelHeader}>
                  <div style={styles.panelTitle}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 6px var(--amber)' }} />
                    Budget Alerts
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)', cursor: 'pointer' }}>Configure</span>
                </div>
                <div style={styles.panelBody}>
                  <div style={styles.budgetMeter}>
                    <div style={styles.budgetFill} />
                  </div>
                  <div style={styles.budgetTicks}>
                    <span style={styles.budgetTick}>$0</span>
                    <span style={styles.budgetTick}>$25</span>
                    <span style={styles.budgetTick}>$50</span>
                    <span style={styles.budgetTick}>$75</span>
                    <span style={styles.budgetTick}>$100</span>
                  </div>
                  <div style={{ ...styles.alertItem, ...styles.alertItemSafe }}>
                    <span style={styles.alertIcon}>✅</span>
                    <span style={styles.alertText}>50% threshold — OK</span>
                    <span style={{ ...styles.alertPct, color: 'var(--green)' }}>$50 limit</span>
                  </div>
                  <div style={styles.alertItem}>
                    <span style={styles.alertIcon}>⚠️</span>
                    <span style={styles.alertText}>75% threshold — Warning sent</span>
                    <span style={styles.alertPct}>$75 limit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Classifier */}
          <div style={{ ...styles.panel, ...styles.classifierDemo }}>
            <div style={styles.panelHeader}>
              <div style={styles.panelTitle}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', boxShadow: '0 0 6px var(--purple)' }} />
                Prompt Classifier — Live Test
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>Type any prompt to see how it gets classified in real-time</span>
            </div>
            <div style={styles.panelBody}>
              <div style={styles.classifierInputRow}>
                <input style={styles.classifierInput} type="text" placeholder="e.g. What is 2+2?   or   Explain how neural networks work in detail..." defaultValue="What is the weather today?" />
                <button style={styles.classifyBtn}>⚡ Classify</button>
              </div>
              <div style={styles.classifierResult}>
                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>Classification</div>
                  <div style={{ ...styles.resultValue, color: 'var(--green)' }}>SIMPLE</div>
                </div>
                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>Routed To</div>
                  <div style={{ ...styles.resultValue, color: 'var(--cyan)' }}>gemma-3-4b:free</div>
                </div>
                <div style={styles.resultBox}>
                  <div style={styles.resultLabel}>Estimated Cost</div>
                  <div style={{ ...styles.resultValue, color: 'var(--green)' }}>$0.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* API Keys Table */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div style={styles.panelTitle}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 6px var(--amber)' }} />
                Subscription Keys — Multiple Project Management
              </div>
              <button style={{ ...styles.topbarBtn, ...styles.topbarBtnPrimary, fontSize: 10, padding: '5px 12px' }}>+ Generate New Key</button>
            </div>
            <div style={styles.tableWrap}>
              <table style={styles.keysTable}>
                <thead>
                  <tr>
                    <th style={styles.keysTableTh}>Project Name</th>
                    <th style={styles.keysTableTh}>Key</th>
                    <th style={styles.keysTableTh}>Mode</th>
                    <th style={styles.keysTableTh}>Requests</th>
                    <th style={styles.keysTableTh}>Tokens</th>
                    <th style={styles.keysTableTh}>Cost</th>
                    <th style={styles.keysTableTh}>Status</th>
                    <th style={styles.keysTableTh}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key, i) => (
                    <tr key={i}>
                      <td style={styles.keysTableTd}><div style={styles.keyName}>{key.name}</div></td>
                      <td style={styles.keysTableTd}><span style={styles.keyValue}>{key.key}</span></td>
                      <td style={{ ...styles.keysTableTd, color: key.mode === 'Auto' ? 'var(--cyan)' : 'var(--amber)' }}>{key.mode}</td>
                      <td style={styles.keysTableTd}>{key.requests}</td>
                      <td style={styles.keysTableTd}>{key.tokens}</td>
                      <td style={{ ...styles.keysTableTd, color: 'var(--green)' }}>{key.cost}</td>
                      <td style={styles.keysTableTd}>
                        <span style={{ ...styles.statusPill, background: key.status === 'Active' ? 'var(--green-dim)' : 'var(--red-dim)', color: key.status === 'Active' ? 'var(--green)' : 'var(--red)', border: `1px solid ${key.status === 'Active' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
                          {key.status}
                        </span>
                      </td>
                      <td style={styles.keysTableTd}>
                        <button style={styles.actionBtn}>Copy</button>
                        <button style={styles.actionBtn}>Edit</button>
                        <button style={{ ...styles.actionBtn, color: 'var(--red)' }}>Revoke</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .stats-grid { grid-template-columns: 1fr; }
          .main-grid { grid-template-columns: 1fr; }
          .topbar-btn { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
