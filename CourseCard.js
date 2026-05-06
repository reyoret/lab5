window.CourseCard = {
    props: {
        course: {
            type: Object,
            required: true
        }
    },

    emits: ["select-course"],

    template: `
        <div class="course-card">
            <h3>{{ course.name }}</h3>
            <p><strong>Викладач:</strong> {{ course.teacher }}</p>
            <p><strong>Тривалість:</strong> {{ course.duration }} хв</p>
            <p><strong>Рівень:</strong> {{ course.level }}</p>
            <button class="action-button" @click="$emit('select-course', course)">
                Обрати курс
            </button>
        </div>
    `
};