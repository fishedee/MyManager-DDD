DIRECTORY=/home/fish/Project
TARGET=MyManager-DDD
HOST=fish@balefcloud.com
.PHONY:deploy zip build
deploy:build zip
	echo "deploy success"
clean:
	rm -rf $(TARGET)
	rm -rf $(TARGET).tar.gz
zip:build
	tar -zcvf $(TARGET).tar.gz $(TARGET)/*
build:
	cd server && SPRING_PROFILES_ACTIVE=test mvn package
	cd static && npm run build
	-rm -rf $(TARGET)
	mkdir $(TARGET)
	cp server/target/$(TARGET)-1.0.jar $(TARGET)
	cp -r static/dist  $(TARGET)/static
	cp -r static/dist  $(TARGET)/static/static
build_config:
	cp -r data/bash/Makefile $(TARGET)
	cp -r data/backup $(TARGET)
	cp -r data/nginx $(TARGET)

