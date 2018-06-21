import {actionTypesFor} from 'trivial-redux'

export function createTestCase(theme_id, data){
  return {
    types: actionTypesFor('create', 'test_cases_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/test_cases`,
        data,
        method: 'POST'
      }
    }
  }
}

export function deleteTestCase(theme_id, test_case_id){
  return {
    types: actionTypesFor('delete', 'test_cases_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/test_case/${test_case_id}`,
        method: 'DELETE'
      }
    }
  }
}

export function updateTestCase(theme_id, test_case_id, data){
  return {
    types: actionTypesFor('update', 'test_cases_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/test_case/${test_case_id}`,
        data,
        method: 'PUT'
      }
    }
  }
}

export function getTestCases(theme_id){
  return {
    types: actionTypesFor('index', 'test_cases_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/test_cases`,
      }
    }
  }
}

export function deleteAnswer(test_id, answer_id){
  return {
    types: actionTypesFor('delete', 'answers_admin'),
    meta: {
      fetch: {
        url: `~admin2/test/${test_id}/answer/${answer_id}`,
        method: 'DELETE'
      }
    }
  }
}

export function deleteTest(test_case_id, test_id) {
  return {
    types: actionTypesFor('delete', 'tests_admin'),
    meta: {
      fetch: {
        url: `~admin2/test_case/${test_case_id}/test/${test_id}`,
        method: 'DELETE'
      }
    }
  }
}
