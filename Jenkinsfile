def CONTAINER_NAME = "react"

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
      sh """
        if [ '\$( docker container inspect -f '{{.State.Status}}' ${CONTAINER_NAME} )' = 'running' ]
        then docker stop ${CONTAINER_NAME}
       """
      sh "docker run --rm -d -p 3000:3000 --name ${CONTAINER_NAME} localhost:5000/react-app:latest"
    }
  }
  catch (err) {
    throw err
  }
}