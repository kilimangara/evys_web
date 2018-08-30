import trivialRedux from "trivial-redux";

import auth from './endpoints/auth'
import account from './endpoints/account'
import tariffs from './endpoints/tariffs'
import courses from './endpoints/courses'
import stats from './endpoints/stats'
import account_admin  from './endpoints/admin/account_admin'
import auth_admin from './endpoints/admin/auth_admin'
import subjects_admin from './endpoints/admin/subjects_admin'
import test_cases_admin from './endpoints/admin/test_cases_admin'
import themes_admin from './endpoints/admin/themes_admin'
import students_admin from './endpoints/admin/students_admin'
import tariffs_admin from './endpoints/admin/tariffs_admin'
import company_admin from './endpoints/admin/company_admin'

export const adminAPI = trivialRedux({
  auth_admin,
  account_admin,
  subjects_admin,
  test_cases_admin,
  themes_admin,
  students_admin,
  tariffs_admin,
  company_admin
})

export const studentAPI = trivialRedux({
  auth,
  account,
  tariffs,
  courses,
  stats
});
