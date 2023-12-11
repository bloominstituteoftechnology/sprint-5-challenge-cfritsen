async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  //Helper variables to retrieve data
  const learners = await axios.get('http://localhost:3003/api/learners')
  const mentors = await axios.get('http://localhost:3003/api/mentors')
  const learnersMentors = []
  //Process retrieved data
  Promise.all([learners, mentors])
    .then(() => {
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

  


  
  



  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
