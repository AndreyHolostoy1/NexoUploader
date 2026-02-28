document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('pricing-container');
    const tariffs = ['tariff-1', 'tariff-3', 'tariff-6', 'tariff-12'];
    let isManualScrolling = false;

    window.scrollToTariff = function(tariffId) {
        const element = document.getElementById(tariffId);
        if (!element || !container) return;

        isManualScrolling = true;
        setActiveButton(tariffId);

        const containerWidth = container.offsetWidth;
        const elementLeft = element.offsetLeft;
        const elementWidth = element.offsetWidth;
        const targetScroll = elementLeft - (containerWidth / 2) + (elementWidth / 2);

        container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        setTimeout(() => { isManualScrolling = false; }, 500);
    };

    window.scrollTariffDirection = function(direction) {
        const currentScroll = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.85;
        let currentIndex = Math.round(currentScroll / cardWidth);

        if (direction === 'next') currentIndex++;
        else currentIndex--;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > 3) currentIndex = 3;

        scrollToTariff(tariffs[currentIndex]);
    };

    function setActiveButton(activeId) {
        const btnIds = ['btn-tariff-1', 'btn-tariff-3', 'btn-tariff-6', 'btn-tariff-12'];
        
        btnIds.forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            
            btn.className = "text-brand-muted text-xs border border-transparent duration-300 flex-1 py-2.5 rounded-lg transition-all";
            
            if (id === 'btn-' + activeId) {
                btn.classList.remove('text-brand-muted', 'border-transparent');
                btn.classList.add('text-brand-primary', 'bg-white/10', 'border-white/10', 'font-bold', 'shadow-inner');
            }
        });
    }

    container.addEventListener('scroll', () => {
        if (isManualScrolling) return;

        const center = container.scrollLeft + (container.offsetWidth / 2);
        let closestDist = Infinity;
        let closestId = 'tariff-6';

        tariffs.forEach(id => {
            const el = document.getElementById(id);
            const elCenter = el.offsetLeft + (el.offsetWidth / 2);
            const dist = Math.abs(center - elCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closestId = id;
            }
        });
        setActiveButton(closestId);
    });

    setTimeout(() => {
        if (window.innerWidth < 768) {
            scrollToTariff('tariff-6');
        } else {
            setActiveButton('tariff-6');
        }
    }, 100);
});
