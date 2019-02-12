import {
  createTestCase,
  deleteTestCase,
  updateTestCase,
  deleteAnswer,
  deleteTest,
  getTestCases
} from '../../api'


export const loadTestCases = (themeId) => (dispatch) => {
  return getTestCases(themeId)
}

export const newTestCase = (themeId, data) => (dispatch) => {
  return createTestCase(themeId, data)
}

export const removeTestCase = (themeId, testCaseId) => (dispatch) => {
  return deleteTestCase(themeId, testCaseId)
}

export const putTestCase = (themeId, testCaseId, data) => (dispatch) => {
  return updateTestCase(themeId, testCaseId, data)
}

export const removeAnswer = (testId, answerId) => (dispatch) => {
  return deleteAnswer(testId, answerId)
}

export const removeTest = (testCaseId, testId) => (dispatch) => {
  return deleteTest(testCaseId, testId)
}
