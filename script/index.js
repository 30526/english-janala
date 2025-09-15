const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWords(data.data))
}

const displayLevelWords = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''
    if (words.length == 0) {
        wordContainer.innerHTML = `
       <div class="text-center col-span-full rounded-xl py-10 
            space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png">
                <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
            </div>`
        return;
    }
    words.forEach(words => {
        const card = document.createElement('div')
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center space-y-4 py-10 px-5 h-full">
                <h2 class="font-bold text-2xl">${words.word}</h2>
                <p class="font-semibold">Meaning /Pronunciation</p>
                <div>
                    <p class="font-bold text-2xl text-[#18181bd3]">"${words.meaning} /${words.pronunciation} "</p>
                </div>
                <div class="flex justify-between">
                    <button class="btn text-[#18181bd3] bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn text-[#18181bd3] bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `
        wordContainer.append(card)
    })
}



const displayLessons = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''
    lessons.forEach(lessons => {
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lessons.level_no})"
         class="btn btn-outline btn-primary">
         <span><i class="fa-solid fa-book-open"></i></span>
         Lessons - ${lessons.level_no}
        </button>`
        levelContainer.appendChild(btnDiv)
    })
}
loadLessons()

