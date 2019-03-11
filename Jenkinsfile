pipeline {
    agent any
    stages {
        stage("Накатить на продакшен") {
            when {
                branch 'master'
            }
            parallel {
              stage("Выкатить Админскую часть"){
                steps {
                   input([message: 'Выкатить админа?', ok: 'Да', id:'production-admin-rolout'])
                   sh "ansible-playbook -i ansible/hosts ansible/deploy.yml -e 'build_admin=True'"
                }
              }

              stage("Выкатить Студенческую часть"){
                steps {
                  input([message: 'Выкатить ученика?', ok: 'Да', id:'production-student-rolout'])
                  sh "ansible-playbook -i ansible/hosts ansible/deploy.yml -e 'build_student=True'"
                }
              }
            }
        }
    }
}
