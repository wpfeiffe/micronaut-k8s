# micronaut-k8s
This project was put together to work with latest micronaut and attempt to seperate UI from Services within kubernetes. 

I am deploying the employees service, employees ui, teams service and teams ui as seperate deployments each with their own k8s service to front the pods.

I have put together two ingress controllers, one for each app (employees, teams).  The ingress will route api to api (services app) and the root of the ingress will run the ui app.

For the employees application this means that the employees ingress will route http://employees-app to the employees UI and http://employees-app/api will be routed to the employees Service.

For the teams application this means that the teams ingress will route http://teams-app to the teams UI and http://teams-app/api will be routed to the teams Service.
