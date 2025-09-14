const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''
    lessons.forEach(lessons => {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button
         class="btn btn-outline btn-primary">
         <span><i class="fa-solid fa-book-open"></i></span>
         Lessons - ${lessons.level_no}
        </button>`
        levelContainer.appendChild(btnDiv)
    })
}
loadLessons()

