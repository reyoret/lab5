const { createApp } = Vue;

createApp({
    components: {
        CourseCard: window.CourseCard
    },

    data() {
        return {
            courses: [
                { id: 1, name: "Фортепіано", teacher: "О. Петренко", duration: 45, level: "Початковий" },
                { id: 2, name: "Гітара", teacher: "М. Бондар", duration: 50, level: "Середній" },
                { id: 3, name: "Скрипка", teacher: "Т. Сидоренко", duration: 40, level: "Початковий" },
                { id: 4, name: "Вокал", teacher: "І. Коваленко", duration: 45, level: "Середній" },
                { id: 5, name: "Сольфеджіо", teacher: "Л. Марченко", duration: 35, level: "Базовий" },
                { id: 6, name: "Музична грамота", teacher: "Н. Савчук", duration: 30, level: "Базовий" }
            ],

            selectedCourse: null,

            minutes: 15,
            timeLeft: 15 * 60,
            timerId: null,
            isRunning: false,
            showError: false
        };
    },

    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;

            return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }
    },

    methods: {
        selectCourse(course) {
            this.selectedCourse = course;
        },

        startTimer() {
            if (
                Number.isNaN(this.minutes) ||
                this.minutes < 1 ||
                this.minutes > 180
            ) {
                this.showError = true;
                return;
            }

            this.showError = false;

            if (this.isRunning) {
                return;
            }

            if (this.timeLeft <= 0) {
                this.timeLeft = this.minutes * 60;
            }

            this.isRunning = true;

            this.timerId = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    this.stopTimer();
                }
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timerId);
            this.timerId = null;
            this.isRunning = false;
        },

        resetTimer() {
            this.stopTimer();

            if (
                Number.isNaN(this.minutes) ||
                this.minutes < 1 ||
                this.minutes > 180
            ) {
                this.minutes = 15;
            }

            this.showError = false;
            this.timeLeft = this.minutes * 60;
        }
    },

    watch: {
        minutes(newValue) {
            if (
                !this.isRunning &&
                !Number.isNaN(newValue) &&
                newValue >= 1 &&
                newValue <= 180
            ) {
                this.timeLeft = newValue * 60;
                this.showError = false;
            }
        }
    },

    mounted() {
        this.timeLeft = this.minutes * 60;
    },

    beforeUnmount() {
        clearInterval(this.timerId);
    }
}).mount("#app");