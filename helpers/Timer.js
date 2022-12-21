class Timer {
    constructor(id, end) {
        this.endEvnet = new CustomEvent('timer-end', { detail: id });
        this.initTime = new Date();
        this.elapsedTime = 0;

        const interval = setInterval(() => {
            this.elapsedTime = Math.floor((new Date() - this.initTime) / 1000);
            const timerEl = document.querySelector('.timer');
            timerEl.dataset.elapsedTime = this.elapsedTime + 's';
            if (this.elapsedTime === end) {
                dispatchEvent(this.endEvnet);
                clearInterval(interval);
            }
        }, 1000);
    }
}

export default Timer;