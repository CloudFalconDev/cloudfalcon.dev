from diagrams import Cluster, Diagram
from diagrams.aws.database import Dynamodb
from diagrams.aws.storage import S3
from diagrams.aws.security import KMS
# from diagrams.aws.general import User
from diagrams.onprem.client import User
from diagrams.onprem.iac import Terraform

with Diagram("AWS S3 Backend", show=False):

    tf = Terraform("")
    user = User("DevOps")

    with Cluster("AWS"):
        aws = [S3("TF State"),
               Dynamodb("TF LockTable"),
               KMS("Encryption Key")]

    user >> tf >> aws
