from diagrams import Cluster, Diagram
from diagrams.aws.management import Organizations
from diagrams.aws.security import SingleSignOn
from diagrams.onprem.client import User
from diagrams.onprem.iac import Terraform
from diagrams.aws.general import General

graph_attr = {
    "fontsize": "40",
    "bgcolor": "transparent"
}

with Diagram("\nAWS Multi Account", show=False, graph_attr=graph_attr):
    org = Organizations("Master Account")
    sso = SingleSignOn("SSO")
    tf = Terraform("0.14")
    user = User("DevOps")

    with Cluster("AWS Accounts"):
        accounts = [General("Shared Account"),
                    General("Dev Account"),
                    General("Prod Account")]

    user >> tf >> org >> sso >> accounts
