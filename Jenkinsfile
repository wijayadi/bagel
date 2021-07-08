pipeline {
    agent any

    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '100', artifactNumToKeepStr: '100', daysToKeepStr: '7', numToKeepStr: '50')
    }

    stages {
        stage('Prepare') {
            steps {
                echo 'Prepare'
            }
        }

        stage('Build') {
            steps {
                echo 'Build'
            }
        }

        stage('Release') {
            steps {
                echo 'Release'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy'
            }
        }
    }

    post {
        failure {
            println 'Failure'
        }

        always {
            println 'Always'
        }

        success {
            println 'Success'
        }
    }
}

