
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                sh './build.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh './deploy.sh'
            }
        }
    }
}