ng build --prod
cat ../docker_password.txt | docker login -u raimojohanson --password-stdin
docker build -t vet-ui .
docker tag vet-ui raimojohanson/vet-ui
docker push raimojohanson/vet-ui