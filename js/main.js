document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.slider-wrapper');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');

    if (!wrapper || !prevBtn || !nextBtn) return;

    const scrollAmount = 420;

    const updateButtons = () => {
        const scrollLeft = wrapper.scrollLeft;
        const maxScroll = wrapper.scrollWidth - wrapper.offsetWidth;

        if (scrollLeft <= 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        if (scrollLeft >= maxScroll - 10) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    };

    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateButtons);

    updateButtons();
    
    // Support button animation logic
    const supportButton = document.querySelector('.support-button');
    if (supportButton) {
        supportButton.addEventListener('click', () => {
            supportButton.classList.add('animating');
            
            // Wait for animation to finish then show feature-form
            setTimeout(() => {
                supportButton.classList.remove('animating');
                const featureForm = document.getElementById('feature-form');
                if (featureForm) {
                    featureForm.style.display = 'block';
                }
            }, 2000);
        });
    }
});

const { GrowthBook } = growthbook;

const gb = new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: "sdk-2SNIEcinXWoUc7l5",
    enableDevMode: true,
    subscribeToChanges: true,
    trackingCallback: (experiment, result) => {
        console.log("Viewed Experiment", experiment.key, result.variationId);
    }
});

async function initGrowthBook() {
    await gb.init({ streaming: true });

    const isFeatureEnabled = gb.isOn("show-feature-form");

    const featureElement = document.getElementById("feature-form");
    if (featureElement) {
        featureElement.style.display = isFeatureEnabled ? "block" : "none";
    }
}

initGrowthBook();
