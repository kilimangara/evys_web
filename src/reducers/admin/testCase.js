import {
  createTestCase,
  deleteTestCase,
  updateTestCase,
  deleteAnswer,
  deleteTest,
  getTestCases
} from '../../api'


export const loadTestCases = (themeId) => {
  return getTestCases(themeId)
}

export const newTestBlock = (themeId, data) => {
  return createTestCase(themeId, data)
}

export const removeTestCase = (themeId, testCaseId) => {
  return deleteTestCase(themeId, testCaseId)
}

export const putTestCase = (themeId, testCaseId, data) => {
  return updateTestCase(themeId, testCaseId, data)
}

export const removeAnswer = (testId, answerId) => {
  return deleteAnswer(testId, answerId)
}

export const removeTest = (testCaseId, testId) => {
  return deleteTest(testCaseId, testId)
}
