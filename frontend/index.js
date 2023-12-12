async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  //Learner Card Builder
  function buildLearnerCard(learner){
    //Card elements
    let card = document.createElement('div')
    card.classList.add('card')

    let learnerName = document.createElement('h3')
    learnerName.textContent = learner.fullName
    card.appendChild(learnerName)

    let learnerEmail = document.createElement('div')
    learnerEmail.textContent = learner.email
    card.appendChild(learnerEmail)

    let mentorHeader = document.createElement('h4')
    mentorHeader.textContent = "Mentors"
    mentorHeader.classList.add('closed')
    card.appendChild(mentorHeader)

    let learnerMentors = document.createElement('ul')
    for (let mentor in learner.mentors){
      let mentorLI = document.createElement('li')
      mentorLI.textContent = learner.mentors[mentor]
      learnerMentors.appendChild(mentorLI)
    }
    card.appendChild(learnerMentors)

    //Card Functionality
    card.addEventListener('click', event => {
      if (document.querySelector('.selected')) {
        let currentSelected = document.querySelector('.selected')
        if (currentSelected !== event.currentTarget) {
          currentSelected.classList.remove('selected')
          let splitContent = currentSelected.firstChild.textContent.split(", ")
          currentSelected.firstChild.textContent = splitContent[0]
        }
      }
      if (event.target === card){
        event.target.classList.toggle('selected')
      } else if (event.target === mentorHeader || event.target === learnerName || event.target === learnerEmail || event.target === learnerMentors){      
        if (event.target === mentorHeader){
          event.target.parentElement.classList.add('selected')
          event.target.classList.toggle('closed')
          event.target.classList.toggle('open')
        } else {
          event.target.parentElement.classList.toggle('selected')
        }
      }

      if (card.classList.contains('selected')){
        learnerName.textContent = learner.fullName + ", ID " + learner.id
      } else {
        learnerName.textContent = learner.fullName
      }

      if (document.querySelector('.selected') === null){
        document.querySelector('p.info').textContent = "No learner is selected"
      } else {
        document.querySelector('p.info').textContent = `The selected learner is ${learner.fullName}`
      }
    })
    return card;
  }
  //End card builder


  //Helper variables to retrieve data
  const learners = await axios.get('http://localhost:3003/api/learners')
  const mentors = await axios.get('http://localhost:3003/api/mentors')
  const learnersMentors = []

  Promise.all([learners, mentors])
    .then(() => {
      document.querySelector('p.info').textContent = "No learner is selected"
      //Process retrieved data
      for (let learner of learners.data) {
        let mentorNames = []
        for (let mentor of mentors.data) {
          for (let Id of learner.mentors){
            if (Id === mentor.id){
              let mentorName = mentor.firstName + " " + mentor.lastName
              mentorNames.push(mentorName)
            }
          }
        }
        let currentLearner = {
          "id": learner.id,
          "fullName": learner.fullName,
          "email": learner.email,
          "mentors": mentorNames
        }
        learnersMentors.push(currentLearner)
      }
    })
  //Actually creating the learner cards
    .then(() => {
      for (let learner of learnersMentors){
        document.querySelector('.cards').appendChild(buildLearnerCard(learner))
      }
    })
    

  
  


  
  



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
