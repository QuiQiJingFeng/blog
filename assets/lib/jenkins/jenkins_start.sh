#!/bin/bash
# java -jar jenkins.war --httpPort=8080

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
cat key.pem cert.pem | openssl pkcs12 -export -out cert.p12;
keytool -importkeystore -srckeystore cert.p12 -srcstoretype pkcs12 -destkeystore cert.jks 


# java -jar jenkins.war --httpsPort=8443 --httpsCertificate=ssl/cert.pem --httpsPrivateKey=ssl/key.pem
 

java -jar jenkins.war  --httpPort=8080 --httpsPort=8443 --httpsKeyStore=/Users/jingfeng/jenkins/ssl/cert.jks --httpsKeyStorePassword=mengyagame