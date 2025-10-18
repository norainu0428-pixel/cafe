// 昭和レトロなカフェサイトのJavaScript
// 店主の想いを込めた温かい機能を実装

// DOM要素の取得
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// ハンバーガーメニューの切り替え（シンプルなアニメーション）
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-open');
    navMenu.classList.toggle('active');
    
    // アニメーションの状態を確実に管理
    const isOpen = menuBtn.classList.contains('is-open');
    
    // ARIA属性を更新
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

// ナビゲーションリンククリック時の処理（ページ間ナビゲーション）
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // 外部リンクやアンカーリンクの場合は通常の動作
        if (href.startsWith('http') || href.startsWith('#')) {
            return;
        }
        
        // ページ内のアンカーリンクの場合
        if (href.includes('#')) {
            e.preventDefault();
            const [page, anchor] = href.split('#');
            
            if (page === '' || page === 'index.html' || page === window.location.pathname.split('/').pop()) {
                // 同じページ内のアンカーリンク
                const targetSection = document.querySelector(`#${anchor}`);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // 別ページへのリンク
                window.location.href = href;
            }
        }
        
        // モバイルメニューを閉じる
        navMenu.classList.remove('active');
        menuBtn.classList.remove('is-open');
        
        // ARIA属性をリセット
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
    });
});

// スクロール時のヘッダー効果（昭和風の演出）
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // 昭和風のパララックス効果
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    lastScrollTop = scrollTop;
});

// ページ読み込み時のアニメーション（店主の温かいおもてなし）
window.addEventListener('load', () => {
    // ヒーローセクションの段階的な表示
    const heroElements = [
        '.hero-title',
        '.hero-subtitle', 
        '.hero-quote',
        '.hero-buttons',
        '.vintage-coffee-set'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.8s ease-out';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 300);
        }
    });
    
    // コーヒーの湯気アニメーション
    animateCoffeeSteam();
    
    // 昭和風の背景パターンアニメーション
    animateVintagePattern();
});

// コーヒーの湯気アニメーション（店主のこだわり）
function animateCoffeeSteam() {
    const steamElements = document.querySelectorAll('.steam-vintage span');
    steamElements.forEach((steam, index) => {
        setInterval(() => {
            steam.style.animation = 'none';
            setTimeout(() => {
                steam.style.animation = 'steamRise 2s infinite ease-in-out';
            }, 10);
        }, 3000 + (index * 1000));
    });
}

// 昭和風の背景パターンアニメーション
function animateVintagePattern() {
    const stains = document.querySelectorAll('.stain');
    stains.forEach((stain, index) => {
        setInterval(() => {
            stain.style.animation = 'none';
            setTimeout(() => {
                stain.style.animation = 'float 6s ease-in-out infinite';
            }, 10);
        }, 5000 + (index * 2000));
    });
}

// 要素が画面に入った時のアニメーション（昭和の温かみ）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // 昭和風の追加アニメーション
            if (entry.target.classList.contains('menu-item')) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                }, 200);
            }
        }
    });
}, observerOptions);

// アニメーション対象要素を監視
const animateElements = document.querySelectorAll('.menu-item, .timeline-item, .interior-item, .feature-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// メニューアイテムのホバー効果（店主の心遣い）
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
        this.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        this.style.boxShadow = '0 2px 4px rgba(139, 69, 19, 0.1)';
    });
});

// ボタンのホバー効果（昭和の手作り感）
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// キーボードナビゲーション対応（アクセシビリティ）
document.addEventListener('keydown', (e) => {
    // ESCキーでモバイルメニューを閉じる
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('is-open');
        
        // ARIA属性をリセット
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
    }
    
    // Tabキーでナビゲーション時、フォーカスが見えるようにする
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    // マウス使用時はキーボードナビゲーションのスタイルを無効化
    document.body.classList.remove('keyboard-navigation');
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
    // モバイルメニューが開いている場合、デスクトップサイズになったら閉じる
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuBtn.classList.remove('is-open');
        
        // ARIA属性をリセット
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
    }
});

// 昭和風のタイピング効果（店主のメッセージ）
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 店主の想いを込めたコンソールメッセージ
console.log('%c☕ 喫茶室 木漏れ日へようこそ！', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%c店主が50年かけて培ったコーヒーへの想いを、', 'color: #654321; font-size: 14px;');
console.log('%c一杯一杯に込めてお客様をおもてなししています。', 'color: #654321; font-size: 14px;');
console.log('%cこのサイトも、その想いを込めて作られました。', 'color: #DAA520; font-size: 14px; font-style: italic;');

// 昭和風の音響効果（オプション）
function playVintageSound() {
    // 実際の実装では、昭和の喫茶店の音を再生
    // 例：コーヒーを淹れる音、レコードの音など
    console.log('昭和の音が流れます...');
}

// コーヒーカップクリック時の特別な効果
document.querySelectorAll('.coffee-cup-vintage, .vintage-coffee-set').forEach(cup => {
    cup.addEventListener('click', function() {
        // コーヒーの湯気を強化
        const steam = this.querySelector('.steam-vintage');
        if (steam) {
            steam.style.animation = 'steamRise 1s infinite ease-in-out';
            setTimeout(() => {
                steam.style.animation = 'steamRise 2s infinite ease-in-out';
            }, 2000);
        }
        
        // 昭和風のメッセージ表示
        showVintageMessage('店主の手作りのコーヒーです...');
    });
});

// 昭和風のメッセージ表示
function showVintageMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(139, 69, 19, 0.9);
        color: #F5E6D3;
        padding: 20px 30px;
        border-radius: 15px;
        font-family: 'Shippori Mincho', serif;
        font-size: 1.1rem;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border: 2px solid #DAA520;
        animation: fadeInUp 0.5s ease-out;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeInUp 0.5s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 2000);
}

// フォーム送信処理（複数のフォームに対応）
const contactForms = document.querySelectorAll('form');
contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const name = form.querySelector('input[name="name"]')?.value || '';
        const email = form.querySelector('input[name="email"]')?.value || '';
        const message = form.querySelector('textarea[name="message"]')?.value || '';
        
        // 簡単なバリデーション
        if (!name || !email || !message) {
            showVintageMessage('すべての項目を入力してください。');
            return;
        }
        
        // 送信処理（実際の実装ではサーバーに送信）
        showVintageMessage('お問い合わせありがとうございます。後日担当者よりご連絡いたします。');
        form.reset();
    });
});

// パフォーマンス最適化：スクロールイベントのthrottle
let ticking = false;

function updateScrollEffects() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // ヘッダーの効果
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // パララックス効果
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrollTop * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// 昭和風のカスタムカーソル（オプション）
function createVintageCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #8B4513, #654321);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        opacity: 0.7;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// 昭和風のカーソルを有効にする（コメントアウトで無効化可能）
// createVintageCursor();

// ページ離脱時のメッセージは削除（ユーザーの要望により）

// 昭和風の時計表示（オプション）
function createVintageClock() {
    const clockDiv = document.createElement('div');
    clockDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(139, 69, 19, 0.9);
        color: #F5E6D3;
        padding: 10px 15px;
        border-radius: 10px;
        font-family: 'Shippori Mincho', serif;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        border: 1px solid #DAA520;
    `;
    
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        clockDiv.textContent = `現在 ${timeString}`;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
    
    document.body.appendChild(clockDiv);
}

// 昭和風の時計を有効にする（コメントアウトで無効化可能）
// createVintageClock();