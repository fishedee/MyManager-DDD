DIRECTORY=/home/fish/Project
TARGET=MyManager-DDD
HOST=fish@balefcloud.com
.PHONY:deploy zip build
deploy:build
	echo "build success"
build:
	cd server && SPRING_PROFILES_ACTIVE=test mvn package
	cd static && npm install && npm run build
	-rm -rf $(TARGET)
	mkdir $(TARGET)
	cp server/target/$(TARGET)-1.0.jar $(TARGET)
	cp -r static/dist  $(TARGET)/static
	cp -r static/dist  $(TARGET)/static/static

