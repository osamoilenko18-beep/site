(function () {

    const PRIVACY_POLICY_VERSION = '2026-01-22';

    const STORAGE_KEYS = {
        consent: 'cookieConsent',
        policyVersion: 'privacyPolicyVersion',
        consentDate: 'cookieConsentDate'
    };

    const overlay = document.getElementById('cookieOverlay');
    const acceptBtn = document.getElementById('cookieAccept');
    const rejectBtn = document.getElementById('cookieReject');

    if (!overlay || !acceptBtn || !rejectBtn) return;

    const savedConsent = localStorage.getItem(STORAGE_KEYS.consent);
    const savedPolicyVersion = localStorage.getItem(STORAGE_KEYS.policyVersion);

    const policyChanged = savedPolicyVersion !== PRIVACY_POLICY_VERSION;

    if (!savedConsent || policyChanged) {
        showConsent();
    } else {
        hideConsent();
        if (savedConsent === 'accepted') {
            loadGoogleAnalytics();
        }
    }

    function showConsent() {
        document.body.classList.add('cookies-pending');
        overlay.classList.add('active');
    }

    function hideConsent() {
        document.body.classList.remove('cookies-pending');
        overlay.classList.remove('active');
    }

    function saveConsent(value) {
        localStorage.setItem(STORAGE_KEYS.consent, value);
        localStorage.setItem(STORAGE_KEYS.policyVersion, PRIVACY_POLICY_VERSION);
        localStorage.setItem(STORAGE_KEYS.consentDate, new Date().toISOString());
    }

    function loadGoogleAnalytics() {
        if (window.gaLoaded) return;

        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-Y9W6QE4ZRM";
        document.head.appendChild(gtagScript);

        window.dataLayer = window.dataLayer || [];

        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', 'G-Y9W6QE4ZRM');

        window.gaLoaded = true;
    }

    acceptBtn.addEventListener('click', () => {
        saveConsent('accepted');
        hideConsent();
        loadGoogleAnalytics();
    });

    rejectBtn.addEventListener('click', () => {
        saveConsent('rejected');
        hideConsent();
    });

})();