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
        
        // Also allow GrowthBook to control the button's text and color
        const ctaButton = featureElement.querySelector(".btn-primary");
        if (ctaButton) {
            const buttonText = gb.getFeatureValue("button-text", "");
            const buttonColor = gb.getFeatureValue("button-color", "");
            
            if (buttonText) {
                ctaButton.textContent = buttonText;
            }
            if (buttonColor) {
                ctaButton.style.backgroundColor = buttonColor;
            }
        }
    }
}

initGrowthBook();
