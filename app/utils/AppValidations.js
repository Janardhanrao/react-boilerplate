export function isValidQuestion(question) {
  let newQuestion = question
  if (newQuestion.question) {
    newQuestion = newQuestion.question
  }
  let options = newQuestion.optionsList
  if (newQuestion.optionDetails) {
    options = newQuestion.optionDetails
  }
  console.log('options', options)
  let isValid = true
  if (newQuestion.questionType !== 'text' && options.length === 0) {
    isValid = false
  }
  console.log('isValid', isValid, question.questionType !== 'text', options.length === 0)
  return isValid
}
