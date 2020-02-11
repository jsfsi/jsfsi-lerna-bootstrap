#!groovy​

pipeline {
    agent {
        label 'jenkins-slave'
    }
    environment {
        APP_NAME = 'example'
        SCRIPTS_FOLDER = "pipeline/jsfsi-pipelines/pipelines/scripts"
        ENVIRONMENTS_FOLDER = "$WORKSPACE/pipeline/environments"        
        VERSION = "0.0.${BUILD_NUMBER}"
        PROJECT_ID = "google cloud project id"
        CONTAINER_REGISTRY = "gcr.io/${PROJECT_ID}"        
        CLUSTER_NAME = "gke cluster name"
        CLUSTER_ZONE = "europe-west1-b"
    }
    stages {
        stage('Setup') {
            steps {
                withCredentials([
                    file(credentialsId: "example-service-account-key", variable: "SERVICE_ACCOUNT_FILE"),
                    file(credentialsId: "jsfsi-pipelines-github-access-key", variable: "GITHUB_SSH_KEY")
                ]) {
                    sh script: "git clean -xfd", label: "Cleanup"
                    sh script: "ssh-agent bash -c 'ssh-add $GITHUB_SSH_KEY; git submodule update --init --recursive'", label: "Init git submodules"
                    sh script: "gcloud auth activate-service-account --key-file=\"${SERVICE_ACCOUNT_FILE}\"", label: "GCloud login"                    
                }
            }
        }
        stage('Build') {
            steps {
                sh script: "$SCRIPTS_FOLDER/docker/01-build.sh $APP_NAME $VERSION $CONTAINER_REGISTRY $WORKSPACE/packages/${APP_NAME}/Dockerfile $WORKSPACE", label: "Build example"
            }
        }
        stage('Publish artifacts') {
            steps {
                sh script: "${SCRIPTS_FOLDER}/gcloud/docker/01-publish.sh ${APP_NAME} ${VERSION} ${PROJECT_ID}", label: "Publish example"
            }
        }
        stage('Deploy QA') {
            steps {
                sh script: "gcloud container clusters get-credentials --project=\"${PROJECT_ID}\" --zone=\"${CLUSTER_ZONE}\" \"${CLUSTER_NAME}\"", label: "Get GKE Credentials"
                sh script: "${SCRIPTS_FOLDER}/gcloud/kubernetes/01-deploy.sh ${ENVIRONMENTS_FOLDER}/application.qa.env ${ENVIRONMENTS_FOLDER}/deploy.qa.env" , label: "Deploy example"
            }
        }
        stage('Deploy Production') {
            steps {
                sh script: "gcloud container clusters get-credentials --project=\"${PROJECT_ID}\" --zone=\"${CLUSTER_ZONE}\" \"${CLUSTER_NAME}\"", label: "Get GKE Credentials"
                sh script: "${SCRIPTS_FOLDER}/kubernetes/01-deploy.sh ${ENVIRONMENTS_FOLDER}/application.production.env ${ENVIRONMENTS_FOLDER}/deploy.production.env", label: "Deploy example"
            }
        }
    }
}
