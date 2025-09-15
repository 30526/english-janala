const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn bg-[#EDF7FF] border-1 border-[#D7E4EF] rounded-md"> ${el}</span>`)
    return (htmlElements.join(" "))

}


const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lessonButton = document.getElementById(`lesson-btn-${id}`)
            removeActive() // remove active class
            lessonButton.classList.add('active') // add active class
            displayLevelWords(data.data)
        })
}
const removeActive = () => {
    const lessonButton = document.querySelectorAll(".active-lesson-btn")
    lessonButton.forEach(btn => {
        btn.classList.remove('active')
    })
}

// "data": {
// "word": "Tedious",
// "meaning": "বিরক্তিকর / ক্লান্তিকর",
// "pronunciation": "টিডিয়াস",
// "level": 3,
// "sentence": "The long speech was tedious to listen to.",
// "points": 3,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "boring",
// "monotonous",
// "tiresome"
// ],
// "id": 70
// }
const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)

}

const displayWordDetails = (word) => {

    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
     <div>
                        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                    </div>
                    <div>
                        <p class="font-bold">Meaning</p>
                        <p class="font-medium font-bangla">${word.meaning}</p>
                    </div>
                    <div>
                        <p class="font-bold">Example</p>
                        <p class="font-medium ">${word.sentence}</p>
                    </div>
                    <div>
                        <p class="font-bold font-bangla">সমার্থক শব্দ গুলো</p>
                        <div> ${createElements(word.synonyms)}</div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
    
    `
    my_modal_5.showModal()

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
                <h2 class="font-bold text-2xl">${words.word ? words.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning /Pronunciation</p>
                <div>
                    <p class="font-bold text-2xl text-[#18181bd3]">"${words.meaning ? words.meaning : "অর্থ পাওয়া যায়নি"} /${words.pronunciation ? words.pronunciation : "pronunciation পাওয়া যায়নি"} "</p>
                </div>
                <div class="flex justify-between">
                    <button onclick="loadWordDetail(${words.id})" class="btn text-[#18181bd3] bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
        <button id="lesson-btn-${lessons.level_no}" onclick="loadLevelWord(${lessons.level_no})"
         class="btn btn-outline btn-primary active-lesson-btn">
         <span><i class="fa-solid fa-book-open"></i></span>
         Lessons - ${lessons.level_no}
        </button>`
        levelContainer.appendChild(btnDiv)
    })
}
loadLessons()

