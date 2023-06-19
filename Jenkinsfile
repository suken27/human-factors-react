node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Push to registry'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:5000/react-app'
        sh 'docker push localhost:5000/react-app'
        sh 'docker rmi -f react-app localhost:5000/react-app'
    }
    stage('Deploy'){
      sh 'docker stop react'
      sh 'docker rm react'
      sh 'docker run -d -p 3000:3000 --name react localhost:5000/react-app:latest'
    }
  }
  catch (err) {
    throw err
  }
}