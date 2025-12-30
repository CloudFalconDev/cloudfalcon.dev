# ECS Blue/Green CICD

Build and configure a CI/CD pipeline using AWS CodeCommit, AWS CodePipeline, AWS CodeBuild, using Terraform.

## HashiCorp Tutorials

- [Use Application Load Balancers for Blue-Green and Canary Deployments](https://learn.hashicorp.com/tutorials/terraform/blue-green-canary-tests-deployments?in=terraform/aws)

## AWS Tutorials

- [Tutorial: Create a pipeline with an Amazon ECR source and ECS-to-CodeDeploy deployment](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-ecs-ecr-codedeploy.html)
- [Tutorial: Deploy an Amazon ECS service](https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorial-ecs-deployment.html)
- [Tutorial: Creating a service using a blue/green deployment](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-blue-green.html)

## AWS references

- [Amazon Elastic Container Service and CodeDeploy Blue-Green](https://docs.aws.amazon.com/codepipeline/latest/userguide/action-reference-ECSbluegreen.html)
- [Image definitions file reference](https://docs.aws.amazon.com/codepipeline/latest/userguide/file-reference.html)

## AWS Blogs

- [Building a cross-account CI/CD pipeline for single-tenant SaaS solutions](https://aws.amazon.com/blogs/devops/cross-account-ci-cd-pipeline-single-tenant-saas/)
- [Building a CI/CD pipeline for cross-account deployment of an AWS Lambda API with the Serverless Framework](https://aws.amazon.com/blogs/devops/building-a-ci-cd-pipeline-for-cross-account-deployment-of-an-aws-lambda-api-with-the-serverless-framework/)

## Troubleshooting

- [CodePipeline returns an InternalError for a cross-account Deployment to S3](https://forums.aws.amazon.com/message.jspa?messageID=923205)
- [Invalid action configuration: Exception while trying to read the task definition artifact file](https://stackoverflow.com/questions/57216053/invalid-action-configuration-exception-while-trying-to-read-the-task-definition)
- [AWS ECS Blue/Green CodePipeline: Exception while trying to read the image artifact](https://stackoverflow.com/questions/62022787/aws-ecs-blue-green-codepipeline-exception-while-trying-to-read-the-image-artifa)

### To troubleshoot any AWS service-related issues, see the following:

[Troubleshooting CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/troubleshooting.html)
[Troubleshooting CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/troubleshooting.html)
[Troubleshooting AWS CodeCommit](https://docs.aws.amazon.com/codecommit/latest/userguide/troubleshooting.html)
[Troubleshooting AWS CodeBuild](https://docs.amazonaws.cn/en_us/codebuild/latest/userguide/troubleshooting.html)